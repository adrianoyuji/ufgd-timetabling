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

function Login({ setScreen }) {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({ status: false, message: "" });
  const { loginUser } = useContext(GlobalContext);

  const handleSubmit = async () => {
    if (!email || !password) {
      setError({ status: true, message: "Preencha todos os campos!" });
    } else {
      const response = await loginUser(email, password);
      if (response) {
        setScreen("home");
      } else {
        setError({ status: true, message: "Usuário ou senha incorretos" });
      }
    }
  };

  return (
    <div className={classes.container}>
      <Typography className={classes.message}>
        Insira seu email e senha para efetuar o login
      </Typography>
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
      <Button
        onClick={handleSubmit}
        variant="contained"
        color="secondary"
        className={classes.button}
      >
        Logar
      </Button>
      {error.status && (
        <Typography className={classes.error}>{error.message}</Typography>
      )}
    </div>
  );
}

export default Login;
