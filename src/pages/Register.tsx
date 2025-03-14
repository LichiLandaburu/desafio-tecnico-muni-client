/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuthStore } from "../store/auth.store";
import { validationRegister } from "../utils/validators";

export function Register() {
  const { isLogged, register: registerUser } = useAuthStore();

  const navigate = useNavigate();

  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      lastname: "",
      email: "",
      password: "",
      confirmPassword: "",
      birthday: new Date().toISOString().split("T")[0],
      dni: "",
    },
  });

  useEffect(() => {
    if (isLogged) {
      navigate("/");
    }
  }, [isLogged, navigate]);

  const onSubmit = handleSubmit(async (data) => {
    setMessage(null);

    try {
      const formattedDate = data.birthday.split("-").reverse().join("/");
      data.birthday = formattedDate;
      await registerUser(data);
      setMessageType("success");
      setMessage("Usuario registrado correctamente");
      reset();
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error: any) {
      setMessageType("error");
      setMessage(error.message);
    }
  });

  const showMessage = (type: string) => {
    const textColor = type === "error" ? "text-red-600" : "text-green-600";
    const borderColor =
      type === "error" ? "border-red-400" : "border-green-400";
    const bgColor = type === "error" ? "bg-red-100" : "bg-green-100";

    setTimeout(() => {
      setMessage(null);
    }, 3000);

    return (
      <div
        className={`${bgColor} border ${borderColor} ${textColor} px-4 py-3 rounded relative`}
      >
        <span className="block text-center text-md">{message}</span>
      </div>
    );
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          Crear Cuenta
        </h2>
        <form className="space-y-6" onSubmit={onSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-gray-600">
                Nombre
              </label>
              <input
                type="text"
                placeholder="Nombre..."
                {...register("name", validationRegister.name)}
                className="w-full mt-1 px-4 py-2 bg-gray-100/60 border-b-2 border-gray-500 focus:outline-none focus:border-blue-500"
              />
              {errors.name && (
                <span className="text-red-500 text-xs mt-1">
                  {errors.name.message as string}
                </span>
              )}
            </div>
            <div>
              <label htmlFor="lastname" className="block text-gray-600">
                Apellido
              </label>
              <input
                type="text"
                placeholder="Apellido..."
                {...register("lastname", validationRegister.lastname)}
                className="w-full mt-1 px-4 py-2 bg-gray-100/60 border-b-2 border-gray-500 focus:outline-none focus:border-blue-500"
              />
              {errors.lastname && (
                <span className="text-red-500 text-xs mt-1">
                  {errors.lastname.message as string}
                </span>
              )}
            </div>
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-gray-600">
                Correo electrónico
              </label>
              <input
                type="email"
                placeholder="Email..."
                {...register("email", validationRegister.email)}
                className="w-full mt-1 px-4 py-2 bg-gray-100/60 border-b-2 border-gray-500 focus:outline-none focus:border-blue-500"
              />
              {errors.email && (
                <span className="text-red-500 text-xs mt-1">
                  {errors.email.message as string}
                </span>
              )}
            </div>
            {/* Teléfono */}
            <div>
              <label htmlFor="birthday" className="block text-gray-600">
                Fecha de nacimiento
              </label>
              <input
                type="date"
                {...register("birthday", validationRegister.birthday)}
                max={new Date().toISOString().split("T")[0]}
                className="w-full mt-1 px-4 py-2 bg-gray-100/60 border-b-2 border-gray-500 focus:outline-none focus:border-blue-500"
              />
              {errors.birthday && (
                <span className="text-red-500 text-xs mt-1">
                  {errors.birthday.message as string}
                </span>
              )}
            </div>
            {/* Contraseña */}
            <div>
              <label htmlFor="password" className="block text-gray-600">
                Contraseña
              </label>
              <input
                type="password"
                {...register("password", validationRegister.password)}
                placeholder="Contraseña..."
                className="w-full mt-1 px-4 py-2 bg-gray-100/60 border-b-2 border-gray-500 focus:outline-none focus:border-blue-500"
              />
              {errors.password && (
                <span className="text-red-500 text-xs mt-1">
                  {errors.password.message as string}
                </span>
              )}
            </div>
            {/* Confirmar Contraseña */}
            <div>
              <label htmlFor="confirmPassword" className="block text-gray-600">
                Confirmar Contraseña
              </label>
              <input
                type="password"
                {...register(
                  "confirmPassword",
                  validationRegister.confirmPassword(watch)
                )}
                placeholder="Repetir contraseña..."
                className="w-full mt-1 px-4 py-2 bg-gray-100/60 border-b-2 border-gray-500 focus:outline-none focus:border-blue-500"
              />
              {errors.confirmPassword && (
                <span className="text-red-500 text-xs mt-1">
                  {errors.confirmPassword.message as string}
                </span>
              )}
            </div>

            <div>
              <label htmlFor="dni" className="block text-gray-600">
                Número de Documento
              </label>
              <input
                type="text"
                {...register("dni", validationRegister.dni)}
                placeholder="Nro de documento..."
                className="w-full mt-1 px-4 py-2 bg-gray-100/60 border-b-2 border-gray-500 focus:outline-none focus:border-blue-500"
              />
              {errors.dni && (
                <span className="text-red-500 text-xs mt-1">
                  {errors.dni.message as string}
                </span>
              )}
            </div>
          </div>
          {message && showMessage(messageType!)}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition hover:cursor-pointer"
          >
            Registrarse
          </button>
        </form>
        <div className="w-full mt-4 flex justify-center">
          <span className="text-sm text-center text-gray-500 mr-2">
            ¿Ya tenés cuenta?
          </span>
          <a href="/login" className="text-sm text-blue-500 hover:underline">
            Inicia sesión
          </a>
        </div>
      </div>
    </div>
  );
}
