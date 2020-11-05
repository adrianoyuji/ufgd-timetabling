export const getValidPeriod = (availablePeriods) => {
  let attempt = null;
  let condition = true;
  const periods = ["morning", "afternoon", "evening"];
  while (condition === true) {
    attempt = periods[Math.floor(Math.random() * 3)];
    if (!!availablePeriods[attempt]) {
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
export const compareSubjects = (arrOfNames) => {
  let total = 0;
  for (let i = 0; i < arrOfNames.length; i++) {
    for (let j = i + 1; j < arrOfNames.length; j++) {
      if (
        j !== arrOfNames.length &&
        !!arrOfNames[i].name &&
        !!arrOfNames[j].name
      ) {
        if (arrOfNames[i].name === arrOfNames[j].name) {
          total++;
        }
      }
    }
  }
  return total * 2;
};

export const compareProfessorSubject = (array) => {
  let total = 0;
  for (let subject in array) {
    for (let i = 0; i < array[subject].length; i++) {
      for (let j = i + 1; j < array[subject].length; j++) {
        if (
          j !== array[subject].length &&
          !!array[subject][i] &&
          !!array[subject][j]
        ) {
          if (array[subject][i] === array[subject][j]) {
            total++;
          }
        }
      }
    }
  }
  if (total > 0) {
    console.log(array);
  }
  return total;
};
