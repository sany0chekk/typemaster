import Button from "../ui/button.tsx";
import { signInWithGoogle } from "../../firebase/auth.ts";

export default function LoginButton() {
  return (
    <Button
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
    </Button>
  );
}
