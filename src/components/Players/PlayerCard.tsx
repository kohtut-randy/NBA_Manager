import { Player } from "../../store/teamSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { addPlayerToTeam } from "../../store/teamSlice";
import { useState } from "react";
import TeamSelectModal from "../Teams/TeamSelectModal";

const PlayerCard = ({ player }: { player: Player }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { teams } = useSelector((state: RootState) => state.teams);
  const dispatch = useDispatch();

  const handleAddToTeam = (teamId: string) => {
    dispatch(addPlayerToTeam({ teamId, player }));
    setIsModalOpen(false);
  };

  // Check if player is already in any team
  const isPlayerInTeam = teams.some((team) =>
    team.players?.some((p) => p.id === player.id)
  );

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="text-lg text-black font-semibold">
        {player.first_name} {player.last_name}
      </h3>
      {player.position && (
        <p className="text-gray-600">Position: {player.position}</p>
      )}
      {player.team && (
        <p className="text-gray-600">Team: {player.team.full_name}</p>
      )}

      <button
        onClick={() => setIsModalOpen(true)}
        className="mt-2 bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded"
        disabled={teams.length === 0 || isPlayerInTeam}
        title={
          teams.length === 0
            ? "Create a team first"
            : isPlayerInTeam
            ? "Player already in a team"
            : ""
        }
      >
        {isPlayerInTeam ? "Already in Team" : "Add to Team"}
      </button>
      <TeamSelectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelectTeam={handleAddToTeam}
      />
    </div>
  );
};

export default PlayerCard;
