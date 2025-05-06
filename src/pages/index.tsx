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
    <div className="container mx-auto p-4 bg-cyan-800 overflow-hidden">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">NBA Team Manager</h1>
        <AuthStatus />
      </header>

      <main className="space-y-8">
        <TeamList />
        <TeamPlayers />
        <PlayerList />
      </main>
    </div>
  );
};

export default HomePage;
