import React, { createContext, useContext, useState, useEffect } from "react";

// Define the context type
interface TimerContextType {
  timeRemaining: number;
  resetTimer: (duration: number) => void;
  stopTimer: () => void;
  setInitialTime: (duration: number) => void; // New function to set the initial time
}

// Create the context with a default value of `undefined`
const TimerContext = createContext<TimerContextType | undefined>(undefined);

// Provider Component
export const TimerProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [timeRemaining, setTimeRemaining] = useState<number>(0); // Default is 0
  let timer: NodeJS.Timeout;

  useEffect(() => {
    if (timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      clearInterval(timer); // Cleanup timer on unmount
    };
  }, [timeRemaining]);

  const resetTimer = (duration: number) => {
    clearInterval(timer);
    setTimeRemaining(duration);
  };

  const stopTimer = () => {
    clearInterval(timer);
  };

  const setInitialTime = (duration: number) => {
    setTimeRemaining(duration);
  };

  return (
    <TimerContext.Provider
      value={{ timeRemaining, resetTimer, stopTimer, setInitialTime }}
    >
      {children}
    </TimerContext.Provider>
  );
};

// Hook to use the TimerContext
export const useTimer = (): TimerContextType => {
  const context = useContext(TimerContext);
  if (!context) {
    throw new Error("useTimer must be used within a TimerProvider");
  }
  return context;
};
