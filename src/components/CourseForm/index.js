import React, { useEffect, useState } from "react";

//ui material core
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

//ui material icons
import CloseIcon from "@material-ui/icons/Close";
import SaveIcon from "@material-ui/icons/Save";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";

function CourseForm({
  open,
  handleClose,
  course,
  handleSaveCourse,
  handleEditCourse,
}) {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [tag, setTag] = useState("");
  const [semesters, setSemesters] = useState("");
  const [periods, setPeriods] = useState({
    morning: false,
    afternoon: false,
    evening: false,
  });

  useEffect(() => {
    if (!!course.name) {
      setName(course.name);
      setTag(course.tag);
      setSemesters(course.semesters);
      setPeriods(course.periods);
    } else {
      setName("");
      setTag("");
      setSemesters("");
      setPeriods({
        morning: false,
        afternoon: false,
        evening: false,
      });
    }
  }, [course, open]);

  const handleReset = () => {
    if (!!course.name) {
      setName(course.name);
      setTag(course.tag);
      setSemesters(course.semesters);
      setPeriods(course.periods);
    } else {
      setName("");
      setTag("");
      setSemesters("");
      setPeriods({
        morning: false,
        afternoon: false,
        evening: false,
      });
    }
  };

  const handleChange = (event) => {
    setPeriods({ ...periods, [event.target.name]: event.target.checked });
  };

  const validadeForm = () => {
    if (
      !!name &&
      !!tag &&
      !!semesters &&
      (periods.morning || periods.evening || periods.afternoon)
    ) {
      if (course.name) {
        handleEditCourse({
          _id: course._id,
          name: name,
          tag: tag,
          periods: { ...periods },
          semesters: semesters,
          subjects: [...course.subjects],
        });
        handleClose();
        setName("");
        setTag("");
        setSemesters("");
        setPeriods({
          morning: false,
          afternoon: false,
          evening: false,
        });
      } else {
        handleSaveCourse({
          name: name,
          tag: tag,
          periods: { ...periods },
          semesters: semesters,
        });
        handleClose();
        setName("");
        setTag("");
        setSemesters("");
        setPeriods({
          morning: false,
          afternoon: false,
          evening: false,
        });
      }
    } else {
      alert("Preencha todos os campos");
    }
  };

  return (
    <Modal open={open} onClose={handleClose} className={classes.modal}>
      <div className={classes.container}>
        <div className={classes.modalHeader}>
          <Typography className={classes.heading}>
            <b>{!!course.name ? course.name : "Cadastrar Curso"}</b>
          </Typography>
          <CloseIcon onClick={handleClose} className={classes.closeIcon} />
        </div>
        <Divider />
        <FormControl component="fieldset" className={classes.courseForm}>
          <TextField
            label="Nome do curso"
            value={name}
            placeholder="Engenharia de computação"
            onChange={(e) => setName(e.target.value)}
            className={classes.inputText}
            variant="outlined"
          />

          <TextField
            label="Tag"
            value={tag}
            disabled={!!course.name}
            placeholder="EC"
            onChange={(e) => setTag(e.target.value.toUpperCase())}
            className={classes.inputText}
            variant="outlined"
          />

          <TextField
            label="Duração:(Em semestres)"
            type="number"
            value={semesters}
            placeholder="8"
            onChange={(e) => setSemesters(e.target.value)}
            className={classes.inputText}
            variant="outlined"
          />

          <FormGroup>
            <FormLabel component="legend">Períodos</FormLabel>
            <FormControlLabel
              control={
                <Checkbox
                  checked={periods.morning}
                  onChange={handleChange}
                  name="morning"
                />
              }
              label="Matutino"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={periods.afternoon}
                  onChange={handleChange}
                  name="afternoon"
                />
              }
              label="Vespertino"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={periods.evening}
                  onChange={handleChange}
                  name="evening"
                />
              }
              label="Noturno"
            />
          </FormGroup>
        </FormControl>
        <div className={classes.buttonContainer}>
          <Button
            variant="contained"
            className={classes.button}
            startIcon={<RotateLeftIcon />}
            onClick={() => handleReset()}
          >
            Reiniciar
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="large"
            className={classes.button}
            startIcon={<SaveIcon />}
            onClick={() => validadeForm()}
          >
            Salvar
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default CourseForm;

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    height: window.innerHeight * 0.8,
    width: "50vw",
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    padding: 8,
    "&:focus": {
      outline: "none",
    },
  },
  heading: { flexGrow: 1 },
  modalHeader: {
    display: "flex",
    flexDirection: "row",
    padding: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  closeIcon: {
    cursor: "pointer",
  },
  courseForm: {
    padding: 8,
    flexGrow: 1,
  },
  inputText: {
    width: "100%",
    marginBottom: 8,
    marginTop: 8,
  },
  inputLabel: {
    paddingTop: 4,
    paddingBottom: 4,
  },
  button: {
    margin: theme.spacing(1),
  },
  buttonContainer: {
    margin: 8,
    display: "flex",
    flexDirection: "row",
    alignSelf: "flex-end",
  },
}));
