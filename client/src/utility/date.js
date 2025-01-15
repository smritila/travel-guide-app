export function getFormattedDateAndTime(date, time) {
  return new Date(date).toDateString().concat(", ", time);
}

export function getDateDifference(date1, date2, unit = "days") {
  // Parse the dates to ensure they are Date objects
  const d1 = new Date(date1);
  const d2 = new Date(date2);

  // Check if the dates are valid
  if (isNaN(d1) || isNaN(d2)) {
    throw new Error("Invalid date(s) provided.");
  }

  // Calculate the difference in milliseconds
  const differenceInMs = Math.abs(d2 - d1);

  // Convert the difference based on the requested unit
  switch (unit) {
    case "days":
      return Math.floor(differenceInMs / (1000 * 60 * 60 * 24));
    default:
      throw new Error(
        "Invalid unit. Use 'seconds', 'minutes', 'hours', or 'days'."
      );
  }
}
