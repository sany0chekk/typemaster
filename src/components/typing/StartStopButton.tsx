import * as motion from "motion/react-client";

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
      className={`ml-auto ${isStarting ? "bg-red-700" : "bg-green-700"} p-4 rounded-xl text-xl font-bold transition-opacity hover:opacity-70`}
    >
      {isStarting ? "Stop typing" : "Start typing"}
    </motion.button>
  );
}
