// Enum for the days of the week
enum Day {
  Monday = "Monday",
  Tuesday = "Tuesday",
  Wednesday = "Wednesday",
  Thursday = "Thursday",
  Friday = "Friday",
  Saturday = "Saturday",
  Sunday = "Sunday",
}

// Function to map a Date object to a Day enum
function getDayFromDate(date: Date): Day {
  const days = [
    Day.Sunday, // 0
    Day.Monday, // 1
    Day.Tuesday, // 2
    Day.Wednesday, // 3
    Day.Thursday, // 4
    Day.Friday, // 5
    Day.Saturday, // 6
  ];

  return days[date.getDay()];
}

// Function to determine if working day
function isWorkingDay(date: Date, shiftNumber: number): string {
  const shift1: Record<Day, boolean> = {
    [Day.Monday]: false,
    [Day.Tuesday]: true,
    [Day.Wednesday]: false,
    [Day.Thursday]: true,
    [Day.Friday]: true,
    [Day.Saturday]: false,
    [Day.Sunday]: false,
  };

  const shift2: Record<Day, boolean> = {
    [Day.Monday]: true,
    [Day.Tuesday]: false,
    [Day.Wednesday]: true,
    [Day.Thursday]: false,
    [Day.Friday]: false,
    [Day.Saturday]: true,
    [Day.Sunday]: true,
  };

  const day: Day = getDayFromDate(date);

  switch (shiftNumber) {
    case 1:
      return shift1[day]
        ? "Lucrezi : pregateste-te sa livrezi !"
        : "Nu lucrezi !!!";
    case 2:
      return shift2[day]
        ? "Lucrezi : pregateste-te sa livrezi !"
        : "Nu lucrezi !!!";
    default:
      return "Invalid shift number. Please enter 1 or 2.";
  }
}

// Ensure that the DOM is fully loaded before attaching event listeners
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded and parsed.");

  const formElement = document.getElementById("working-day-form");
  const datePickerElement = document.getElementById("date-picker");
  const shiftSelectElement = document.getElementById("shift-select");
  const resultElement = document.getElementById("result");

  if (
    !formElement ||
    !datePickerElement ||
    !shiftSelectElement ||
    !resultElement
  ) {
    console.error("One or more elements were not found in the DOM.");
    return;
  }

  console.log("All elements found, attaching event listener.");

  // Handling the form submission
  formElement.addEventListener("submit", function (event) {
    event.preventDefault();

    console.log("Form submitted");

    const dateInput = (datePickerElement as HTMLInputElement).value;
    const shiftInput = parseInt(
      (shiftSelectElement as HTMLSelectElement).value,
      10
    );

    console.log("Date Input:", dateInput);
    console.log("Shift Input:", shiftInput);

    if (dateInput) {
      const selectedDate = new Date(dateInput);
      const result = isWorkingDay(selectedDate, shiftInput);

      console.log("Result:", result);

      // Update the result paragraph with the result
      resultElement.textContent = result;
    } else {
      resultElement.textContent == "Please select a date and shift.";
    }
  });
});
