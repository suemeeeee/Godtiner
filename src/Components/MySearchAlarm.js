import { useState } from "react";
import { VscSearch, VscBellDot } from "react-icons/vsc";

const MySearchAlarm = () => {
  const [search, setSearch] = useState("");
  return (
    <div className="MySearchAlarm">
      <div className="Search">
        <input
          className="SearchBar"
          name="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <VscSearch size={20} className="SearchImg" />
      </div>
      <div className="Alarm">
        <button>
          <VscBellDot size={20} />
        </button>
      </div>
    </div>
  );
};

export default MySearchAlarm;
