import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Sidebar from "./components/sideBar";
import TodoForm from "./components/todoForm"; // komponen tambah todo
import TodoList from "./components/todoList"; // tampil todo

export default function Dashboard() {
  const router = useRouter();
  const [activeView, setActiveView] = useState("list");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) router.push("/login");
  }, []);

  return (
    <div className="flex min-h-screen">
      <Sidebar onSelect={setActiveView} />
      <div className="flex-1 p-6">
        {activeView === "add" && <TodoForm />}
        {activeView === "list" && <TodoList />}
      </div>
    </div>
  );
}
