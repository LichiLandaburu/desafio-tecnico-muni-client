import { Outlet, useLocation, useNavigate } from "react-router-dom"
import { Header } from "../components/shared/Header";
import { Footer } from "../components/shared/Footer";
import { useAuthStore } from "../store/auth.store";
import { useEffect } from "react";

export function Layout () {

  const { isLogged } = useAuthStore();

  const navigate = useNavigate();

  const location = useLocation();
  const hideLayout = location.pathname === "/login" || location.pathname === "/register";

  useEffect(() => {
    if (!isLogged) {
      navigate("/login");
    }
  }, [ isLogged, navigate ]);

  return (
    <div className="flex flex-col min-h-screen">
      { !hideLayout && <Header /> }

      <main className="flex-1 bg-gray-100 pt-4 flex flex-col min-h-0 overflow-auto">
        <Outlet />
      </main>

      { !hideLayout && <Footer /> }
    </div>
  )
}