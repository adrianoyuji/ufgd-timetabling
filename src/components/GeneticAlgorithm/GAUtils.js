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
  if (priorityList.length) {
    return priorityList[Math.floor(Math.random() * (priorityList.length - 1))];
  } else {
    return professorList[
      Math.floor(Math.random() * (professorList.length - 1))
    ];
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
  return total * 20;
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
        } else {
          total--;
        }
      }
    }
  }
  return total * 5;
};

export const checkSubjectSequence = (arrOfNames) => {
  let total = 0;
  for (let i = 0; i < arrOfNames.length; i++) {
    if (!!arrOfNames[i] && !!arrOfNames[i + 1]) {
      if (arrOfNames[i].name === arrOfNames[i + 1].name) {
        total++;
      } else {
        total--;
      }
    }
  }
  return total * 1.5;
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

  return total;
};

export const searchForKey = (child, key) => {
  for (let year in child) {
    for (let period in child[year]) {
      for (let day in child[year][period]) {
        for (let cell in child[year][period][day]) {
          if (child[year][period][day][cell].key === key) {
            return child[year][period][day][cell];
          }
        }
      }
    }
  }
  return null;
};

export const searchDuplicatedKey = (child, key) => {
  for (let year in child) {
    for (let period in child[year]) {
      for (let day in child[year][period]) {
        for (let cell in child[year][period][day]) {
          if (child[year][period][day][cell].key === key) {
            return true;
          }
        }
      }
    }
  }
  return false;
};

export const findMostFrequentSubject = (array) => {
  let occurances = {};

  for (let i in array) {
    if (array[i]) {
      if (!!occurances[array[i].name]) {
        occurances = {
          ...occurances,
          [array[i].name]: occurances[array[i].name] + 1,
        };
      } else {
        occurances = { ...occurances, [array[i].name]: 1 };
      }
    }
  }

  for (let key in occurances) {
    if (occurances[key] === 4) {
      return [key, occurances[key]];
    }
    if (occurances[key] === 3) {
      return [key, occurances[key]];
    }
    if (occurances[key] === 2) {
      return [key, occurances[key]];
    }
  }
  return null;
};
