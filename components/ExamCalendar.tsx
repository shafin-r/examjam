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

const isExamDay = (year, month, day, examDates) => {
  return examDates.some(({ start, end }) => {
    const startDate = new Date(start);
    const endDate = new Date(end);

    // Compare year, month, and day separately
    const isAfterStart =
      year > startDate.getFullYear() ||
      (year === startDate.getFullYear() && month > startDate.getMonth()) ||
      (year === startDate.getFullYear() &&
        month === startDate.getMonth() &&
        day >= startDate.getDate());

    const isBeforeEnd =
      year < endDate.getFullYear() ||
      (year === endDate.getFullYear() && month < endDate.getMonth()) ||
      (year === endDate.getFullYear() &&
        month === endDate.getMonth() &&
        day <= endDate.getDate());

    let examDayTrue = isAfterStart && isBeforeEnd;
    return examDayTrue;
  });
};

const ExamCalendar = ({ year, month, examDates }) => {
  const days = getMonthDays(year, month);

  const [upcomingExam, setUpcomingExam] = useState(null);

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

    const rows = [];

    for (let row = startRow; row <= endRow; row++) {
      const isFirstRow = row === startRow;
      const isLastRow = row === endRow;

      const left = isFirstRow ? (startCol / 7) * 100 : 0;
      const right = isLastRow ? ((6 - endCol) / 7) * 100 : 0;

      rows.push(
        <View
          key={row}
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
  };

  useEffect(() => {
    findUpcomingExam();
  }, []);

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
          <Text className="font-montRegular text-black">
            <Text className=" text-[#000]/20">Upcoming Live Test: </Text>(
            {upcomingExam?.examName})
          </Text>
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
        {renderHighlight()}
        {days.map((day, index) => {
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
              ? "red" // Highlight start dates
              : endDates.length > 0
              ? "red" // Highlight end dates
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
