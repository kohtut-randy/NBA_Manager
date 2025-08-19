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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md border border-gray-200">
        <h2 className="text-2xl font-bold mb-6 text-black">
          {initialData ? "Edit Team" : "Create Team"}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-gray-700 mb-2">Team Name</label>
            <input
              {...register("name")}
              className="w-full px-3 py-2 border rounded text-black focus:ring-2 focus:ring-blue-400"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Region</label>
            <input
              {...register("region")}
              className="w-full px-3 py-2 border rounded text-black focus:ring-2 focus:ring-blue-400"
            />
            {errors.region && (
              <p className="text-red-500 text-sm mt-1">
                {errors.region.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Country</label>
            <input
              {...register("country")}
              className="w-full px-3 py-2 border rounded text-black focus:ring-2 focus:ring-blue-400"
            />
            {errors.country && (
              <p className="text-red-500 text-sm mt-1">
                {errors.country.message}
              </p>
            )}
          </div>

          <div className="flex justify-end space-x-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded font-semibold"
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
