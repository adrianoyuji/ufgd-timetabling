import React, { createContext, useState } from "react";
import { subjectsDB } from "../data/index";

export const GlobalContext = createContext([]);

export const GlobalProvider = ({ children }) => {
  const [courses, setCourses] = useState([
    {
      name: "Engenharia de Computação",
      tag: "EC",
      periods: { morning: true, afternoon: true, evening: false },
      semesters: 10,
      subjects: [
        {
          id: "07008708",
          name: "ALGORITMOS E ESTRUTURAS DE DADOS I",
          type: "OBR",
          workload: 72,
          active: true,
          semester: 2,
        },
        {
          id: "07008709",
          name: "ALGORITMOS E ESTRUTURAS DE DADOS II",
          type: "OBR",
          workload: 72,
          active: true,
          semester: 3,
        },
        {
          id: "07008710",
          name: "ALGORITMOS E ESTRUTURAS DE DADOS III",
          type: "OBR",
          workload: 72,
          active: true,
          semester: 4,
        },
        {
          id: "07008711",
          name: "ANÁLISE DE ALGORITMOS",
          type: "OBR",
          workload: 72,
          active: true,
          semester: 5,
        },
        {
          id: "07008712",
          name: "ANÁLISE DE CIRCUITOS ELÉTRICOS",
          type: "OBR",
          workload: 72,
          active: true,
          semester: 6,
        },
        {
          id: "07008721",
          name: "ANÁLISE DE SINAIS E SISTEMAS",
          type: "OBR",
          workload: 72,
          active: true,
          semester: 6,
        },
        {
          id: "06110004786",
          name: "ARQUITETURA E ORGANIZAÇÃO DE COMPUTADORES",
          type: "OBR",
          workload: 72,
          active: true,
          semester: 2,
        },
        {
          id: "07008974",
          name: "BANCO DE DADOS I",
          type: "OBR",
          workload: 72,
          active: true,
          semester: 5,
        },
        {
          id: "06110003704",
          name: "CÁLCULO DIFERENCIAL E INTEGRAL II",
          type: "OBR",
          workload: 72,
          active: true,
          semester: 3,
        },
        {
          id: "06110003712",
          name: "CÁLCULO DIFERENCIAL E INTEGRAL III",
          type: "OBR",
          workload: 72,
          active: true,
          semester: 4,
        },
        {
          id: "07008713",
          name: "CIRCUITOS ELETRÔNICOS",
          type: "OBR",
          workload: 72,
          active: true,
          semester: 7,
        },
        {
          id: "07008733",
          name: "COMPUTAÇÃO E SOCIEDADE",
          type: "OBR",
          workload: 72,
          active: true,
          semester: 9,
        },
        {
          id: "07008975",
          name: "DESENHO POR COMPUTADOR",
          type: "OBR",
          workload: 36,
          active: true,
          semester: 1,
        },
        {
          id: "07008972",
          name: "ELETRÔNICA DIGITAL",
          type: "OBR",
          workload: 36,
          active: true,
          semester: 1,
        },
        {
          id: "04000549",
          name: "EMPREENDEDORISMO",
          type: "OBR",
          workload: 72,
          active: true,
          semester: 10,
        },
        {
          id: "06110004328",
          name: "ENGENHARIA DE SOFTWARE I",
          type: "OBR",
          workload: 72,
          active: true,
          semester: 6,
        },
        {
          id: "07008734",
          name: "ESTÁGIO SUPERVISIONADO",
          type: "OBR",
          workload: 288,
          active: false,
          semester: 10,
        },
        {
          id: "06110003917",
          name: "FÍSICA I",
          type: "OBR",
          workload: 72,
          active: true,
          semester: 3,
        },
        {
          id: "06110004913",
          name: "FÍSICA II",
          type: "OBR",
          workload: 72,
          active: true,
          semester: 4,
        },
        {
          id: "06110004921",
          name: "FÍSICA III",
          type: "OBR",
          workload: 72,
          active: true,
          semester: 5,
        },
        {
          id: "07008715",
          name: "FUNDAMENTOS DE TEORIA DA COMPUTAÇÃO",
          type: "OBR",
          workload: 72,
          active: true,
          semester: 3,
        },
        {
          id: "06110004646",
          name: "INTELIGÊNCIA ARTIFICIAL",
          type: "OBR",
          workload: 72,
          active: true,
          semester: 8,
        },
        {
          id: "07008723",
          name: "INTRODUÇÃO À COMPUTAÇÃO GRÁFICA",
          type: "OBR",
          workload: 36,
          active: true,
          semester: 8,
        },
        {
          id: "07008976",
          name: "LABORATÓRIO DE BANCO DE DADOS I",
          type: "OBR",
          workload: 36,
          active: true,
          semester: 5,
        },
        {
          id: "07008728",
          name: "LABORATÓRIO DE COMPUTAÇÃO GRÁFICA",
          type: "OBR",
          workload: 36,
          active: true,
          semester: 8,
        },
        {
          id: "07008977",
          name: "LABORATÓRIO DE DESENHO POR COMPUTADOR",
          type: "OBR",
          workload: 36,
          active: true,
          semester: 1,
        },
        {
          id: "07008973",
          name: "LABORATÓRIO DE ELETRÔNICA DIGITAL",
          type: "OBR",
          workload: 36,
          active: true,
          semester: 1,
        },
        {
          id: "07008716",
          name: "LABORATÓRIO DE PROGRAMAÇÃO I",
          type: "OBR",
          workload: 72,
          active: true,
          semester: 2,
        },
        {
          id: "07008717",
          name: "LABORATÓRIO DE PROGRAMAÇÃO II",
          type: "OBR",
          workload: 72,
          active: true,
          semester: 3,
        },
        {
          id: "07008718",
          name: "LINGUAGENS FORMAIS E AUTÔMATOS",
          type: "OBR",
          workload: 72,
          active: true,
          semester: 5,
        },
        {
          id: "07008719",
          name: "MÉTODOS NUMÉRICOS PARA COMPUTAÇÃO",
          type: "OBR",
          workload: 72,
          active: true,
          semester: 4,
        },
        {
          id: "07008729",
          name: "MICROCONTROLADORES E APLICAÇÕES",
          type: "OBR",
          workload: 72,
          active: true,
          semester: 7,
        },
        {
          id: "07008730",
          name: "PROGRAMAÇÃO ORIENTADA A OBJETOS",
          type: "OBR",
          workload: 72,
          active: true,
          semester: 6,
        },
        {
          id: "06110004450",
          name: "REDES DE COMPUTADORES",
          type: "OBR",
          workload: 72,
          active: true,
          semester: 8,
        },
        {
          id: "07008731",
          name: "SISTEMAS DE INTEGRAÇÃO E AUTOMAÇÃO INDUSTRIAL",
          type: "OBR",
          workload: 72,
          active: true,
          semester: 8,
        },
        {
          id: "06110004409",
          name: "SISTEMAS DISTRIBUÍDOS",
          type: "OBR",
          workload: 72,
          active: true,
          semester: 8,
        },
        {
          id: "07008720",
          name: "SISTEMAS OPERACIONAIS I",
          type: "OBR",
          workload: 72,
          active: true,
          semester: 7,
        },
        {
          id: "07008732",
          name: "TECNOLOGIA E COMUNICAÇÃO DE DADOS",
          type: "OBR",
          workload: 72,
          active: true,
          semester: 7,
        },
        {
          id: "06110004484",
          name: "TRABALHO DE CONCLUSÃO DE CURSO I",
          type: "OBR",
          workload: 72,
          active: false,
          semester: 9,
        },
        {
          id: "07009827",
          name: "TRABALHO DE CONCLUSÃO DE CURSO II",
          type: "OBR",
          workload: 108,
          active: false,
          semester: 10,
        },
        {
          id: "07008740",
          name: "DESENVOLVIMENTO DE APLICAÇÕES WEB",
          type: "OPT",
          workload: 72,
          semester: 1,
          active: false,
        },
        {
          id: "07008741",
          name: "INTERAÇÃO HUMANO-COMPUTADOR",
          type: "OPT",
          workload: 72,
          semester: 1,
          active: false,
        },
        {
          id: "07008742",
          name: "METODOLOGIA CIENTÍFICA EM CIÊNCIA DA COMPUTAÇÃO",
          type: "OPT",
          workload: 72,
          semester: 1,
          active: false,
        },
        {
          id: "06110004581",
          name: "QUALIDADE DE SOFTWARE",
          type: "OPT",
          workload: 72,
          semester: 1,
          active: false,
        },
        {
          id: "07008745",
          name: "TÓPICOS AVANÇADOS EM COMPUTAÇÃO I",
          type: "OPT",
          workload: 72,
          semester: 1,
          active: false,
        },
        {
          id: "07008746",
          name: "TÓPICOS AVANÇADOS EM COMPUTAÇÃO II",
          type: "OPT",
          workload: 72,
          semester: 1,
          active: false,
        },
        {
          id: "07008747",
          name: "TÓPICOS AVANÇADOS EM COMPUTAÇÃO III",
          type: "OPT",
          workload: 72,
          semester: 1,
          active: false,
        },
        {
          id: "07008744",
          name: "TÓPICOS EM APRENDIZAGEM DE MÁQUINA",
          type: "OPT",
          workload: 72,
          semester: 1,
          active: false,
        },
        {
          id: "07008748",
          name: "TÓPICOS EM BANCO DE DADOS",
          type: "OPT",
          workload: 72,
          semester: 1,
          active: false,
        },
        {
          id: "07000603",
          name: "TÓPICOS EM COMPUTAÇÃO GRÁFICA",
          type: "OPT",
          workload: 72,
          semester: 1,
          active: false,
        },
        {
          id: "07008750",
          name: "TÓPICOS EM ENGENHARIA DE COMPUTAÇÃO I",
          type: "OPT",
          workload: 72,
          semester: 1,
          active: false,
        },
        {
          id: "07008751",
          name: "TÓPICOS EM ENGENHARIA DE COMPUTAÇÃO II",
          type: "OPT",
          workload: 72,
          semester: 1,
          active: false,
        },
        {
          id: "07008752",
          name: "TÓPICOS EM ENGENHARIA DE COMPUTAÇÃO III",
          type: "OPT",
          workload: 72,
          semester: 1,
          active: false,
        },
        {
          id: "06110004620",
          name: "TÓPICOS EM ENGENHARIA DE SOFTWARE",
          type: "OPT",
          workload: 72,
          semester: 1,
          active: false,
        },
        {
          id: "07008749",
          name: "TÓPICOS EM INTELIGÊNCIA ARTIFICIAL",
          type: "OPT",
          workload: 72,
          semester: 1,
          active: false,
        },
        {
          id: "07008753",
          name: "TÓPICOS EM PROGRAMAÇÃO",
          type: "OPT",
          workload: 72,
          semester: 1,
          active: false,
        },
        {
          id: "07008754",
          name: "TÓPICOS EM PROGRAMAÇÃO DE REDES DE COMPUTADORES",
          type: "OPT",
          workload: 72,
          semester: 1,
          active: false,
        },
        {
          id: "06110000683",
          name: "TÓPICOS EM REDES DE COMPUTADORES",
          type: "OPT",
          workload: 72,
          semester: 1,
          active: false,
        },
        {
          id: "07008757",
          name: "TÓPICOS EM SISTEMAS DE INFORMAÇÃO",
          type: "OPT",
          workload: 72,
          semester: 1,
          active: false,
        },
        {
          id: "07008760",
          name: "TÓPICOS EM VISÃO COMPUTACIONAL",
          type: "OPT",
          workload: 72,
          semester: 1,
          active: false,
        },
        {
          id: "06110004638",
          name: "VERIFICAÇÃO, VALIDAÇÃO E TESTES DE SOFTWARE",
          type: "OPT",
          workload: 72,
          semester: 1,
          active: false,
        },
      ],
    },

    {
      id: "sarv13513df",
      name: "Sistemas de Informação",
      tag: "SI",
      periods: { morning: false, afternoon: false, evening: true },
      semesters: 8,
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
    {
      id: "sarv132513df",
      name: "Sistemas de Informação 2",
      tag: "SI2",
      periods: { morning: false, afternoon: false, evening: true },
      semesters: 9,
      subjects: [],
    },
  ]);
  const [professors, setProfessors] = useState([
    {
      name: "Adailton José Alves da Cruz",
      email: "adailtoncruz@ufdg.edu.br",
      id: 1,
      workload: { min: 2, max: 20 },
      preferences: { subjects: [], schedule: {} },
      active: true,
      courses: ["SI", "EC"],
    },
    {
      name: "Alexandre Szabo",
      email: "alexandreszabo@ufgd.edu.br",
      id: 11,
      workload: { min: 2, max: 20 },
      preferences: {
        subjects: [],
        schedule: {
          morning: {
            thu: [
              { period: "07:20", status: "UNAVAILABLE" },
              { period: "08:10", status: "UNAVAILABLE" },
              { period: "09:15", status: "UNAVAILABLE" },
              { period: "10:05", status: "UNAVAILABLE" },
            ],
            fri: [
              { period: "07:20", status: "UNAVAILABLE" },
              { period: "08:10", status: "UNAVAILABLE" },
            ],
          },
          afternoon: {
            wed: [
              { period: "13:20", status: "PREFERENCE" },
              { period: "14:10", status: "PREFERENCE" },
              { period: "15:15", status: "PREFERENCE" },
              { period: "16:05", status: "PREFERENCE" },
            ],
          },
        },
      },
      active: true,
      courses: ["SI", "EC"],
    },
    {
      name: "Anderson Bessa da Costa",
      email: "andersoncosta@ufgd.edu.br",
      id: 21,
      workload: { min: 2, max: 20 },
      preferences: { subjects: [], schedule: {} },
      active: true,
      courses: ["SI", "EC"],
    },
    {
      name: "Carla Adriana Barvinski Zanchett",
      email: "carlazanchet@ufgd.edu.br",
      id: 31,
      workload: { min: 2, max: 20 },
      preferences: { subjects: [], schedule: {} },
      active: true,
      courses: ["SI", "EC"],
    },
    {
      name: "Carlos Elias Arminio Zampieri",
      email: "carloszampieri@ufgd.edu.br",
      id: 41,
      workload: { min: 2, max: 20 },
      preferences: { subjects: [], schedule: {} },
      active: true,
      courses: ["SI", "EC"],
    },
    {
      name: "Claudia Regina Tinós Peviani",
      email: "claudiapeviani@ufgd.edu.br",
      id: 51,
      workload: { min: 2, max: 20 },
      preferences: { subjects: [], schedule: {} },
      active: false,
      courses: ["SI", "EC"],
    },
    {
      name: "Evanise Araujo Caldas",
      email: "evanisecaldas@ufgd.edu.br",
      id: 61,
      workload: { min: 2, max: 20 },
      preferences: { subjects: [], schedule: {} },
      active: true,
      courses: ["SI", "EC"],
    },
    {
      name: "Everton Castelão Tetila",
      email: "evertontetila@ufgd.edu.br",
      id: 71,
      workload: { min: 2, max: 20 },
      preferences: { subjects: [], schedule: {} },
      active: true,
      courses: ["SI", "EC"],
    },
    {
      name: "Felipe Jose Carbone",
      email: "felipecarbone@ufgd.edu.br",
      id: 81,
      workload: { min: 2, max: 20 },
      preferences: { subjects: [], schedule: {} },
      active: true,
      courses: ["SI", "EC"],
    },
    {
      name: "Janne Yukiko Yoshikawa Oeiras Lachi	",
      email: "janneoeiras@ufgd.edu.br",
      id: 91,
      workload: { min: 2, max: 20 },
      preferences: { subjects: [], schedule: {} },
      active: false,
      courses: ["SI", "EC"],
    },
    {
      name: "Joinvile Batista Junior",
      email: "joinvilejunior@ufgd.edu.br",
      id: 101,
      workload: { min: 2, max: 20 },
      preferences: { subjects: [], schedule: {} },
      active: true,
      courses: ["SI", "EC"],
    },
    {
      name: "Marcos Mansano Furlan",
      email: "marcosfurlan@ufgd.edu.br",
      id: 111,
      workload: { min: 2, max: 20 },
      preferences: { subjects: [], schedule: {} },
      active: true,
      courses: ["SI", "EC"],
    },
    {
      name: "Marcos Paulo Moro",
      email: "marcospaulo@ufgd.edu.br",
      id: 121,
      workload: { min: 2, max: 20 },
      preferences: { subjects: [], schedule: {} },
      active: true,
      courses: ["SI", "EC"],
    },
    {
      name: "Murilo Táparo",
      email: "murilotaparo@ufgd.edu.br",
      id: 131,
      workload: { min: 2, max: 20 },
      preferences: { subjects: [], schedule: {} },
      active: true,
      courses: ["SI", "EC"],
    },
    {
      name: "Rodrigo Porfírio da Silva Sacchi",
      email: "rodrigosacchi@ufgd.edu.br",
      id: 141,
      workload: { min: 2, max: 20 },
      preferences: { subjects: [], schedule: {} },
      active: true,
      courses: ["SI", "EC"],
    },
    {
      name: "Rodrigo Yoshikawa Oeiras",
      email: "rodrigooeiras@ufgd.edu.br",
      id: 151,
      workload: { min: 2, max: 20 },
      preferences: { subjects: [], schedule: {} },
      active: true,
      courses: ["SI", "EC"],
    },
    {
      name: "Rosenilda Marques da Silva Felipe",
      email: "rosenildafelipe@ufgd.edu.br",
      id: 161,
      workload: { min: 2, max: 20 },
      preferences: { subjects: [], schedule: {} },
      active: true,
      courses: ["SI", "EC"],
    },
    {
      name: "Silvana Morita Melo",
      email: "silvanamelo@ufgd.edu.br",
      id: 171,
      workload: { min: 2, max: 20 },
      preferences: { subjects: [], schedule: {} },
      active: true,
      courses: ["SI", "EC"],
    },
    {
      name: "Valguima Victoria Viana Aguiar Odakura",
      email: "valguimaodakura@ufgd.edu.br",
      id: 181,
      workload: { min: 2, max: 20 },
      preferences: { subjects: [], schedule: {} },
      active: true,
      courses: ["SI", "EC"],
    },
    {
      name: "Vanderson Hafemann Fragal",
      email: "vandersonfragal@ufgd.edu.br",
      id: 191,
      workload: { min: 2, max: 20 },
      preferences: { subjects: [], schedule: {} },
      active: false,
      courses: ["SI", "EC"],
    },
    {
      name: "Wellington Lima dos Santos",
      email: "wellingtonsantos@ufgd.edu.br",
      id: 201,
      workload: { min: 2, max: 20 },
      preferences: { subjects: [], schedule: {} },
      active: true,
      courses: ["SI", "EC"],
    },
    {
      name: "Willian Paraguassu Amorim",
      email: "willianamorim@ufgd.edu.br",
      id: 211,
      workload: { min: 2, max: 20 },
      preferences: { subjects: [], schedule: {} },
      active: true,
      courses: ["SI", "EC"],
    },
  ]);

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
