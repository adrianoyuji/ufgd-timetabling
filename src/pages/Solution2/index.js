import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { GlobalContext } from "../../context/global";

//material ui
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepButton from "@material-ui/core/StepButton";

//components
import CoursePicker from "../../components/CoursePicker";
import CourseSettings from "../../components/CourseSettings";
import GeneticAlgorithm from "../../components/GeneticAlgorithm";

function Solution2() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [selectedSemester, setSelectedSemester] = useState(1);
  const [courseTables, setCourseTables] = useState([]);
  const [config, setConfig] = useState({
    maxPopSize: 50,
    mutationProbability: 15,
    crossoverProbability: 100,
    generationLimiter: 10,
  });
  const { courses } = useContext(GlobalContext);

  const handleStep = (step) => {
    setActiveStep(step);
  };

  const renderStepContent = {
    0: () => (
      <CoursePicker
        selectedSemester={selectedSemester}
        setSelectedSemester={setSelectedSemester}
        courses={courses}
        selectedCourses={selectedCourses}
        setSelectedCourses={setSelectedCourses}
        handleStep={handleStep}
      />
    ),
    1: () => (
      <CourseSettings
        selectedSemester={selectedSemester}
        selectedCourses={selectedCourses}
        setCourseTables={setCourseTables}
        courseTables={courseTables}
        handleStep={handleStep}
        config={config}
        setConfig={setConfig}
      />
    ),
    2: () => (
      <GeneticAlgorithm
        courseTables={courseTables}
        config={config}
        selectedSemester={selectedSemester}
      />
    ),
    3: () => "STEP 4",
  };

  return (
    <div className={classes.solutionContainer}>
      <Stepper activeStep={activeStep}>
        <Step>
          <StepButton onClick={() => handleStep(0)}>Cursos</StepButton>
        </Step>
        <Step>
          <StepButton onClick={() => handleStep(1)}>Configuração</StepButton>
        </Step>
        <Step>
          <StepButton onClick={() => handleStep(2)}>Gerar Horários</StepButton>
        </Step>
        <Step>
          <StepButton onClick={() => handleStep(3)}>Resultado</StepButton>
        </Step>
      </Stepper>
      <div>{renderStepContent[activeStep]()}</div>
    </div>
  );
}

export default Solution2;

const useStyles = makeStyles((theme) => ({
  solutionContainer: {
    height: "auto",
    flex: 1,
  },
}));
