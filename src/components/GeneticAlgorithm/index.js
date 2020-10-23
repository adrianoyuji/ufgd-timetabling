import React, { useState, useEffect, useContext } from "react";
import _ from "lodash";
import { GlobalContext } from "../../context/global";

function GeneticAlgorithm({ courseTables, config, selectedSemester }) {
  const { professors } = useContext(GlobalContext);
  const [newTables, setNewTables] = useState([]);

  const generateIndividual = (course) => {};

  const startGeneticAlgorithm = () => {
    for (let currentCourse in courseTables) {
      let initialPopulation = [];
      for (let i = 0; i < config.maxPopSize; i++) {
        initialPopulation.push(
          generateIndividual({ ...courseTables[currentCourse] })
        );
      }
    }
  };

  return <div></div>;
}

export default GeneticAlgorithm;
