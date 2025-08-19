import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { removePlayerFromTeam } from "../../store/teamSlice";

const TeamPlayers = () => {
  const { selectedTeam } = useSelector((state: RootState) => state.teams);

  console.log("Selected team:", selectedTeam);
  const dispatch = useDispatch();

  if (!selectedTeam) return null;
  return (
    <div className="mt-6">
      <h2 className="text-2xl font-bold mb-4">
        Players in {selectedTeam.name}
      </h2>

      {selectedTeam.players?.length === 0 ? (
        <p>No players in this team yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {selectedTeam.players?.map((player, index) => (
            <div
              key={`${player.id}-${index}`}
              className="card flex flex-col items-start"
            >
              <h3 className="text-xl font-bold text-blue-800 mb-1">
                {player.first_name} {player.last_name}
              </h3>
              {player.position && (
                <p className="text-gray-500 mb-2">
                  Position:{" "}
                  <span className="font-semibold">{player.position}</span>
                </p>
              )}
              <button
                onClick={() => {
                  dispatch(
                    removePlayerFromTeam({
                      teamId: selectedTeam.id,
                      playerId: player.id,
                    })
                  );
                }}
                className="btn-danger mt-2"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TeamPlayers;
