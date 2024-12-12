import { View, Text, ScrollView, RefreshControl } from "react-native";
import React, { useState } from "react";
import Header from "@/components/Header";
import ExamCalendar from "@/components/ExamCalendar";

const LiveExamPage = () => {
  // When the component is initially mounted, the first API call will be from here to instantiate the calendar
  const [examDates, setExamDates] = useState([
    { start: "2024-12-13", end: "2024-12-15", examName: "Math" },
    { start: "2024-12-23", end: "2024-12-27", examName: "Science" },
  ]);
  const [refreshing, setRefreshing] = useState(false);
  const [componentKey, setComponentKey] = useState(0);

  const onRefresh = async () => {
    setRefreshing(true);
    // API endpoint for when the user refreshes the page
    setExamDates([
      { start: "2024-12-15", end: "2024-12-18", examName: "Math" },
      { start: "2024-12-23", end: "2024-12-27", examName: "Science" },
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
          year={2024}
          month={11}
          examDates={examDates}
        />
      </ScrollView>
    </View>
  );
};

export default LiveExamPage;
