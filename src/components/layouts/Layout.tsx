import { Outlet } from "react-router-dom";
import Header from "./Header.tsx";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Outlet />
    </div>
  );
}
