import { forwardRef } from "react";
import Guide from "../guide/Guide.tsx";

interface Props {
  text: string;
  userText: string;
  onChangeText: (text: string) => void;
}

export default forwardRef<HTMLTextAreaElement, Props>(function TypingArea(
  { text, userText, onChangeText },
  ref,
) {
  const getColor = (text: string, index: number) => {
    if (index === userText.length) {
      return "text-yellow-400";
    }

    if (!userText[index]) {
      return "text-neutral-600";
    }

    if (userText[index] === text[index]) {
      return "text-white";
    } else if (userText[index] !== text[index]) {
      return "text-red-500";
    }
  };

  return (
    <div className="font-bold text-2xl relative">
      {text !== "" ? (
        <p className="text-center bg-neutral-800 shadow-sm p-4 rounded-xl">
          {text.split("").map((char, index) => (
            <span key={index} className={getColor(text, index)}>
              {char}
            </span>
          ))}
        </p>
      ) : (
        <Guide />
      )}
      <textarea
        ref={ref}
        value={userText}
        onChange={(event) => onChangeText(event.target.value)}
        className="absolute bg-transparent top-0 left-0 w-full h-full resize-none outline-none opacity-0"
      />
    </div>
  );
});
