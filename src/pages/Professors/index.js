import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { GlobalContext } from "../../context/global";

//components
import ProfessorsModal from "../../components/ProfessorsModal";
import ProfessorTable from "../../components/ProfessorTable";

//material ui
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import Divider from "@material-ui/core/Divider";

function Professors() {
  const classes = useStyles();
  const { professors, updateProfessors, courses } = useContext(GlobalContext);
  const [professorModal, setProfessorModal] = useState(null);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    setTags(courses.map((course) => ({ name: course.name, tag: course.tag })));
  }, [courses]);

  const handleAddProfessor = (professorData) => {
    updateProfessors([...professors, professorData]);
  };

  const handleDeleteProfessor = (prof) => {
    updateProfessors(
      professors.filter((proffessor) => proffessor.id !== prof.id)
    );
  };
  const handleEditProfessor = (prof) => {
    updateProfessors(
      professors.map((proffessor) => {
        if (prof.id !== proffessor.id) {
          return proffessor;
        } else {
          return prof;
        }
      })
    );
  };

  const handleActive = (prof) => {
    //changes active state of subject
    updateProfessors(
      professors.map((proffessor) => {
        if (prof.id !== proffessor.id) {
          return proffessor;
        } else {
          return { ...prof, active: !prof.active };
        }
      })
    );
  };

  return (
    <div className={classes.professorContainer}>
      <div className={classes.coursesHeader}>
        <Typography variant="h6" noWrap className={classes.headerTitle}>
          Professores Cadastrados
        </Typography>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          startIcon={<AddIcon />}
          onClick={() => setProfessorModal(true)}
        >
          Adicionar Professor(a)
        </Button>
      </div>
      <Divider />
      <div className={classes.professorList}>
        {!!professors ? (
          <ProfessorTable
            professors={professors}
            handleDeleteProfessor={handleDeleteProfessor}
            handleActive={handleActive}
            handleEditProfessor={setProfessorModal}
          />
        ) : (
          <Typography variant="h6" noWrap>
            Não há professores cadastrados
          </Typography>
        )}
      </div>
      <ProfessorsModal
        open={!!professorModal}
        handleClose={() => setProfessorModal(false)}
        professor={{ ...professorModal }}
        tags={tags}
        handleAddProfessor={handleAddProfessor}
        handleEditProfessor={handleEditProfessor}
      />
    </div>
  );
}

export default Professors;

const useStyles = makeStyles((theme) => ({
  professorContainer: {
    height: "auto",
    flex: 1,
  },
  coursesHeader: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: {
    flexGrow: 1,
  },
  button: {
    margin: theme.spacing(1),
  },
  professorList: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "left",
    alignItems: "center",
    flexWrap: "wrap",
  },
}));
