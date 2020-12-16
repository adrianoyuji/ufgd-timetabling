import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { GlobalContext } from "../../context/global";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
  },
  input: { width: "70%", marginBottom: 16 },
  button: { width: "70%" },
  error: {
    color: "red",
    fontSize: 16,
    marginTop: 32,
  },
  message: {
    fontSize: 18,
    marginTop: 32,
  },
}));

function Register({ setScreen }) {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState({ status: false, message: "" });
  const { registerUser } = useContext(GlobalContext);

  const handleSubmit = async () => {
    if (!name || !email || !password || !repeatPassword) {
      setError({ status: true, message: "Preencha todos os campos!" });
    } else if (password.length < 6) {
      setError({
        status: true,
        message: "A senha deve conter no mínimo 6 caractéres",
      });
    } else {
      if (password === repeatPassword) {
        const response = await registerUser(name, email, password);
        if (response) {
          setScreen("home");
        } else {
          setError({ status: true, message: "Email já cadastrado" });
        }
      } else {
        setError({ status: true, message: "Senhas não coincidem!" });
      }
    }
  };

  return (
    <div className={classes.container}>
      <Typography className={classes.message}>
        Cadastre uma conta para utilizar os recursos!
      </Typography>
      <TextField
        required
        label="Nome"
        defaultValue=""
        onChange={(data) => {
          setName(data.target.value);
          setError({ status: false, message: "" });
        }}
        className={classes.input}
      />
      <TextField
        required
        label="Email"
        defaultValue=""
        onChange={(data) => {
          setEmail(data.target.value);
          setError({ status: false, message: "" });
        }}
        className={classes.input}
      />
      <TextField
        required
        label="Senha"
        defaultValue=""
        type="password"
        onChange={(data) => {
          setPassword(data.target.value);
          setError({ status: false, message: "" });
        }}
        className={classes.input}
      />
      <TextField
        required
        label="Repita a Senha"
        defaultValue=""
        type="password"
        onChange={(data) => {
          setRepeatPassword(data.target.value);
          setError({ status: false, message: "" });
        }}
        className={classes.input}
      />
      <Button
        onClick={handleSubmit}
        variant="contained"
        color="secondary"
        className={classes.button}
      >
        Cadastrar
      </Button>
      {error.status && (
        <Typography className={classes.error}>{error.message}</Typography>
      )}
    </div>
  );
}

export default Register;
