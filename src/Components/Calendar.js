import React, { useEffect, useState, Dispatch, SetStateAction } from "react";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/esm/locale";
import format from "date-fns/format";
import "react-datepicker/dist/react-datepicker.css"; // 이렇게 가져와야 기본 디자인이 설정된다

import "./Calendar.css";

const Calendar = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [visible, setVisible] = useState(false);

  function addDays(date, days) {
    const clone = new Date(date);
    clone.setDate(date.getDate() + days);
    return clone;
  }

  return (
    <div>
      {format(startDate, "yyyy년 MM월 ")}
      <button
        onClick={() => {
          setVisible(!visible); //버튼 클릭 시 달력 visible
        }}
      >
        <img style={{ width: "10px", heigth: "10px" }} src="calendar.png"></img>
      </button>
      {visible && (
        <DatePicker
          selected={startDate}
          onChange={(date) => {
            setStartDate(date);
            setVisible(!visible); //날짜 선택 시 달력 안 보이게
          }}
          inline
        />
      )}
      <br />
      <button>{format(addDays(startDate, -3), "dd")}</button>
      <button>{format(addDays(startDate, -2), "dd")}</button>
      <button>{format(addDays(startDate, -1), "dd")}</button>
      <button>{format(startDate, "dd")}</button>
      {/* 선택 날짜 */}
      <button>{format(addDays(startDate, +1), "dd")}</button>
      <button>{format(addDays(startDate, +2), "dd")}</button>
      <button>{format(addDays(startDate, +3), "dd")}</button>
    </div>
  );
};

export default Calendar;
