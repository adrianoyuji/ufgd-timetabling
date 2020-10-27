import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import CloseIcon from "@material-ui/icons/Close";
import Divider from "@material-ui/core/Divider";

function TableCellForm({ open, handleClose, onChange, cell }) {
  const classes = useStyles();
  const [subject, setSubject] = useState("");
  const [professor, setProfessor] = useState("");

  useEffect(() => {
    setSubject(!!cell.subject ? cell.subject : "");
    setProfessor(!!cell.professor ? cell.professor : "");
  }, [cell]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      className={classes.modal}
    >
      <div className={classes.container}>
        <div className={classes.modalHeader}>
          <Typography className={classes.heading}>
            <b>Editar Célula</b>
          </Typography>
          <CloseIcon onClick={handleClose} className={classes.closeIcon} />
        </div>
        <Divider />
        <FormControl>
          <TextField
            label="Nome da Disciplina"
            value={subject}
            placeholder="BANCO DE DADOS I"
            onChange={(e) => setSubject(e.target.value.toUpperCase())}
            className={classes.inputText}
          />
          <TextField
            label="Nome do Professor"
            value={professor}
            placeholder="João Silva"
            onChange={(e) => setProfessor(e.target.value)}
            className={classes.inputText}
          />
        </FormControl>
        <div className={classes.buttonContainer}>
          <Button
            className={classes.button}
            variant="contained"
            onClick={() => handleClose()}
          >
            Cancelar
          </Button>
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            onClick={() => {
              onChange({
                ...cell,
                subject: { name: subject },
                professor: { name: professor },
              });
              handleClose();
            }}
          >
            Salvar
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default TableCellForm;

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  heading: { flexGrow: 1 },
  closeIcon: {
    cursor: "pointer",
  },
  inputText: {
    width: "100%",
    marginBottom: 8,
    marginTop: 8,
  },
  formFlex: { flex: 1, marginRight: 8 },

  container: {
    display: "flex",
    flexDirection: "column",
    height: "auto",
    width: "auto",
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    padding: 8,
    "&:focus": {
      outline: "none",
    },
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
  modalHeader: {
    display: "flex",
    flexDirection: "row",
    padding: 4,
    justifyContent: "center",
    alignItems: "center",
  },
}));
