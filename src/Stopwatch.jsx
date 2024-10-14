import React, { useState, useRef } from 'react';

const Stopwatch = () => {
  const [clock, setClock] = useState("00:00:00:00");
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef(null); 
  const startTimeRef = useRef(null); 
  const elapsedTimeRef = useRef(0); 
  const [darkmode , setDarkMode] = useState(false)

  const formatTime = (timeInMs) => {
    let milliseconds = Math.floor((timeInMs % 1000) / 10);
    let seconds = Math.floor((timeInMs / 1000) % 60);
    let minutes = Math.floor((timeInMs / (1000 * 60)) % 60);
    let hours = Math.floor(timeInMs / (1000 * 60 * 60));

    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${milliseconds
      .toString()
      .padStart(2, '0')}`;
  };

  function startTimer() {
    if (!isRunning) {
      setIsRunning(true);
      startTimeRef.current = Date.now() - elapsedTimeRef.current; 
      timerRef.current = setInterval(() => {
        const elapsedTime = Date.now() - startTimeRef.current;
        setClock(formatTime(elapsedTime));
        elapsedTimeRef.current = elapsedTime;
      }, 10);
    }
  }

  function stopTimer() {
    if (isRunning) {
      clearInterval(timerRef.current);
      setIsRunning(false);
    }
  }

  function resetTimer() {
    clearInterval(timerRef.current);
    setIsRunning(false);
    setClock("00:00:00:00");
    elapsedTimeRef.current = 0;
  }


  function toggleMode(){
    setDarkMode(prev => !prev)
  }

  return (
    <div className={darkmode ? "black-container" : "container" }>
       <button className={darkmode ? "light-mode" : "toggle-mode"} onClick={toggleMode}>{darkmode ?  "Light Mode" : "Dark mode"}</button>
        <div className={darkmode ? "blackClockContainer" : "clockContainer" }>
        <h1>Stopwatch</h1>
        <h1>{clock}</h1>
      <button className={darkmode ? "stop-black" : "stop" } onClick={stopTimer}>Stop</button>
      <button className={darkmode ? "reset-black" : "reset" } onClick={resetTimer}>Reset</button>
      <button className={darkmode ? "start-black" : "start" } onClick={startTimer}>Start</button>
        </div>
     
    </div>
  );
};

export default Stopwatch;