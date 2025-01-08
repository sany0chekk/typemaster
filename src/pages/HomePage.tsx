import Section from "../components/layouts/Section.tsx";
import Container from "../components/layouts/Container.tsx";
import { useRef, useState } from "react";

import sentences from "../api/sentences.json";
import About from "../components/about/About.tsx";

export default function HomePage() {
  const [text, setText] = useState("");
  const [seconds, setSeconds] = useState(60);
  const [userText, setUserText] = useState("");
  const [started, setStarted] = useState(false);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const [accuracy, setAccuracy] = useState(100);
  const [speed, setSpeed] = useState(0);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const getRandomSentence = (data: { sentence: string }[]) => {
    const randomIndex = Math.floor(Math.random() * data.length);
    setText(data[randomIndex].sentence);
  };

  const handleChangeText = (value: string) => {
    if (started) {
      if (value.length >= text.length) {
        handleToggleTyping();
        return;
      }

      if (value.length >= userText.length) {
        setUserText(value);

        const correctChars = value
          .split("")
          .filter((char, index) => char === text[index]).length;
        const accuracyPercentage = (correctChars / value.length) * 100;

        setAccuracy(
          isNaN(accuracyPercentage) ? 0 : Math.floor(accuracyPercentage),
        );

        const timeElapsed = (60 - seconds) / 60;
        const wordsTyped = value.length / 5;
        const calculatedSpeed = timeElapsed > 0 ? wordsTyped / timeElapsed : 0;
        setSpeed(Math.floor(calculatedSpeed));
      }
    }
  };

  const handleToggleTyping = () => {
    if (started) {
      if (timer) {
        clearInterval(timer);
        setSeconds(60);
        setTimer(null);
      }
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

      getRandomSentence(sentences.data);
      setUserText("");
      setTimer(newTimer);
      setStarted(true);
      setAccuracy(100);
      setSpeed(0);

      if (textareaRef.current) {
        textareaRef.current.focus();
      }
    }
  };

  const getColor = (text: string, index: number) => {
    if (index === userText.length) {
      return "text-yellow-400";
    }

    if (!userText[index]) {
      return "text-neutral-400";
    }

    if (userText[index] === text[index]) {
      return "text-white";
    } else if (userText[index] !== text[index]) {
      return "text-red-500";
    }
  };

  return (
    <Section className="flex-grow">
      <Container className="flex flex-col items-center justify-center">
        <div
          className={`${started && "border-yellow-400"} leading-none w-28 h-28 flex flex-col gap-1 items-center justify-center text-center border-4 p-2 rounded-full mb-10`}
        >
          <span className="font-bold text-yellow-400 text-4xl">{seconds}</span>
          <p className="font-semibold opacity-70">seconds</p>
        </div>
        <button
          onClick={handleToggleTyping}
          className="bg-yellow-400 p-4 rounded-xl mb-10 text-xl font-bold transition-opacity hover:opacity-70"
        >
          {started ? "Stop typing" : "Start typing"}
        </button>

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
            <About />
          )}
          <textarea
            ref={textareaRef}
            value={userText}
            onChange={(event) => handleChangeText(event.target.value)}
            className="absolute bg-transparent top-0 left-0 w-full h-full resize-none outline-none opacity-0"
          />
        </div>

        {text !== "" && (
          <ul className="mt-20 flex items-center gap-10">
            <li className="bg-yellow-400 rounded-xl p-2 w-28">
              <p className="flex flex-col items-center font-semibold text-white">
                <span className="text-4xl font-bold ">{accuracy}</span>
                Accuracy
              </p>
            </li>
            <li className="bg-yellow-400 rounded-xl p-2 w-28">
              <p className="flex flex-col items-center font-semibold text-white">
                <span className="text-4xl font-bold">{speed}</span>
                WPM
              </p>
            </li>
          </ul>
        )}
      </Container>
    </Section>
  );
}
