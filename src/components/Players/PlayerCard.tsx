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
    <div className="card flex flex-col items-start">
      <h3 className="text-xl font-bold text-blue-800 mb-1">
        {player.first_name} {player.last_name}
      </h3>
      {player.position && (
        <p className="text-gray-500 mb-1">
          Position: <span className="font-semibold">{player.position}</span>
        </p>
      )}
      {player.team && (
        <p className="text-gray-500 mb-2">
          Team: <span className="font-semibold">{player.team.full_name}</span>
        </p>
      )}

      <button
        onClick={() => setIsModalOpen(true)}
        className="btn-primary mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
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
