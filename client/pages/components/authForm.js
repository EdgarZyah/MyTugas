import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function AuthForm({ mode }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter(); // Tambahkan useRouter

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = `http://localhost:5000/auth/${mode}`;
      const payload =
        mode === "register"
          ? { username, email, password }
          : { email, password };
      const res = await axios.post(url, payload);
      setMessage(res.data.message || "Berhasil");

      if (mode === "login") {
        localStorage.setItem("token", res.data.token);
        router.push("/dashboard"); // Redirect ke dashboard
      }

      // Optional: Reset form
      setEmail("");
      setUsername("");
      setPassword("");
    } catch (err) {
      setMessage(err.response?.data?.error || "Terjadi kesalahan");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a192f] to-[#112240] flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md p-8 rounded-3xl bg-gradient-to-br from-[#0a192f] to-[#112240] shadow-[20px_20px_60px_#09152a,-20px_-20px_60px_#0b1d34]">
        <div className="mx-auto w-16 h-16 mb-6 rounded-full bg-gradient-to-br from-[#0a192f] to-[#112240] flex items-center justify-center shadow-[5px_5px_15px_#09152a,-5px_-5px_15px_#0b1d34]">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#64ffda]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>

        <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300 tracking-tight text-center">
          {mode === "login" ? "Login ke MyTugas" : "Daftar Akun Baru"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {mode === "register" && (
            <div className="rounded-xl bg-gradient-to-br from-[#0a192f] to-[#112240] shadow-[inset_3px_3px_6px_#09152a,inset_-3px_-3px_6px_#0b1d34] p-1">
              <input
                type="text"
                placeholder="Username"
                className="w-full p-3 rounded-xl bg-transparent text-gray-300 focus:outline-none"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          )}

          <div className="rounded-xl bg-gradient-to-br from-[#0a192f] to-[#112240] shadow-[inset_3px_3px_6px_#09152a,inset_-3px_-3px_6px_#0b1d34] p-1">
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 rounded-xl bg-transparent text-gray-300 focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="rounded-xl bg-gradient-to-br from-[#0a192f] to-[#112240] shadow-[inset_3px_3px_6px_#09152a,inset_-3px_-3px_6px_#0b1d34] p-1">
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 rounded-xl bg-transparent text-gray-300 focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-[#64ffda] to-[#5cebcb] text-[#0a192f] font-medium transition-all hover:shadow-[inset_3px_3px_6px_#57e6c4,inset_-3px_-3px_6px_#71fff0] focus:outline-none"
          >
            {mode === "login" ? "Login" : "Register"}
          </button>
        </form>

        {message && (
          <div className="mt-4 p-3 rounded-xl bg-gradient-to-br from-[#0a192f] to-[#112240] shadow-[inset_2px_2px_5px_#09152a,inset_-2px_-2px_5px_#0b1d34]">
            <p className="text-center text-sm text-[#64ffda]">{message}</p>
          </div>
        )}
      </div>
    </div>
  );
}
