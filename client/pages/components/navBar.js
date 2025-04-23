import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-[#0a192f] to-[#112240] shadow-lg px-6 py-4 flex justify-between items-center">
      <div className="flex items-center">
        <div className="w-10 h-10 sm:w-18 sm:h-14 flex-shrink-0">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/6/67/Microsoft_To-Do_icon.png"
            alt="MyTugas Logo"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      
      <div className="flex gap-2 sm:gap-4">
        <Link
          href="/"
          className="relative px-2 sm:px-4 py-2 text-gray-300 hover:text-[#64ffda] font-medium group"
        >
          Home
          <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-[#64ffda] to-[#5cebcb] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
        </Link>
        <Link
          href="/login"
          className="px-2 sm:px-4 py-2 text-gray-300 hover:text-[#64ffda] font-medium group relative"
        >
          Login
          <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-[#64ffda] to-[#5cebcb] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
        </Link>
        <Link
          href="/register"
          className="px-3 sm:px-4 py-2 rounded-lg bg-[#0a192f] text-gray-300 font-medium shadow-[3px_3px_6px_#09152a,-3px_-3px_6px_#0b1d34] transition-all hover:shadow-[inset_3px_3px_6px_#09152a,inset_-3px_-3px_6px_#0b1d34] hover:text-[#64ffda]"
        >
          Register
        </Link>
      </div>
    </nav>
  );
}