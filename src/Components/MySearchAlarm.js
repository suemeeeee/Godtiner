import { useState } from "react";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Notifications from "@mui/icons-material/Notifications";

import feedDummyData from "../DummyData/feedDummyData.json";

const MySearchAlarm = () => {
  const [search, setSearch] = useState("");
  console.log(search);

  const onChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  const onClickSearch = (e) => {
    return search;
  };

  return (
    <div className="MySearchAlarm">
      <div className="SearchBar">
        <InputBase
          value={search}
          onChange={onChangeSearch}
          sx={{ ml: 3, flex: 1 }}
        />
        <div>
          <IconButton onClick={onClickSearch}>
            <SearchIcon />
          </IconButton>
        </div>
      </div>
      <div className="Notifications">
        <IconButton
          onClick={() => {
            alert("message");
          }}
        >
          <Notifications />
        </IconButton>
      </div>
    </div>
  );
};

export default MySearchAlarm;
