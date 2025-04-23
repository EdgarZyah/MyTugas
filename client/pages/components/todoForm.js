import { useState } from "react";
import axios from "axios";
import ConfirmModal from "./confirmModal";

export default function TodoForm({ onTodoAdded }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [error, setError] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowConfirm(true);
  };

  const handleConfirmSubmit = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("Token tidak ditemukan. Silakan login kembali.");
      setShowConfirm(false);
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/todos",
        { title, description, deadline },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      onTodoAdded && onTodoAdded(res.data);
      setTitle("");
      setDescription("");
      setDeadline("");
      setError(null);
    } catch (err) {
      console.error("Error creating todo:", err.response?.data || err.message);
      setError(err.response?.data?.error || "Gagal menambahkan todo.");
    } finally {
      setShowConfirm(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-[#0a192f] p-8 rounded-2xl shadow-xl">
      <h2 className="text-2xl font-semibold text-white mb-6">
        Tambah Tugas Baru
      </h2>
      {error && (
        <div className="mb-4 p-4 bg-red-500 text-white rounded-xl">{error}</div>
      )}
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
        <div className="col-span-2">
          <label className="block text-gray-300 mb-2">Judul Tugas</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={25}
            required
            placeholder="Masukkan judul tugas (max 25 karakter)"
            className="w-full p-4 rounded-xl bg-[#112240] text-gray-300 focus:outline-none border border-gray-700"
          />
        </div>
        <div className="col-span-2">
          <label className="block text-gray-300 mb-2">Deskripsi</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full p-4 rounded-xl bg-[#112240] text-gray-300 focus:outline-none border border-gray-700 resize-none"
            placeholder="Deskripsi tugas (opsional)"
          />
        </div>
        <div className="col-span-1">
          <label className="block text-gray-300 mb-2">Tenggat Waktu</label>
          <input
            type="date"
            value={deadline}
            required
            onChange={(e) => setDeadline(e.target.value)}
            className="w-full p-3 rounded-xl bg-[#112240] text-gray-300 border border-gray-700 focus:outline-none"
          />
        </div>
        <div className="col-span-1 flex items-end">
          <button
            type="submit"
            className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-[#64ffda] to-[#5cebcb] text-[#0a192f] font-semibold hover:shadow-lg transition-all"
          >
            Tambah Tugas
          </button>
        </div>
      </form>

      {/* Confirmation Modal */}
      <ConfirmModal
        show={showConfirm}
        title="Konfirmasi Tambah Tugas"
        message={`Tugas "${title}" akan ditambahkan. Lanjutkan?`}
        onCancel={() => setShowConfirm(false)}
        onConfirm={handleConfirmSubmit}
      />
    </div>
  );
}