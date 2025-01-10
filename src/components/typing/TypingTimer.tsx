import { AnimatePresence } from "motion/react";
import * as motion from "motion/react-client";

interface Props {
  seconds: number;
}

export default function TypingTimer({ seconds }: Props) {
  return (
    <div className="relative">
      <AnimatePresence>
        <motion.span
          key={seconds}
          initial={{ opacity: 0, y: -20, x: 0 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: 20, x: 0 }}
          transition={{ duration: 0.2 }}
          className="absolute -top-10 left-0 font-bold text-yellow-400 text-4xl"
        >
          {seconds}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}
