import React, { useState, useEffect, useContext } from "react";
import CourseTables from "../CourseTables";
import * as GA from "./GAUtils";

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
      if (professorWorkload[name] > 20 || professorWorkload[name] < 8) {
        score -= 10;
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

  const startGeneticAlgorithm = () => {
    //generates first generation of individuals
    let initialPopulation = [];
    for (let i = 0; i < config.maxPopSize; i++) {
      let individual = [];
      for (let currentCourse in courseTables) {
        individual = [
          ...individual,
          generateIndividual({ ...courseTables[currentCourse] }),
        ];
      }
      initialPopulation = [...initialPopulation, individual];
    }

    //calculates fitness
    for (let i in initialPopulation) {
      initialPopulation[i].push(fitness(initialPopulation[i]));
    }

    console.log(initialPopulation);
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
