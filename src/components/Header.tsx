
import logo from "../assets/sn-logo.png";

export function Header () {
  
  return (
    <header className="w-full relative flex justify-center bg-white h-20 shadow-sm shadow-gray-200">
      <div className="w-[80%] flex items-center justify-between">
        <img src={logo} className="h-full w-40 ml-12" alt="Logo" />
        <span className="w-60 text-lg text-[#0093DB]">Perfil ciudadano</span>
      </div>
    </header>
  )
}
