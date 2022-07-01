import { useRecoilValue } from "recoil";
import { recordNumberState, scaleIDState } from "../States";

function Line(props) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        margin: "10px 0",
      }}
    >
      <div
        style={{
          fontWeight: "bold",
        }}
      >
        {props.label}：
      </div>
      <div>{props.value}</div>
    </div>
  );
}

export function Overview() {
  const numbers = useRecoilValue(recordNumberState);
  const scaleIDs = useRecoilValue(scaleIDState);

  return (
    <div>
      <h1>Overview</h1>
      <Line label="总数据条目" value={numbers} />
      <Line label="总问卷数" value={scaleIDs.length} />
    </div>
  );
}
