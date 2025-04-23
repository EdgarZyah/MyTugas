import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateTodo } from "../../redux/slices/todoSlices";

export default function EditTodoForm({ todo, onClose }) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description || "");
  const [deadline, setDeadline] = useState(todo.deadline?.split("T")[0] || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updateTodo(todo.id, {
        title,
        description,
        deadline,
      })
    );
    onClose();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 rounded-xl bg-[#0a192f] shadow-[3px_3px_6px_#09152a,-3px_-3px_6px_#0b1d34]"
    >
      <h2 className="text-xl font-semibold text-gray-200">Edit Todo</h2>

      <div>
        <label className="block text-sm text-gray-400">Judul</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 rounded-md bg-[#112240] text-gray-200"
          required
        />
      </div>

      <div>
        <label className="block text-sm text-gray-400">Deskripsi</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-3 py-2 rounded-md bg-[#112240] text-gray-200"
        />
      </div>

      <div>
        <label className="block text-sm text-gray-400">Deadline</label>
        <input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          className="..."
        />
      </div>

      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 bg-gray-600 text-white rounded-lg"
        >
          Batal
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-[#64ffda] text-[#0a192f] font-semibold rounded-lg"
        >
          Simpan
        </button>
      </div>
    </form>
  );
}
