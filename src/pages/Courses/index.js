import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { GlobalContext } from "../../context/global";

//components
import CourseAccordion from "../../components/CourseAccordion";
import CourseForm from "../../components/CourseForm";
import SubjectsForm from "../../components/SubjectsForm";

//material ui
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import Divider from "@material-ui/core/Divider";

function Courses() {
  const classes = useStyles();
  const { courses, updateCourses, updateProfessors, professors } = useContext(
    GlobalContext
  );
  const [courseModal, setCourseModal] = useState(null);
  const [subjectModal, setSubjectModal] = useState(null);

  const handleDeleteCourse = (data) => {
    //remove curso
    updateCourses(courses.filter((item) => item.id !== data.id));

    //remove curso de professores
    updateProfessors(
      professors.map((professor) => {
        let index = professor.courses.indexOf(data.tag);
        if (index === -1) {
          return professor;
        } else {
          professor.courses.splice(index, 1);
          if (!professor.courses.length) {
            professor.active = false;
          }
          return professor;
        }
      })
    );
  };

  const handleSaveCourse = (form) => {
    updateCourses([...courses, { ...form }]);
  };

  const handleEditCourse = (form) => {
    updateCourses(
      courses.map((course) => {
        if (course.id === form.id) {
          return { ...form };
        } else {
          return course;
        }
      })
    );
  };

  const handleSubjectChange = (form) => {
    updateCourses(
      courses.map((course) => {
        if (course.id === form.id) {
          return { ...form };
        } else {
          return course;
        }
      })
    );
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
          onClick={() => setCourseModal(true)}
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
              setCourseModal={setCourseModal}
              setSubjectModal={setSubjectModal}
            />
          ))
        ) : (
          <Typography variant="h6" noWrap>
            Não há cursos cadastrados
          </Typography>
        )}
      </div>
      <CourseForm
        open={!!courseModal}
        handleClose={() => setCourseModal(false)}
        course={{ ...courseModal }}
        handleSaveCourse={handleSaveCourse}
        handleEditCourse={handleEditCourse}
      />
      <SubjectsForm
        open={!!subjectModal}
        setSubjectModal={setSubjectModal}
        handleClose={() => setSubjectModal(false)}
        course={{ ...subjectModal }}
        handleSubjectChange={handleSubjectChange}
      />
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
