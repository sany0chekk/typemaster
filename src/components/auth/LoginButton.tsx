import { signInWithGoogle } from "../../firebase/auth.ts";
import * as motion from "motion/react-client";

export default function LoginButton() {
  return (
    <motion.button
      whileHover={{ scale: 1.05, opacity: 0.7 }}
      whileTap={{ scale: 0.8 }}
      onClick={signInWithGoogle}
      className="px-6 h-16 flex items-center justify-center gap-2 bg-neutral-700 rounded-xl"
    >
      <img
        className="w-6 h-6"
        src="https://www.svgrepo.com/show/475656/google-color.svg"
        loading="lazy"
        alt="google logo"
      />
      <span className="font-bold text-lg">Login with Google</span>
    </motion.button>
  );
}
