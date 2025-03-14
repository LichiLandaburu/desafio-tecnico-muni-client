import { useEffect, useState } from "react";
import { useProcedureStore } from "../../store/procedure.store";
import { Procedure } from "../../interfaces/procedure.interface";
import { ArrowLeftCircle, ArrowRightCircle, Edit } from "lucide-react";
import { useAuthStore } from "../../store/auth.store";
import { Modal } from "../shared/Modal";
import { BackButton } from "../shared/BackButton";

const formatDate = (dateString: Date) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  });
};

export function ProceduresAdminList() {
  const {
    procedures,
    getProcedures,
    updateProcedure,
    changeStatus,
    downloadDocument,
    documentUrl,
  } = useProcedureStore();
  const { token } = useAuthStore();

  const [, setFilterStatus] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [currentProcedures, setCurrentProcedures] = useState<Procedure[]>([]);

  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState<"create" | "edit">("create");

  const [commentsToEdit, setCommentsToEdit] = useState("");

  useEffect(() => {
    getProcedures();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [idToEdit, setIdToEdit] = useState<string | null>(null);

  const [filteredProcedures, setFilteredProcedures] = useState<Procedure[]>([]);

  useEffect(() => {
    setFilteredProcedures(procedures!);
  }, [procedures]);

  useEffect(() => {
    if (filteredProcedures && filteredProcedures.length > 0) {
      setTotalPages(Math.ceil(filteredProcedures?.length / 5));
      setCurrentProcedures(
        filteredProcedures.slice((currentPage - 1) * 5, currentPage * 5)
      );
    }
  }, [filteredProcedures, currentPage]);

  const handleOpenModal = (id: string, type: string) => {
    if (type === "edit") {
      setModalType("edit");
      setCommentsToEdit("");
      setOpenModal(true);
      setIdToEdit(id);
      const procedure = procedures!.find((procedure) => procedure.id === id);
      if (procedure) console.log(procedure.comments);
      setCommentsToEdit(procedure!.comments);
    } else {
      setModalType("create");
      setCommentsToEdit("");
      setOpenModal(true);
      setIdToEdit(id);
    }
  };

  const handleSelect = async (
    e: React.ChangeEvent<HTMLSelectElement>,
    id: string
  ) => {
    try {
      if (!token) {
        console.error("No token found");
        return;
      }
      await changeStatus(id, e.target.value, token);
    } catch (error) {
      console.error("Error changing status:", error);
    }
  };

  const handleUpdateProcedure = async () => {
    try {
      if (!token) {
        console.error("No token found");
        return;
      }
      if (!idToEdit) return;
      if (commentsToEdit === "") return;
      await updateProcedure(idToEdit!, { comments: commentsToEdit }, token);
      setOpenModal(false);
      setCommentsToEdit("");
      setIdToEdit(null);
    } catch (error) {
      console.error("Error changing status:", error);
    }
  };

  const handleDownload = async (id: string) => {
    try {
      if (!token) {
        console.error("No token found");
        return;
      }
      await downloadDocument(id, token);
      if (documentUrl) {
        const link = document.createElement("a");
        link.href = documentUrl.url;
        link.setAttribute("download", documentUrl.name);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (error) {
      console.error("Error downloading document:", error);
    }
  };

  const statusColor = {
    pending: "text-yellow-500 bg-yellow-100 border border-yellow-500",
    approved: "text-green-500 bg-green-100 border border-green-500",
    rejected: "text-red-500 bg-red-100 border border-red-500",
  };

  const handleFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterStatus(e.target.value);
    if (e.target.value === "all") {
      setFilteredProcedures(procedures!);
    } else {
      setFilteredProcedures(
        procedures!.filter((procedure) => procedure.status === e.target.value)
      );
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 md:px-8 flex flex-col">
      <BackButton />

      <h1 className="text-lg md:text-xl font-bold text-gray-700 mb-6 text-center">
        Solicitudes de permiso para eventos deportivos
      </h1>

      <div className="overflow-x-auto">
        <div className="w-full flex flex-row-reverse mb-2 items-center justify-start gap-1.5 px-0 md:px-24 lg:px-48 py-2">
          <select
            onChange={handleFilter}
            className="px-2 py-1 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:outline-none text-sm"
          >
            <option value="all">Todos</option>
            <option value="pending">Pendientes</option>
            <option value="approved">Aprobados</option>
            <option value="rejected">Rechazados</option>
          </select>
          <span className="text-gray-700 text-sm">Filtrar por estado:</span>
        </div>

        <table className="w-full md:w-3/4 mx-auto border-collapse border border-gray-300 text-xs sm:text-sm md:text-base">
          <thead className="bg-blue-500 text-white sticky top-0 h-[60px]">
            <tr>
              {[
                "solicitante",
                "dni",
                "ubicación",
                "estado",
                "fecha",
                "doc. detallado",
                "comentarios",
                "",
              ].map((key) => (
                <th
                  key={key}
                  className="p-2 border border-gray-300 cursor-pointer text-xs sm:text-sm md:text-base"
                >
                  {key.toUpperCase()}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredProcedures && filteredProcedures.length === 0 && (
              <tr>
                <td
                  className="p-2 border border-gray-300 text-center text-xs sm:text-sm md:text-base"
                  colSpan={8}
                >
                  No hay solicitudes realizadas
                </td>
              </tr>
            )}
            {currentProcedures.map((row) => (
              <tr
                key={row.id}
                className="odd:bg-gray-100 even:bg-gray-50 hover:bg-gray-200"
              >
                <td className="p-2 border border-gray-300 text-center">
                  <p className="font-bold text-xs sm:text-sm md:text-base">
                    {row.name} {row.lastname}
                  </p>
                  <p className="text-[10px] sm:text-xs text-gray-500">
                    {row.email}
                  </p>
                </td>
                <td className="p-2 border border-gray-300 text-center text-xs sm:text-sm md:text-base">
                  {row.dni}
                </td>
                <td className="p-2 border border-gray-300 text-center">
                  <p className="font-bold text-xs sm:text-sm md:text-base">
                    {row.city}, {row.province}
                  </p>
                  <p className="text-[10px] sm:text-xs text-gray-500">
                    {row.address}
                  </p>
                </td>
                <td className="p-2 border border-gray-300 text-center">
                  <select
                    value={row.status}
                    onChange={(e) => handleSelect(e, row.id)}
                    className={`px-2 py-1 ${
                      statusColor[row.status as keyof typeof statusColor]
                    } rounded-md text-xs sm:text-sm md:text-base focus:outline-none`}
                  >
                    <option value="pending" className="bg-white text-black">
                      Pendiente
                    </option>
                    <option value="approved" className="bg-white text-black">
                      Aprobado
                    </option>
                    <option value="rejected" className="bg-white text-black">
                      Rechazado
                    </option>
                  </select>
                </td>
                <td className="p-2 border border-gray-300 text-center text-xs sm:text-sm md:text-base">
                  {formatDate(row.createdAt)}
                </td>
                <td className="p-2 border border-gray-300 text-center">
                  {row.detailed_document ? (
                    <button
                      onClick={() => handleDownload(row.id)}
                      className="py-1 px-3 rounded-md text-xs sm:text-sm md:text-base text-white bg-green-700 hover:bg-green-800 hover:cursor-pointer"
                    >
                      Descargar
                    </button>
                  ) : (
                    <span className="italic text-xs sm:text-sm">
                      No hay documento
                    </span>
                  )}
                </td>
                <td className="p-2 border border-gray-300 text-center">
                  <div className="w-32 sm:w-40 md:w-48 h-12 sm:h-14 md:h-16 overflow-y-auto break-words p-2 sm:p-3 rounded-md text-xs sm:text-sm">
                    {row.comments ? (
                      <span className="text-gray-700 text-sm">
                        {row.comments}
                      </span>
                    ) : (
                      <div className="flex flex-col">
                        <span className="italic text-gray-500 text-center">
                          Sin comentarios
                        </span>
                        <button
                          onClick={() => handleOpenModal(row.id, "create")}
                          className="text-sm text-blue-700 hover:cursor-pointer hover:underline"
                        >
                          Agregar
                        </button>
                      </div>
                    )}
                  </div>
                </td>
                <td className="p-2 border border-gray-300 text-center">
                  <button
                    disabled={row.comments ? false : true}
                    onClick={() => handleOpenModal(row.id, "edit")}
                    className="px-2 py-1 text-white rounded-md disabled:cursor-not-allowed disabled:text-gray-500"
                  >
                    {row.comments && (
                      <Edit className="w-4 h-4 text-amber-500 hover:cursor-pointer" />
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredProcedures && filteredProcedures.length > 0 && (
        <div className="flex justify-center items-center mt-4 gap-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 disabled:opacity-50 hover:cursor-pointer disabled:hover:cursor-auto"
          >
            <ArrowLeftCircle className="w-6 h-6" />
          </button>
          {totalPages && (
            <span>
              Página {currentPage} de {totalPages}
            </span>
          )}
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-4 py-2 disabled:opacity-50 hover:cursor-pointer disabled:hover:cursor-auto"
          >
            <ArrowRightCircle className="w-6 h-6" />
          </button>
        </div>
      )}

      <Modal isOpen={openModal} setIsOpen={setOpenModal}>
        <div className="w-full h-60 mt-8 flex flex-col justify-between">
          <p className="text-md text-center text-blue-700 font-bold">
            {modalType === "edit" ? "Editar comentario" : "Agregar comentario"}
          </p>
          <textarea
            rows={4}
            placeholder="Comentarios..."
            value={commentsToEdit}
            onChange={(e) => setCommentsToEdit(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none resize-none focus:ring-2 focus:ring-blue-100"
          />
          <button
            onClick={handleUpdateProcedure}
            className="bg-green-500 hover:bg-green-600 hover:cursor-pointer text-white py-2 px-4 rounded"
          >
            Guardar
          </button>
        </div>
      </Modal>
    </div>
  );
}
