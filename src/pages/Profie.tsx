import { useState } from "react";
import { useAuthStore } from "../store/auth.store";
import { Edit } from "lucide-react";
import { useForm } from "react-hook-form";
import { validationUpdateUser } from "../utils/validators";
import { BackButton } from "../components/shared/BackButton";
import { useNavigate } from "react-router-dom";

const formatDate = (dateString: string | undefined) => {
  if (!dateString) return "";
  const [day, month, year] = dateString.split("/").map(Number);
  return new Date(year, month - 1, day).toISOString().split("T")[0];
};

export function Profile() {
  const navigate = useNavigate();

  const { user } = useAuthStore();

  const [isEditing, setIsEditing] = useState(false);

  const { update } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: user?.name,
      lastname: user?.lastname,
      email: user?.email,
      birthday: user?.birthday ? formatDate(user.birthday) : "",
      dni: user?.dni,
    },
  });

  const handleCancelClick = () => {
    setIsEditing(false);
    reset();
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      const formattedDate = data.birthday!.split("-").reverse().join("/");
      data.birthday = formattedDate;
      if (user?.id) {
        await update(data, user.id);
      }
      setIsEditing(false);
    } catch (error: unknown) {
      console.log(error);
    }
  });

  return (
    <div className="container mx-auto px-4 sm:px-6 md:px-8 py-8 flex-1 flex flex-col">
      <BackButton onClick={() => navigate("/")} />

      <h1 className="text-3xl font-bold text-gray-700 mb-6 text-center">
        Tus datos
      </h1>

      <div className="w-full max-w-3xl p-8 mx-auto bg-[#0093DB] rounded-lg shadow-md overflow-hidden border border-gray-200 mb-8">
        <div className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-white flex items-center justify-center text-lg font-medium text-gray-600 overflow-hidden">
            {user?.name.charAt(0)}
          </div>

          <div className="text-left flex-1">
            <h2 className="text-xl font-bold text-white">
              {user?.name} {user?.lastname}
            </h2>
            <p className="text-sm text-white opacity-80">{user?.email}</p>
          </div>

          <div className="mt-2 sm:mt-0 w-full sm:w-auto">
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="w-full sm:w-auto px-4 py-2 bg-white text-[#0093DB] rounded-md font-medium flex items-center justify-center sm:justify-start gap-2 hover:bg-gray-100 transition-colors hover:cursor-pointer"
              >
                <Edit size={20} />
                Editar
              </button>
            ) : (
              <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                <button
                  onClick={handleCancelClick}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md font-medium hover:bg-gray-300 transition-colors w-full sm:w-auto hover:cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  onClick={onSubmit}
                  className="px-4 py-2 bg-green-500 text-white rounded-md font-medium hover:bg-green-600 transition-colors w-full sm:w-auto hover:cursor-pointer"
                >
                  Guardar
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="h-px bg-white opacity-30"></div>
        <div className="p-4 sm:p-6">
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="text-left">
                <p className="text-md font-medium text-white">Nombre</p>
                {isEditing ? (
                  <>
                    <input
                      type="text"
                      {...register("name", validationUpdateUser.name)}
                      className="mt-1 w-full px-3 py-2 bg-white text-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.name && (
                      <p className="text-white text-xs mt-1">
                        {errors.name.message}
                      </p>
                    )}
                  </>
                ) : (
                  <p className="text-md text-white opacity-90">{user?.name}</p>
                )}
              </div>
              <div className="text-left">
                <p className="text-md font-medium text-white">Apellido</p>
                {isEditing ? (
                  <>
                    <input
                      type="text"
                      {...register("lastname", validationUpdateUser.lastname)}
                      className="mt-1 w-full px-3 py-2 bg-white text-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.lastname && (
                      <p className="text-white text-xs mt-1">
                        {errors.lastname.message}
                      </p>
                    )}
                  </>
                ) : (
                  <p className="text-md text-white opacity-90">
                    {user?.lastname}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="text-left">
                <p className="text-md font-medium text-white">Email</p>
                {isEditing ? (
                  <p className="mt-1 w-full px-3 py-2 bg-[#0093DB] text-white">
                    {user?.email}
                  </p>
                ) : (
                  <p className="text-md text-white opacity-90">{user?.email}</p>
                )}
              </div>

              <div className="text-left">
                <p className="text-md font-medium text-white">
                  Fecha de Cumpleaños
                </p>
                {isEditing ? (
                  <>
                    <input
                      type="date"
                      {...register("birthday", validationUpdateUser.birthday)}
                      className="mt-1 w-full px-3 py-2 bg-white text-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 hover:cursor-text"
                    />
                    {errors.birthday && (
                      <p className="text-white text-xs mt-1">
                        {errors.birthday.message}
                      </p>
                    )}
                  </>
                ) : (
                  <p className="text-md text-white opacity-90">
                    {user?.birthday}
                  </p>
                )}
              </div>
            </div>

            <div className="text-left">
              <p className="text-md font-medium text-white">
                Número de Documento
              </p>
              {isEditing ? (
                <>
                  <input
                    type="text"
                    {...register("dni", validationUpdateUser.dni)}
                    className="mt-1 w-full px-3 py-2 bg-white text-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.dni && (
                    <p className="text-white text-xs mt-1">
                      {errors.dni.message}
                    </p>
                  )}
                </>
              ) : (
                <p className="text-md text-white opacity-90">{user?.dni}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
