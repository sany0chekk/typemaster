import Section from "../components/layouts/Section.tsx";
import Container from "../components/layouts/Container.tsx";
import { useEffect, useRef, useState } from "react";

import sentences from "../api/sentences.json";

import StatsList from "../components/stats/StatsList.tsx";
import StatsItem from "../components/stats/StatsItem.tsx";
import TypingTimer from "../components/typing/TypingTimer.tsx";
import StartStopButton from "../components/typing/StartStopButton.tsx";
import TypingArea from "../components/typing/TypingArea.tsx";
import { Ban, Rabbit, Target } from "lucide-react";
import GuideOpenButton from "../components/guide/GuideOpenButton.tsx";
import Guide from "../components/guide/Guide.tsx";
import { useAuth } from "../firebase/authContext.tsx";
import LoginButton from "../components/auth/LoginButton.tsx";
import UserInfo from "../components/user/UserInfo.tsx";
import LogoutButton from "../components/auth/LogoutButton.tsx";
import { addGameResult, fetchGameHistory } from "../firebase/history.ts";
import UserHistory from "../components/user/UserHistory.tsx";
import UserHistoryOpenButton from "../components/user/UserHistoryOpenButton.tsx";
import { GameHistory } from "../types/history.ts";

export default function HomePage() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { user } = useAuth();

  const [text, setText] = useState("");
  const [userText, setUserText] = useState("");
  const [userGamesHistory, setUserGamesHistory] = useState<GameHistory[]>([]);

  const [seconds, setSeconds] = useState(60);
  const [started, setStarted] = useState(false);

  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  const [isGuideVisible, setIsGuideVisible] = useState(false);
  const [isHistoryVisible, setIsHistoryVisible] = useState(false);

  const [accuracy, setAccuracy] = useState(100);
  const [speed, setSpeed] = useState(0);
  const [errors, setErrors] = useState(0);

  useEffect(() => {
    const fetchHistory = async () => {
      if (user?.uid) {
        const updatedHistory = await fetchGameHistory(user.uid);
        setUserGamesHistory(updatedHistory);
      }
    };
    fetchHistory();
  }, [user]);

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

  const handleToggleTyping = async () => {
    if (started) {
      if (timer) {
        clearInterval(timer);
        setSeconds(60);
        setTimer(null);
      }
      setStarted(false);
      if (user?.uid) {
        await addGameResult(user?.uid, { speed, errors, accuracy });
        const updatedHistory = await fetchGameHistory(user.uid);
        setUserGamesHistory(updatedHistory);
      }
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

  const handleToggleGuide = () => {
    setIsGuideVisible(!isGuideVisible);
  };

  const handleToggleHistory = () => {
    setIsHistoryVisible(!isHistoryVisible);
  };

  return (
    <Section className="flex-grow">
      <Container className="flex flex-col items-center justify-center">
        <div
          className={`mb-10 flex ${started ? "w-full flex-row items-end justify-between" : "flex-col items-center justify-center"}`}
        >
          {user && !started && <UserInfo user={user} />}
          {started && <TypingTimer seconds={seconds} />}
          <div className="flex items-center justify-center flex-wrap gap-6">
            <StartStopButton
              onClick={handleToggleTyping}
              isStarting={started}
            />
            {!started && (
              <>
                <GuideOpenButton onClick={handleToggleGuide} />
                <Guide
                  isVisible={isGuideVisible}
                  onCloseGuide={handleToggleGuide}
                />
              </>
            )}
            {user && !started && (
              <>
                <UserHistoryOpenButton onClick={handleToggleHistory} />
                <UserHistory
                  isVisible={isHistoryVisible}
                  onCloseHistory={handleToggleHistory}
                  history={userGamesHistory}
                />
              </>
            )}
            {user && !started && <LogoutButton />}
            {!user && !started && <LoginButton />}
          </div>
          {!started && !user && (
            <p className="text-semibold text-center text-sm opacity-40 mt-10">
              *Statistics and additional features are available exclusively to
              authenticated users.
            </p>
          )}
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
