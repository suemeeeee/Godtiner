// 내 루틴에서 세부 루틴을 눌렀을 때 수정하는 페이지

import axios from "axios";
import React, { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import MyUpper from "../Components/MyUpper";
import RoutineEditor from "../Components/RoutineEditor";

const MyRoutineEditor = () => {
  const [originData, setOriginData] = useState();
  const { id } = useParams();
  const navigate = useNavigate();

  const [allRoutine, setAllRoutine] = useState([]);

  useEffect(() => {
    //루틴 공유하는 api를 사용한 이유
    //내가 가진 루틴을 모두 가져온 뒤에 수정할 루틴의 id를 찾는 작업을 할 것이기 때문
    axios
      .get("http://localhost:8080/myRoutine/share", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setAllRoutine(response.data.result.data.sharedContentsSimples);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (allRoutine.length >= 1) {
      const targetRoutine = allRoutine.find(
        (it) => parseInt(it.id) === parseInt(id)
      );
      if (targetRoutine) {
        setOriginData(targetRoutine);
      } else {
        navigate("/home", { replace: true });
      }
    }
  }, [id, allRoutine]);

  return (
    <div>
      <MyUpper text={"루틴 수정하기"} />
      {originData && <RoutineEditor isEdit={true} originData={originData} />}
    </div>
  );
};

export default MyRoutineEditor;
