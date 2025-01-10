import * as motion from "motion/react-client";
import { Info } from "lucide-react";

interface Props {
  onClick?: () => void;
}

export default function GuideOpenButton({ onClick }: Props) {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.8 }}
      onClick={onClick}
      className="bg-neutral-700 p-2 rounded-xl flex items-center gap-2 font-bold text-xl h-16"
    >
      Guide
      <Info className="size-10 text-yellow-400" />
    </motion.button>
  );
}
