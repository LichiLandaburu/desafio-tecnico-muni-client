import { useState } from "react";
import logo from "../../assets/sn-logo.png";
import { MenuHeader } from "./MenuHeader";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full bg-white h-20 shadow-sm shadow-gray-200 flex justify-center px-4 sm:px-8">
      <div className="w-[80%] max-w-6xl flex items-center justify-between">
        <a
          href="/"
          className="flex items-center gap-2 rounded-md transition text-[#0093DB] hover:cursor-pointer"
        >
          <img src={logo} className="h-auto w-32 sm:w-40" alt="Logo" />
        </a>
        <MenuHeader isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
    </header>
  );
}
