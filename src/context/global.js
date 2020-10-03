import React, { createContext, useState } from "react";
import { professorsDB, subjectsDB } from "../data/index";

export const GlobalContext = createContext([]);

export const GlobalProvider = ({ children }) => {
  const [courses, setCourses] = useState([
    {
      id: "zc141wea",
      name: "Engenharia de Computação",
      tag: "EC",
      periods: { morning: true, afternoon: true, evening: false },
      years: 5,
      subjects: [
        {
          id: "07008717",
          name: "LABORATÓRIO DE PROGRAMAÇÃO II",
          type: "OBR",
          workload: 72,
          active: true,
          semester: 1,
        },
        {
          id: "07008718",
          name: "LINGUAGENS FORMAIS E AUTÔMATOS",
          type: "OBR",
          workload: 72,
          active: true,
          semester: 2,
        },
        {
          id: "07008719",
          name: "MÉTODOS NUMÉRICOS PARA COMPUTAÇÃO",
          type: "OBR",
          workload: 72,
          active: true,
          semester: 3,
        },
        {
          id: "07008729",
          name: "MICROCONTROLADORES E APLICAÇÕES",
          type: "OBR",
          workload: 72,
          active: true,
          semester: 4,
        },
      ],
    },
    {
      id: "sarv13513df",
      name: "Sistemas de Informação",
      tag: "SI",
      periods: { morning: false, afternoon: false, evening: true },
      years: 4,
      subjects: [
        {
          id: "07008717",
          name: "LABORATÓRIO DE PROGRAMAÇÃO II",
          type: "OBR",
          workload: 72,
          active: true,
          semester: 1,
        },
        {
          id: "07008718",
          name: "LINGUAGENS FORMAIS E AUTÔMATOS",
          type: "OBR",
          workload: 72,
          active: true,
          semester: 2,
        },
        {
          id: "07008719",
          name: "MÉTODOS NUMÉRICOS PARA COMPUTAÇÃO",
          type: "OBR",
          workload: 72,
          active: true,
          semester: 3,
        },
        {
          id: "07008729",
          name: "MICROCONTROLADORES E APLICAÇÕES",
          type: "OBR",
          workload: 72,
          active: true,
          semester: 4,
        },
      ],
    },
  ]);

  const professors = professorsDB.filter((professor) => professor.active);
  const subjects = subjectsDB.filter((subject) => subject.active);

  function updateCourses(data) {
    setCourses([...data]);
  }

  return (
    <GlobalContext.Provider
      value={{ professors, subjects, courses, updateCourses }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
