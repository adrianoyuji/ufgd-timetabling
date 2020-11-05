import React, { useEffect, useState } from "react";

//ui material core
import Modal from "@material-ui/core/Modal";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";

//ui material icons
import CloseIcon from "@material-ui/icons/Close";
import SaveIcon from "@material-ui/icons/Save";
import AddIcon from "@material-ui/icons/Add";
import CancelIcon from "@material-ui/icons/Cancel";

//components
import SubjectTable from "../SubjectTable";

const subject_types = ["OBR", "OPT", "ELT", "LEG"];
const workload_options = [36, 54, 72, 108];
const subject_state = {
  id: "",
  name: "",
  type: "OBR",
  workload: 36,
  active: true,
  semester: 1,
};

function SubjectsForm({
  open,
  handleClose,
  course,
  handleSubjectChange,
  setSubjectModal,
}) {
  const classes = useStyles();
  const [newSubject, setNewSubject] = useState({ ...subject_state });
  const [showList, setShowList] = useState(true);
  const [semesterAmount, setSemesterAmount] = useState(0);

  useEffect(() => {
    setShowList(true);
    setNewSubject({ ...subject_state });
    let semesterArr = [];
    for (let i = 0; i < course.semesters; i++) {
      semesterArr.push(i + 1);
    }
    setSemesterAmount(semesterArr);
  }, [open, course]);

  const handleActive = (subj) => {
    //changes active state of subject
    let changeActiveSubject = {
      ...course,
      subjects: course.subjects.map((sub) => {
        if (sub.id === subj.id) {
          return { ...subj, active: !subj.active };
        } else {
          return sub;
        }
      }),
    };
    handleSubjectChange(changeActiveSubject);
    setSubjectModal(changeActiveSubject);
  };
  const handleAddSubject = () => {
    //changes active state of subject
    let subjectArr = {};
    if (!!course.subjects) {
      subjectArr = {
        ...course,
        subjects: [...course.subjects, { ...newSubject }],
      };
    } else {
      subjectArr = {
        ...course,
        subjects: [{ ...newSubject }],
      };
    }

    handleSubjectChange(subjectArr);
    setSubjectModal(subjectArr);
    setShowList(true);
    setNewSubject({ ...subject_state });
  };
  const handleDeleteSubject = (subj) => {
    //deletes subject
    let updatedSubject = {
      ...course,
      subjects: course.subjects.filter((sub) => subj.id !== sub.id),
    };

    handleSubjectChange(updatedSubject);
    setSubjectModal(updatedSubject);
  };

  const renderSubjects = () => {
    return (
      <>
        {!!course.subjects ? (
          subject_types.map((type, index) => {
            return (
              <div className={classes.subjectType} key={index}>
                <div className={classes.typeHeader}>
                  <Typography>
                    <b>{type}</b>
                  </Typography>
                  <Divider />
                </div>

                <div className={classes.subjectList}>
                  <SubjectTable
                    subjects={course.subjects.filter(
                      (subject) => subject.type === type
                    )}
                    handleActive={handleActive}
                    handleDeleteSubject={handleDeleteSubject}
                  />
                </div>
              </div>
            );
          })
        ) : (
          <Typography>Não há disciplinas cadastradas</Typography>
        )}
      </>
    );
  };

  const renderForm = () => {
    return (
      <FormControl component="fieldset" className={classes.subjectForm}>
        <TextField
          type="number"
          label="Código"
          value={newSubject.id}
          placeholder="07008974"
          onChange={(e) => setNewSubject({ ...newSubject, id: e.target.value })}
          className={classes.inputText}
        />
        <TextField
          label="Nome"
          value={newSubject.name}
          placeholder="BANCO DE DADOS I"
          onChange={(e) =>
            setNewSubject({ ...newSubject, name: e.target.value.toUpperCase() })
          }
          className={classes.inputText}
        />
        <FormGroup className={classes.rowForm}>
          <FormControl className={classes.formFlex}>
            <InputLabel htmlFor="age-native-helper">Tipo</InputLabel>
            <Select
              native
              className={classes.formFlex}
              value={newSubject.type}
              onChange={(e) =>
                setNewSubject({
                  ...newSubject,
                  type: e.target.value,
                })
              }
            >
              {subject_types.map((type, i) => (
                <option value={type} key={i}>
                  {type}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl className={classes.formFlex}>
            <InputLabel htmlFor="age-native-helper">Carga horária</InputLabel>
            <Select
              native
              className={classes.formFlex}
              value={newSubject.workload}
              onChange={(e) =>
                setNewSubject({
                  ...newSubject,
                  workload: e.target.value,
                })
              }
            >
              {workload_options.map((type, i) => (
                <option value={type} key={i}>
                  {type}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl className={classes.formFlex}>
            <InputLabel htmlFor="age-native-helper">Semestre</InputLabel>
            <Select
              native
              className={classes.formFlex}
              value={newSubject.semester}
              onChange={(e) =>
                setNewSubject({
                  ...newSubject,
                  semester: e.target.value,
                })
              }
            >
              {semesterAmount.map((type, i) => (
                <option value={type} key={i}>
                  {type}
                </option>
              ))}
            </Select>
          </FormControl>
        </FormGroup>
      </FormControl>
    );
  };

  return (
    <Modal open={open} onClose={handleClose} className={classes.modal}>
      <div className={classes.container}>
        <div className={classes.modalHeader}>
          <Typography className={classes.heading}>
            <b>{showList ? "Disciplinas" : "Cadastrar Disciplina"}</b>
          </Typography>
          <CloseIcon onClick={handleClose} className={classes.closeIcon} />
        </div>
        <Divider />
        <div className={classes.subjectContainer}>
          {showList ? renderSubjects() : renderForm()}
        </div>
        <div className={classes.buttonContainer}>
          {showList ? (
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              startIcon={<AddIcon />}
              onClick={() => setShowList(false)}
            >
              Adicionar Disciplina
            </Button>
          ) : (
            <>
              <Button
                variant="contained"
                className={classes.button}
                startIcon={<CancelIcon />}
                onClick={() => {
                  setShowList(true);
                  setNewSubject({ ...subject_state });
                }}
              >
                Cancelar
              </Button>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                startIcon={<SaveIcon />}
                onClick={() => handleAddSubject()}
              >
                Salvar
              </Button>
            </>
          )}
        </div>
      </div>
    </Modal>
  );
}

export default SubjectsForm;

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  inputText: {
    width: "100%",
    marginBottom: 8,
    marginTop: 8,
  },
  container: {
    display: "flex",
    flexDirection: "column",
    height: window.innerHeight * 0.95,
    width: "95vw",
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    padding: 8,
    "&:focus": {
      outline: "none",
    },
  },
  subjectList: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  subjectType: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
  },
  heading: { flexGrow: 1 },
  modalHeader: {
    display: "flex",
    flexDirection: "row",
    padding: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  rowForm: {
    display: "flex",
    flexDirection: "row",
  },
  formFlex: { flex: 1, marginRight: 8 },
  closeIcon: {
    cursor: "pointer",
  },
  subjectForm: {
    display: "flex",
    flex: 1,
    padding: 8,
    flexGrow: 1,
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
  subjectContainer: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    overflowY: "scroll",
  },
  typeHeader: {
    marginBottom: 16,
  },
}));
