import Section from "../components/layouts/Section.tsx";
import Container from "../components/layouts/Container.tsx";
import { useRef, useState } from "react";

import sentences from "../api/sentences.json";

import StatsList from "../components/stats/StatsList.tsx";
import StatsItem from "../components/stats/StatsItem.tsx";
import TypingTimer from "../components/typing/TypingTimer.tsx";
import StartStopButton from "../components/typing/StartStopButton.tsx";
import TypingArea from "../components/typing/TypingArea.tsx";
import { Ban, Rabbit, Target } from "lucide-react";

export default function HomePage() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [text, setText] = useState("");
  const [userText, setUserText] = useState("");

  const [seconds, setSeconds] = useState(60);
  const [started, setStarted] = useState(false);

  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  const [accuracy, setAccuracy] = useState(100);
  const [speed, setSpeed] = useState(0);
  const [errors, setErrors] = useState(0);

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

        let errorsCount = 0;

        const correctChars = value.split("").filter((char, index) => {
          if (char !== text[index]) {
            errorsCount++;
          }
          return char === text[index];
        }).length;
        const accuracyPercentage = (correctChars / value.length) * 100;

        setAccuracy(
          isNaN(accuracyPercentage) ? 0 : Math.floor(accuracyPercentage),
        );

        setErrors(errorsCount);

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
      setErrors(0);

      if (textareaRef.current) {
        textareaRef.current.focus();
      }
    }
  };

  return (
    <Section className="flex-grow">
      <Container className="flex flex-col items-center justify-center">
        <div
          className={`mb-10 flex ${started ? "w-full flex-row items-end justify-between" : "flex-col"}`}
        >
          {started && <TypingTimer seconds={seconds} />}
          <StartStopButton onClick={handleToggleTyping} isStarting={started} />
        </div>

        <TypingArea
          ref={textareaRef}
          text={text}
          userText={userText}
          onChangeText={handleChangeText}
        />

        {text !== "" && !started && (
          <StatsList>
            <StatsItem title={"WPM"} value={speed} icon={<Rabbit />} />
            <StatsItem title={"Accuracy"} value={accuracy} icon={<Target />} />
            <StatsItem title={"Errors"} value={errors} icon={<Ban />} />
          </StatsList>
        )}
      </Container>
    </Section>
  );
}
