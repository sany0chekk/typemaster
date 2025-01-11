import * as motion from "motion/react-client";
import { X } from "lucide-react";
import { AnimatePresence } from "motion/react";

interface Props {
  isVisible: boolean;
  onCloseGuide: () => void;
}

export default function Guide({ isVisible, onCloseGuide }: Props) {
  const itemStyles = "border-b border-neutral-600 pb-6";
  const titleStyles = "font-bold mb-2";
  const textListStyles = "flex flex-col gap-1";
  const textStyles = "text-base font-light";
  const spanStyles = "font-semibold text-yellow-400";

  return (
    <AnimatePresence initial={false}>
      {isVisible ? (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          className="fixed top-0 left-0 w-full h-full p-4 backdrop-blur-lg flex items-center justify-center z-20"
        >
          <div className=" bg-neutral-800 p-10 max-h-full h-auto overflow-y-auto rounded-xl shadow-md font-normal text-base absolute max-md:top-0 max-md:left-0 md:relative">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.8 }}
              onClick={onCloseGuide}
              className="absolute top-4 right-4 flex items-center justify-center"
            >
              <X className=" size-8 text-yellow-400" />
            </motion.button>
            <ul className="max-w-lg flex flex-col gap-6">
              <li className={itemStyles}>
                <h3 className={titleStyles}>How to Start:</h3>
                <ul className={textListStyles}>
                  <li>
                    <p className={textStyles}>
                      - Click on the{" "}
                      <span className={spanStyles}>"Start typing"</span> button
                      to begin.
                    </p>
                  </li>
                  <li>
                    <p className={textStyles}>
                      - A random sentence will appear, and your task is to type
                      it as quickly and accurately as possible.
                    </p>
                  </li>
                </ul>
              </li>
              <li className={itemStyles}>
                <h3 className={titleStyles}>How to Type:</h3>
                <ul className={textListStyles}>
                  <li>
                    <p className={textStyles}>
                      - As you start typing, the sentence will highlight the
                      current character you should type in yellow.
                    </p>
                  </li>
                  <li>
                    <p className={textStyles}>
                      - If you type the character correctly, it will turn white;
                      if not, it will turn red.
                    </p>
                  </li>
                </ul>
              </li>
              <li className={itemStyles}>
                <h3 className={titleStyles}>Accuracy and Speed:</h3>
                <ul className={textListStyles}>
                  <li>
                    <p className={textStyles}>
                      - <span className={spanStyles}>Accuracy:</span> Your
                      typing accuracy is calculated as a percentage based on the
                      number of correctly typed characters.
                    </p>
                  </li>
                  <li>
                    <p className={textStyles}>
                      -{" "}
                      <span className={spanStyles}>
                        WPM (Words per minute):
                      </span>{" "}
                      The app tracks how fast you are typing during the
                      60-second timer, calculating your typing speed in words
                      per minute.
                    </p>
                  </li>
                </ul>
              </li>
              <li className={itemStyles}>
                <h3 className={titleStyles}>Timer:</h3>
                <ul className={textListStyles}>
                  <li>
                    <p className={textStyles}>
                      - The timer counts down from 60 seconds, and when the time
                      runs out, the game ends automatically.
                    </p>
                  </li>
                </ul>
              </li>
              <li>
                <h3 className={titleStyles}>Stop Typing:</h3>
                <ul className={textListStyles}>
                  <li>
                    <p className={textStyles}>
                      - If you want to stop typing before the time is up, click
                      the <span className={spanStyles}>"Stop typing"</span>{" "}
                      button.
                    </p>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
