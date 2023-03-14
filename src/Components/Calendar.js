import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/esm/locale";
import format from "date-fns/format";
import Form from "react-bootstrap/Form";
import "react-datepicker/dist/react-datepicker.css"; // 이렇게 가져와야 기본 디자인이 설정된다

import "./Calendar.css";

const Calendar = (props) => {
  const [startDate, setStartDate] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);

  const sendDay = (days) => {
    props.pickDay(days);
  };

  const handleChange = (e) => {
    setIsOpen(!isOpen);
    setStartDate(e);
    sendDay(e.getDay());
  };
  const handleClick = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  const week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  function addDays(date, days) {
    const clone = new Date(date);
    clone.setDate(date.getDate() + days);
    return clone;
  }

  return (
    <div className="calendar">
      <div className="calendarHeader">
        {format(startDate, "yyyy년 MM월 ")}
        <button className="calendar_btn" onClick={handleClick}>
          📅
        </button>
      </div>
      {isOpen && (
        <DatePicker selected={startDate} onChange={handleChange} inline />
      )}

      <div className="week_btn_div">
        <button
          onClick={() => {
            setStartDate(addDays(startDate, -3));
            sendDay(addDays(startDate, -3).getDay());
          }}
        >
          {week[addDays(startDate, -3).getDay()]}
          <br />
          {format(addDays(startDate, -3), "dd")}
          <br />
        </button>
        <button
          onClick={() => {
            setStartDate(addDays(startDate, -2));
            sendDay(addDays(startDate, -2).getDay());
          }}
        >
          {week[addDays(startDate, -2).getDay()]}
          <br />
          {format(addDays(startDate, -2), "dd")}
        </button>
        <button
          onClick={() => {
            setStartDate(addDays(startDate, -1));
            sendDay(addDays(startDate, -1).getDay());
          }}
        >
          {week[addDays(startDate, -1).getDay()]}
          <br />
          {format(addDays(startDate, -1), "dd")}
        </button>
        <button className="selectedDay_btn">
          {week[startDate.getDay()]}
          <br />
          {format(startDate, "dd")}
        </button>
        {/* 선택 날짜 */}
        <button
          onClick={() => {
            setStartDate(addDays(startDate, 1));
            sendDay(addDays(startDate, 1).getDay());
          }}
        >
          {week[addDays(startDate, 1).getDay()]}
          <br />
          {format(addDays(startDate, 1), "dd")}
        </button>
        <button
          onClick={() => {
            setStartDate(addDays(startDate, 2));
            sendDay(addDays(startDate, 2).getDay());
          }}
        >
          {week[addDays(startDate, 2).getDay()]}
          <br />
          {format(addDays(startDate, 2), "dd")}
        </button>
        <button
          onClick={() => {
            setStartDate(addDays(startDate, 3));
            sendDay(addDays(startDate, 3).getDay());
          }}
        >
          {week[addDays(startDate, 3).getDay()]}
          <br />
          {format(addDays(startDate, 3), "dd")}
        </button>
      </div>
    </div>
  );
};

export default Calendar;
