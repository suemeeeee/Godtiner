import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Notifications from "@mui/icons-material/Notifications";
import "./MySearchAlram.css";
import axios from "axios";

const MySearchAlarm = ({ parentFunction }) => {
  const navigate = useNavigate();

  //검색창의 검색어 변경을 다루기 위한 hooks
  const [search, setSearch] = useState("");
  //조건 일치하여 검색된 결과담는 변수 = filterData (searchPage에 props로 넘겨줌)
  const [filteredData, setFilteredData] = useState([]);

  const onChangeSearch = (e) => {
    setSearch(e.target.value);
    console.log(search);
  };

  //아래는 검색바 클릭 시 실행할 함수
  const onClickSearchBar = (e) => {
    navigate("/searchpage");
    console.log(search);
  };

  //아래는 검색버튼 눌렀을 때 함수
  const onClickSearch = (e) => {
    if (search[0] === "#") {
      axios
        .get(`http://localhost:8080/feed?tagName=${search.slice(1)}`)
        .then((response) => {
          console.log(search.slice(1));
          console.log(response);
          setFilteredData(response.data.result.data.simpleLectureDtoList);
        });
    } else {
      axios
        .get(`http://localhost:8080/feed?title=${search}`)
        .then((response) => {
          console.log(response);
          setFilteredData(response.data.result.data.simpleLectureDtoList);
          parentFunction(filteredData);
        });
    }
  };

  return (
    <div className="MySearchAlarm">
      <div className="searchBar">
        <InputBase
          className="inputBase"
          value={search}
          onChange={onChangeSearch}
          onClick={onClickSearchBar}
        />

        <IconButton className="iconButton" onClick={onClickSearch}>
          <SearchIcon />
        </IconButton>

        <IconButton>
          <Notifications onClick={() => navigate("/notification")} />
        </IconButton>
      </div>
    </div>
  );
};

export default MySearchAlarm;
