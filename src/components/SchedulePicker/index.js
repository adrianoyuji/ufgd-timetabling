import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const morning = ["07:20", "08:10", "09:15", "10:05"];
const afternoon = ["13:20", "14:10", "15:15", "16:05"];
const evening = ["19:00", "19:50", "20:50", "21:40"];

function createData(period, mon, tue, wed, thu, fri) {
  return { period, mon, tue, wed, thu, fri };
}

export default function SchedulePicker({ handlePeriod, schedule }) {
  const classes = useStyles();

  const selectColor = { UNAVAILABLE: "secondary", PREFERENCE: "primary" };
  const buttonText = {
    UNAVAILABLE: "INDISPONÍVEL",
    PREFERENCE: "PREFERÊNCIA",
  };

  const createCell = (period, day, time) => {
    let id = null;
    if (
      !!schedule[period] &&
      !!schedule[period][day] &&
      schedule[period][day].some((item) => item.period === time)
    ) {
      schedule[period][day].forEach((item, index) => {
        if (item.period === time) {
          id = index;
        }
      });
      return (
        <Button
          color={selectColor[schedule[period][day][id].status]}
          onClick={() =>
            handlePeriod(period, day, time, schedule[period][day][id].status)
          }
        >
          {buttonText[schedule[period][day][id].status]}
        </Button>
      );
    } else {
      return (
        <Button onClick={() => handlePeriod(period, day, time, "AVAILABLE")}>
          Disponível
        </Button>
      );
    }
  };

  const createRows = () => {
    const morningRows = morning.map((time) => {
      return createData(
        time,
        () => createCell("morning", "mon", time),
        () => createCell("morning", "tue", time),
        () => createCell("morning", "wed", time),
        () => createCell("morning", "thu", time),
        () => createCell("morning", "fri", time)
      );
    });
    const afternoonRows = afternoon.map((time) => {
      return createData(
        time,
        () => createCell("afternoon", "mon", time),
        () => createCell("afternoon", "tue", time),
        () => createCell("afternoon", "wed", time),
        () => createCell("afternoon", "thu", time),
        () => createCell("afternoon", "fri", time)
      );
    });
    const eveningRows = evening.map((time) => {
      return createData(
        time,
        () => createCell("evening", "mon", time),
        () => createCell("evening", "tue", time),
        () => createCell("evening", "wed", time),
        () => createCell("evening", "thu", time),
        () => createCell("evening", "fri", time)
      );
    });
    return [...morningRows, ...afternoonRows, ...eveningRows];
  };

  const rows = createRows();

  return (
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
  );
}
