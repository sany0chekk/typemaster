import React from "react";
import * as motion from "motion/react-client";

interface Props {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function Button({ className = "", children, onClick }: Props) {
  return (
    <motion.button
      whileHover={{ scale: 1.05, opacity: 0.7 }}
      whileTap={{ scale: 0.8 }}
      onClick={onClick}
      className={className}
    >
      {children}
    </motion.button>
  );
}
