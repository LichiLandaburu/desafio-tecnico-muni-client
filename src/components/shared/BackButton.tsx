import { ArrowLeft } from "lucide-react";

interface BackButtonProps {
  onClick?: () => void;
}

export function BackButton({ onClick }: BackButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick ? onClick : () => window.history.back()}
      className="fixed hidden sm:flex top-26 left-20 z-50 items-center gap-2 text-blue-500 transition-all hover:cursor-pointer"
    >
      <ArrowLeft className="w-8 h-8" />
    </button>
  );
}
