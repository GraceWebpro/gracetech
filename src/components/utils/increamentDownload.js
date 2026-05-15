import { doc, updateDoc, increment } from "firebase/firestore";
import { db } from "../../server/firebase";

export const incrementDownload = async (id) => {
  try {
    await updateDoc(doc(db, "templates", id), {
      downloadsCount: increment(1)
    });
  } catch (e) {
    console.error(e);
  }
};
