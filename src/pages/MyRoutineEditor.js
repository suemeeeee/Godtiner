// 내 루틴에서 세부 루틴을 눌렀을 때 수정하는 페이지

import axios from "axios";
import React, { useContext, useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import MyUpper from "../Components/MyUpper";
import RoutineEditor from "../Components/RoutineEditor";

import MyRoutineDummyData from "../DummyData/MyRoutineDummyData.json";

const MyRoutineEditor = () => {
  const [originData, setOriginData] = useState();
  const { id } = useParams();
  const navigate = useNavigate();

  //백엔드 실험
  const [allRoutine, setAllRoutine] = useState([]);
  //여기까지 백엔드 실험

  /* 더미데이터를 사용한다면 다음과 같이 됨
    useEffect(() => {
      if (MyRoutineDummyData.MyRoutine.length >= 1) {
        const targetRoutine = MyRoutineDummyData.MyRoutine.find(
          (it) => parseInt(it.id) === parseInt(id)
        );
        if (targetRoutine) {
          setOriginData(targetRoutine);
        } else {
          navigate("/", { replace: true });
        }
      }
    }, [id, MyRoutineDummyData]);
  */

  //백엔드 연동 실험
  //데이터를 전역적으로 받아오지 않았기 때문에 에디터 컴포넌트에서도 axios로 값을 모두 받아오는 작업을 해봄
  useEffect(() => {
    axios
      .get("http://localhost:8080/myRoutine/post", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        //console.log(response.data.result.data.myContentsList);
        setAllRoutine(response.data.result.data.myContentsList);
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
        console.log(id);
        navigate("/home", { replace: true });
      }
    }
  }, [id, allRoutine]);
  //여기까지가 연동 실험

  return (
    <div>
      <MyUpper text={"루틴 수정하기"} />
      {originData && <RoutineEditor isEdit={true} originData={originData} />}
    </div>
  );
};

export default MyRoutineEditor;
