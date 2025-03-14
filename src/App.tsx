import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Profile } from "./pages/Profie";
import { NotFound } from "./pages/NotFound";
import { ProceduresAdminList } from "./components/procedures/ProceduresAdminList";
import { Layout } from "./pages/Layout";
import { ProceduresUser } from "./components/procedures/ProceduresUser";
import { CreateProcedure } from "./components/procedures/CreateProcedure";
import { useAuthStore } from "./store/auth.store";
import { ProtectedRoute } from "./components/shared/ProtectedRoute";

function App() {

  const { user } = useAuthStore();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          
          <Route path="/procedures/user/:id" element={
            <ProtectedRoute
              isAllowed={user?.role === "user"}
              redirectTo="/"
            >
              <ProceduresUser />
            </ProtectedRoute>
          } />
          <Route path="/procedures/create/:name" element={<CreateProcedure />} />
          <Route path="/procedures/:name" element={
            <ProtectedRoute
              isAllowed={user?.role === "admin"}
              redirectTo="/"
            >
              <ProceduresAdminList />
              </ProtectedRoute>
            } 
          />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
