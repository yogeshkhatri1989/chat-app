import { query, collection, or, and, where, onSnapshot } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import { useState, useEffect } from "react";
import { Message } from "../models/Message";
import { db, storage } from "./firebase";

export default function useChatMessages(user: string | null, selectedUser: string | null) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!selectedUser || !user) return;

    setMessages([]);
    setLoading(true);

    const q = query(
      collection(db, "messages"),
      or(
        and(where("to", "==", selectedUser), where("from", "==", user)),
        and(where("to", "==", user), where("from", "==", selectedUser))
      ),
    );
    const unSub = onSnapshot(q, async (snapshot) => {

      const messagesData = await Promise.all(snapshot.docs.map(async (doc) => {
        const data = doc.data();
        if (data.image) {
          return {
            ...data,
            image: await getDownloadURL(ref(storage, data.image))
          } as Message;
        }

        return data as Message;
      }));
      setMessages(
        messagesData.sort((a, b) => b.timestamp - a.timestamp)
      );
      setLoading(false);
    }, (error) => {
      console.error(error);
      setLoading(false);
    });

    return () => unSub();
  }, [user, selectedUser]);

  return { messages, loading };

}