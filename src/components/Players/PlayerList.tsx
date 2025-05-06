import { useState, useEffect } from "react";
import { Player } from "../../store/teamSlice";
import PlayerCard from "./PlayerCard";
import api from "@/api";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
// import PlayerCard from "./PlayerCard";

const PlayerList = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchPlayers = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const response = await api.nba.getPlayers();
      const newPlayers = response.data;

      setPlayers((prev) => [...prev, ...newPlayers]);
      // Update hasMore based on whether we got a full page of results
      setHasMore(newPlayers.length > 0);
    } catch (error) {
      console.error("Error fetching players:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlayers();
  }, [page]);
  // async function fetchPlayers() {
  //   const players = await api.nba.getPlayers();
  //   console.log("Fetched players:", players);
  //   const newPlayers = players.data;
  // }
  // useEffect(() => {
  //   fetchPlayers();
  // }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight - 100 &&
        !loading &&
        hasMore
      ) {
        setPage((prev) => prev + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore]);
  const { teams } = useSelector((state: RootState) => state.teams);

  // Get all player IDs that are already in teams
  const playersInTeams = teams.flatMap(
    (team) => team.players?.map((player) => player.id) || []
  );

  // Filter out players that are already in teams
  const availablePlayers = players.filter(
    (player) => !playersInTeams.includes(player.id)
  );
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">NBA Players</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {availablePlayers.map((player, index) => (
          <PlayerCard key={`${player.id}-${index}`} player={player} />
        ))}
      </div>
      {loading && (
        <div className="text-center py-4">Loading more players...</div>
      )}
    </div>
  );
};

export default PlayerList;
