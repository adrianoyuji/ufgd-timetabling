import React, { createContext } from "react";
import { professorsDB, subjectsDB } from "../data/index";

export const GlobalContext = createContext([]);

export const GlobalProvider = ({ children }) => {
  const professors = professorsDB.filter((professor) => professor.active);
  const subjects = subjectsDB.filter((subject) => subject.active);

  return (
    <GlobalContext.Provider value={{ professors, subjects }}>
      {children}
    </GlobalContext.Provider>
  );
};
