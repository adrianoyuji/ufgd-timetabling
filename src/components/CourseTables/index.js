import React, { useState } from "react";

//material UI
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
  table: {
    minWidth: 650,
  },
  button: {
    margin: theme.spacing(1),
  },
  buttonContainer: {
    margin: 8,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  flexColumn: {
    margin: 8,
    display: "flex",
    flexDirection: "column",
  },
  yearTitle: {
    paddingTop: 16,
    paddingBottom: 16,
  },
}));

const morning = ["07:20", "08:10", "09:15", "10:05"];
const afternoon = ["13:20", "14:10", "15:15", "16:05"];
const evening = ["19:00", "19:50", "20:50", "21:40"];

function createData(period, mon, tue, wed, thu, fri) {
  return { period, mon, tue, wed, thu, fri };
}

const renderSemesterYear = {
  0: () => "Primeiro Ano",
  1: () => "Segundo Ano",
  2: () => "Terceiro Ano",
  3: () => "Quarto Ano",
  4: () => "Quinto Ano",
  5: () => "Sexto Ano",
};

export default function CourseTables({ courseTables }) {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const createCell = (period, day, cell, index, year) => {
    return (
      <div className={classes.flexColumn}>
        {!!cell.subject ? <b>{cell.subject.name}</b> : "Livre"}
        {!!cell.professor ? cell.professor.name : null}
      </div>
    );
  };

  const createRows = (schedule, year) => {
    let morningRows = [];
    let afternoonRows = [];
    let eveningRows = [];

    if (!!schedule.morning) {
      morningRows = morning.map((time, index) => {
        return createData(
          time,
          () =>
            createCell(
              "morning",
              "mon",
              schedule.morning.mon[index],
              index,
              year
            ),
          () =>
            createCell(
              "morning",
              "tue",
              schedule.morning.tue[index],
              index,
              year
            ),
          () =>
            createCell(
              "morning",
              "wed",
              schedule.morning.wed[index],
              index,
              year
            ),
          () =>
            createCell(
              "morning",
              "thu",
              schedule.morning.thu[index],
              index,
              year
            ),
          () =>
            createCell(
              "morning",
              "fri",
              schedule.morning.fri[index],
              index,
              year
            )
        );
      });
    }
    if (!!schedule.afternoon) {
      afternoonRows = afternoon.map((time, index) => {
        return createData(
          time,
          () =>
            createCell(
              "afternoon",
              "mon",
              schedule.afternoon.mon[index],
              index,
              year
            ),
          () =>
            createCell(
              "afternoon",
              "tue",
              schedule.afternoon.tue[index],
              index,
              year
            ),
          () =>
            createCell(
              "afternoon",
              "wed",
              schedule.afternoon.wed[index],
              index,
              year
            ),
          () =>
            createCell(
              "afternoon",
              "thu",
              schedule.afternoon.thu[index],
              index,
              year
            ),
          () =>
            createCell(
              "afternoon",
              "fri",
              schedule.afternoon.fri[index],
              index,
              year
            )
        );
      });
    }
    if (!!schedule.evening) {
      eveningRows = evening.map((time, index) => {
        return createData(
          time,
          () =>
            createCell(
              "evening",
              "mon",
              schedule.evening.mon[index],
              index,
              year
            ),
          () =>
            createCell(
              "evening",
              "tue",
              schedule.evening.tue[index],
              index,
              year
            ),
          () =>
            createCell(
              "evening",
              "wed",
              schedule.evening.wed[index],
              index,
              year
            ),
          () =>
            createCell(
              "evening",
              "thu",
              schedule.evening.thu[index],
              index,
              year
            ),
          () =>
            createCell(
              "evening",
              "fri",
              schedule.evening.fri[index],
              index,
              year
            )
        );
      });
    }
    return [...morningRows, ...afternoonRows, ...eveningRows];
  };

  const renderTableSettings = (course) => {
    return course.schedule.map((year, index) => {
      let rows = createRows(year, index);

      return (
        <div key={index}>
          <Typography variant="h5" className={classes.yearTitle}>
            {renderSemesterYear[index]()}
          </Typography>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">
                    <b>Horário</b>
                  </TableCell>
                  <TableCell align="center">
                    <b>Segunda-Feira</b>
                  </TableCell>
                  <TableCell align="center">
                    <b>Terça-Feira</b>
                  </TableCell>
                  <TableCell align="center">
                    <b>Quarta-Feira</b>
                  </TableCell>
                  <TableCell align="center">
                    <b>Quinta-Feira</b>
                  </TableCell>
                  <TableCell align="center">
                    <b>Sexta-Feira</b>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell align="left" component="th" scope="row">
                      <b>{row.period}</b>
                    </TableCell>
                    <TableCell align="center">{row.mon()}</TableCell>
                    <TableCell align="center">{row.tue()}</TableCell>
                    <TableCell align="center">{row.wed()}</TableCell>
                    <TableCell align="center">{row.thu()}</TableCell>
                    <TableCell align="center">{row.fri()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      );
    });
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          {courseTables.map((course, index) => (
            <Tab label={course.name} {...a11yProps(index)} key={index} />
          ))}
        </Tabs>
      </AppBar>
      {courseTables.map((course, index) => (
        <TabPanel value={value} index={index} key={index}>
          {renderTableSettings(course)}
        </TabPanel>
      ))}
    </div>
  );
}
