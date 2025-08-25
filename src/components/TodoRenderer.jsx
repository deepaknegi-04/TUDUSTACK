import { useRecoilState } from "recoil";
import { todoSelector } from "../store/todoAtom";
import { DeleteTodo } from "../components/DeleteTodo";
import UpdateTodoModal from "./UpdateTodo";
import { useState } from "react";
import { API_BASE } from "../config";

export const TodoRenderer = () => {
  const [todos, setTodos] = useRecoilState(todoSelector);
  const [editingTodo, setEditingTodo] = useState(null);

  async function toggleTodoCompletion(targetTodo) {
    const previousTodos = todos;
    const optimisticTodos = previousTodos.map((t) =>
      t._id === targetTodo._id ? { ...t, completed: !t.completed } : t
    );
    setTodos(optimisticTodos);

    try {
      const token = localStorage.getItem("token");
      const url = `${API_BASE}/todo/update/${targetTodo._id}`;
      console.log("PUT", url);
      const res = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: targetTodo.title,
          description: targetTodo.description,
          completed: !targetTodo.completed,
        }),
      });
      const contentType = res.headers.get("content-type") || "";
      const raw = await res.text();
      let data = {};
      if (contentType.includes("application/json")) {
        try { data = raw ? JSON.parse(raw) : {}; } catch (_) { data = {}; }
      }

      if (res.ok) {
        setTodos((curr) => curr.map((t) => (t._id === targetTodo._id ? (data.updated || t) : t)));
      } else {
        console.error("Toggle failed:", res.status, { url, raw });
        const isHtml = /<\s*html/i.test(raw);
        const message = (data && data.msg) || (res.status === 401 ? "Session expired. Please log in again." : undefined) || (isHtml ? "Server error. Please try again." : raw) || `Failed to update status (${res.status})`;
        if (res.status === 401) {
          localStorage.removeItem("token");
          window.location.href = "/login";
        }
        alert(message);
        setTodos(previousTodos); // revert
      }
    } catch (e) {
      console.error("Network error while updating status", e);
      alert("Network error while updating status");
      setTodos(previousTodos); // revert
    }
  }

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 px-4">

      {todos.map((todo, index) => (
        <div key={index} className="w-full shadow-md rounded-lg">
          <div className="block w-full p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {todo.title}
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              {todo.description}
            </p>
            <div className="flex items-center gap-2 mt-2">
              <button
                onClick={() => setEditingTodo(todo)} // ✅ open modal with this todo
                className="px-3 py-1 mt-2 bg-yellow-500 text-white rounded"
              >
                Edit
              </button>
              <button
                onClick={() => toggleTodoCompletion(todo)}
                className={`px-2 py-1 rounded text-xs font-medium mt-2 ${
                  todo.completed ? "bg-green-600 text-white" : "bg-gray-300 text-gray-800"
                }`}
                aria-label={todo.completed ? "Mark as pending" : "Mark as completed"}
                title={todo.completed ? "Mark as pending" : "Mark as completed"}
              >
                {todo.completed ? "Completed" : "Pending"}
              </button>
            </div>
          </div>

          <DeleteTodo
            id={todo._id}
            onDelete={(id) =>
              setTodos((prev) => prev.filter((t) => t._id !== id))
            }
          />
        </div>
      ))}


      {/* ✅ One modal outside the map */}
      {editingTodo && (
        <UpdateTodoModal
          open={!!editingTodo}
          onClose={() => setEditingTodo(null)}
          todo={editingTodo}
        />
      )}
    </div>
  );
};



