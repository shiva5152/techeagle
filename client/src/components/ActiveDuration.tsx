import React, { useEffect, useState } from "react";
import { calculateActiveDuration } from "../utils/helpers";

const ActiveDuration = ({ duration }: { duration: Date }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date()); // Update current time every second
    }, 1000);

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, []);

  return (
    <span className="text-white font-semibold">
      {calculateActiveDuration(duration)}
    </span>
  ); // Use the original duration prop here
};

export default ActiveDuration;
