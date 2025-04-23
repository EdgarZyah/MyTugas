import { useEffect } from "react";
import { useRouter } from "next/router";
import LoginForm from "./components/loginForm";

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/dashboard");
    }
  }, []);

  return <LoginForm />;
}
