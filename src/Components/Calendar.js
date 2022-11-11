import React, { useEffect, useState, Dispatch, SetStateAction } from "react";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/esm/locale";
import "react-datepicker/dist/react-datepicker.css"; // 이렇게 가져와야 기본 디자인이 설정된다
const Calendar = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [visible, setVisible] = useState(false);
  return (
    <div>
      <button
        onClick={() => {
          setVisible(!visible);
        }}
      >
        달력
      </button>
      {visible && (
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          inline
        />
      )}
    </div>
  );
};

export default Calendar;
