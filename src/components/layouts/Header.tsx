import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <Link to="/" className="block text-center font-bold text-xl py-4">
        TypeMaster
      </Link>
    </header>
  );
}
