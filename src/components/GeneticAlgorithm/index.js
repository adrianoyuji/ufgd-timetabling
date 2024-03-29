import React, { useState, useEffect, useContext } from "react";
import CourseTables from "../CourseTables";
import * as GA from "./GAUtils";
import _ from "lodash";

import { GlobalContext } from "../../context/global";

const days = ["mon", "tue", "wed", "thu", "fri"];
const periods = ["morning", "afternoon", "evening"];
const dayToIndex = {
  mon: () => 0,
  tue: () => 1,
  wed: () => 2,
  thu: () => 3,
  fri: () => 4,
};

function GeneticAlgorithm({ courseTables, config, selectedSemester }) {
  const { professors } = useContext(GlobalContext);
  const [newTables, setNewTables] = useState([]);
  const [loading, setLoading] = useState(true);

  const fitness = (individual) => {
    let score = 0;
    let penalties = {};
    //verifies if a professor is teaching in different years at the same time. - hard constraint
    for (let period in periods) {
      for (let day in days) {
        for (let time = 0; time < 4; time++) {
          let professorList = [];
          for (let course in individual) {
            for (let year in individual[course]) {
              if (!!individual[course][year][periods[period]]) {
                professorList = [
                  ...professorList,
                  {
                    ...individual[course][year][periods[period]][days[day]][
                      time
                    ].professor,
                  },
                ];
              }
            }
          }
          if (!!professorList.length) {
            let value = GA.compareNames([...professorList]);
            score += value;
            if (value < 0) {
              penalties = {
                ...penalties,
                teacherConflict: {
                  warning: "Um professor está dando aula no mesmo horário",
                  deductedScore: value,
                },
              };
            }
          }
        }
      }
    }

    //checks if professor is in not available time or preferers the time to work
    //hard constraint if unavailable
    //soft constraint if preference
    for (let course in individual) {
      for (let year in individual[course]) {
        for (let period in individual[course][year]) {
          for (let day in days) {
            for (let cell in individual[course][year][period][days[day]]) {
              if (
                !!individual[course][year][period][days[day]][cell].professor
              ) {
                let prof = professors.find(
                  (professor) =>
                    professor.name ===
                    individual[course][year][period][days[day]][cell].professor
                      .name
                );
                if (
                  !!prof &&
                  !!prof.preferences.schedule[period] &&
                  !!prof.preferences.schedule[period][days[day]]
                ) {
                  let preference = prof.preferences.schedule[period][
                    days[day]
                  ].find(
                    (d) =>
                      d.period ===
                      individual[course][year][period][days[day]][cell].period
                  );
                  if (!!preference) {
                    switch (preference.status) {
                      case "UNAVAILABLE":
                        penalties = {
                          ...penalties,
                          teacherPreference:
                            "Docente " +
                            prof.name +
                            " está alocado em um horário de indisponibilidade",
                        };
                        score = score - 50;
                        break;
                      case "PREFERENCE":
                        score = score + 5;
                        break;
                      default:
                        break;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }

    //verifies if professor workload matches the obligatory
    let professorWorkload = {};
    for (let course in individual) {
      for (let year in individual[course]) {
        for (let period in individual[course][year]) {
          for (let day in days) {
            for (let cell in individual[course][year][period][days[day]]) {
              if (
                !!individual[course][year][period][days[day]][cell].professor
              ) {
                if (
                  !!professorWorkload[
                    individual[course][year][period][days[day]][cell].professor
                      .name
                  ]
                ) {
                  professorWorkload = {
                    ...professorWorkload,
                    [individual[course][year][period][days[day]][cell].professor
                      .name]:
                      professorWorkload[
                        individual[course][year][period][days[day]][cell]
                          .professor.name
                      ] + 1,
                  };
                } else {
                  professorWorkload = {
                    ...professorWorkload,
                    [individual[course][year][period][days[day]][cell].professor
                      .name]: 1,
                  };
                }
              }
            }
          }
        }
      }
    }

    for (let name in professorWorkload) {
      if (professorWorkload[name] > 20 || professorWorkload[name] < 1) {
        score -= 10;
        penalties = {
          ...penalties,
          professorWorkload: "Um professor está com CH inválida",
        };
      }
    }

    //check if subject has the correct workload
    for (let course in individual) {
      let availableSubjects = courseTables[course].subjects.filter(
        (subject) => subject.active && subject.semester % 2 === selectedSemester
      );
      for (let year in individual[course]) {
        let subjectWorkload = {};
        for (let period in individual[course][year]) {
          for (let day in days) {
            for (let cell in individual[course][year][period][days[day]]) {
              if (!!individual[course][year][period][days[day]][cell].subject) {
                if (
                  !!subjectWorkload[
                    [
                      individual[course][year][period][days[day]][cell].subject
                        .name,
                    ]
                  ]
                ) {
                  subjectWorkload = {
                    ...subjectWorkload,
                    [individual[course][year][period][days[day]][cell].subject
                      .name]:
                      subjectWorkload[
                        [
                          individual[course][year][period][days[day]][cell]
                            .subject.name,
                        ]
                      ] + 18,
                  };
                } else {
                  subjectWorkload = {
                    ...subjectWorkload,
                    [individual[course][year][period][days[day]][cell].subject
                      .name]: 18,
                  };
                }
              }
            }
          }
        }
        for (let name in subjectWorkload) {
          let sub = availableSubjects.find((subject) => subject.name === name);
          if (!!sub && subjectWorkload[name] !== Number(sub.workload)) {
            score -= 10;
            penalties = {
              ...penalties,
              subjectWorkload: "Uma matéria esta com CH inválida.",
            };
          }
        }
      }
    }

    //checks if subjects is in the same period and day - hard constraint
    for (let course in individual) {
      for (let year in individual[course]) {
        for (let period in individual[course][year]) {
          for (let day in days) {
            let subjectList = [];
            for (let cell in individual[course][year][period][days[day]]) {
              if (!!individual[course][year][period][days[day]][cell].subject) {
                subjectList = [
                  ...subjectList,
                  individual[course][year][period][days[day]][cell].subject,
                ];
              }
            }
            if (!!subjectList.length) {
              let value = GA.compareSubjects([...subjectList]);
              score += value;
              if (value < 0) {
                penalties = {
                  ...penalties,
                  subjectAligned: "Uma matéria está com carga diária incorreta",
                };
              }
            }
          }
        }
      }
    }

    return { score: score, penalties };
  };

  const generateIndividual = (course) => {
    let availableSubjects = course.subjects.filter(
      (subject) => subject.active && subject.semester % 2 === selectedSemester
    );
    let availableProfessors = professors.filter(
      (professor) =>
        professor.courses.some((tag) => tag === course.tag) && professor.active
    );
    let individual = JSON.parse(JSON.stringify(course.schedule));
    for (let i in availableSubjects) {
      let totalwl = 0;
      let randomProfessor = GA.preferenceProfessor(
        availableProfessors,
        availableSubjects[i]
      );
      while (totalwl < availableSubjects[i].workload) {
        let period = GA.getValidPeriod(course.periods);
        let year =
          (availableSubjects[i].semester -
            GA.semesterModifier(selectedSemester)) /
          2;
        let day = days[Math.floor(Math.random() * 5)];
        let time = Math.floor(Math.random() * 4);

        if (!!individual[year][period][day][time].subject === false) {
          totalwl += 18;
          individual[year][period][day][time].subject = {
            ...availableSubjects[i],
          };
          individual[year][period][day][time].professor = randomProfessor;
        }
      }
    }
    return individual;
  };

  const mutation = (arr) => {
    let children = JSON.parse(JSON.stringify(arr));
    if (config.mutationProbability - Math.floor(Math.random() * 101) >= 0) {
      if (Math.floor(Math.random() * 9) > 3) {
        // randomlychanges a cell location
        for (let i in children) {
          for (let j in children[i]) {
            let randomYear = Math.floor(Math.random() * children[i][j].length);
            let randomPeriod = GA.getValidPeriod(courseTables[j].periods);
            let randomDay = days[Math.floor(Math.random() * 5)];
            let randomTime = Math.floor(Math.random() * 4);

            let auxSubject = JSON.parse(
              JSON.stringify(
                !!children[i][j][randomYear][randomPeriod][randomDay][
                  randomTime
                ].subject
                  ? children[i][j][randomYear][randomPeriod][randomDay][
                      randomTime
                    ].subject
                  : null
              )
            );
            let auxProfessor = JSON.parse(
              JSON.stringify(
                !!children[i][j][randomYear][randomPeriod][randomDay][
                  randomTime
                ].professor
                  ? children[i][j][randomYear][randomPeriod][randomDay][
                      randomTime
                    ].professor
                  : null
              )
            );

            let randomPeriod2 = GA.getValidPeriod(courseTables[j].periods);
            let randomDay2 = days[Math.floor(Math.random() * 5)];
            let randomTime2 = Math.floor(Math.random() * 4);

            children[i][j][randomYear][randomPeriod][randomDay][
              randomTime
            ].subject = JSON.parse(
              JSON.stringify(
                !!children[i][j][randomYear][randomPeriod2][randomDay2][
                  randomTime2
                ].subject
                  ? children[i][j][randomYear][randomPeriod2][randomDay2][
                      randomTime2
                    ].subject
                  : null
              )
            );
            children[i][j][randomYear][randomPeriod][randomDay][
              randomTime
            ].professor = JSON.parse(
              JSON.stringify(
                !!children[i][j][randomYear][randomPeriod2][randomDay2][
                  randomTime2
                ].professor
                  ? children[i][j][randomYear][randomPeriod2][randomDay2][
                      randomTime2
                    ].professor
                  : null
              )
            );

            children[i][j][randomYear][randomPeriod2][randomDay2][
              randomTime2
            ].professor = auxProfessor;
            children[i][j][randomYear][randomPeriod2][randomDay2][
              randomTime2
            ].subject = auxSubject;
          }
        }
      } else {
        for (let i in children) {
          for (let j in children[i]) {
            let foundYear = false;
            let foundPeriod = false;
            let foundDay = false;
            let foundCell = false;
            let foundSubject = [];
            for (let year in children[i][j]) {
              for (let period in children[i][j][year]) {
                for (let day in children[i][j][year][period]) {
                  let subjectsOfDayList = [];
                  let mostFrequent = false;
                  for (let cell in children[i][j][year][period][day]) {
                    if (children[i][j][year][period][day][cell]) {
                      subjectsOfDayList.push(
                        children[i][j][year][period][day][cell].subject
                      );
                    }
                  }
                  mostFrequent = GA.findMostFrequentSubject(subjectsOfDayList);

                  if (mostFrequent && mostFrequent[1] === 3) {
                    foundYear = year;
                    foundPeriod = period;
                    foundDay = day;
                    foundSubject = [...mostFrequent];
                  }
                }
              }
            }
            if (foundSubject.length > 0) {
              let keys = [];

              for (let cell in children[i][j][foundYear][foundPeriod][
                foundDay
              ]) {
                if (
                  children[i][j][foundYear][foundPeriod][foundDay][cell]
                    .subject &&
                  children[i][j][foundYear][foundPeriod][foundDay][cell].subject
                    .name === foundSubject[0]
                ) {
                  keys = [
                    ...keys,
                    children[i][j][foundYear][foundPeriod][foundDay][cell].key,
                  ];
                } else {
                  foundCell = cell;
                }
              }

              for (let year in children[i][j]) {
                for (let period in children[i][j][year]) {
                  for (let day in children[i][j][year][period]) {
                    for (let cell in children[i][j][year][period][day]) {
                      if (
                        children[i][j][year][period][day][cell].subject &&
                        children[i][j][year][period][day][cell].subject.name ===
                          foundSubject[0] &&
                        !keys.includes(
                          children[i][j][year][period][day][cell].key
                        )
                      ) {
                        let auxCell = JSON.parse(
                          JSON.stringify(
                            children[i][j][year][period][day][cell]
                          )
                        );

                        children[i][j][year][period][day][cell] = JSON.parse(
                          JSON.stringify(
                            children[i][j][foundYear][foundPeriod][foundDay][
                              foundCell
                            ]
                          )
                        );

                        children[i][j][foundYear][foundPeriod][foundDay][
                          foundCell
                        ] = JSON.parse(JSON.stringify(auxCell));
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }

      return [...children];
    } else {
      return arr;
    }
  };

  const crossover = (parents) => {
    let insertedSubjects = {};
    let courseSubjects = [];
    let counter = 1;
    let insertedProfessors = {};
    let courseProfessors = [];
    if (config.crossoverProbability - Math.floor(Math.random() * 101) >= 0) {
      let taggedParents = JSON.parse(JSON.stringify(parents));

      taggedParents[0].pop();
      taggedParents[1].pop();
      //list all subjects
      for (let course in taggedParents[0]) {
        for (let year in taggedParents[0][course]) {
          for (let period in taggedParents[0][course][year]) {
            for (let day in taggedParents[0][course][year][period]) {
              for (let cell in taggedParents[0][course][year][period][day]) {
                if (
                  !!taggedParents[0][course][year][period][day][cell].subject
                ) {
                  insertedSubjects = {
                    ...insertedSubjects,
                    [taggedParents[0][course][year][period][day][cell].subject
                      .name]: [],
                  };
                  insertedProfessors = {
                    ...insertedProfessors,
                    [taggedParents[0][course][year][period][day][cell].subject
                      .name]: "",
                  };
                }
              }
            }
          }
        }
        courseSubjects = [...courseSubjects, { ...insertedSubjects }];
        courseProfessors = [...courseProfessors, { ...insertedProfessors }];
        insertedProfessors = {};
        insertedSubjects = {};
      }

      courseProfessors = [
        JSON.parse(JSON.stringify(courseProfessors)),
        JSON.parse(JSON.stringify(courseProfessors)),
      ];

      //map the professors
      for (let child in taggedParents) {
        for (let course in taggedParents[child]) {
          for (let year in taggedParents[child][course]) {
            for (let period in taggedParents[child][course][year]) {
              for (let day in taggedParents[child][course][year][period]) {
                for (let cell in taggedParents[child][course][year][period][
                  day
                ]) {
                  let subject =
                    taggedParents[child][course][year][period][day][cell]
                      .subject;
                  let professor =
                    taggedParents[child][course][year][period][day][cell]
                      .professor;
                  if (
                    subject !== null &&
                    courseProfessors[child][course][subject.name] === ""
                  ) {
                    courseProfessors[child][course][subject.name] =
                      professor.name;
                  }
                }
              }
            }
          }
        }
      }

      //console.log("list all subjects ok");
      //MAP THE INDIVIDUALS
      for (let course in taggedParents[0]) {
        for (let year in taggedParents[0][course]) {
          for (let period in taggedParents[0][course][year]) {
            for (let day in taggedParents[0][course][year][period]) {
              for (let cell in taggedParents[0][course][year][period][day]) {
                taggedParents[0][course][year][period][day][cell] = JSON.parse(
                  JSON.stringify({
                    ...taggedParents[0][course][year][period][day][cell],
                    key: counter,
                  })
                );
                if (
                  !!taggedParents[0][course][year][period][day][cell].subject
                ) {
                  courseSubjects[course][
                    taggedParents[0][course][year][period][day][cell].subject
                      .name
                  ].push(counter);
                }
                counter++;
              }
            }
          }
        }
      }

      let filledIndex = {};
      counter = 1;
      //maps second child and creates an array with child 1 equal indexes

      for (let course in taggedParents[1]) {
        for (let year in taggedParents[1][course]) {
          for (let period in taggedParents[1][course][year]) {
            for (let day in taggedParents[1][course][year][period]) {
              for (let cell in taggedParents[1][course][year][period][day]) {
                if (
                  !!taggedParents[1][course][year][period][day][cell].subject
                ) {
                  let cellKey = courseSubjects[course][
                    taggedParents[1][course][year][period][day][cell].subject
                      .name
                  ].pop();
                  taggedParents[1][course][year][period][day][cell] = {
                    ...taggedParents[1][course][year][period][day][cell],
                    key: cellKey,
                  };
                  filledIndex = { ...filledIndex, [cellKey]: counter };
                } else {
                  taggedParents[1][course][year][period][day][
                    cell
                  ] = JSON.parse(
                    JSON.stringify({
                      ...taggedParents[1][course][year][period][day][cell],
                      key: counter,
                    })
                  );
                }
                counter++;
              }
            }
          }
        }
      }

      //fixing duple indexes
      //TODO CHECK AGAIN
      for (let course in taggedParents[1]) {
        for (let year in taggedParents[1][course]) {
          for (let period in taggedParents[1][course][year]) {
            for (let day in taggedParents[1][course][year][period]) {
              for (let cell in taggedParents[1][course][year][period][day]) {
                let doing = true;
                while (doing) {
                  if (
                    !taggedParents[1][course][year][period][day][cell]
                      .subject &&
                    !!filledIndex[
                      taggedParents[1][course][year][period][day][cell].key
                    ]
                  ) {
                    taggedParents[1][course][year][period][day][cell].key =
                      filledIndex[
                        taggedParents[1][course][year][period][day][cell].key
                      ];
                  } else {
                    doing = false;
                  }
                }
              }
            }
          }
        }
      }

      //console.log("fixing duples ok");

      taggedParents = JSON.parse(JSON.stringify(taggedParents));

      //RANDOMIZE CROSSOVER POINTS
      let point1 = Math.floor(Math.random() * 4);
      let point2 = Math.floor(Math.random() * (5 - point1));
      while (point2 <= point1) {
        point1 = Math.floor(Math.random() * 4);
        point2 = Math.floor(Math.random() * 5);
      }
      //console.log("generate points ok");
      //CROSSOVER POINTS
      for (let course in taggedParents[0]) {
        for (let year in taggedParents[0][course]) {
          for (let period in taggedParents[0][course][year]) {
            for (let day in taggedParents[0][course][year][period]) {
              if (dayToIndex[day]() >= point1 && dayToIndex[day]() < point2) {
                let aux = JSON.parse(
                  JSON.stringify(taggedParents[0][course][year][period][day])
                );
                taggedParents[0][course][year][period][day] = JSON.parse(
                  JSON.stringify(taggedParents[1][course][year][period][day])
                );
                taggedParents[1][course][year][period][day] = JSON.parse(
                  JSON.stringify(aux)
                );
              }
            }
          }
        }
      }

      //console.log("crossover childs ok");
      let keyTable1 = [];
      let keyTable2 = [];
      //generate key table
      for (let course in taggedParents[0]) {
        let auxKT1 = {};
        let auxKT2 = {};
        for (let year in taggedParents[0][course]) {
          for (let period in taggedParents[0][course][year]) {
            for (let day in taggedParents[0][course][year][period]) {
              for (let cell in taggedParents[0][course][year][period][day]) {
                if (dayToIndex[day]() >= point1 && dayToIndex[day]() < point2) {
                  if (
                    taggedParents[0][course][year][period][day][cell].key !==
                    taggedParents[1][course][year][period][day][cell].key
                  ) {
                    auxKT1 = {
                      ...auxKT1,
                      [taggedParents[0][course][year][period][day][cell].key]:
                        taggedParents[1][course][year][period][day][cell].key,
                    };
                    auxKT2 = {
                      ...auxKT2,
                      [taggedParents[1][course][year][period][day][cell].key]:
                        taggedParents[0][course][year][period][day][cell].key,
                    };
                  }
                }
              }
            }
          }
        }
        keyTable1.push(auxKT1);
        keyTable2.push(auxKT2);
      }
      //console.log("keytables ok");
      let keysTable = [[...keyTable1], [...keyTable2]];

      //MAPPING LEGALIZATION REFS
      //THIS SECTIONS COPIES THE INNER PART OF THE INDIVIDUAL
      let DNASample1 = [];
      let DNASample2 = [];
      for (let course in taggedParents[0]) {
        let courseAux1 = [];
        let courseAux2 = [];
        for (let year in taggedParents[0][course]) {
          let yearsAux1 = {};
          let yearsAux2 = {};
          for (let period in taggedParents[0][course][year]) {
            let daysAux1 = {};
            let daysAux2 = {};
            for (let day in taggedParents[0][course][year][period]) {
              if (dayToIndex[day]() >= point1 && dayToIndex[day]() < point2) {
                daysAux1 = {
                  ...daysAux1,
                  [day]: taggedParents[0][course][year][period][day],
                };
                daysAux2 = {
                  ...daysAux2,
                  [day]: taggedParents[1][course][year][period][day],
                };
              }
            }

            yearsAux1 = { ...yearsAux1, [period]: daysAux1 };
            yearsAux2 = { ...yearsAux2, [period]: daysAux2 };
          }
          courseAux1.push(yearsAux1);
          courseAux2.push(yearsAux2);
        }
        DNASample1.push(courseAux1);
        DNASample2.push(courseAux2);
      }
      let dnas = [[...DNASample2], [...DNASample1]];
      //console.log("dnas ok");
      //console.log(keysTable);
      //CHILDREN LEGALIZATION
      for (let child in taggedParents) {
        for (let course in taggedParents[child]) {
          for (let year in taggedParents[child][course]) {
            for (let period in taggedParents[child][course][year]) {
              for (let day in taggedParents[child][course][year][period]) {
                if (dayToIndex[day]() < point1 || dayToIndex[day]() >= point2) {
                  for (let cell in taggedParents[child][course][year][period][
                    day
                  ]) {
                    let duplicated = true;
                    let firstKey =
                      taggedParents[child][course][year][period][day][cell].key;
                    while (duplicated) {
                      let key =
                        taggedParents[child][course][year][period][day][cell]
                          .key;
                      let nextKey = keysTable[child][course][key];

                      if (!!nextKey) {
                        let newCell;
                        if (nextKey === firstKey) {
                          newCell = GA.searchForKey(
                            taggedParents[child][course],
                            firstKey
                          );
                          duplicated = false;
                        } else {
                          newCell = GA.searchForKey(
                            dnas[child][course],
                            nextKey
                          );
                        }

                        if (!!newCell) {
                          taggedParents[child][course][year][period][day][
                            cell
                          ].subject = JSON.parse(
                            JSON.stringify(newCell.subject)
                          );
                          taggedParents[child][course][year][period][day][
                            cell
                          ].professor = JSON.parse(
                            JSON.stringify(newCell.professor)
                          );
                          taggedParents[child][course][year][period][day][
                            cell
                          ].key = JSON.parse(JSON.stringify(newCell.key));

                          /* duplicated = GA.searchDuplicatedKey(
                            dnas[child][course],
                            nextKey
                          ); */
                        } else {
                          duplicated = false;
                        }
                      } else {
                        duplicated = false;
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }

      //correcting the professors
      for (let child in taggedParents) {
        for (let course in taggedParents[child]) {
          for (let year in taggedParents[child][course]) {
            for (let period in taggedParents[child][course][year]) {
              for (let day in taggedParents[child][course][year][period]) {
                for (let cell in taggedParents[child][course][year][period][
                  day
                ]) {
                  let subject =
                    taggedParents[child][course][year][period][day][cell]
                      .subject;

                  if (!!subject) {
                    taggedParents[child][course][year][period][day][
                      cell
                    ].professor = JSON.parse(
                      JSON.stringify({
                        ...taggedParents[child][course][year][period][day][cell]
                          .professor,
                        name: courseProfessors[child][course][subject.name],
                      })
                    );
                  }
                }
              }
            }
          }
        }
      }

      let mutadedChildren = mutation([...taggedParents]);
      for (let i in mutadedChildren) {
        mutadedChildren[i].push(fitness(mutadedChildren[i]));
      }

      return mutadedChildren;
    } else return [...parents];
  };

  const tournamentSelection = (population) => {
    let individuals = [
      population[Math.floor(Math.random() * config.maxPopSize)],
      population[Math.floor(Math.random() * config.maxPopSize)],
      population[Math.floor(Math.random() * config.maxPopSize)],
    ];

    let maxScore = Math.max(
      individuals[0][individuals[0].length - 1].score,
      individuals[1][individuals[1].length - 1].score,
      individuals[2][individuals[2].length - 1].score
    );
    return individuals.find(
      (individual) => individual[individual.length - 1].score === maxScore
    );
  };

  const startGeneticAlgorithm = () => {
    let startTimer = performance.now();
    //generates first generation of individuals
    let population = [];
    for (let i = 0; i < config.maxPopSize; i++) {
      let individual = [];
      for (let currentCourse in courseTables) {
        individual = [
          ...individual,
          generateIndividual({ ...courseTables[currentCourse] }),
        ];
      }
      population = [...population, individual];
    }

    //calculates fitness
    for (let i in population) {
      population[i].push(fitness(population[i]));
    }
    //let firstGen = [...population];

    let bestIndividual = [{ score: -1000999 }];
    let bestScoreOfPrevPops = [];
    let bestIndiviualOfEachGeneration = [];
    //start of the generation crossing
    for (let gen = 0; gen < config.generationLimiter; gen++) {
      console.log("generating generation " + gen);
      let newpopulation = [];
      for (let i = 0; i < config.maxPopSize / 2; i++) {
        let parents = [
          tournamentSelection(population),
          tournamentSelection(population),
        ];
        let children = crossover(parents);

        newpopulation = [...newpopulation, ...children];
      }
      population = [...newpopulation];
      let currentBestIndividual = _.maxBy(
        population,
        (individual) => individual[individual.length - 1].score
      );
      bestScoreOfPrevPops = [
        ...bestScoreOfPrevPops,
        currentBestIndividual[currentBestIndividual.length - 1],
      ];
      bestIndiviualOfEachGeneration.push(
        currentBestIndividual[currentBestIndividual.length - 1].score
      );
      if (
        currentBestIndividual[currentBestIndividual.length - 1].score >
        bestIndividual[bestIndividual.length - 1].score
      ) {
        bestIndividual = [...currentBestIndividual];
      }
    }
    let resultText = "";
    for (let i in bestIndiviualOfEachGeneration) {
      resultText += bestIndiviualOfEachGeneration[i] + ", \n";
    }
    console.log(resultText);
    //  console.log(bestIndiviualOfEachGeneration);
    console.log(bestIndividual);
    let result = courseTables.map((course, index) => ({
      ...course,
      schedule: bestIndividual[index],
    }));
    setNewTables(result);
    let finish = performance.now();

    console.log(`Process concluded in ${finish - startTimer} ms`);
  };

  useEffect(() => {
    startGeneticAlgorithm();
    setLoading(false);
  }, []);
  return (
    loading || (
      <div>
        <CourseTables courseTables={newTables} />
      </div>
    )
  );
}

export default GeneticAlgorithm;
