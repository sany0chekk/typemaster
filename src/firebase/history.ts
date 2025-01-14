import {
  addDoc,
  collection,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../../firebase.config.ts";
import { GameHistory } from "../types/history.ts";

export async function addGameResult(
  userId: string,
  gameData: { speed: number; errors: number; accuracy: number },
) {
  const historyRef = collection(db, "users", userId, "history");
  const now = new Date();
  const formattedDate = now.toLocaleString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const gameResult = {
    date: formattedDate,
    ...gameData,
  };

  try {
    await addDoc(historyRef, gameResult);
  } catch (error) {
    console.error(error);
  }
}

export async function fetchGameHistory(userId: string): Promise<GameHistory[]> {
  const historyRef = collection(db, "users", userId, "history");

  try {
    const historyQuery = query(historyRef, orderBy("date", "desc"));
    const snapshot = await getDocs(historyQuery);
    return snapshot.docs.map((doc) => {
      const data = doc.data() as Omit<GameHistory, "id">;
      return {
        id: doc.id,
        ...data,
      };
    });
  } catch (error) {
    console.error(error);
    return [];
  }
}
