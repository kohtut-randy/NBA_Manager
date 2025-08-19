import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useRouter } from "next/router";
import { useEffect } from "react";
import AuthStatus from "../components/Auth/AuthStatus";
import PlayerList from "../components/Players/PlayerList";
import TeamList from "../components/Teams/TeamList";
import TeamPlayers from "../components/Teams/TeamPlayers";

const HomePage = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen flex flex-col items-center justify-start py-8 px-2">
      <header
        className="w-full max-w-5xl mx-auto flex justify-between items-center mb-10 px-6 py-6 rounded-2xl shadow-lg bg-white/80 backdrop-blur-md border border-gray-200"
        style={{ boxShadow: "0 8px 32px 0 rgba(37,99,235,0.08)" }}
      >
        <h1 className="text-4xl font-extrabold tracking-tight text-blue-700 drop-shadow-sm">
          🏀 NBA Team Manager
        </h1>
        <AuthStatus />
      </header>

      <main className="w-full max-w-5xl space-y-10 px-2">
        <TeamList />
        <TeamPlayers />
        <PlayerList />
      </main>
    </div>
  );
};

export default HomePage;
