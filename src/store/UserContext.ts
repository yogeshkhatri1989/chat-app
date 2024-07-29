"use client";

import { createContext } from "react";

const UserContext = createContext<{ user: string | null, setUser: (username: string) => void }>({
  user: null,
  setUser: (username: string) => { },
});

export const UserProvider = UserContext.Provider;
export default UserContext;