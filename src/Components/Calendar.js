import React, {
  useState,
  useEffect,
  useRef,
  Component,
  useCallback,
  useMemo,
} from "react";
import Year from "react-live-clock";
import Month from "react-live-clock";

import cn from "classnames";

const Calendar = () => {
  const now = new Date();
  const [today, setToday] = useState(now.getDate());
  const [lastday, setLastDay] = useState(
    new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate()
  );
  const [daylist, setDaylist] = useState([]);

  const getAlldate = (today, lastday) => {
    let dates = [];

    dates[0] = today - 3;
    for (let i = 1; i <= today - 1; i++) {
      dates[i] = today - 3 + i;
    }

    return dates;
  };
  const Alldate = useMemo(() => getAlldate(today, lastday), [daylist]);
  //   const now = new Date();
  //   const todayWeak = now.getDay();
  //   const today = now.getDate();
  //   const lastday = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();

  //   const [daylist, setDaylist] = useState([]);
  //   const [weaklist, setWeaklist] = useState([]);

  //   const getAlldate = (today, lastday) => {
  //     let dates = [];

  //     dates[0] = today;
  //     for (let i = 1; i <= 6; i++) {
  //       today++;
  //       //마지막 날보다 날짜가 클경우 today를 1로 초기화.
  //       if (today > lastday) {
  //         today = 1;
  //         dates[i] = today;
  //       }
  //       //일반 경우 그냥 날짜 추가
  //       else {
  //         dates[i] = today;
  //       }
  //     }

  //     //요일 정상적으로 뜨는지 확인해보자
  //     //console.log(dates[1].getDay());

  //     return dates;
  //   };

  //   const Alldate = useMemo(() => getAlldate(today, lastday), [daylist]);

  //   //요일 표시 평일 검정색, 토요일 파란색, 일요일 빨간색
  //   const getAllweak = (todayWeak) => {
  //     let strWeak = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  //     let weaklist = [];

  //     //첫번째 오늘 날짜 적용

  //     weaklist[0] = strWeak[todayWeak];

  //     for (let i = 1; i <= 6; i++) {
  //       todayWeak++;
  //       if (todayWeak > 6) {
  //         todayWeak = 0;
  //         weaklist[i] = strWeak[todayWeak];
  //       } else {
  //         weaklist[i] = strWeak[todayWeak];
  //       }
  //     }

  //     return weaklist;
  //   };

  //   const CalendarDay = getAlldate(today, lastday);
  //   const CalendarWeak = getAllweak(todayWeak);

  //   /*⭐⭐날짜와 요일을 같이 표시하기위해서 만들어 놓은 객체
  //   날짜를 하나씩 출력해서 객체로 만들기위해서 함수를 실행시킨뒤
  //   분해로 하나씩 넣는 방법을 사용했음 ⭐⭐*/
  //   const CalendarObject = [
  //     { weak: CalendarWeak[0], day: CalendarDay[0] },
  //     { weak: CalendarWeak[1], day: CalendarDay[1] },

  //     { weak: CalendarWeak[2], day: CalendarDay[2] },
  //     { weak: CalendarWeak[3], day: CalendarDay[3] },
  //     { weak: CalendarWeak[4], day: CalendarDay[4] },
  //     { weak: CalendarWeak[5], day: CalendarDay[5] },
  //     { weak: CalendarWeak[6], day: CalendarDay[6] },
  //   ];

  //   useEffect(() => {
  //     return () => console.log("Clean up");
  //   });

  //   const Weak = useRef(null);

  return (
    <div className={cn("Calendar")}>
      <div className="Year-Month">
        <p>
          <span className="Year">
            <Year
              id="Year"
              format={"YYYY"}
              ticking={false}
              timezone={"KR/Pacific"}
            />
          </span>
          &nbsp;&nbsp;
          <span className="Month">
            <Month format={"MMM"} ticking={false} timezone={"KR/Pacific"} />
          </span>
        </p>
      </div>
      <div className="Day">
        {Alldate.map((value, index) => (
          <b className="Day02" key={index} style={{ cursor: "pointer" }}>
            {value}
          </b>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
