import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

//material ui imports
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

function createData(name, periods, semesters, tag) {
  return { name, periods, semesters, tag };
}
const createRows = (courses) => {
  return courses.map((course) => {
    return createData(
      course.name,
      course.periods,
      course.semesters,
      course.tag
    );
  });
};
function CoursePicker({
  courses,
  selectedCourses,
  setSelectedCourses,
  handleStep,
  selectedSemester,
  setSelectedSemester,
}) {
  const classes = useStyles();
  const [checkedCourses, setCheckedCourses] = useState({});
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let tagList = {};
    courses.forEach(
      (course) =>
        (tagList = {
          ...tagList,
          [course.tag]: selectedCourses.some((c) => c.tag === course.tag),
        })
    );

    setCheckedCourses(tagList);
    setRows(createRows(courses));
    setLoading(false);
  }, [courses, selectedCourses]);

  const handleConfirm = () => {
    let validation = false;
    for (let i in checkedCourses) {
      if (checkedCourses[i]) {
        validation = true;
      }
    }
    if (validation) {
      setSelectedCourses(
        courses.filter((course) => checkedCourses[course.tag])
      );
      handleStep(1);
    } else {
      alert("Selecione pelo menos um curso");
    }
  };

  const handleChange = (event, tag) => {
    setCheckedCourses({ ...checkedCourses, [tag]: event.target.checked });
  };

  return (
    loading || (
      <div className={classes.step1}>
        <Typography>Selecione os cursos</Typography>
        <TableContainer component={Paper} className={classes.table}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">
                  <b>Ativo</b>
                </TableCell>
                <TableCell align="left">
                  <b>Curso</b>
                </TableCell>
                <TableCell align="left">
                  <b>Períodos</b>
                </TableCell>
                <TableCell align="left">
                  <b>Semestres</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow key={index}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={checkedCourses[row.tag]}
                      onChange={(event) => handleChange(event, row.tag)}
                    />
                  </TableCell>
                  <TableCell align="left">
                    <b>{row.name}</b>
                  </TableCell>
                  <TableCell align="left">
                    {!!row.periods.morning && "Matutino "}
                    {!!row.periods.afternoon && "Vespertino "}
                    {!!row.periods.evening && "Noturno"}
                  </TableCell>
                  <TableCell align="left">{row.semesters}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div className={classes.buttonContainer}>
          <FormControl>
            <InputLabel>Semestre letivo</InputLabel>
            <Select
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value)}
            >
              <MenuItem value={1}>Primeiro semestre</MenuItem>
              <MenuItem value={0}>Segundo semestre</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={() => handleConfirm()}
          >
            Avançar
          </Button>
        </div>
      </div>
    )
  );
}

export default CoursePicker;

const useStyles = makeStyles((theme) => ({
  step1: {
    height: "auto",
    flex: 1,
  },
  table: { display: "flex", flexGrow: 1 },
  buttonContainer: {
    margin: 8,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  button: {
    margin: theme.spacing(1),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));
