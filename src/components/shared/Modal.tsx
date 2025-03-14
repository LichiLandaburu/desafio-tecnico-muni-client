import { X } from "lucide-react";

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function Modal({ isOpen, setIsOpen, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
      <div className="relative bg-white p-6 rounded-lg shadow-lg w-full sm:w-4/5 md:w-5/6 lg:w-10/12 max-w-4xl max-h-[90vh] overflow-y-auto">
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-3 right-3 p-2 hover:cursor-pointer transition"
        >
          <X className="w-6 h-6 text-red-500" />
        </button>

        {children}
      </div>
    </div>
  );
}
