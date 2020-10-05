import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import SchoolIcon from "@material-ui/icons/School";
import ClassIcon from "@material-ui/icons/Class";
import InfoIcon from "@material-ui/icons/Info";
import HomeIcon from "@material-ui/icons/Home";
import DateRangeIcon from "@material-ui/icons/DateRange";

const drawerWidth = "17.5vw";
const firstSection = [
  { title: "Home", value: "home", icon: <HomeIcon /> },
  {
    title: "Gerar Horários",
    value: "generateSolution",
    icon: <DateRangeIcon />,
  },
  { title: "Sobre", value: "about", icon: <InfoIcon /> },
];
const secondSection = [
  { title: "Cursos", value: "courses", icon: <ClassIcon /> },
  { title: "Professores", value: "professors", icon: <SchoolIcon /> },
];

function DrawerBar({ setScreen }) {
  const classes = useStyles();
  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <Toolbar />
      <div className={classes.drawerContainer}>
        <List>
          {firstSection.map((item, index) => (
            <ListItem
              button
              key={item.title}
              onClick={() => setScreen(item.value)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {secondSection.map((item, index) => (
            <ListItem
              button
              key={item.title}
              onClick={() => setScreen(item.value)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItem>
          ))}
        </List>
      </div>
    </Drawer>
  );
}

export default DrawerBar;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: "auto",
  },
}));
