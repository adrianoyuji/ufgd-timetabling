import React, { useState, useContext, useEffect } from "react";
import { GlobalContext } from "../../context/global";
import { empty_years } from "../../data/index";
import { parseYear } from "../../utils/parseData";
import _ from "lodash";
import ParamsForm from "../../components/ParamsForm";

const days = ["monday", "tuesday", "wednesday", "thursday", "friday"];
const years = [
  "firstYear",
  "secondYear",
  "thirdYear",
  "fourthYear",
  "fifthYear",
];
const periods = [
  "Days/Periods",
  "7:20 AM",
  "8:10 AM",
  "09:15 AM",
  "10:05 AM",
  "13:20 AM",
  "14:10 AM",
  "15:15 AM",
  "16:05 AM",
];

function Solution() {
  const { professors, subjects } = useContext(GlobalContext);
  const [semester, setSemester] = useState(1); //1 is first semester of the year and 0 is the second semester of the year
  const [renderTable, setRenderTable] = useState(false);
  const [yearTables, setYearTables] = useState(empty_years);
  const [GAparams, setGAparams] = useState({
    maxPopSize: 100,
    mutationProbability: 15,
    crossoverProbability: 50,
    generationLimiter: 20,
  });

  const semesterModifier = () => {
    if (semester === 1) {
      return 1;
    } else {
      return 2;
    }
  };

  const generateIndividual = () => {
    let randomYear, randomDay, randomPeriod, randomProfessor;
    let newIndividual = JSON.parse(JSON.stringify(empty_years));

    subjects.forEach((subject, index) => {
      if (subject.semester % 2 === semester) {
        for (let i = 0; i < subject.workload / 36; i++) {
          randomYear = years[(subject.semester - semesterModifier()) / 2];
          randomDay = days[Math.floor(Math.random() * (4 - 0 + 1)) + 0];
          randomPeriod = Math.floor(Math.random() * (7 - 0 + 1)) + 0;
          randomProfessor =
            Math.floor(Math.random() * (professors.length - 1 - 0 + 1)) + 0;

          newIndividual[randomYear][randomDay][randomPeriod].subject = subject;
          newIndividual[randomYear][randomDay][randomPeriod].professor =
            professors[randomProfessor];
        }
      }
    });
    //setYearTables(newIndividual);
    return newIndividual;
  };

  function fitness(individual) {
    //a score of zero means the solution is perfect
    //a negative score means the solution is garbage
    let score = 0;

    //check if subject's is in correct year -hard constraint
    for (let year in individual) {
      for (let day in individual[year]) {
        individual[year][day].forEach((period) => {
          if (!!period.subject) {
            if (period.subject.semester !== parseYear(year) - semester) {
              score -= 10;
            } //else score += 10;
          }
        });
      }
    }
    //subject has incorrect workload -hard constraint
    let subjectWorkload = 0;
    subjects.forEach((subject) => {
      if (subject.semester % 2 === semester) {
        subjectWorkload = 0;
        for (let year in individual) {
          for (let day in individual[year]) {
            individual[year][day].forEach((period) => {
              if (!!period.subject) {
                if (period.subject.name === subject.name) {
                  subjectWorkload += 36;
                }
              }
            });
          }
        }
        if (subject.workload !== subjectWorkload) {
          score -= 10;
        } // else score += 5;
      }
    });

    //professor has less than min hours or over max hours a week - hard constraint
    /* let profWorkload = 0;
    professors.forEach((professor) => {
      profWorkload = 0;
      for (let year in individual) {
        for (let day in individual[year]) {
          individual[year][day].forEach((period) => {
            if (!!period.professor) {
              if (period.professor.name === professor.name) {
                profWorkload += 10;
              }
            }
          });
        }
      }
      if (
        professor.workload.min > profWorkload ||
        professor.workload.max < profWorkload
      ) {
        score -= 10;
      }
    }); */
    //professor x can teach only one class at one time. - hard constraint
    days.forEach((day) => {
      for (let i = 0; i < 8; i++) {
        let professorNames = ["", "", "", "", ""];
        if (!!individual["firstYear"][day][i].professor) {
          professorNames[0] = individual["firstYear"][day][i].professor.name;
        }
        if (!!individual["secondYear"][day][i].professor) {
          professorNames[1] = individual["secondYear"][day][i].professor.name;
        }
        if (!!individual["thirdYear"][day][i].professor) {
          professorNames[2] = individual["thirdYear"][day][i].professor.name;
        }
        if (!!individual["fourthYear"][day][i].professor) {
          professorNames[3] = individual["fourthYear"][day][i].professor.name;
        }
        if (!!individual["fifthYear"][day][i].professor) {
          professorNames[4] = individual["fifthYear"][day][i].professor.name;
        }

        for (let x = 0; x < professorNames.length; x++) {
          if (!!professorNames[x]) {
            for (let y = 0; y < professorNames.length; y++) {
              if (
                !!professorNames[y] &&
                x !== y &&
                professorNames[x] === professorNames[y]
              ) {
                score -= 10;
              }
            }
          }
        }
      }
    });
    //check if professor's preferences matches current allocation - soft
    /*  for (let year in individual) {
      for (let day in individual[year]) {
        for (let i = 0; i < 8; i++) {
          if (!!individual[year][day][i].subject) {
            for (let j = 0; j < 8; j++) {
              if (!!individual[year][day][j].subject && i !== j) {
                if (
                  individual[year][day][i].subject.name ===
                  individual[year][day][j].subject.name
                ) {
                  score += 5;
                }
              }
            }
          }
        }
      }
    } */

    //both subjects classes in the same day -soft

    individual.score = score;
  }

  function tournamentSelection(population) {
    let individuals = [
      population[Math.floor(Math.random() * (GAparams.maxPopSize - 0)) + 0],
      population[Math.floor(Math.random() * (GAparams.maxPopSize - 0)) + 0],
      population[Math.floor(Math.random() * (GAparams.maxPopSize - 0)) + 0],
    ];

    let maxScore = Math.max(
      individuals[0].score,
      individuals[1].score,
      individuals[2].score
    );

    return individuals.find((individual) => individual.score === maxScore);
  }

  function crossover(parents) {
    let ind1 = parents[0];
    let ind2 = parents[1];
    let child1 = JSON.parse(JSON.stringify(empty_years));
    let child2 = JSON.parse(JSON.stringify(empty_years));
    if (
      GAparams.crossoverProbability -
        Math.floor(Math.random() * (100 - 0 + 1)) >
      0
    ) {
      if (Math.floor(Math.random() * (100 - 0 + 1)) > 50) {
        //crossover days of each year
        years.forEach((year) => {
          let randomDay = Math.floor(Math.random() * (4 + 1));

          days.forEach((day, index) => {
            if (index <= randomDay) {
              child1[year][days[index]] = ind1[year][days[index]];
              child2[year][days[index]] = ind2[year][days[index]];
            } else {
              child1[year][days[index]] = ind2[year][days[index]];
              child2[year][days[index]] = ind1[year][days[index]];
            }
          });
        });
      } else {
        //crossover months of each year
        years.forEach((year) => {
          let randomDay = Math.floor(Math.random() * (4 + 1));

          days.forEach((day, index) => {
            if (index <= randomDay) {
              child1[year] = ind1[year];
              child2[year] = ind2[year];
            } else {
              child1[year] = ind2[year];
              child2[year] = ind1[year];
            }
          });
        });
      }
      fitness(child1);
      fitness(child2);

      return [child1, child2];
    } else return [ind1, ind2];
  }

  function mutation(children) {
    //randomly picks a year, day and period and sets a random value to professor and/or subject
    if (
      GAparams.mutationProbability / 2 -
        Math.floor(Math.random() * (100 - 0 + 1)) >
      0
    ) {
      let randomYear = years[Math.floor(Math.random() * (4 - 0 + 1)) + 0];
      let randomDay = days[Math.floor(Math.random() * (4 - 0 + 1)) + 0];
      let randomPeriod = Math.floor(Math.random() * (7 - 0 + 1)) + 0;
      let randomProfessor =
        Math.floor(Math.random() * (professors.length - 1 - 0 + 1)) + 0;
      let randomSubject =
        Math.floor(Math.random() * (subjects.length - 1 - 0 + 1)) + 0;
      /*if (subjects[randomSubject].semester % 2 === semester) {
        children[0][randomYear][randomDay][randomPeriod].subject =
          subjects[randomSubject]
      };*/
      children[0][randomYear][randomDay][randomPeriod].professor =
        professors[randomProfessor];
      fitness(children[0]);
    }
    if (
      GAparams.mutationProbability / 2 -
        Math.floor(Math.random() * (100 - 0 + 1)) >
      0
    ) {
      let randomYear = years[Math.floor(Math.random() * (4 - 0 + 1)) + 0];
      let randomDay = days[Math.floor(Math.random() * (4 - 0 + 1)) + 0];
      let randomPeriod = Math.floor(Math.random() * (7 - 0 + 1)) + 0;
      let randomProfessor =
        Math.floor(Math.random() * (professors.length - 1 - 0 + 1)) + 0;
      let randomSubject =
        Math.floor(Math.random() * (subjects.length - 1 - 0 + 1)) + 0;
      if (subjects[randomSubject].semester % 2 === semester) {
        /* children[1][randomYear][randomDay][randomPeriod].subject =
          subjects[randomSubject]; */
        children[1][randomYear][randomDay][randomPeriod].professor =
          professors[randomProfessor];
      }

      fitness(children[1]);
    }
    if (
      GAparams.mutationProbability / 2 -
        Math.floor(Math.random() * (100 - 0 + 1)) >
      0
    ) {
      let randomYear = years[Math.floor(Math.random() * (4 - 0 + 1)) + 0];
      let randomDay = days[Math.floor(Math.random() * (4 - 0 + 1)) + 0];
      let randomPeriod = Math.floor(Math.random() * (7 - 0 + 1)) + 0;

      children[0][randomYear][randomDay][randomPeriod].subject = null;

      children[0][randomYear][randomDay][randomPeriod].professor = null;
      fitness(children[0]);
    }
    if (
      GAparams.mutationProbability / 2 -
        Math.floor(Math.random() * (100 - 0 + 1)) >
      0
    ) {
      let randomYear = years[Math.floor(Math.random() * (4 - 0 + 1)) + 0];
      let randomDay = days[Math.floor(Math.random() * (4 - 0 + 1)) + 0];
      let randomPeriod = Math.floor(Math.random() * (7 - 0 + 1)) + 0;

      children[1][randomYear][randomDay][randomPeriod].subject = null;

      children[1][randomYear][randomDay][randomPeriod].professor = null;
      fitness(children[1]);
    }
  }

  const startGA = () => {
    let population = [],
      newPopulation = [],
      parents = [],
      children = [];
    let bestIndividual = 0;
    let generationCounter = 0;

    let foundSolution = false;
    // starts a new random population
    for (let i = 0; i < GAparams.maxPopSize; i++) {
      population.push(generateIndividual());
    }
    //evaluates first population
    population.forEach((individual) => fitness(individual));

    while (foundSolution === false) {
      //generates a new population based on the previous generation
      for (let w = 0; w < GAparams.maxPopSize / 2; w++) {
        //selects 2 individuals through tournament selection
        parents = [
          tournamentSelection(population),
          tournamentSelection(population),
        ];
        //crossover the 2 selected individuals
        children = crossover(parents);
        //new individuals may suffer mutation
        mutation(children);
        newPopulation.push(children[0], children[1]);
        //reset variables
        parents = [];
        children = [];
      }

      bestIndividual = _.maxBy(newPopulation, (individual) => individual.score);
      population = newPopulation;
      newPopulation = [];
      /* if (bestIndividual.score >= 0) {
        foundSolution = true;
      } */
      generationCounter++;
      if (
        !!GAparams.generationLimiter &&
        GAparams.generationLimiter === generationCounter
      ) {
        foundSolution = true;
      }
    }
    console.log(generationCounter);
    setYearTables(bestIndividual);
    setRenderTable(true);
  };

  const printTables = () => {
    return years.map((year, index) => (
      <div key={index}>
        <h3>{year}</h3>

        <table>
          <tbody>
            <tr>
              {periods.map((period) => (
                <th key={period}>{period}</th>
              ))}
            </tr>
            {days.map((day, index) => (
              <tr key={index}>
                <th>{day}</th>
                {yearTables[year][day].map((classes, index) => (
                  <th key={index}>
                    {classes.subject && <> Subject: {classes.subject.name}</>}
                    <br></br>
                    {classes.subject && (
                      <> Professor: {classes.professor.name}</>
                    )}
                    <br></br>
                    {classes.subject && (
                      <> Correct semester: {classes.subject.semester}</>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ));
  };

  return (
    <div className="solution">
      <ParamsForm GAparams={GAparams} setGAparams={setGAparams} />
      <button
        onClick={() => {
          startGA();
        }}
      >
        Start
      </button>
      {renderTable && <h5>SCORE: {yearTables.score}</h5>}
      {renderTable && printTables()}
    </div>
  );
}

export default Solution;

/*   let randomDay = days[Math.floor(Math.random() * (4 - 0 + 1)) + 0];
      let randomPeriod = Math.floor(Math.random() * (7 - 0 + 1)) + 0;   */
