const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

/**
 * Checks if a specific event is occurring on the given Date.
 */
export const isEventOnDate = (event, date) => {
  const checkDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const startDate = new Date(event.year, months.indexOf(event.month), event.day);

  if (checkDate < startDate) return false;

  // 1. Multi-day check
  if (event.isMultiDay && event.endYear && event.endMonth && event.endDay) {
    const endDate = new Date(event.endYear, months.indexOf(event.endMonth), event.endDay);
    return checkDate >= startDate && checkDate <= endDate;
  }

  // 2. Recurring check
  if (event.isRecurring && event.recurrencePattern && event.recurrencePattern !== "none") {
    const pattern = event.recurrencePattern;

    if (pattern === "weekly") {
      return checkDate.getDay() === startDate.getDay();
    }
    if (pattern === "monthly") {
      return checkDate.getDate() === startDate.getDate();
    }
    if (pattern === "monthly_last_saturday") {
      if (checkDate.getDay() !== 6) return false;
      const nextWeek = new Date(
        checkDate.getFullYear(),
        checkDate.getMonth(),
        checkDate.getDate() + 7
      );
      return nextWeek.getMonth() !== checkDate.getMonth();
    }
    if (pattern === "monthly_first_friday") {
      return checkDate.getDay() === 5 && checkDate.getDate() <= 7;
    }
    if (pattern === "monthly_first_sunday") {
      return checkDate.getDay() === 0 && checkDate.getDate() <= 7;
    }
  }

  // 3. Single-day check
  return (
    event.day === checkDate.getDate() &&
    event.year === checkDate.getFullYear() &&
    months.indexOf(event.month) === checkDate.getMonth()
  );
};

/**
 * Gets the venue of an event on a specific Date, considering potential overrides.
 */
export const getEventVenue = (event, date) => {
  if (
    !event.isRecurring ||
    !event.recurrenceVenueOverrides ||
    event.recurrenceVenueOverrides.length === 0
  ) {
    return event.venue;
  }
  const dateKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(
    date.getDate()
  ).padStart(2, "0")}`;

  const override = event.recurrenceVenueOverrides.find((o) => o.dateKey === dateKey);
  return override ? override.venue : event.venue;
};

/**
 * Returns a human-readable representation of the event schedule.
 */
export const getEventDateString = (event) => {
  if (event.isRecurring && event.recurrencePattern && event.recurrencePattern !== "none") {
    switch (event.recurrencePattern) {
      case "weekly":
        return "Every Week";
      case "monthly":
        return "Every Month";
      case "monthly_last_saturday":
        return "Last Saturday of the Month";
      case "monthly_first_friday":
        return "First Friday of the Month";
      case "monthly_first_sunday":
        return "First Sunday of the Month";
      default:
        return "Recurring Program";
    }
  }

  if (event.isMultiDay && event.endDay && event.endMonth && event.endYear) {
    if (event.month === event.endMonth && event.year === event.endYear) {
      return `${event.month} ${event.day} - ${event.endDay}, ${event.year}`;
    }
    return `${event.month} ${event.day}, ${event.year} - ${event.endMonth} ${event.endDay}, ${event.endYear}`;
  }

  return `${event.month} ${event.day}, ${event.year}`;
};
