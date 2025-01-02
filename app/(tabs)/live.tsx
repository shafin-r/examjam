import { View, Text, ScrollView, RefreshControl } from "react-native";
import React, { useState } from "react";
import Header from "@/components/Header";
import ExamCalendar from "@/components/ExamCalendar";

const LiveExamPage = () => {
  // When the component is initially mounted, the first API call will be from here to instantiate the calendar
  const [examDates, setExamDates] = useState([
    { start: "2025-01-02", end: "2025-01-04", examName: "Math" },
    { start: "2025-01-06", end: "2025-01-08", examName: "Science" },
    { start: "2025-01-16", end: "2025-01-22", examName: "Algebra" },
  ]);
  const [refreshing, setRefreshing] = useState(false);
  const [componentKey, setComponentKey] = useState(0);

  const onRefresh = async () => {
    setRefreshing(true);
    // API endpoint for when the user refreshes the page
    setExamDates([
      { start: "2025-01-02", end: "2025-01-04", examName: "Math" },
      { start: "2025-01-06", end: "2025-01-08", examName: "Science" },
      { start: "2025-01-16", end: "2025-01-22", examName: "Algebra" },
    ]);
    setComponentKey((prevKey) => prevKey + 1);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  return (
    <View>
      <Header
        displaySubject={"Live Exams"}
        displayTabTitle={null}
        displayUser={false}
      />
      <ScrollView
        className="mx-10"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <ExamCalendar
          key={componentKey}
          year={2025}
          month={0}
          examDates={examDates}
        />
      </ScrollView>
    </View>
  );
};

export default LiveExamPage;
