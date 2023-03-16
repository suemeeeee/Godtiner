import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Notification.css";
import MyUpper from "../Components/MyUpper";
const Notification = () => {
  const navigate = useNavigate();

  const [notificationsArray, setNotificationsArray] = useState([]);

  const [dummynoti, setdummynoti] = useState([
    {
      checked: true,
      created: "2022-12-12T00:33",
      id: 2,
      notificationType: "MISSION_CLEAR",
      title: "루틴 2회 달성",
    },
    {
      checked: true,
      created: "2022-12-11T22:06",
      id: 1,
      notificationType: "MISSION_CLEAR",
      title: "루틴 1회 달성",
    },
  ]);

  useEffect(() => {
    axios
      .get("/notifications", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setNotificationsArray(response.data.result.data.notifications);
      });
  }, []);

  const onClickMission = () => {
    navigate("/mission");
  };
  console.log(notificationsArray);

  return (
    <div>
      <MyUpper text={"알림"} />
      <div className="notification--div">
        {notificationsArray.map((it) => (
          <div className="notification" onClick={onClickMission}>
            <p className="title_nt">🎉{it.title}🎉</p>
            <p className="created_nt">{it.created}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notification;
