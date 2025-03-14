/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth.store";
import { validationLogin } from "../utils/validators";

export function Login() {
  // const [ logged, setLogged ] = useState(false);
  const navigate = useNavigate();

  const { login, isLogged } = useAuthStore();

  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (isLogged) {
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  }, [isLogged, navigate]);

  const onSubmit = handleSubmit(async (data) => {
    setMessage(null);

    try {
      await login(data);
      setMessageType("success");
      setMessage("Usuario logueado con exito...");
      reset();
      setTimeout(() => {
        navigate("/");
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
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          Iniciar Sesión
        </h2>
        <form className="space-y-8" onSubmit={onSubmit}>
          <div>
            <label className="block text-gray-600">Correo Electrónico</label>
            <input
              type="email"
              placeholder="Ingresa tu email"
              {...register("email", validationLogin.email)}
              className="w-full mt-1 px-4 py-2 bg-gray-100/60 border-b-2 border-gray-500 focus:outline-none focus:border-blue-500"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-gray-600">Contraseña</label>
            <input
              type="password"
              placeholder="Ingresa tu contraseña"
              {...register("password", validationLogin.password)}
              className="w-full mt-1 px-4 py-2 bg-gray-100/60 border-b-2 border-gray-500 focus:outline-none focus:border-blue-500"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          {message && showMessage(messageType!)}
          <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition hover:cursor-pointer">
            Iniciar Sesión
          </button>
        </form>
        <div className="w-full mt-4 flex justify-center">
          <span className="text-sm text-center text-gray-500 mr-2">
            ¿No tenés cuenta?
          </span>
          <a href="/register" className="text-sm text-blue-500 hover:underline">
            Regístrate
          </a>
        </div>
      </div>
    </div>
  );
}
