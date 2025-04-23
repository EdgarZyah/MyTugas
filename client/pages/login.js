import { useEffect } from "react";
import { useRouter } from "next/router";
import AuthForm from "./components/authForm";

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/dashboard");
    }
  }, []);

  return <AuthForm mode="login" />;
}
