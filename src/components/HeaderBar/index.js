import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { GlobalContext } from "../../context/global";

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  button: {
    marginLeft: 8,
  },
  title: { flexGrow: 1 },
}));

function HeaderBar({ title, setScreen }) {
  const classes = useStyles();
  const { signed, logout, user } = useContext(GlobalContext);

  const handleLogout = () => {
    logout();
    setScreen("home");
  };

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <Typography variant="h6" noWrap className={classes.title}>
          {title}
        </Typography>
        {signed && <Typography>Olá {user.name}!</Typography>}
        <div className={classes.buttonContainer}>
          {signed || (
            <Button
              variant="contained"
              color="default"
              className={classes.button}
              onClick={() => setScreen("register")}
            >
              Criar Conta
            </Button>
          )}
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            onClick={() => (signed ? handleLogout() : setScreen("login"))}
          >
            {signed ? "Sair" : "Entrar"}
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default HeaderBar;
