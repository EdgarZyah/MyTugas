import { useState } from "react";
import EditTodoForm from "./editTodoForm";

export default function EditTodoModal({ todo }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 rounded-lg bg-[#0a192f] text-yellow-400 font-medium shadow-[3px_3px_6px_#09152a,-3px_-3px_6px_#0b1d34] hover:shadow-[1px_1px_3px_#09152a,-1px_-1px_3px_#0b1d34] transition-all"
      >
        Edit
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-[#0a192f] p-6 rounded-xl shadow-lg max-w-md w-full relative">
            <EditTodoForm todo={todo} onClose={() => setIsOpen(false)} />
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-red-400"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
}
