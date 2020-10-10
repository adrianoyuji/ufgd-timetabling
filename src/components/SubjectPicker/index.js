import React, { useEffect, useState, useContext } from "react";
import { GlobalContext } from "../../context/global";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core";

function SubjectPicker({ coursesTags, onChange }) {
  const [input, setInput] = useState("");
  const [filteredSubjects, setFilteredSubjects] = useState([]);
  const classes = useStyles();
  const { courses } = useContext(GlobalContext);
  useEffect(() => {
    if (input.length >= 3) {
      let subjectsArr = [];
      courses.forEach((course) => {
        if (coursesTags.some((tag) => course.tag === tag)) {
          let aux = course.subjects.filter((sub) =>
            sub.name.includes(input.toUpperCase())
          );
          if (!!aux.length) {
            subjectsArr.push(...aux);
          }
        }
      });
      setFilteredSubjects(subjectsArr);
    } else {
      setFilteredSubjects([]);
    }
  }, [input, coursesTags, courses]);

  return (
    <div>
      <TextField
        value={input}
        placeholder="CALCULO I"
        onChange={(e) => {
          setInput(e.target.value);
        }}
        className={classes.inputText}
      />

      {!!filteredSubjects.length ? (
        <Paper elevation={3} className={classes.paper}>
          {filteredSubjects.map((sub, index) => (
            <div
              className={classes.subjOption}
              key={index}
              onClick={() => {
                onChange(sub);
                setInput("");
              }}
            >
              <Typography>{sub.name}</Typography>
            </div>
          ))}
        </Paper>
      ) : null}
    </div>
  );
}

export default SubjectPicker;

const useStyles = makeStyles((theme) => ({
  inputText: {
    width: "100%",
    marginBottom: 8,
    marginTop: 8,
  },
  paper: {
    display: "flex",
    width: "95%",
    flexDirection: "column",
    position: "absolute",
    padding: theme.spacing(1),
    zIndex: 3,
    maxHeight: window.innerHeight * 0.2,
    overflowY: "scroll",
  },
  subjOption: {
    padding: 4,
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#f5f5f5",
    },
  },
}));
