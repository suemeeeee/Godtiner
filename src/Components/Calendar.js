import React, { useEffect, useState, Dispatch, SetStateAction } from "react";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/esm/locale";
import format from "date-fns/format";
import "react-datepicker/dist/react-datepicker.css"; // 이렇게 가져와야 기본 디자인이 설정된다

import "./Calendar.css";

const Calendar = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [visible, setVisible] = useState(false);
  const week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  function addDays(date, days) {
    const clone = new Date(date);
    clone.setDate(date.getDate() + days);
    return clone;
  }

  return (
    <div>
      <div className="calendarHeader">
        {format(startDate, "yyyy년 MM월 ")}
        <button
          onClick={() => {
            setVisible(!visible); //버튼 클릭 시 달력 visible
          }}
        >
          달력
        </button>
      </div>
      {visible && (
        <DatePicker
          selected={startDate}
          onChange={(date) => {
            setStartDate(date);
            setVisible(!visible); //모달 팝업창으로 바꿔야 할 듯.. 날짜 선택 시 달력 안 보이게
          }}
          inline
        />
      )}

      <div className="week_btn">
        {" "}
        <button>
          {week[startDate.getDay() - 3]}
          <br />
          {format(addDays(startDate, -3), "dd")}
          <br />
        </button>
        <button>
          {week[startDate.getDay() - 2]}
          <br />
          {format(addDays(startDate, -2), "dd")}
        </button>
        <button>
          {week[startDate.getDay() - 1]}
          <br />
          {format(addDays(startDate, -1), "dd")}
        </button>
        <button className="selectedDay_btn">
          {week[startDate.getDay()]}
          <br />
          {format(startDate, "dd")}
        </button>
        {/* 선택 날짜 */}
        <button>
          {week[addDays(startDate, 1).getDay()]}
          <br />
          {format(addDays(startDate, 1), "dd")}
        </button>
        <button>
          {week[addDays(startDate, 2).getDay()]}
          <br />
          {format(addDays(startDate, 2), "dd")}
        </button>
        <button>
          {week[addDays(startDate, 3).getDay()]}
          <br />
          {format(addDays(startDate, 3), "dd")}
        </button>
      </div>
    </div>
  );
};

export default Calendar;
