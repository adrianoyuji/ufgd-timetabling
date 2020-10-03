import React from "react";

//material ui
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import SubjectIcon from "@material-ui/icons/Subject";

function CourseAccordion({ course, handleDeleteCourse }) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const renderPeriods = (periods) => {
    let periodText = "";
    if (periods.morning) {
      periodText += " Matutino";
    }
    if (periods.afternoon) {
      periodText += " Vespertino";
    }
    if (periods.evening) {
      periodText += " Noturno";
    }
    return periodText;
  };

  return (
    <div className={classes.root}>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography className={classes.heading}>
            <b>{course.name}</b>
          </Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.accordion}>
          <div className={classes.accordionDetails}>
            <Typography>
              <b>Duração:</b> {course.years} anos
            </Typography>
            <Typography>
              <b>Tag:</b> {course.tag}
            </Typography>
            <Typography>
              <b>Períodos:</b> {renderPeriods(course.periods)}
            </Typography>
          </div>
          <div className={classes.accordionButtons}>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              startIcon={<SubjectIcon />}
              //onClick={()=>null}
            >
              Disciplinas
            </Button>
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
              startIcon={<DeleteIcon />}
              onClick={() => handleDeleteCourse(course)}
            >
              Remover
            </Button>
            <Button
              variant="contained"
              className={classes.button}
              startIcon={<EditIcon />}
              // onClick={()=>null}
            >
              Editar
            </Button>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default CourseAccordion;

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    margin: 2,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0,
  },
  accordionDetails: {
    flex: 1,
    flexDirection: "column",
    height: "auto",
  },
  accordionButtons: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  accordion: {
    flex: 1,
    flexDirection: "column",
  },
  button: {
    margin: theme.spacing(1),
  },
}));
