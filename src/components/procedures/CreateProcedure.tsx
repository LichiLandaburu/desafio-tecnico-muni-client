import { useState } from "react";
import { useForm } from "react-hook-form";
import { validationCreateProcedure } from "../../utils/validators";
import { FilePlus } from "lucide-react";
import { useProcedureStore } from "../../store/procedure.store";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/auth.store";
import { BackButton } from "../shared/BackButton";

export function CreateProcedure() {
  const { createProcedure, uploadDocument } = useProcedureStore();
  const { user, token } = useAuthStore();

  const navigate = useNavigate();

  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<string | null>(null);

  const [fileName, setFileName] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: user!.name,
      lastname: user!.lastname,
      email: user!.email,
      dni: user!.dni,
      city: "",
      province: "",
      address: "",
      postal_code: 0,
      telephone: "",
      detailed_document: null as FileList | null,
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    setMessage(null);

    try {
      const newProcedure = await createProcedure({
        name: data.name,
        lastname: data.lastname,
        email: data.email,
        dni: data.dni,
        city: data.city,
        province: data.province,
        address: data.address,
        postal_code: data.postal_code,
        telephone: data.telephone,
        id_user: user!.id,
      });

      if (data.detailed_document && data.detailed_document[0]) {
        await uploadDocument(newProcedure.id, token, data.detailed_document[0]);
      }
      reset();
      setMessageType("success");
      setMessage("Permiso solicitado exitosamente.");
      setFileName(null);
      setTimeout(() => {
        navigate(`/procedures/user/${user?.id}`);
      }, 2000);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    <div className="container mx-auto px-4 sm:px-6 md:px-8 flex flex-col py-4">
      <BackButton />

      <h1 className="text-2xl font-bold text-gray-700 mb-6 text-center">
        Solicitar permiso para evento deportivo
      </h1>

      <div className="max-w-4xl mx-auto w-full bg-white rounded-xl shadow-md overflow-hidden">
        <div className="bg-blue-500 py-3 px-6">
          <h2 className="text-white font-semibold text-lg">
            Completar tus datos
          </h2>
          <p className="text-blue-100 text-md">
            Todos los campos marcados con * son obligatorios
          </p>
        </div>

        <form onSubmit={onSubmit} className="p-6 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-5">
            <div className="space-y-1">
              <label
                htmlFor="name"
                className="block text-gray-600 text-md font-medium"
              >
                Nombre <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                placeholder="Nombre..."
                {...register("name", validationCreateProcedure.name)}
                className="w-full px-4 py-2.5 bg-gray-50 border-b-2 border-gray-300 rounded-t-md focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
              />
              {errors.name && (
                <span className="text-red-500 text-xs block">
                  {errors.name.message as string}
                </span>
              )}
            </div>

            <div className="space-y-1">
              <label
                htmlFor="lastname"
                className="block text-gray-600 text-md font-medium"
              >
                Apellido <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="lastname"
                placeholder="Apellido..."
                {...register("lastname", validationCreateProcedure.lastname)}
                className="w-full px-4 py-2.5 bg-gray-50 border-b-2 border-gray-300 rounded-t-md focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
              />
              {errors.lastname && (
                <span className="text-red-500 text-xs block">
                  {errors.lastname.message as string}
                </span>
              )}
            </div>

            <div className="space-y-1">
              <label
                htmlFor="email"
                className="block text-gray-600 text-md font-medium"
              >
                Correo electrónico <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                placeholder="Email..."
                {...register("email", validationCreateProcedure.email)}
                className="w-full px-4 py-2.5 bg-gray-50 border-b-2 border-gray-300 rounded-t-md focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
              />
              {errors.email && (
                <span className="text-red-500 text-xs block">
                  {errors.email.message as string}
                </span>
              )}
            </div>

            <div className="space-y-1">
              <label
                htmlFor="dni"
                className="block text-gray-600 text-md font-medium"
              >
                Nro de documento <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="dni"
                placeholder="Documento..."
                {...register("dni", validationCreateProcedure.dni)}
                className="w-full px-4 py-2.5 bg-gray-50 border-b-2 border-gray-300 rounded-t-md focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
              />
              {errors.dni && (
                <span className="text-red-500 text-xs block">
                  {errors.dni.message as string}
                </span>
              )}
            </div>

            <div className="space-y-1">
              <label
                htmlFor="postal_code"
                className="block text-gray-600 text-md font-medium"
              >
                Codigo postal <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="postal_code"
                placeholder="Codigo postal..."
                {...register(
                  "postal_code",
                  validationCreateProcedure.postal_code
                )}
                className="w-full px-4 py-2.5 bg-gray-50 border-b-2 border-gray-300 rounded-t-md focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
              />
              {errors.postal_code && (
                <span className="text-red-500 text-xs block">
                  {errors.postal_code.message as string}
                </span>
              )}
            </div>

            <div className="space-y-1">
              <label
                htmlFor="province"
                className="block text-gray-600 text-md font-medium"
              >
                Provincia <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="province"
                placeholder="Provincia..."
                {...register("province", validationCreateProcedure.province)}
                className="w-full px-4 py-2.5 bg-gray-50 border-b-2 border-gray-300 rounded-t-md focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
              />
              {errors.province && (
                <span className="text-red-500 text-xs block">
                  {errors.province.message as string}
                </span>
              )}
            </div>

            <div className="space-y-1">
              <label
                htmlFor="city"
                className="block text-gray-600 text-md font-medium"
              >
                Ciudad <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="city"
                placeholder="Ciudad..."
                {...register("city", validationCreateProcedure.city)}
                className="w-full px-4 py-2.5 bg-gray-50 border-b-2 border-gray-300 rounded-t-md focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
              />
              {errors.city && (
                <span className="text-red-500 text-xs block">
                  {errors.city.message as string}
                </span>
              )}
            </div>

            <div className="space-y-1">
              <label
                htmlFor="address"
                className="block text-gray-600 text-md font-medium"
              >
                Dirección <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="address"
                placeholder="Dirección..."
                {...register("address", validationCreateProcedure.address)}
                className="w-full px-4 py-2.5 bg-gray-50 border-b-2 border-gray-300 rounded-t-md focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
              />
              {errors.address && (
                <span className="text-red-500 text-xs block">
                  {errors.address.message as string}
                </span>
              )}
            </div>

            <div className="space-y-1">
              <label
                htmlFor="telephone"
                className="block text-gray-600 text-md font-medium"
              >
                Teléfono <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="telephone"
                placeholder="Teléfono..."
                {...register("telephone", validationCreateProcedure.telephone)}
                className="w-full px-4 py-2.5 bg-gray-50 border-b-2 border-gray-300 rounded-t-md focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
              />
              {errors.telephone && (
                <span className="text-red-500 text-xs block">
                  {errors.telephone.message as string}
                </span>
              )}
            </div>
          </div>

          <div className="space-y-1">
            <label
              htmlFor="detailed_document"
              className="block text-gray-600 text-md font-medium"
            >
              Documento detallado del evento (opcional)
            </label>
            <div className="flex flex-col">
              <p className="text-xs text-gray-500 mb-2">
                Adjunta un documento PDF con información más detallada sobre el
                evento deportivo
              </p>
              <label
                htmlFor="detailed_document"
                className="w-full px-4 py-2 bg-gray-50 border-2 border-dashed border-gray-300 rounded-md focus-within:border-blue-500 hover:bg-gray-100 transition-all cursor-pointer flex items-center justify-center"
              >
                <div className="text-center flex flex-col items-center">
                  <FilePlus className="w-6 h-6 text-gray-600" />
                  <span className="text-gray-600">
                    {fileName ?? "Seleccionar archivo PDF"}
                  </span>
                </div>
                <input
                  type="file"
                  id="detailed_document"
                  accept=".pdf"
                  className="hidden"
                  {...register("detailed_document", {
                    onChange: (e) => setFileName(e.target.files![0].name || ""),
                  })}
                />
              </label>
            </div>
          </div>

          {message && showMessage(messageType!)}

          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition font-medium shadow-md hover:shadow-lg hover:cursor-pointer"
            >
              Enviar solicitud
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
