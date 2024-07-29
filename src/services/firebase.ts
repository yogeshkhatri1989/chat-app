import { initializeApp } from "firebase/app";
import "firebase/compat/storage";
import { addDoc, collection, doc, getFirestore, setDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { Message } from "../models/Message";

const firebaseConfig = {
  apiKey: "AIzaSyAhA7dkuaeqELkJ99pAvJZJuBtLas9jQOc",
  authDomain: "chat-assignment-26be3.firebaseapp.com",
  projectId: "chat-assignment-26be3",
  storageBucket: "chat-assignment-26be3.appspot.com",
  messagingSenderId: "565420217005",
  appId: "1:565420217005:web:4bcb15752b9363d3dd6c24"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage();

export const sendTextMessage = async (text: string, from: string, to: string) => {

  const message: Message = {
    from,
    to,
    text,
    timestamp: new Date().getTime()
  };
  await addDoc(collection(db, "messages"), message);
}

export const sendImageMessage = async (file: File, from: string, to: string) => {
  const docData = doc(collection(db, "messages"));
  const imageRef = ref(storage, `uploads/${docData.id}/${file.name}`);

  const snapshot = await uploadBytes(imageRef, file);

  const message: Message = {
    from,
    to,
    image: snapshot.ref.fullPath,
    timestamp: new Date().getTime()
  };

  await setDoc(doc(db, "messages", docData.id), message);
}

export default app;



