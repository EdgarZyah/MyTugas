import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/auth/login", {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      setMessage("Login berhasil!");
      router.push("/dashboard");
    } catch (err) {
      setMessage(err.response?.data?.error || "Terjadi kesalahan");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a192f] to-[#112240] flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md p-8 rounded-3xl bg-gradient-to-br from-[#0a192f] to-[#112240] shadow-[20px_20px_60px_#09152a,-20px_-20px_60px_#0b1d34]">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">
            Login ke MyTugas
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="rounded-xl p-1 shadow-[inset_3px_3px_6px_#09152a,inset_-3px_-3px_6px_#0b1d34]">
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 rounded-xl bg-transparent text-gray-300 focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="rounded-xl p-1 shadow-[inset_3px_3px_6px_#09152a,inset_-3px_-3px_6px_#0b1d34]">
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
            className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-[#64ffda] to-[#5cebcb] text-[#0a192f] font-medium hover:shadow-[inset_3px_3px_6px_#57e6c4,inset_-3px_-3px_6px_#71fff0]"
          >
            Login
          </button>
        </form>
        {message && (
          <p className="mt-4 text-center text-sm text-[#64ffda]">{message}</p>
        )}
        <p className="mt-4 text-sm text-center text-gray-400">
          Belum punya akun?{" "}
          <a href="/register" className="text-[#64ffda] hover:underline">
            Daftar di sini
          </a>
        </p>
      </div>
    </div>
  );
}
