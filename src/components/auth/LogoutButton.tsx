import { logout } from "../../firebase/auth.ts";
import { LogOut } from "lucide-react";
import * as motion from "motion/react-client";

export default function LogoutButton() {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.8 }}
      onClick={logout}
      className="bg-red-700 rounded-xl h-16 text-lg font-bold flex items-center justify-center gap-4 p-6"
    >
      Logout
      <LogOut className="size-6" />
    </motion.button>
  );
}
