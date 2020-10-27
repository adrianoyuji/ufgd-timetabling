import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import CloseIcon from "@material-ui/icons/Close";
import Divider from "@material-ui/core/Divider";

//icons
import RotateLeftIcon from "@material-ui/icons/RotateLeft";

const reset_state = {
  maxPopSize: 100,
  mutationProbability: 15,
  crossoverProbability: 50,
  generationLimiter: 20,
};

function GASettings({ open, handleClose, onChange, config }) {
  const classes = useStyles();
  const [params, setParams] = useState({ ...config });

  useEffect(() => {
    setParams({ ...config });
  }, [open, config]);

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
            <b>Configurações avançadas</b>
          </Typography>
          <CloseIcon onClick={handleClose} className={classes.closeIcon} />
        </div>
        <Divider />
        <FormControl className={classes.form}>
          <TextField
            label="Tamanho máximo da população"
            value={params.maxPopSize}
            type="number"
            onChange={(e) =>
              setParams({ ...params, maxPopSize: e.target.value })
            }
            className={classes.inputText}
          />
          <TextField
            label="Probabilidade de mutação (%)"
            value={params.mutationProbability}
            InputProps={{ inputProps: { min: 0, max: 100 } }}
            type="number"
            onChange={(e) => {
              if (e.target.value > 100) {
                setParams({ ...params, mutationProbability: 100 });
              } else if (e.target.value < 0 || e.target.value === "") {
                setParams({ ...params, mutationProbability: 0 });
              } else {
                setParams({ ...params, mutationProbability: e.target.value });
              }
            }}
            className={classes.inputText}
          />
          <TextField
            label="Probabilidade de CrossOver (%)"
            value={params.crossoverProbability}
            InputProps={{ inputProps: { min: 0, max: 100 } }}
            type="number"
            onChange={(e) => {
              if (e.target.value > 100) {
                setParams({ ...params, crossoverProbability: 100 });
              } else if (e.target.value < 0 || e.target.value === "") {
                setParams({ ...params, crossoverProbability: 0 });
              } else {
                setParams({ ...params, crossoverProbability: e.target.value });
              }
            }}
            className={classes.inputText}
          />
          <TextField
            label="Limitador de Geração"
            value={params.generationLimiter}
            type="number"
            onChange={(e) =>
              setParams({ ...params, generationLimiter: e.target.value })
            }
            className={classes.inputText}
          />
        </FormControl>
        <div className={classes.buttonContainer}>
          <Button
            className={classes.button}
            variant="contained"
            startIcon={<RotateLeftIcon />}
            onClick={() => onChange({ ...reset_state })}
          >
            Restaurar
          </Button>
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            onClick={() => {
              onChange({ ...params });
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

export default GASettings;

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

  form: { display: "flex", flexGrow: 1 },
  container: {
    display: "flex",
    flexDirection: "column",
    height: "auto",
    width: "auto",
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    padding: 16,
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
