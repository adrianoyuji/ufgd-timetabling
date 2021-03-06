import React, { useEffect, useState } from "react";
import SchedulePicker from "../SchedulePicker";
import SubjectPicker from "../SubjectPicker";

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
import Chip from "@material-ui/core/Chip";

//ui material icons
import CloseIcon from "@material-ui/icons/Close";
import SaveIcon from "@material-ui/icons/Save";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";

// states

const professor_state = {
  name: "",
  email: "",
  code: "",
  workload: { min: 8, max: 20 },
  preferences: { schedule: {}, subjects: [] },
  active: true,
  courses: [],
};

function ProfessorsModal({
  open,
  handleClose,
  professor,
  tags,
  handleAddProfessor,
  handleEditProfessor,
}) {
  const classes = useStyles();
  const [professorState, setProfessorState] = useState({ ...professor_state });

  useEffect(() => {
    if (!!professor.name) {
      setProfessorState({ ...professor });
    } else setProfessorState({ ...professor_state });
  }, [open, professor]);

  const handleReset = () => {
    if (!!professor.name) {
      setProfessorState({ ...professor });
    } else setProfessorState({ ...professor_state });
  };

  const handlePeriod = (period, day, time, status) => {
    //AVAILABLE -> PREFERENCE -> UNAVAILABLE -> AVAILABLE
    let newSchedule = {};
    switch (status) {
      case "AVAILABLE":
        newSchedule = {
          ...professorState.preferences.schedule,
          [period]: !!professorState.preferences.schedule[period]
            ? {
                ...professorState.preferences.schedule[period],
                [day]: !!professorState.preferences.schedule[period][day]
                  ? [
                      ...professorState.preferences.schedule[period][day],
                      { period: time, status: "PREFERENCE" },
                    ]
                  : [{ period: time, status: "PREFERENCE" }],
              }
            : {
                [day]: [{ period: time, status: "PREFERENCE" }],
              },
        };
        setProfessorState({
          ...professorState,
          preferences: { ...professorState.preferences, schedule: newSchedule },
        });
        break;
      case "PREFERENCE":
        newSchedule = {
          ...professorState.preferences.schedule,
          [period]: {
            ...professorState.preferences.schedule[period],
            [day]: professorState.preferences.schedule[period][day].map(
              (item) => {
                if (item.period === time) {
                  return { period: item.period, status: "UNAVAILABLE" };
                } else {
                  return item;
                }
              }
            ),
          },
        };

        setProfessorState({
          ...professorState,
          preferences: { ...professorState.preferences, schedule: newSchedule },
        });
        break;
      case "UNAVAILABLE":
        newSchedule = {
          ...professorState.preferences.schedule,
          [period]: {
            ...professorState.preferences.schedule[period],
            [day]: professorState.preferences.schedule[period][day].filter(
              (item) => item.period !== time
            ),
          },
        };

        setProfessorState({
          ...professorState,
          preferences: { ...professorState.preferences, schedule: newSchedule },
        });
        break;
      default:
        break;
    }
  };

  const handleSubjectPicker = (newSubject) => {
    if (
      !professorState.preferences.subjects.some(
        (sub) => sub.name === newSubject.name
      )
    ) {
      setProfessorState({
        ...professorState,
        preferences: {
          ...professorState.preferences,
          subjects: [...professorState.preferences.subjects, newSubject],
        },
      });
    }
  };

  const handleChipDelete = (sub) => {
    setProfessorState({
      ...professorState,
      preferences: {
        ...professorState.preferences,
        subjects: professorState.preferences.subjects.filter(
          (item) => item.name !== sub.name
        ),
      },
    });
  };

  const handleChange = (event) => {
    if (event.target.checked) {
      setProfessorState({
        ...professorState,
        courses: [...professorState.courses, event.target.name],
      });
    } else {
      setProfessorState({
        ...professorState,
        courses: professorState.courses.filter(
          (courseTag) => courseTag !== event.target.name
        ),
      });
    }
  };

  const validadeForm = () => {
    if (
      !!professorState.name &&
      !!professorState.email &&
      !!professorState.code
    ) {
      if (!!professor.name) {
        handleEditProfessor({ ...professorState });
        handleClose();
        setProfessorState({ ...professor_state });
      } else {
        handleAddProfessor(professorState);
        handleClose();
        setProfessorState({ ...professor_state });
      }
    } else {
      alert("Preencha todos os campso");
    }
  };

  return (
    <Modal open={open} onClose={handleClose} className={classes.modal}>
      <div className={classes.container}>
        <div className={classes.modalHeader}>
          <Typography className={classes.heading}>
            {!!professor.name ? (
              <b>Editar Professor</b>
            ) : (
              <b>Cadastrar Professor</b>
            )}
          </Typography>
          <CloseIcon onClick={handleClose} className={classes.closeIcon} />
        </div>
        <Divider />
        <FormControl component="fieldset" className={classes.professorForm}>
          <TextField
            disabled={!!professor.name ? true : false}
            type="number"
            label="Código do professor(a)"
            value={professorState.code}
            placeholder="07008974"
            onChange={(e) =>
              setProfessorState({ ...professorState, code: e.target.value })
            }
            className={classes.inputText}
          />
          <TextField
            label="Nome"
            value={professorState.name}
            placeholder="João Silva"
            onChange={(e) =>
              setProfessorState({ ...professorState, name: e.target.value })
            }
            className={classes.inputText}
          />
          <TextField
            label="Email"
            value={professorState.email}
            placeholder="joaosilva@ufgd.edui.br"
            onChange={(e) =>
              setProfessorState({ ...professorState, email: e.target.value })
            }
            className={classes.inputText}
          />
          <FormGroup>
            <FormLabel>Cursos que leciona</FormLabel>
            {tags.map((tag) => (
              <FormControlLabel
                key={tag.tag}
                control={
                  <Checkbox
                    checked={professorState.courses.some(
                      (courseTag) => courseTag === tag.tag
                    )}
                    onChange={handleChange}
                    name={tag.tag}
                  />
                }
                label={tag.name}
              />
            ))}
          </FormGroup>
          <FormGroup>
            <FormLabel className={classes.formLabel}>
              Disciplinas Preferidas
            </FormLabel>
            <SubjectPicker
              coursesTags={professorState.courses}
              onChange={handleSubjectPicker}
            />
            <div className={classes.subjectsChips}>
              {!!professorState.preferences.subjects.length
                ? professorState.preferences.subjects.map((sub, index) => (
                    <Chip
                      label={sub.name}
                      onDelete={() => handleChipDelete(sub)}
                      key={index}
                      className={classes.chip}
                      color="primary"
                    />
                  ))
                : null}
            </div>
          </FormGroup>
          <FormGroup>
            <FormLabel className={classes.formLabel}>
              Horários disponíveis
            </FormLabel>
            <SchedulePicker
              handlePeriod={handlePeriod}
              schedule={professorState.preferences.schedule}
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

export default ProfessorsModal;

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
    width: "80vw",
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
  professorForm: {
    padding: 8,
    flexGrow: 1,
    overflowY: "scroll",
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
  subjectsChips: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  chip: {
    margin: 4,
  },
  formLabel: {
    marginTop: 8,
    marginBottom: 8,
  },
}));
