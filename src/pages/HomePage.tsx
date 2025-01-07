import Section from "../components/layouts/Section.tsx";
import Container from "../components/layouts/Container.tsx";
import { useRef, useState } from "react";

export default function HomePage() {
  const text =
    "Typing speed tests help improve accuracy and efficiency. Practice daily with random words, sentences, or paragraphs to master your skills and become a confident, quick typist!";
  const [seconds, setSeconds] = useState(60);
  const [userText, setUserText] = useState("");
  const [started, setStarted] = useState(false);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChangeText = (value: string) => {
    if (started) {
      setUserText(value);
    }
  };

  const handleToggleTyping = () => {
    if (started) {
      if (timer) {
        clearInterval(timer);
        setSeconds(60);
        setTimer(null);
      }
      setUserText("");
      setStarted(false);
    } else {
      const newTimer = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds <= 0) {
            clearInterval(newTimer);
            setStarted(false);
            return 0;
          }
          return prevSeconds - 1;
        });
      }, 1000);

      setTimer(newTimer);
      setStarted(true);
    }

    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  const getColor = (text: string, index: number) => {
    if (!userText[index]) {
      return "text-neutral-400";
    }

    if (userText[index] === text[index]) {
      return "text-green-500";
    } else if (userText[index] !== text[index]) {
      return "text-red-500";
    }
  };

  return (
    <Section className="flex-grow">
      <Container className="flex flex-col items-center justify-center">
        <div className="leading-none w-28 h-28 flex flex-col gap-1 items-center justify-center text-center border-4 p-2 rounded-full mb-10">
          <span className="font-bold text-yellow-400 text-4xl">{seconds}</span>
          <p className="font-semibold opacity-70">seconds</p>
        </div>
        <button
          onClick={handleToggleTyping}
          className="bg-yellow-600 p-4 rounded-xl mb-10 text-xl font-bold transition-opacity hover:opacity-70"
        >
          {started ? "Stop typing" : "Start typing"}
        </button>
        <div className="bg-neutral-800 shadow-sm p-4 rounded-xl">
          <div className="font-bold text-2xl relative">
            <p className="text-center">
              {text.split("").map((char, index) => (
                <span key={index} className={getColor(text, index)}>
                  {char}
                </span>
              ))}
            </p>
            <textarea
              ref={textareaRef}
              value={userText}
              onChange={(event) => handleChangeText(event.target.value)}
              className="absolute bg-transparent top-0 left-0 w-full h-full resize-none outline-none opacity-0"
            />
          </div>
        </div>
      </Container>
    </Section>
  );
}
