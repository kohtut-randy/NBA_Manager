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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teams.map((team) => (
          <div key={team.id} className="card">
            <h3 className="text-xl text-blue-800 font-bold mb-1">
              {team.name}
            </h3>
            <p className="text-gray-700 mb-1">
              Players: <span className="font-semibold">{team.playerCount}</span>
            </p>
            <p className="text-gray-700 mb-1">
              Region: <span className="font-semibold">{team.region}</span>
            </p>
            <p className="text-gray-700 mb-2">
              Country: <span className="font-semibold">{team.country}</span>
            </p>

            <div className="mt-3 flex flex-wrap gap-2">
              <button
                onClick={() => dispatch(selectTeam(team.id))}
                className="btn-primary"
              >
                View Players
              </button>
              <button
                onClick={() => handleEdit(team)}
                className="btn-primary bg-yellow-400 hover:bg-yellow-500 text-black"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(team.id)}
                className="btn-danger"
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
