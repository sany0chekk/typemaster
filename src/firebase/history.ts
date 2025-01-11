import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase.config.ts";

export async function addGameResult(
  userId: string,
  gameData: { speed: number; errors: number; accuracy: number },
) {
  const historyRef = collection(db, "users", userId, "history");

  const gameResult = {
    date: new Date(),
    ...gameData,
  };

  try {
    const docRef = await addDoc(historyRef, gameResult);
    console.log("docRef", docRef);
  } catch (error) {
    console.error(error);
  }
}

export async function fetchGameHistory(userId: string) {
  const historyRef = collection(db, "users", userId, "history");

  try {
    const snapshot = await getDocs(historyRef);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error(error);
    return [];
  }
}
