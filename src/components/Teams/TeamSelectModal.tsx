import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
interface TeamSelectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTeam: (teamId: string) => void;
}
const TeamSelectModal = ({
  isOpen,
  onClose,
  onSelectTeam,
}: TeamSelectModalProps) => {
  const { teams } = useSelector((state: RootState) => state.teams);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg p-6 w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-4">Select a Team</h2>

        <div className="space-y-2">
          {teams.map((team, index) => (
            <div
              key={`${team.id}-${index}`}
              className="p-3 border rounded hover:bg-gray-100 cursor-pointer text-black"
              onClick={() => {
                onSelectTeam(team.id);
                onClose();
              }}
            >
              {team.name}
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-gray-300 rounded text-black"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default TeamSelectModal;
