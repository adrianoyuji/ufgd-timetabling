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
          id: "1",
          name: "LABORATÓRIO DE PROGRAMAÇÃO II",
          type: "OBR",
          workload: 72,
          active: true,
          semester: 1,
        },
        {
          id: "2",
          name: "LINGUAGENS FORMAIS E AUTÔMATOS",
          type: "OBR",
          workload: 72,
          active: true,
          semester: 2,
        },
        {
          id: "3",
          name: "LABORATÓRIO DE PROGRAMAÇÃO II",
          type: "OBR",
          workload: 72,
          active: true,
          semester: 1,
        },
        {
          id: "4",
          name: "LINGUAGENS FORMAIS E AUTÔMATOS",
          type: "OBR",
          workload: 72,
          active: true,
          semester: 2,
        },
        {
          id: "5",
          name: "LABORATÓRIO DE PROGRAMAÇÃO II",
          type: "OBR",
          workload: 72,
          active: true,
          semester: 1,
        },
        {
          id: "6",
          name: "LINGUAGENS FORMAIS E AUTÔMATOS",
          type: "OBR",
          workload: 72,
          active: true,
          semester: 2,
        },
        {
          id: "7",
          name: "LABORATÓRIO DE PROGRAMAÇÃO II",
          type: "OBR",
          workload: 72,
          active: true,
          semester: 1,
        },
        {
          id: "8",
          name: "LINGUAGENS FORMAIS E AUTÔMATOS",
          type: "OBR",
          workload: 72,
          active: true,
          semester: 2,
        },
        {
          id: "9",
          name: "MÉTODOS NUMÉRICOS PARA COMPUTAÇÃO",
          type: "OBR",
          workload: 72,
          active: true,
          semester: 3,
        },
        {
          id: "10",
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
          id: "070087217",
          name: "LABORATÓRIO DE PROGRAMAÇÃO II",
          type: "ELT",
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
  const [professors, setProfessors] = useState([
    {
      name: "Adailton José Alves da Cruz",
      email: "adailtoncruz@ufdg.edu.br",
      id: 120,
      workload: { min: 2, max: 20 },
      preferences: {},
      active: true,
      courses: ["SI", "EC"],
    },
    {
      name: "Alexandre Szabo",
      email: "alexandreszabo@ufgd.edu.br",
      id: 1245131,
      workload: { min: 2, max: 20 },
      preferences: {},
      active: true,
      courses: ["SI", "EC"],
    },
    {
      name: "Anderson Bessa da Costa",
      email: "andersoncosta@ufgd.edu.br",
      id: 12312332,
      workload: { min: 2, max: 20 },
      preferences: {},
      active: true,
      courses: ["SI", "EC"],
    },
    {
      name: "Carla Adriana Barvinski Zanchett",
      email: "carlazanchet@ufgd.edu.br",
      id: 3312312,
      workload: { min: 2, max: 20 },
      preferences: {},
      active: true,
      courses: ["EC"],
    },
  ]);

  //const professors = professorsDB.filter((professor) => professor.active);
  const subjects = subjectsDB.filter((subject) => subject.active);

  function updateCourses(data) {
    setCourses([...data]);
  }

  function updateProfessors(data) {
    setProfessors([...data]);
  }

  return (
    <GlobalContext.Provider
      value={{ professors, subjects, courses, updateCourses, updateProfessors }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
