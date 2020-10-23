import React, { useState, useEffect, useContext } from "react";
import _, { cond } from "lodash";
import { GlobalContext } from "../../context/global";

const semesterModifier = (semester) => {
  if (semester === 1) {
    return 1;
  } else {
    return 2;
  }
};

const days = ["mon", "tue", "wed", "thu", "fri"];
const periods = ["morning", "afternoon", "evening"];

function GeneticAlgorithm({ courseTables, config, selectedSemester }) {
  const { professors } = useContext(GlobalContext);
  const [newTables, setNewTables] = useState([]);

  const getValidPeriod = (availablePeriods) => {
    let attempt = null;
    let condition = true;
    while (condition === true) {
      attempt = periods[Math.floor(Math.random() * 3)];
      if (availablePeriods[attempt]) {
        condition = false;
      }
    }
    return attempt;
  };

  const generateIndividual = (course) => {
    let availableSubjects = course.subjects.filter(
      (subject) => subject.active && subject.semester % 2 === selectedSemester
    );
    let individual = { ...course.schedule };
    for (let i in availableSubjects) {
      let totalwl = 0;
      while (totalwl !== availableSubjects[i].workload) {
        let period = getValidPeriod(course.periods);
        let year =
          (availableSubjects[i].semester - semesterModifier(selectedSemester)) /
          2;
        let day = days[Math.floor(Math.random() * 5)];
        let time = Math.floor(Math.random() * 4);
        console.log(period, year, day, time);
        console.log(individual);
        if (!individual[year][period][day][time].subject) {
          individual[year][period][day][time].subject =
            availableSubjects[i].name;
          totalwl += 18;
        }
      }
    }
    return individual;
  };

  const startGeneticAlgorithm = () => {
    for (let currentCourse in courseTables) {
      let initialPopulation = [];
      for (let i = 0; i < config.maxPopSize; i++) {
        initialPopulation.push(
          generateIndividual({ ...courseTables[currentCourse] })
        );
      }
      console.log(initialPopulation);
    }
  };

  const a = startGeneticAlgorithm();
  return <div></div>;
}

export default GeneticAlgorithm;
