import { useState } from "react";
import { useRecoilState } from "recoil";
import { todoSelector } from "../store/todoAtom";
import { API_BASE } from "../config";

export default function CreateTodo() {
    const [todos, setTodos] = useRecoilState(todoSelector);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const handleCreateTodo = async () => {

        if (!title.trim() || !description.trim()) {
            alert("⚠️ Please enter both title and description.");
            return;
        }
        try {
            const token = localStorage.getItem("token"); // JWT
            const res = await fetch(`${API_BASE}/todo/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ title, description }),
            });

            const data = await res.json();
            if (res.ok) {
                // Update recoil state
                setTodos((prev) => [...prev, data.todo]);
                alert(data.msg)
                // Clear input
                setTitle("");
                setDescription("");
            } else {
                alert(data.msg || "Error creating todo");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="w-full px-4">

            <div className="w-full max-w-full md:max-w-2xl mx-auto p-6 bg-white border border-gray-200 rounded-2xl shadow-lg hover:shadow-xl transition-shadow dark:bg-gray-800 dark:border-gray-700">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4 text-center">
                    Create a New Todo
                </h2>

                <div className="flex flex-col gap-4">
                    <input
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
                        placeholder="Enter title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <textarea
                        required
                        rows="3"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 resize-none"
                        placeholder="Enter description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    <button
                        onClick={handleCreateTodo}
                        className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-medium py-2.5 rounded-lg shadow-md hover:from-blue-600 hover:to-indigo-600 focus:ring-2 focus:ring-blue-300 transition-all"
                    >
                        ➕ Add Todo
                    </button>
                </div>



            </div>

        </div>

    );
}
