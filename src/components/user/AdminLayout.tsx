import { DynamicIcon, IconName } from "lucide-react/dynamic";
import { proceduresCard } from "../procedures/procedures.json";
import { useNavigate } from "react-router-dom";

export function AdminLayout() {
  const navigate = useNavigate();

  const handleClick = (route: string) => {
    navigate(`/procedures/${route}`);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 md:px-8 flex flex-col py-4">
      <h1 className="text-2xl font-bold text-gray-700 mb-6 text-center">
        Trámites ciudadanos
      </h1>

      <h4 className="text-xl text-center text-blue-500 font-bold px-8 mb-6">
        Elija un trámite para ver sus solicitudes
      </h4>

      <div className="w-4/6 mx-auto">
        <div className="flex flex-wrap gap-8 justify-center">
          {proceduresCard.map((card) => (
            <button
              onClick={() => handleClick(card.route)}
              key={card.id}
              className="bg-blue-500 h-36 w-48 text-white flex flex-col items-center justify-between p-4 shadow-md hover:bg-blue-600 transition rounded-tl-4xl rounded-xl hover:cursor-pointer disabled:cursor-not-allowed disabled:hover:bg-blue-500"
              disabled={card.description !== "Deportes"}
            >
              <DynamicIcon name={card.icon as IconName} size={62} />
              <p className="font-medium text-center">{card.description}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
