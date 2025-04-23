import { useRouter } from "next/router";
import { useState } from "react";

export default function Sidebar({ onSelect, activeView }) {
  const router = useRouter();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const confirmLogout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  const handleHome = () => {
    router.push("/");
  };

  return (
    <>
      <div className="w-64 h-screen bg-gradient-to-b from-[#0a192f] to-[#112240] text-gray-300 flex flex-col p-6 shadow-[8px_0px_24px_#09152a]">
        <div className="w-full mb-8 flex-row space-y-5">
          <div className="flex justify-center">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/6/67/Microsoft_To-Do_icon.png"
              alt="MyTugas Logo"
              className="w-min max-h-[40px] object-contain"
            />
          </div>
          <div className="flex justify-center text-2xl text-gray">
            <h1>Dashboard</h1>
          </div>
        </div>
        <div className="space-y-3">
          <button
            onClick={handleHome}
            className="w-full text-left px-4 py-3 rounded-xl flex items-center bg-[#0a192f] text-gray-300 shadow-[3px_3px_6px_#09152a,-3px_-3px_6px_#0b1d34] hover:text-[#64ffda] transition-all"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Home
          </button>

          <button
            onClick={() => onSelect("add")}
            className={`w-full text-left px-4 py-3 rounded-xl flex items-center transition-all ${
              activeView === "add"
                ? "bg-[#112240] text-[#64ffda] shadow-[inset_3px_3px_6px_#09152a,inset_-3px_-3px_6px_#0b1d34]"
                : "bg-[#0a192f] text-gray-300 shadow-[3px_3px_6px_#09152a,-3px_-3px_6px_#0b1d34] hover:text-[#64ffda]"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            Tambah Tugas
          </button>

          <button
            onClick={() => onSelect("list")}
            className={`w-full text-left px-4 py-3 rounded-xl flex items-center transition-all ${
              activeView === "list"
                ? "bg-[#112240] text-[#64ffda] shadow-[inset_3px_3px_6px_#09152a,inset_-3px_-3px_6px_#0b1d34]"
                : "bg-[#0a192f] text-gray-300 shadow-[3px_3px_6px_#09152a,-3px_-3px_6px_#0b1d34] hover:text-[#64ffda]"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            List Tugas
          </button>
        </div>

        <div className="mt-auto">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent mb-6"></div>

          <button
            onClick={() => setShowLogoutModal(true)}
            className="w-full text-left px-4 py-3 rounded-xl flex items-center bg-gradient-to-r from-[#ff4d4d] to-[#f03e3e] text-white font-medium shadow-[3px_3px_6px_#09152a,-3px_-3px_6px_#0b1d34] hover:shadow-[inset_3px_3px_6px_#e03131,inset_-3px_-3px_6px_#ff6b6b] transition-all"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            Logout
          </button>
        </div>
      </div>

      {/* Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-[#0a192f] p-6 rounded-xl shadow-xl text-white w-full max-w-sm mx-auto animate-fade-in">
            <h2 className="text-lg font-bold mb-4">Konfirmasi Logout</h2>
            <p className="mb-6 text-sm text-gray-400">
              Apakah kamu yakin ingin keluar dari akun ini?
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 rounded-md bg-gray-700 hover:bg-gray-600 transition"
              >
                Batal
              </button>
              <button
                onClick={confirmLogout}
                className="px-4 py-2 rounded-md bg-red-600 hover:bg-red-700 transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
