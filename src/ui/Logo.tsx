import { GiNinjaHead } from "react-icons/gi";
import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link
      to="/"
      className="flex items-center justify-center gap-1.5 font-bold text-3xl py-4"
    >
      Type
      <GiNinjaHead className="text-5xl text-yellow-400" />
      Master
    </Link>
  );
}
