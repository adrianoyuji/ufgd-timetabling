import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  root: {
    width: "30%",
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
  tags: { display: "flex", flexDirection: "row" },
  activeLabel: { display: "flex", flexGrow: 1 },
  deleteIcon: {
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  tagSpacing: {
    paddingRight: 4,
  },
});
function ProfessorTable({
  professors,
  handleActive,
  handleDeleteProfessor,
  handleEditProfessor,
}) {
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
              <b>Email</b>
            </TableCell>
            <TableCell align="left">
              <b>Cursos que leciona</b>
            </TableCell>
            <TableCell align="left">
              <b>Ações</b>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {professors.map((professor, index) => (
            <TableRow key={index}>
              <TableCell padding="checkbox">
                <Switch
                  checked={professor.active}
                  onChange={() => {
                    handleActive({ ...professor });
                  }}
                  color="primary"
                  name="checkedB"
                  inputProps={{ "aria-label": "primary checkbox" }}
                />
              </TableCell>
              <TableCell align="left">
                <b>{professor.id}</b>
              </TableCell>
              <TableCell align="left">{professor.name}</TableCell>
              <TableCell align="left">{professor.email}</TableCell>
              <TableCell align="left">
                {professor.courses.map((course) => `${course} `)}
              </TableCell>
              <TableCell align="left">
                <IconButton
                  aria-label="edit"
                  className={classes.deleteIcon}
                  onClick={() => handleEditProfessor({ ...professor })}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  aria-label="delete"
                  color="secondary"
                  className={classes.deleteIcon}
                  onClick={() =>
                    window.confirm(
                      "Tem certeza que deseja remover este professor?"
                    ) && handleDeleteProfessor({ ...professor })
                  }
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

export default ProfessorTable;
