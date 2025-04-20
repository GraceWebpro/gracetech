import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "./firebase"; // your firebase config file

export const useIsAdmin = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;

    const checkAdmin = async () => {
      if (user) {
        const adminRef = doc(db, "admins", user.uid);
        const docSnap = await getDoc(adminRef);
        setIsAdmin(docSnap.exists());
      }
      setLoading(false);
    };

    checkAdmin();
  }, []);

  return { isAdmin, loading };
};
