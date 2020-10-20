import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  root: {
    width: "18%",
    margin: "1%",
    height: "auto",
    maxHeight: 240,
    display: "flex",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    flexGrow: 1,
    marginBottom: 12,
  },
  flexRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  activeLabel: { display: "flex", flexGrow: 1 },
  deleteIcon: {
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  table: { maxWidth: "65%" },
});
function SubjectTable({ subjects, handleActive, handleDeleteSubject }) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper} className={classes.table}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">
              <b>Ativo</b>
            </TableCell>
            <TableCell align="left">
              <b>Código</b>
            </TableCell>
            <TableCell align="left">
              <b>Nome</b>
            </TableCell>
            <TableCell align="left">
              <b>Tipo</b>
            </TableCell>
            <TableCell align="left">
              <b>CH</b>
            </TableCell>
            <TableCell align="left">
              <b>Semestre</b>
            </TableCell>
            <TableCell align="left">
              <b>Ações</b>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {subjects.map((subject, index) => (
            <TableRow key={index}>
              <TableCell padding="checkbox">
                <Switch
                  checked={subject.active}
                  onChange={() => {
                    handleActive({ ...subject });
                  }}
                  color="primary"
                  name="checkedB"
                  inputProps={{ "aria-label": "primary checkbox" }}
                />
              </TableCell>
              <TableCell align="left">
                <b>{subject.id}</b>
              </TableCell>
              <TableCell align="left">{subject.name}</TableCell>
              <TableCell align="left">{subject.type}</TableCell>
              <TableCell align="left">{subject.workload}</TableCell>
              <TableCell align="left">{subject.semester}</TableCell>
              <TableCell align="left">
                <IconButton
                  aria-label="delete"
                  color="secondary"
                  className={classes.deleteIcon}
                  onClick={() => handleDeleteSubject({ ...subject })}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default SubjectTable;
