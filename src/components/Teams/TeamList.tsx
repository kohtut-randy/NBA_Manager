import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { deleteTeam, selectTeam } from "../../store/teamSlice";
import { useState } from "react";
import TeamFormModal from "./TeamFormModal";

const TeamList = () => {
  const { teams } = useSelector((state: RootState) => state.teams);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTeam, setEditingTeam] = useState<Team | null>(null);

  interface Team {
    id: string;
    name: string;
    playerCount: number;
    region: string;
    country: string;
  }

  const handleEdit = (team: Team) => {
    setEditingTeam(team);
    setIsModalOpen(true);
  };

  const handleDelete = (teamId: string): void => {
    if (confirm("Are you sure you want to delete this team?")) {
      dispatch(deleteTeam(teamId));
    }
  };

  const handleCreate = () => {
    setEditingTeam(null);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Your Teams</h2>
        <button
          onClick={handleCreate}
          className="bg-blue-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
        >
          Create Team
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {teams.map((team) => (
          <div key={team.id} className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-lg text-black font-semibold">{team.name}</h3>
            <p className="text-black">Players: {team.playerCount}</p>
            <p className="text-black">Region: {team.region}</p>
            <p className="text-black">Country: {team.country}</p>

            <div className="mt-3 space-x-2">
              <button
                onClick={() => dispatch(selectTeam(team.id))}
                className="bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded"
              >
                View Players
              </button>
              <button
                onClick={() => handleEdit(team)}
                className="bg-yellow-500 hover:bg-yellow-700 text-white px-3 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(team.id)}
                className="bg-red-500 hover:bg-red-700 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <TeamFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialData={editingTeam}
      />
    </div>
  );
};

export default TeamList;
