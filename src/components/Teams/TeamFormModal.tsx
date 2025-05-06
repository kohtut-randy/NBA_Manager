import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { addTeam, updateTeam } from "../../store/teamSlice";

interface Team {
  id: string;
  name: string;
  playerCount: number;
  region: string;
  country: string;
}

interface TeamFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: Team | null; // <- Update this line
}
interface FormData {
  name: string;
  region: string;
  country: string;
}

const schema = yup.object().shape({
  name: yup.string().required("Team name is required"),
  region: yup.string().required("Region is required"),
  country: yup.string().required("Country is required"),
});

const TeamFormModal = ({
  isOpen,
  onClose,
  initialData,
}: TeamFormModalProps) => {
  const { teams } = useSelector((state: RootState) => state.teams);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (initialData) {
      reset({
        name: initialData.name,
        region: initialData.region,
        country: initialData.country,
      });
    } else {
      reset({
        name: "",
        region: "",
        country: "",
      });
    }
  }, [initialData, reset]);

  const onSubmit = (data: FormData) => {
    const isNameUnique = !teams.some(
      (team) =>
        team.name.toLowerCase() === data.name.toLowerCase() &&
        (!initialData || team.id !== initialData.id)
    );

    if (!isNameUnique) {
      alert("Team name must be unique");
      return;
    }

    if (initialData) {
      dispatch(
        updateTeam({
          ...initialData,
          ...data,
        })
      );
    } else {
      dispatch(
        addTeam({
          ...data,
          playerCount: 0,
        })
      );
    }
    reset({
      name: "",
      region: "",
      country: "",
    });

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-black">
          {initialData ? "Edit Team" : "Create Team"}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Team Name</label>
            <input
              {...register("name")}
              className="w-full px-3 py-2 border rounded text-black"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Region</label>
            <input
              {...register("region")}
              className="w-full px-3 py-2 border rounded text-black"
            />
            {errors.region && (
              <p className="text-red-500 text-sm">{errors.region.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Country</label>
            <input
              {...register("country")}
              className="w-full px-3 py-2 border rounded text-black"
            />
            {errors.country && (
              <p className="text-red-500 text-sm">{errors.country.message}</p>
            )}
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              {initialData ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TeamFormModal;
