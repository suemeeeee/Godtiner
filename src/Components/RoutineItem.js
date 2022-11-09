const RoutineItem = ({ id, content, startTime, endTime }) => {
  // home화면에서 세부 루틴들을 보여줌
  return (
    <div>
      <span>
        {startTime} {endTime}
      </span>
      <h3>{content}</h3>
    </div>
  );
};
export default RoutineItem;
