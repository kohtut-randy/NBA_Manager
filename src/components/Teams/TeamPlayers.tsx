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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {selectedTeam.players?.map((player, index) => (
            <div
              key={`${player.id}-${index}`}
              className="bg-white rounded-lg shadow-md p-4"
            >
              <h3 className="text-lg font-semibold text-black">
                {player.first_name} {player.last_name}
              </h3>
              {player.position && (
                <p className="text-gray-600">Position: {player.position}</p>
              )}
              <button
                onClick={() => {
                  console.log("Dispatching removePlayerFromTeam:", {
                    teamId: selectedTeam.id,
                    playerId: player.id,
                  });
                  dispatch(
                    removePlayerFromTeam({
                      teamId: selectedTeam.id,
                      playerId: player.id,
                    })
                  );
                }}
                className="mt-2 bg-red-500 hover:bg-red-700 text-white px-3 py-1 rounded"
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
