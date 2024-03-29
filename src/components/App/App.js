import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

//layout
import Toolbar from "@material-ui/core/Toolbar";
import HeaderBar from "../HeaderBar";
import DrawerBar from "../DrawerBar";

//components

import Home from "../../pages/Home";
import Professors from "../../pages/Professors";
import Courses from "../../pages/Courses";
import About from "../../pages/About";
import Solution from "../../pages/Solution2";
import Register from "../../pages/Register";
import Login from "../../pages/Login";

function App() {
  const classes = useStyles();
  const [screen, setScreen] = useState("generateSolution");

  const HeaderTitle = {
    home: "Home",
    professors: "Professores",
    courses: "Cursos",
    about: "Sobre",
    generateSolution: "Gerar solução",
    register: "Cadastrar",
    login: "Entrar",
  };

  const renderScreen = {
    home: () => <Home />,
    professors: () => <Professors />,
    courses: () => <Courses />,
    about: () => <About />,
    generateSolution: () => <Solution />,
    register: () => <Register setScreen={setScreen} />,
    login: () => <Login setScreen={setScreen} />,
  };

  return (
    <div className={classes.App}>
      <HeaderBar
        title={HeaderTitle[screen]}
        setScreen={(value) => setScreen(value)}
      />
      <DrawerBar setScreen={setScreen} />
      <div className={classes.content}>
        <Toolbar />
        {renderScreen[screen]()}
      </div>
    </div>
  );
}

export default App;

const useStyles = makeStyles((theme) => ({
  App: {
    display: "flex",
    height: window.innerHeight,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));
