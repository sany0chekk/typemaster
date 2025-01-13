import { FaPlay } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";
import Button from "../ui/button.tsx";

interface Props {
  onClick: () => void;
  isStarting: boolean;
}

export default function StartStopButton({ onClick, isStarting }: Props) {
  return (
    <Button
      onClick={onClick}
      className={`h-16 flex items-center gap-3 ${isStarting ? "bg-red-700" : "bg-green-700"} p-4 rounded-xl text-xl font-bold transition-opacity hover:opacity-70`}
    >
      {isStarting ? (
        <>
          <IoMdCloseCircle className="text-3xl" />
        </>
      ) : (
        <>
          Start typing <FaPlay />
        </>
      )}
    </Button>
  );
}
