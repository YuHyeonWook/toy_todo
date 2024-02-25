import React, { useState, useEffect } from "react";

const Header = () => {
  /*
   * 시, 분
   */
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);
  const hours = time.getHours();
  const minutes = time.getMinutes();

  /*
   * 날짜
   */
  const today = new Date();
  const formattedDate = `${today.getMonth() + 1}월 ${today.getDate()}일`;

  return (
    <div className="Header">
      <div className="Time">
        <h3>{`${hours}:${minutes < 10 ? `0${minutes}` : minutes}`}</h3>
      </div>
      <div className="Title">
        <h1>오늘 {formattedDate}😊</h1>
      </div>
    </div>
  );
};
export default React.memo(Header);
