function getWeekInMonth(date) {
  // Parse the input date
  const moment = require("moment");
  const givenDate = moment(date);

  // Get the first day of the month
  const startOfMonth = givenDate.clone().startOf("month");

  // Calculate the week number within the month
  const weekNumber = Math.ceil(
    (givenDate.date() - startOfMonth.date() + 1) / 7
  );

  return weekNumber;
}

module.exports = getWeekInMonth;
