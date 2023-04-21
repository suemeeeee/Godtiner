import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Notification.css";
import MyUpper from "../Components/MyUpper";
const Notification = () => {
  const navigate = useNavigate();

  const [notificationsArray, setNotificationsArray] = useState([]);

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
