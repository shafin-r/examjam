import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const examDates = [
  { start: "2024-11-10", end: "2024-11-12", examName: "Chemistry" },
];

const CalendarComponent = ({ year, month }) => {
  const days = getMonthDays(year, month); // Helper to generate days of the month
  const [upcomingExam, setUpcomingExam] = useState(null);

  useEffect(() => {
    findUpcomingExam();
  }, []);

  const findUpcomingExam = () => {
    const today = new Date().toISOString().split("T")[0];
    let closestExam = null;

    for (let { start, end, examName } of examDates) {
      if (today <= end) {
        closestExam = { start, end, examName };
        break;
      }
    }
    setUpcomingExam(closestExam);
  };

  const getGridPosition = (date) => {
    const [year, month, day] = date.split("-").map(Number);
    const firstDay = new Date(year, month - 1, 1).getDay();
    return firstDay + Number(day) - 1; // Day index in the grid
  };

  const renderHighlight = () => {
    if (!upcomingExam) return null;

    const startPosition = getGridPosition(upcomingExam.start);
    const endPosition = getGridPosition(upcomingExam.end);

    const startRow = Math.floor(startPosition / 7);
    const startCol = startPosition % 7;

    const endRow = Math.floor(endPosition / 7);
    const endCol = endPosition % 7;

    // Highlight spanning logic
    return (
      <>
        {Array(endRow - startRow + 1)
          .fill(0)
          .map((_, rowIndex) => {
            const isFirstRow = rowIndex === 0;
            const isLastRow = rowIndex === endRow - startRow;

            const left = isFirstRow ? startCol * 14.28 : 0;
            const right = isLastRow ? (6 - endCol) * 14.28 : 0;

            return (
              <View
                key={rowIndex}
                style={[
                  styles.highlight,
                  {
                    top: `${((startRow + rowIndex) * 100) / 6}%`,
                    left: `${left}%`,
                    right: `${right}%`,
                  },
                ]}
              />
            );
          })}
      </>
    );
  };

  return (
    <View style={styles.calendarContainer}>
      {/* Calendar Header */}
      <View style={styles.header}>
        <Text style={styles.monthText}>
          {new Date(year, month).toLocaleString("en-US", { month: "short" })}
        </Text>
        {upcomingExam && (
          <Text style={styles.examText}>
            Upcoming Exam: {upcomingExam.examName}
          </Text>
        )}
      </View>

      {/* Weekdays */}
      <View style={styles.weekdays}>
        {["S", "M", "T", "W", "T", "F", "S"].map((day, idx) => (
          <Text key={idx} style={styles.weekday}>
            {day}
          </Text>
        ))}
      </View>

      {/* Days Grid */}
      <View style={styles.daysGrid}>
        {renderHighlight()} {/* Render the spanning line */}
        {days.map((day, index) => (
          <TouchableOpacity key={index} style={styles.day}>
            <Text style={styles.dayText}>{day || ""}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

// Helper Function to Generate Days of the Month
const getMonthDays = (year, month) => {
  const firstDay = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();
  const days = Array(firstDay).fill(null); // Add empty cells for the first week
  for (let i = 1; i <= totalDays; i++) days.push(i);
  return days;
};

const styles = StyleSheet.create({
  calendarContainer: {
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  monthText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  examText: {
    fontSize: 16,
    color: "red",
  },
  weekdays: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  weekday: {
    width: "14.28%",
    textAlign: "center",
    fontWeight: "bold",
    color: "#666",
  },
  daysGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    position: "relative",
  },
  day: {
    width: "14.28%",
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 1,
  },
  dayText: {
    fontSize: 16,
    color: "#000",
  },
  highlight: {
    position: "absolute",
    height: "100%",
    backgroundColor: "rgba(255, 0, 0, 0.2)",
    zIndex: 0,
  },
});

export default CalendarComponent;
