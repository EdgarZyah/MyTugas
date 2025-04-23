import Navbar from "./components/navBar";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a192f] to-[#112240]">
      <Navbar />
      <div className="flex flex-col items-center justify-center text-center py-24 px-6">
        {/* Neumorphic Card Container */}
        <div className="w-full max-w-3xl p-10 rounded-3xl bg-gradient-to-br from-[#0a192f] to-[#112240] shadow-[20px_20px_60px_#09152a,-20px_-20px_60px_#0b1d34]">
          {/* Neumorphic Icon */}
          <div class="mx-auto w-20 h-20 mb-6 bg-gradient-to-br from-[#0a192f] to-[#112240] flex items-center justify-center shadow-[5px_5px_15px_#09152a,-5px_-5px_15px_#0b1d34]">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/6/67/Microsoft_To-Do_icon.png"
              alt="Microsoft To-Do Icon"
              class="w-fit h-fit object-cover"
            />
          </div>

          <h1 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300 tracking-tight">
            Selamat datang di MyTugas
          </h1>

          <p className="text-lg text-gray-300 max-w-xl mx-auto mb-10">
            Aplikasi manajemen tugas sederhana untuk membantu kamu menyelesaikan
            tugas harian dengan lebih produktif.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/login">
              <button className="px-8 py-3 rounded-xl bg-gradient-to-r from-[#64ffda] to-[#5cebcb] text-[#0a192f] font-medium transition-all hover:shadow-[inset_3px_3px_6px_#57e6c4,inset_-3px_-3px_6px_#71fff0] focus:outline-none">
                Login
              </button>
            </Link>

            <Link href="/register">
              <button className="px-8 py-3 rounded-xl bg-gradient-to-br from-[#0a192f] to-[#112240] text-gray-300 font-medium shadow-[5px_5px_10px_#09152a,-5px_-5px_10px_#0b1d34] transition-all hover:shadow-[3px_3px_6px_#09152a,-3px_-3px_6px_#0b1d34] hover:text-[#64ffda] focus:shadow-[inset_5px_5px_10px_#09152a,inset_-5px_-5px_10px_#0b1d34]">
                Register
              </button>
            </Link>
          </div>
        </div>

        {/* Neumorphic Features Section */}
        <div className="w-full max-w-3xl mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-[#0a192f] to-[#112240] shadow-[5px_5px_15px_#09152a,-5px_-5px_15px_#0b1d34]">
            <div className="w-12 h-12 mb-4 rounded-lg bg-gradient-to-br from-[#0a192f] to-[#112240] flex items-center justify-center shadow-[3px_3px_6px_#09152a,-3px_-3px_6px_#0b1d34]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-[#64ffda]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="font-medium text-lg mb-2 text-gray-200">
              Mudah Digunakan
            </h3>
            <p className="text-gray-400">
              Antarmuka sederhana untuk manajemen tugas yang efisien
            </p>
          </div>

          {/* Feature 2 */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-[#0a192f] to-[#112240] shadow-[5px_5px_15px_#09152a,-5px_-5px_15px_#0b1d34]">
            <div className="w-12 h-12 mb-4 rounded-lg bg-gradient-to-br from-[#0a192f] to-[#112240] flex items-center justify-center shadow-[3px_3px_6px_#09152a,-3px_-3px_6px_#0b1d34]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-[#64ffda]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="font-medium text-lg mb-2 text-gray-200">
              Pengingat
            </h3>
            <p className="text-gray-400">
              Tetap ingat tenggat waktu dengan fitur pengingat
            </p>
          </div>

          {/* Feature 3 */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-[#0a192f] to-[#112240] shadow-[5px_5px_15px_#09152a,-5px_-5px_15px_#0b1d34]">
            <div className="w-12 h-12 mb-4 rounded-lg bg-gradient-to-br from-[#0a192f] to-[#112240] flex items-center justify-center shadow-[3px_3px_6px_#09152a,-3px_-3px_6px_#0b1d34]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-[#64ffda]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h3 className="font-medium text-lg mb-2 text-gray-200">
              Produktivitas
            </h3>
            <p className="text-gray-400">
              Tingkatkan produktivitas dengan pelacakan tugas
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
