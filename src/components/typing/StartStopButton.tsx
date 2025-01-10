import * as motion from "motion/react-client";
import { FaPlay } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";

interface Props {
  onClick: () => void;
  isStarting: boolean;
}

export default function StartStopButton({ onClick, isStarting }: Props) {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.8 }}
      onClick={onClick}
      className={`h-16 ml-auto flex items-center gap-3 ${isStarting ? "bg-red-700" : "bg-green-700"} p-4 rounded-xl text-xl font-bold transition-opacity hover:opacity-70`}
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
    </motion.button>
  );
}
