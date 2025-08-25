import CreateTodo from "../components/CreateTodo"
import { TodoRenderer } from "../components/TodoRenderer"
export default function Dashboard() {
  return <>
    <div className="w-full flex flex-col items-stretch">
      <div className="w-full">  <TodoRenderer /></div>
      <div className="w-full flex justify-center mt-4"> <CreateTodo /></div>
    </div>

  </>
}
