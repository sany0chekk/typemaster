import { LogOut } from "lucide-react";
import Button from "../ui/button.tsx";
import { logout } from "../../firebase/auth.ts";

export default function LogoutButton() {
  return (
    <Button
      onClick={logout}
      className="bg-red-700 rounded-xl h-16 text-lg font-bold flex items-center justify-center gap-4 p-6"
    >
      Logout
      <LogOut className="size-6" />
    </Button>
  );
}
