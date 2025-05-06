import LoginForm from "../components/Auth/LoginForm";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useRouter } from "next/router";
import { useEffect } from "react";

const LoginPage = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <LoginForm />
    </div>
  );
};

export default LoginPage;
