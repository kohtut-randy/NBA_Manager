import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { logout } from "../../store/authSlice";
import { useRouter } from "next/router";

const AuthStatus = () => {
  const { isAuthenticated, username } = useSelector(
    (state: RootState) => state.auth
  );
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

  if (!isAuthenticated) return null;

  return (
    <div className="flex items-center space-x-4">
      <span className="text-black">Welcome, {username}</span>
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
      >
        Logout
      </button>
    </div>
  );
};

export default AuthStatus;
