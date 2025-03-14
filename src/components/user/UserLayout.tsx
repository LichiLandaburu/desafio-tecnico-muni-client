import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { proceduresCard } from "../procedures/procedures.json";
import { DynamicIcon, IconName } from "lucide-react/dynamic";
import { useAuthStore } from "../../store/auth.store";
import { Modal } from "../shared/Modal";

export function UserLayout() {
  const navigate = useNavigate();

  const { user } = useAuthStore();

  const [openModal, setOpenModal] = useState(false);

  const handleClick = (route: string) => {
    navigate(`/procedures/create/${route}`);
  };

  const handleCreate = () => {
    setOpenModal(true);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 md:px-8 flex flex-col py-4">
      <h1 className="text-2xl font-bold text-gray-700 mb-6 text-center">
        Trámites ciudadanos
      </h1>

      <h4 className="text-xl text-center text-blue-500 font-bold px-8 mb-6">
        ¿Que deséas hacer?
      </h4>

      <div className="w-4/6 mx-auto">
        <div className="flex flex-wrap gap-12 justify-center">
          <button
            onClick={() => navigate(`/procedures/user/${user?.id}`)}
            className="bg-blue-500 h-36 w-36 text-white flex flex-col items-center justify-between p-6 shadow-md hover:bg-blue-600 transition rounded-tl-4xl rounded-xl hover:cursor-pointer"
          >
            <DynamicIcon name={"clipboard-list" as IconName} size={80} />
            <p className="font-medium text-center text-md">Ver mis trámites</p>
          </button>

          <button
            onClick={handleCreate}
            className="bg-blue-500 h-36 w-36 text-white flex flex-col items-center justify-between p-6 shadow-md hover:bg-blue-600 transition rounded-tl-4xl rounded-xl hover:cursor-pointer"
          >
            <DynamicIcon name={"file-plus" as IconName} size={80} />
            <p className="font-medium text-center text-md">Nuevo trámite</p>
          </button>
        </div>

        <Modal isOpen={openModal} setIsOpen={setOpenModal}>
          <h2 className="text-xl text-gray-700 text-center font-bold mb-8">
            Trámites disponibles
          </h2>
          <div className="flex flex-wrap gap-8 justify-center">
            {proceduresCard.map((card) => (
              <button
                onClick={() => handleClick(card.route)}
                key={card.id}
                className="bg-blue-500 h-28 w-40 text-white flex flex-col items-center justify-between p-4 shadow-md hover:bg-blue-600 transition rounded-tl-4xl rounded-xl hover:cursor-pointer disabled:cursor-not-allowed disabled:hover:bg-blue-500"
                disabled={card.description !== "Deportes"}
              >
                <DynamicIcon name={card.icon as IconName} size={48} />
                <p className="font-medium text-center">{card.description}</p>
              </button>
            ))}
          </div>
        </Modal>
      </div>
    </div>
  );
}
