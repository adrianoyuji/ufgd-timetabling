import React, { useState, useEffect, useContext } from "react";
import CourseTables from "../CourseTables";
import * as GA from "./GAUtils";
import _ from "lodash";

import { GlobalContext } from "../../context/global";

const days = ["mon", "tue", "wed", "thu", "fri"];
const periods = ["morning", "afternoon", "evening"];

function GeneticAlgorithm({ courseTables, config, selectedSemester }) {
  const { professors } = useContext(GlobalContext);
  const [newTables, setNewTables] = useState([]);
  const [loading, setLoading] = useState(true);

  const fitness = (individual) => {
    let score = 0;

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
            score += GA.compareNames([...professorList]);
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
                    professor.id ===
                    individual[course][year][period][days[day]][cell].professor
                      .id
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
                        score = score - 10;
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
          if (!!sub && subjectWorkload[name] !== sub.workload) {
            score -= 10;
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
              score += GA.compareSubjects([...subjectList]);
            }
          }
        }
      }
    }

    //checks if subject has the same professor
    for (let course in individual) {
      for (let year in individual[course]) {
        let subjectProfessors = {};
        for (let period in individual[course][year]) {
          for (let day in days) {
            for (let cell in individual[course][year][period][days[day]]) {
              if (
                !!individual[course][year][period][days[day]][cell].professor
              ) {
                if (
                  !subjectProfessors[
                    individual[course][year][period][days[day]][cell].subject
                      .name
                  ]
                ) {
                  subjectProfessors = {
                    ...subjectProfessors,
                    [individual[course][year][period][days[day]][cell].subject
                      .name]: [
                      individual[course][year][period][days[day]][cell]
                        .professor.name,
                    ],
                  };
                } else {
                  subjectProfessors = {
                    ...subjectProfessors,
                    [individual[course][year][period][days[day]][cell].subject
                      .name]: [
                      ...subjectProfessors[
                        individual[course][year][period][days[day]][cell]
                          .subject.name
                      ],
                      individual[course][year][period][days[day]][cell]
                        .professor.name,
                    ],
                  };
                }
              }
            }
          }
        }
        score += GA.compareProfessorSubject({ ...subjectProfessors });
      }
    }

    return { score: score };
  };

  const generateIndividual = (course) => {
    let availableSubjects = course.subjects.filter(
      (subject) => subject.active && subject.semester % 2 === selectedSemester
    );
    let availableProfessors = professors.filter((professor) =>
      professor.courses.some((tag) => tag === course.tag)
    );
    let individual = JSON.parse(JSON.stringify(course.schedule));
    for (let i in availableSubjects) {
      let totalwl = 0;
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
          individual[year][period][day][
            time
          ].professor = GA.preferenceProfessor(
            availableProfessors,
            availableSubjects[i]
          );
        }
      }
    }
    return individual;
  };

  const mutation = (children) => {
    if (config.mutationProbability / 2 - Math.floor(Math.random() * 101) >= 0) {
      //randomly changes the professor
      for (let i in children) {
        for (let j in children[i]) {
          let mutated = false;
          while (!mutated) {
            let randomYear = Math.floor(Math.random() * children[i][j].length);
            let randomPeriod = GA.getValidPeriod(courseTables[j].periods);
            let randomDay = days[Math.floor(Math.random() * 5)];
            let randomTime = Math.floor(Math.random() * 4);
            if (
              !!children[i][j][randomYear][randomPeriod][randomDay][randomTime]
                .professor
            ) {
              let availableProfessors = professors.filter((professor) =>
                professor.courses.some((tag) => tag === courseTables[j].tag)
              );
              children[i][j][randomYear][randomPeriod][randomDay][
                randomTime
              ].professor = GA.preferenceProfessor(
                availableProfessors,
                children[i][j][randomYear][randomPeriod][randomDay][randomTime]
                  .subject
              );
              mutated = true;
            }
          }
        }
      }

      // randomlychanges a cell location
      //TODO MAKE IT CHANGE SUBJECT TO SUBJECT LOCATION
      //TODO RING CELL CHANGE
      for (let i in children) {
        for (let j in children[i]) {
          let mutated = false;
          while (!mutated) {
            let randomYear = Math.floor(Math.random() * children[i][j].length);
            let randomPeriod = GA.getValidPeriod(courseTables[j].periods);
            let randomDay = days[Math.floor(Math.random() * 5)];
            let randomTime = Math.floor(Math.random() * 4);
            if (
              !!children[i][j][randomYear][randomPeriod][randomDay][randomTime]
                .professor &&
              !!children[i][j][randomYear][randomPeriod][randomDay][randomTime]
                .subject
            ) {
              let auxSubject =
                children[i][j][randomYear][randomPeriod][randomDay][randomTime]
                  .subject;
              let auxProfessor =
                children[i][j][randomYear][randomPeriod][randomDay][randomTime]
                  .professor;

              let found = false;
              while (!found) {
                let randomPeriod2 = GA.getValidPeriod(courseTables[j].periods);
                let randomDay2 = days[Math.floor(Math.random() * 5)];
                let randomTime2 = Math.floor(Math.random() * 4);
                if (
                  !children[i][j][randomYear][randomPeriod2][randomDay2][
                    randomTime2
                  ].professor &&
                  !children[i][j][randomYear][randomPeriod2][randomDay2][
                    randomTime2
                  ].subject
                ) {
                  children[i][j][randomYear][randomPeriod2][randomDay2][
                    randomTime2
                  ].professor = auxProfessor;
                  children[i][j][randomYear][randomPeriod2][randomDay2][
                    randomTime2
                  ].subject = auxSubject;

                  children[i][j][randomYear][randomPeriod][randomDay][
                    randomTime
                  ].professor = null;
                  children[i][j][randomYear][randomPeriod][randomDay][
                    randomTime
                  ].subject = null;

                  found = true;
                  mutated = true;
                }
              }
            }
          }
        }
      }

      /*   for (let i in children) {
        for (let j in children[i]) {
          let randomYear = Math.floor(Math.random() * children[i][j].length);
          let randomPeriod = GA.getValidPeriod(courseTables[j].periods);
          let randomDay1 = days[Math.floor(Math.random() * 5)];
          let randomDay2 = days[Math.floor(Math.random() * 5)];
          let aux = [...children[i][j][randomYear][randomPeriod][randomDay1]];
          children[i][j][randomYear][randomPeriod][randomDay1] = [
            ...children[i][j][randomYear][randomPeriod][randomDay2],
          ];
          children[i][j][randomYear][randomPeriod][randomDay2] = [...aux];
        }
      } */
    }
    return children;
  };

  const crossover = (parents) => {
    if (config.crossoverProbability - Math.floor(Math.random() * 101) >= 0) {
      let children = [[], []];
      for (let i = 0; i < parents[0].length - 1; i++) {
        let child1 = [];
        let child2 = [];
        let randomYear = Math.floor(Math.random() * parents[0][i].length);
        for (let j = 0; j < randomYear; j++) {
          child1 = [...child1, { ...parents[0][i][j] }];
          child2 = [...child2, { ...parents[1][i][j] }];
        }
        for (let j = randomYear; j < parents[0][i].length; j++) {
          child2 = [...child2, { ...parents[0][i][j] }];
          child1 = [...child1, { ...parents[1][i][j] }];
        }

        if (!!children.length) {
          children = [
            [...children[0], [...child1]],
            [...children[1], [...child2]],
          ];
        } else {
          children = [[...child1], [...child2]];
        }
      }

      let mutadedChildren = mutation([...children]);
      for (let i in mutadedChildren) {
        mutadedChildren[i].push(fitness(children[i]));
      }

      return [...mutadedChildren];
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

    let bestIndividual = [{ score: -1000 }];
    let bestScoreOfPrevPops = [];

    //start of the generation crossing
    for (let gen = 0; gen < config.generationLimiter; gen++) {
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
      if (
        currentBestIndividual[currentBestIndividual.length - 1].score >=
        bestIndividual[bestIndividual.length - 1].score
      ) {
        bestIndividual = [...currentBestIndividual];
      }
    }

    let result = courseTables.map((course, index) => ({
      ...course,
      schedule: bestIndividual[index],
    }));
    setNewTables(result);
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
