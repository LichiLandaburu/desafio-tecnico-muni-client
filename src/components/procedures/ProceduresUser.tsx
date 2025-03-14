import { useEffect, useState } from "react";
import { Procedure } from "../../interfaces/procedure.interface";
import { useProcedureStore } from "../../store/procedure.store";
import { useAuthStore } from "../../store/auth.store";
import { ProcedureDetailModal } from "./ProcedureDetailModal";
import { BackButton } from "../shared/BackButton";

const formatDate = (dateString: Date) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

export function ProceduresUser() {
  const { procedures, getProcedures } = useProcedureStore();
  const { user } = useAuthStore();

  const states = ["Pendientes", "Aprobados", "Rechazados"];

  const [openModal, setOpenModal] = useState(false);
  const [selectedProcedure, setSelectedProcedure] = useState<Procedure | null>(
    null
  );

  const statesName: { [key: string]: string } = {
    Pendientes: "pending",
    Aprobados: "approved",
    Rechazados: "rejected",
  };

  useEffect(() => {
    getProcedures();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [filteredProcedures, setFilteredProcedures] = useState<Procedure[]>([]);

  useEffect(() => {
    if (procedures && procedures.length > 0) {
      const filter = procedures.filter(
        (procedure) => procedure.id_user === user?.id
      );
      setFilteredProcedures(filter);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [procedures]);

  return (
    <div className="container mx-auto px-4 sm:px-6 md:px-8 flex flex-col">
      {!openModal && <BackButton />}

      <h1 className="text-lg md:text-xl font-bold text-gray-700 mb-6 text-center">
        Mis trámites
      </h1>

      {states.flatMap((state) => {
        return (
          <div>
            <div className="flex items-center gap-4">
              <h2 className="text-lg font-bold text-gray-600">{state}</h2>
              <div className="h-0.5 flex-grow bg-blue-200 rounded-full" />
            </div>
            <div className="w-full flex gap-4 px-0 sm:px-4 md:px-8 lg:px-16 overflow-x-auto">
              {filteredProcedures.length ? (
                (() => {
                  const proceduresByState = filteredProcedures.filter(
                    (procedure) => procedure.status === statesName[state]
                  );
                  return proceduresByState.length > 0 ? (
                    proceduresByState.map((procedure) => (
                      <div
                        onClick={() => {
                          setSelectedProcedure(procedure);
                          setOpenModal(true);
                        }}
                        key={procedure.id}
                        className="bg-blue-500 h-40 w-56 my-8 text-white flex flex-col items-center justify-evenly p-6 shadow-md hover:bg-blue-600 transition rounded-tl-4xl rounded-xl hover:cursor-pointer"
                      >
                        <p className="font-bold text-lg">Deportes</p>
                        <p className="text-sm italic text-center">
                          Solicitud permiso para evento deportivo
                        </p>
                        <p className="font-bold">
                          {formatDate(procedure.createdAt)}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-center mx-auto text-gray-700 my-8">
                      No hay tramites {state.toLowerCase()}
                    </p>
                  );
                })()
              ) : (
                <p className="text-center mx-auto text-gray-700 my-8">
                  No hay tramites {state.toLowerCase()}
                </p>
              )}
            </div>
          </div>
        );
      })}

      {selectedProcedure && (
        <ProcedureDetailModal
          openModal={openModal}
          setOpenModal={setOpenModal}
          procedure={selectedProcedure}
        />
      )}
    </div>
  );
}
