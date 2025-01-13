import React, { useEffect } from "react";
import * as motion from "motion/react-client";
import { X } from "lucide-react";
import { AnimatePresence } from "motion/react";

interface Props {
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ isVisible, onClose, children }: Props) {
  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isVisible]);

  return (
    <AnimatePresence initial={false}>
      {isVisible ? (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          className="fixed top-0 left-0 w-full h-full p-4 backdrop-blur-lg flex items-center justify-center z-20"
        >
          <div className=" bg-neutral-800 p-10 max-h-full md:max-h-[800px] h-auto max-md:w-full max-md:h-full overflow-y-auto md:rounded-xl shadow-md font-normal text-base absolute max-md:top-0 max-md:left-0 md:relative">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.8 }}
              onClick={onClose}
              className="absolute top-4 right-4 flex items-center justify-center"
            >
              <X className=" size-8 text-yellow-400" />
            </motion.button>
            {children}
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
