import { Procedure } from "../../interfaces/procedure.interface";
import { Modal } from "../shared/Modal";

interface ProcedureDetailModalProps {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  procedure: Procedure;
}

const formatDate = (dateString: Date) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

export function ProcedureDetailModal({ openModal, setOpenModal, procedure }: ProcedureDetailModalProps) {
  return (
    <Modal isOpen={openModal} setIsOpen={setOpenModal}>
      <div className="max-w-4xl mx-auto w-full bg-white mb-4 mt-8 rounded-xl shadow-md overflow-hidden">
        <div className="bg-blue-500 py-3 px-6">
          <h2 className="text-white text-center font-semibold text-lg">
            Detalle del trámite
          </h2>
        </div>

        <div className="p-6 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-5">
            <div className="space-y-1">
              <label
                htmlFor="name"
                className="block text-gray-600 text-md font-medium"
              >
                Nombre
              </label>
              <div className="w-full px-4 py-2.5 bg-gray-200 border-b-2 border-gray-300 rounded-t-md">
                {procedure.name}
              </div>
            </div>

            <div className="space-y-1">
              <label
                htmlFor="lastname"
                className="block text-gray-600 text-md font-medium"
              >
                Apellido
              </label>
              <div className="w-full px-4 py-2.5 bg-gray-200 border-b-2 border-gray-300 rounded-t-md">
                {procedure.lastname}
              </div>
            </div>

            <div className="space-y-1">
              <label
                htmlFor="email"
                className="block text-gray-600 text-md font-medium"
              >
                Correo electrónico
              </label>
              <div className="w-full px-4 py-2.5 bg-gray-200 border-b-2 border-gray-300 rounded-t-md">
                {procedure.email}
              </div>
            </div>

            <div className="space-y-1">
              <label
                htmlFor="dni"
                className="block text-gray-600 text-md font-medium"
              >
                Nro de documento
              </label>
              <div className="w-full px-4 py-2.5 bg-gray-200 border-b-2 border-gray-300 rounded-t-md">
                {procedure.dni}
              </div>
            </div>

            <div className="space-y-1">
              <label
                htmlFor="postal_code"
                className="block text-gray-600 text-md font-medium"
              >
                Codigo postal
              </label>
              <div className="w-full px-4 py-2.5 bg-gray-200 border-b-2 border-gray-300 rounded-t-md">
                {procedure.postal_code}
              </div>
            </div>

            <div className="space-y-1">
              <label
                htmlFor="province"
                className="block text-gray-600 text-md font-medium"
              >
                Provincia
              </label>
              <div className="w-full px-4 py-2.5 bg-gray-200 border-b-2 border-gray-300 rounded-t-md">
                {procedure.province}
              </div>
            </div>

            <div className="space-y-1">
              <label
                htmlFor="city"
                className="block text-gray-600 text-md font-medium"
              >
                Ciudad
              </label>
              <div className="w-full px-4 py-2.5 bg-gray-200 border-b-2 border-gray-300 rounded-t-md">
                {procedure.city}
              </div>
            </div>

            <div className="space-y-1">
              <label
                htmlFor="address"
                className="block text-gray-600 text-md font-medium"
              >
                Dirección
              </label>
              <div className="w-full px-4 py-2.5 bg-gray-200 border-b-2 border-gray-300 rounded-t-md">
                {procedure.address}
              </div>
            </div>

            <div className="space-y-1">
              <label
                htmlFor="telephone"
                className="block text-gray-600 text-md font-medium"
              >
                Teléfono
              </label>
              <div className="w-full px-4 py-2.5 bg-gray-200 border-b-2 border-gray-300 rounded-t-md">
                {procedure.telephone}
              </div>
            </div>

            <div className="space-y-1">
              <label
                htmlFor="date"
                className="block text-gray-600 text-md font-medium"
              >
                Fecha de solicitud
              </label>
              <div className="w-full px-4 py-2.5 bg-gray-200 border-b-2 border-gray-300 rounded-t-md">
                {formatDate(procedure.createdAt)}
              </div>
            </div>
          </div>
          <div className="space-y-1">
            <label
              htmlFor="comments"
              className="block text-gray-600 text-md font-medium"
            >
              Comentarios
            </label>
            <div className="w-full px-4 py-2.5 bg-gray-200 border-b-2 border-gray-300 rounded-t-md">
              {procedure.comments || (
                <span className="italic">Sin comentarios</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
