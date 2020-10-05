import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Switch from "@material-ui/core/Switch";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

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
});
function SubjectCard({ subject, handleActive, handleDeleteSubject }) {
  const classes = useStyles();
  const [checked, setChecked] = useState(subject.active);
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="textPrimary" gutterBottom>
          <b>{subject.name}</b>
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {subject.type}
        </Typography>
        <Typography variant="body2" component="p">
          <b>Código: </b>
          {subject.id} <br />
          <b>CH: </b>
          {subject.workload} h/a <br />
          <b>Semestre: </b>
          {subject.semester}
          <br />
          <div className={classes.flexRow}>
            <b className={classes.activeLabel}>Ativo:</b>
            <Switch
              checked={checked}
              onChange={() => {
                handleActive({ ...subject, active: !checked });
                setChecked(!checked);
              }}
              color="primary"
              name="checkedB"
              inputProps={{ "aria-label": "primary checkbox" }}
            />
            <IconButton
              aria-label="delete"
              color="secondary"
              className={classes.deleteIcon}
              onClick={() => handleDeleteSubject({ ...subject })}
            >
              <DeleteIcon />
            </IconButton>
          </div>
        </Typography>
      </CardContent>
    </Card>
  );
}

export default SubjectCard;
