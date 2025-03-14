import { ChevronUp, ChevronDown, Menu } from "lucide-react";
import { useEffect, useRef } from "react";
import { useAuthStore } from "../../store/auth.store";

interface MenuHeaderProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function MenuHeader({ isOpen, setIsOpen }: MenuHeaderProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { logout } = useAuthStore();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setIsOpen]);

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 rounded-md transition text-[#0093DB] hover:cursor-pointer"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        {/* Ícono de menú solo en pantallas pequeñas */}
        <span className="block md:hidden">
          <Menu size={24} />
        </span>
        {/* Texto y chevron solo en pantallas medianas y grandes */}
        <span className="hidden md:flex items-center gap-2">
          Perfil Ciudadano
          {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </span>
      </button>

      {isOpen && (
        <div className="absolute mt-2 w-48 bg-white rounded-lg shadow-lg right-0">
          <ul className="py-2 text-gray-800">
            <li>
              <a
                href="/profile"
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-[#0093DB]"
              >
                Ver perfil
              </a>
            </li>
            <div className="border-t border-gray-200"></div>
            <li>
              <button
                onClick={logout}
                className="block w-full text-left px-4 py-2 text-[#0093DB] hover:bg-gray-100 hover:cursor-pointer"
              >
                Cerrar Sesión
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
