import { useState } from "react";
import ConfirmModal from "./confirmModal";

export default function TodoCard({ todo, onToggleDone, onDelete }) {
  const [modalType, setModalType] = useState(null);

  const handleConfirm = () => {
    if (modalType === "done") onToggleDone(todo.id);
    if (modalType === "delete") onDelete(todo.id);
    setModalType(null);
  };

  return (
    <>
      <div
        className={`p-5 rounded-xl grid transition-all ${
          todo.is_done
            ? 'bg-[#0a192f] opacity-75 shadow-[inset_3px_3px_6px_#09152a,inset_-3px_-3px_6px_#0b1d34]'
            : 'bg-gradient-to-br from-[#0a192f] to-[#112240] shadow-[5px_5px_15px_#09152a,-5px_-5px_15px_#0b1d34]'
        }`}
      >
        <div className="flex justify-between items-start">
          <div className="flex items-start">
            <div className={`w-5 h-5 mt-1 mr-3 rounded-full flex-shrink-0 ${
              todo.is_done
                ? 'bg-[#64ffda] shadow-[inset_1px_1px_3px_#57e6c4,inset_-1px_-1px_3px_#71fff0]'
                : 'bg-[#0a192f] shadow-[inset_1px_1px_3px_#09152a,inset_-1px_-1px_3px_#0b1d34]'
            }`}>
              {todo.is_done && (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#0a192f]" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            <div>
              <h3 className={`font-medium text-lg ${todo.is_done ? 'text-gray-500 line-through' : 'text-gray-200'}`}>
                {todo.title}
              </h3>
              {todo.description && (
                <p className={`text-sm mt-1 ${todo.is_done ? 'text-gray-600' : 'text-gray-400'}`}>
                  {todo.description}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-3 ml-4">
            {!todo.is_done && (
              <button
                onClick={() => setModalType("done")}
                className="px-4 py-2 rounded-lg bg-[#0a192f] text-[#64ffda] font-medium shadow-[3px_3px_6px_#09152a,-3px_-3px_6px_#0b1d34] hover:shadow-[1px_1px_3px_#09152a,-1px_-1px_3px_#0b1d34] transition-all"
              >
                Selesai
              </button>
            )}
            <button
              onClick={() => setModalType("delete")}
              className="px-4 py-2 rounded-lg bg-[#0a192f] text-red-400 font-medium shadow-[3px_3px_6px_#09152a,-3px_-3px_6px_#0b1d34] hover:shadow-[1px_1px_3px_#09152a,-1px_-1px_3px_#0b1d34] transition-all"
            >
              Hapus
            </button>
          </div>
        </div>
      </div>

      <ConfirmModal
        show={modalType !== null}
        title={modalType === "done" ? "Tandai sebagai selesai?" : "Yakin ingin hapus?"}
        message={
          modalType === "done"
            ? `Tugas "${todo.title}" akan ditandai selesai.`
            : `Tugas "${todo.title}" akan dihapus secara permanen.`
        }
        onCancel={() => setModalType(null)}
        onConfirm={handleConfirm}
      />
    </>
  );
}
