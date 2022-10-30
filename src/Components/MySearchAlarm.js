import { useState } from "react";

const MySearchAlarm = () => {
  const [search, setSearch] = useState("");
  return (
    <div className="MySearchAlarm">
      <input
        name="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
};

export default MySearchAlarm;
