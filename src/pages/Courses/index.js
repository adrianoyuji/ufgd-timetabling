import React, { useState, useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { GlobalContext } from "../../context/global";

//components
import CourseAccordion from "../../components/CourseAccordion";

//material ui
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import Divider from "@material-ui/core/Divider";

function Courses() {
  const classes = useStyles();
  const { courses, updateCourses } = useContext(GlobalContext);

  const handleDeleteCourse = (data) => {
    updateCourses(courses.filter((item) => item.id !== data.id));
  };

  return (
    <div className={classes.coursesContainer}>
      <div className={classes.coursesHeader}>
        <Typography variant="h6" noWrap className={classes.headerTitle}>
          Cursos Cadastrados
        </Typography>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          startIcon={<AddIcon />}
        >
          Adicionar Curso
        </Button>
      </div>
      <Divider />
      <div className={classes.courseList}>
        {!!courses ? (
          courses.map((course, index) => (
            <CourseAccordion
              course={course}
              key={course.tag}
              handleDeleteCourse={handleDeleteCourse}
            />
          ))
        ) : (
          <Typography variant="h6" noWrap>
            Não há cursos cadastrados
          </Typography>
        )}
      </div>
    </div>
  );
}

export default Courses;

const useStyles = makeStyles((theme) => ({
  coursesContainer: {
    height: "auto",
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
  courseList: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
}));
