import { useEffect, useState } from "react";
import { fetchGameHistory } from "../../firebase/history.ts";
import { useAuth } from "../../firebase/authContext.tsx";

type GameHistory = {
  id: string;
  date: Date;
  wpm: number;
  errors: number;
  accuracy: number;
};

export default function UserHistory() {
  const { user } = useAuth();
  const [history, setHistory] = useState<GameHistory[]>([]);

  useEffect(() => {
    const loadHistory = async () => {
      if (user?.uid) {
        const data = await fetchGameHistory(user?.uid);
        setHistory(data as GameHistory[]);
      }
    };
    loadHistory();
  }, [user?.uid]);

  return <ul>{history.length}</ul>;
}
