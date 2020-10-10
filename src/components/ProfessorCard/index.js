import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Switch from "@material-ui/core/Switch";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

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
function ProfessorCard({
  professor,
  handleActive,
  handleDeleteProfessor,
  handleEditProfessor,
}) {
  const classes = useStyles();
  const [checked, setChecked] = useState(professor.active);
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="textPrimary" gutterBottom>
          <b>{professor.name}</b>
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {professor.email}
        </Typography>
        <Typography variant="body2" component="p">
          <b>Código: </b>
          {professor.id} <br />
          <b>CH: </b>
          min:{professor.workload.min} h/a max:{professor.workload.max} h/a{" "}
          <br />
        </Typography>
        <Typography className={classes.tags}>
          <b>Cursos que leciona: </b>
          {professor.courses.map((tag) => (
            <span key={tag} className={classes.tagSpacing}>
              {tag}
            </span>
          ))}
        </Typography>
        <br />
        <div className={classes.flexRow}>
          <Typography className={classes.activeLabel}>
            <b>Ativo:</b>
          </Typography>
          <Switch
            checked={checked}
            onChange={() => {
              handleActive({ ...professor, active: !checked });
              setChecked(!checked);
            }}
            color="primary"
            name="checkedB"
            inputProps={{ "aria-label": "primary checkbox" }}
          />
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
            onClick={() => handleDeleteProfessor({ ...professor })}
          >
            <DeleteIcon />
          </IconButton>
        </div>
      </CardContent>
    </Card>
  );
}

export default ProfessorCard;
