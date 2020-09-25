export const parseYear = (year) => {
  switch (year) {
    case "firstYear":
      return 2;
    case "secondYear":
      return 4;
    case "thirdYear":
      return 6;
    case "fourthYear":
      return 8;
    case "fifthYear":
      return 10;
    default:
      return "invalid number";
  }
};

export const parseDay = (number) => {
  switch (number) {
    case 0:
      return "monday";
    case 1:
      return "tuesday";
    case 2:
      return "wednesday";
    case 3:
      return "thursday";
    case 4:
      return "friday";
    default:
      return "invalid number";
  }
};
