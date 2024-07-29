"use client";

import { useState } from "react";
import styles from "./page.module.css";
import SetUserNameModal from "../components/SetUserNameModal";
import Chat from "../components/Chat";
import { UserProvider } from "../store/UserContext";
import { ChatProvider } from "../store/ChatContext";

export default function Home() {

  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<string | null>(null);

  return (
    <main className={styles.main}>
      <UserProvider value={{ user: currentUser, setUser: setCurrentUser }}>
        <ChatProvider value={{ selectedUser, setSelectedUser }}>
          {
            currentUser && (
              <div className="flex flex-col gap-2 p-2 w-full">
                <div className="flex justify-between">
                  <h6 className="text-3xl">{currentUser}</h6>
                  <button className="btn" onClick={() => setCurrentUser(null)}>Logout</button>
                </div>
                <Chat />
              </div>
            )
          }

          <SetUserNameModal open={!currentUser} />

        </ChatProvider>
      </UserProvider>
    </main>
  );
}
