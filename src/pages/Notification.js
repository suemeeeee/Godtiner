import axios from "axios";
import { useEffect } from "react";

const Notification = () => {
  useEffect(() => {
    axios
      .get("/notifications", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        console.log(response);
      });
  });

  return <div>hi</div>;
};

export default Notification;
