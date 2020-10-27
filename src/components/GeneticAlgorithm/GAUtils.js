export const getValidPeriod = (availablePeriods) => {
  let attempt = null;
  let condition = true;
  const periods = ["morning", "afternoon", "evening"];
  while (condition === true) {
    attempt = periods[Math.floor(Math.random() * 3)];
    if (availablePeriods[attempt]) {
      condition = false;
    }
  }
  return attempt;
};

export const preferenceProfessor = (professorList, course) => {
  let priorityList = professorList.filter((professor) =>
    professor.preferences.subjects.some((sub) => sub.name === course.name)
  );
  if (priorityList.length > 0) {
    return priorityList[Math.floor(Math.random() * priorityList.length)];
  } else {
    return professorList[Math.floor(Math.random() * professorList.length)];
  }
};

export const semesterModifier = (semester) => {
  if (semester === 1) {
    return 1;
  } else {
    return 2;
  }
};

export const compareNames = (arrOfNames) => {
  let total = 0;
  for (let i = 0; i < arrOfNames.length; i++) {
    for (let j = i + 1; j < arrOfNames.length; j++) {
      if (
        j !== arrOfNames.length &&
        !!arrOfNames[i].name &&
        !!arrOfNames[j].name
      ) {
        if (arrOfNames[i].name === arrOfNames[j].name) {
          total--;
        }
      }
    }
  }
  return total * 10;
};
