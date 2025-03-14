
import { useAuthStore } from "../store/auth.store";
import { AdminLayout } from "../components/user/AdminLayout";
import { UserLayout } from "../components/user/UserLayout";

export function Home () {

  const { user } = useAuthStore();

  return user?.role === "admin" ? <AdminLayout /> : <UserLayout />

}