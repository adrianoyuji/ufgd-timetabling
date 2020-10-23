import React, { useEffect, useState } from "react";
import TableCellForm from "../TableCellForm";
import GASettings from "../GASettings";

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
import Button from "@material-ui/core/Button";

//icons
import SettingsIcon from "@material-ui/icons/Settings";

//empty states
import { years_state } from "../../data/index";

const empty_cell = {
  period: "",
  subject: null,
  professor: null,
  day: null,
  index: null,
  year: null,
};

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
  yearTitle: {
    paddingTop: 16,
    paddingBottom: 16,
  },
}));

const createSemesterArray = (semestersSize, semester) => {
  //1 for first semester and 0 for second semester
  let arr = [];
  if (semester % 2 === 0) {
    for (let i = 2; i <= semestersSize; i = i + 2) {
      arr = [...arr, i];
    }
  } else {
    for (let i = 1; i <= semestersSize; i = i + 2) {
      arr = [...arr, i];
    }
  }

  return arr;
};

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

export default function CourseSettings({
  selectedCourses,
  setCourseTables,
  courseTables,
  selectedSemester,
  handleStep,
  config,
  setConfig,
}) {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [settings, setSettings] = useState(false);
  const [selectedCell, setSelectecCell] = useState({
    ...empty_cell,
  });

  useEffect(() => {
    let semesters = [];
    let semesterSchedule = [];
    setCourseTables(
      selectedCourses.map((course) => {
        semesters = createSemesterArray(course.semesters, selectedSemester);
        semesterSchedule = semesters.map((num) => {
          let sch = {};
          if (course.periods.morning) {
            sch = { ...sch, morning: { ...years_state.morning } };
          }
          if (course.periods.afternoon) {
            sch = { ...sch, afternoon: { ...years_state.afternoon } };
          }
          if (course.periods.evening) {
            sch = { ...sch, evening: { ...years_state.evening } };
          }
          return sch;
        });
        return { ...course, schedule: semesterSchedule };
      })
    );
    setLoading(false);
  }, [selectedCourses, selectedSemester, setCourseTables]);

  const updateCell = (newCell) => {
    let updated = courseTables.map((course, i) => {
      if (i !== value) {
        return { ...course };
      } else {
        return {
          ...course,
          schedule: course.schedule.map((year, id) => {
            if (id === newCell.year) {
              return {
                ...year,
                [newCell.period]: {
                  ...year[newCell.period],
                  [newCell.day]: year[newCell.period][newCell.day].map(
                    (day, j) => {
                      if (j !== newCell.index) {
                        return { ...day };
                      } else {
                        return {
                          period: day.period,
                          subject: newCell.subject,
                          professor: newCell.professor,
                        };
                      }
                    }
                  ),
                },
              };
            } else {
              return { ...year };
            }
          }),
        };
      }
    });
    setCourseTables(updated);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const createCell = (period, day, cell, index, year) => {
    return (
      <Button
        color={!!cell.subject ? "primary" : "default"}
        onClick={() => {
          setSelectecCell({ ...cell, day, period, index, year });
          setModal(true);
        }}
      >
        {!!cell.subject ? <b>{cell.subject.name}</b> : "Livre"}
      </Button>
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
    loading || (
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
        <div className={classes.buttonContainer}>
          <Button
            className={classes.button}
            variant="contained"
            startIcon={<SettingsIcon />}
            onClick={() => setSettings(true)}
          >
            Configurações Avançadas
          </Button>
          <Button
            className={classes.button}
            color="primary"
            variant="contained"
            onClick={() => window.confirm("Deseja Continuar?") && handleStep(2)}
          >
            Avançar
          </Button>
        </div>
        {
          <TableCellForm
            open={modal}
            handleClose={() => {
              setModal(false);
              setSelectecCell({
                ...empty_cell,
              });
            }}
            onChange={updateCell}
            cell={selectedCell}
          />
        }
        {
          <GASettings
            open={settings}
            handleClose={() => {
              setSettings(false);
            }}
            onChange={setConfig}
            config={config}
          />
        }
      </div>
    )
  );
}
