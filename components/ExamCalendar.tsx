import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const getMonthDays = (year, month) => {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();

  const calendarDays = [];
  for (let i = 0; i < firstDay; i++) calendarDays.push(null);
  for (let i = 1; i <= daysInMonth; i++) calendarDays.push(i);

  return calendarDays;
};

const ExamCalendar = ({ year, month, examDates }) => {
  const days = getMonthDays(year, month);
  const [upcomingExams, setUpcomingExams] = useState([]);
  const [nextExam, setNextExam] = useState(null);

  const findNextExam = () => {
    const today = new Date().toISOString().split("T")[0];
    let closestExam = null;

    for (let { start, end, examName } of examDates) {
      if (today >= start && today <= end) {
        // If today is within the exam's date range
        closestExam = { start, end, examName, status: "Current" };
        break;
      } else if (today < start) {
        // If the exam is in the future
        closestExam = { start, end, examName, status: "Upcoming" };
        break;
      }
    }
    setNextExam(closestExam);
  };

  const findUpcomingExams = () => {
    const today = new Date().toISOString().split("T")[0];
    const filteredExams = examDates.filter(({ end }) => today <= end);
    setUpcomingExams(filteredExams);
  };

  const getGridPosition = (date) => {
    const [year, month, day] = date.split("-").map(Number);
    const firstDay = new Date(year, month - 1, 1).getDay();
    return firstDay + Number(day) - 1; // Day index in the grid
  };

  // const renderHighlights = () => {
  //   if (!upcomingExams.length) return null;

  //   return upcomingExams.map((exam, index) => {
  //     const startPosition = getGridPosition(exam.start);
  //     const endPosition = getGridPosition(exam.end);

  //     const startRow = Math.floor(startPosition / 7);
  //     const startCol = startPosition % 7;

  //     const endRow = Math.floor(endPosition / 7);
  //     const endCol = endPosition % 7;

  //     const rows = [];

  //     for (let row = startRow; row <= endRow; row++) {
  //       const isFirstRow = row === startRow;
  //       const isLastRow = row === endRow;

  //       const left = isFirstRow ? (startCol / 7) * 100 : 0;
  //       const right = isLastRow ? ((6 - endCol) / 7) * 100 : 0;

  //       rows.push(
  //         <View
  //           key={${index}-${row}}
  //           style={[
  //             styles.highlight,
  //             {
  //               top: ${(row * 120) / 6}%,
  //               left: ${left}%,
  //               right: ${right + 2}%,
  //             },
  //           ]}
  //         />
  //       );
  //     }

  //     return rows;
  //   });
  // };

  const renderHighlights = () => {
    if (!upcomingExams.length) return null;

    // Filter only current and upcoming exams
    const today = new Date().toISOString().split("T")[0];
    const filteredExams = upcomingExams.filter(
      ({ start, end }) => today <= end // Include only current or upcoming exams
    );

    return filteredExams.map((exam, index) => {
      const startPosition = getGridPosition(exam.start);
      const endPosition = getGridPosition(exam.end);

      const startRow = Math.floor(startPosition / 7);
      const startCol = startPosition % 7;

      const endRow = Math.floor(endPosition / 7);
      const endCol = endPosition % 7;

      const rows = [];

      for (let row = startRow; row <= endRow; row++) {
        const isFirstRow = row === startRow;
        const isLastRow = row === endRow;

        const left = isFirstRow ? (startCol / 7) * 100 : 0;
        const right = isLastRow ? ((6 - endCol) / 7) * 100 : 0;

        rows.push(
          <View
            key={`${index}-${row}`}
            style={[
              styles.highlight,
              {
                top: `${(row * 120) / 6}%`,
                left: `${left}%`,
                right: `${right + 2}%`,
              },
            ]}
          />
        );
      }

      return rows;
    });
  };

  useEffect(() => {
    findUpcomingExams();
    findNextExam();
  }, [examDates]);

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return (
    <View className="border-2 border-[#c5dbf8] w-full py-[24] rounded-[20] gap-4 mt-10">
      <View className="px-7 gap-3">
        <View className="flex-row border-2 border-white/0 items-center justify-between">
          <Text className="font-montMedium text-2xl">{months[month]} </Text>
          <View className="font-montRegular text-black flex-row">
            <Text style={{ fontFamily: "Montserrat-Regular" }}>
              {nextExam?.status === "Current"
                ? "Current Live Test: "
                : "Upcoming Live Test: "}
            </Text>
            <Text style={{ color: "black", fontFamily: "Montserrat-Medium" }}>
              ({nextExam?.examName})
            </Text>
          </View>
        </View>
        <View
          className="w-full border-[#c5dbf8]"
          style={{ borderWidth: 1 }}
        ></View>
        {/* Weekday Headers */}
        <View style={styles.weekdays} className="">
          {["S", "M", "T", "W", "T", "F", "S"].map((day, idx) => (
            <Text
              key={idx}
              style={styles.weekday}
              className="font-montMedium text-xl"
            >
              {day}
            </Text>
          ))}
        </View>
      </View>

      {/* Calendar Days */}
      <View style={styles.daysGrid} className="px-3">
        {renderHighlights()}
        {/* Renders highlights for all tests in the month */}
        {/* {days.map((day, index) => {
          const startDates = examDates.filter(({ start }) => {
            const startDate = new Date(start);
            return (
              startDate.getFullYear() === year &&
              startDate.getMonth() === month &&
              startDate.getDate() === day
            );
          });

          const endDates = examDates.filter(({ end }) => {
            const endDate = new Date(end);
            return (
              endDate.getFullYear() === year &&
              endDate.getMonth() === month &&
              endDate.getDate() === day
            );
          });

          // Determine the background color based on whether this day is a start or end date
          const backgroundColor =
            startDates.length > 0
              ? "#EA0400" // Highlight start dates
              : endDates.length > 0
              ? "#EA0400" // Highlight end dates
              : undefined; // No style otherwise

          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.day,
                backgroundColor && { backgroundColor }, // Apply the determined background color
              ]}
            >
              <Text
                style={[
                  styles.dayText,
                  (startDates.length > 0 || endDates.length > 0) &&
                    styles.examDayText, // Apply text styling for both start and end dates
                ]}
              >
                {day || ""}
              </Text>
            </TouchableOpacity>
          );
        })} */}
        {/* Renders highlights for upcoming and current live tests */}
        {days.map((day, index) => {
          // Get today's date
          const today = new Date();
          const isToday =
            today.getFullYear() === year &&
            today.getMonth() === month &&
            today.getDate() === day;

          // Filter out past exams (where today > end date)
          const filteredExamDates = examDates.filter(({ end }) => {
            const endDate = new Date(end);
            return today <= endDate;
          });

          // Find start dates for filtered exams
          const startDates = filteredExamDates.filter(({ start }) => {
            const startDate = new Date(start);
            return (
              startDate.getFullYear() === year &&
              startDate.getMonth() === month &&
              startDate.getDate() === day
            );
          });

          // Find end dates for filtered exams
          const endDates = filteredExamDates.filter(({ end }) => {
            const endDate = new Date(end);
            return (
              endDate.getFullYear() === year &&
              endDate.getMonth() === month &&
              endDate.getDate() === day
            );
          });

          // Determine the background color for the day
          const backgroundColor = isToday
            ? "#113768" // Highlight the current date
            : startDates.length > 0 || endDates.length > 0
            ? "#EA0400" // Highlight exam start/end dates
            : undefined;

          // Determine the text color for the day
          const textColor = isToday ? "#fff" : "#000";

          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.day,
                backgroundColor && { backgroundColor }, // Apply the determined background color
              ]}
            >
              <Text
                style={[
                  styles.dayText,
                  { color: textColor }, // Apply the determined text color
                  (startDates.length > 0 || endDates.length > 0) &&
                    styles.examDayText, // Apply text styling for start and end dates
                ]}
              >
                {day || ""}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  weekdays: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  weekday: {
    textAlign: "center",
  },
  daysGrid: {
    marginLeft: 4,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    position: "relative",
  },
  day: {
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    width: "14%",
    height: "50%",
    borderRadius: 50,
  },
  dayText: {
    fontSize: 16,
    color: "#000",
    fontFamily: "Montserrat-Medium",
  },
  examDayText: {
    color: "white",
  },
  examText: {
    fontSize: 10,
    color: "white",
    textAlign: "center",
    marginTop: 2,
  },
  highlight: {
    position: "absolute",
    height: "20%", // Matches day cell height
    backgroundColor: "rgba(255, 0, 0, 0.3)", // Slightly more opacity
    zIndex: 0,
    borderRadius: 50, // Optional: Adds rounded edges for highlights
  },
});

export default ExamCalendar;
