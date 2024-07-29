import { query, collection, where, onSnapshot } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "./firebase";

export default function useChatUsers(user: string | null) {
  const [users, setUsers] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setUsers([]);
    setLoading(true);
    const q = query(collection(db, "users"), where("username", "!=", user));
    const unSub = onSnapshot(q, (snapshot) => {
      setUsers(
        snapshot.docs.map((doc, index) => {
          const data = doc.data();
          return data.username;
        })
      );
      setLoading(false);
    }, (error) => {
      console.error(error);
      setLoading(false);
    });

    return () => unSub();
  }, [user]);
  return { users, loading };
}