"use client";

import { createContext } from "react";

const ChatContext = createContext<{
  selectedUser: string | null, setSelectedUser: (username: string) => void
}>({
  selectedUser: null,
  setSelectedUser: (username: string) => { },
});

export const ChatProvider = ChatContext.Provider;
export default ChatContext;
