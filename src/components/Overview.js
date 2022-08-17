import { Button } from "@mui/material";
import { useRecoilValue } from "recoil";
import { recordNumberState, scaleIDState, recordState } from "../States";
import { saveAs } from "file-saver";

const ExcelJS = require("exceljs");

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

function getRow(records, scaleID) {
  let temp = [];
  let date = null;
  for (let record of records) {
    if (record.scale_id === scaleID) {
      if (!date) {
        date = record.time.split("####")[0].split(" ")[0];
      }
      temp.push(`Q: ${record.question}`);
      temp.push(`A: ${record.answer}`);
    }
  }
  temp = [date, ...temp];
  return temp;
}

async function exportSheet(scaleIDs, records) {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = "THU";
  workbook.lastModifiedBy = "THU";
  workbook.created = new Date();
  workbook.modified = new Date();
  const sheet = workbook.addWorksheet("记录");
  for (const scaleID of scaleIDs) {
    sheet.addRow(getRow(records, scaleID));
  }
  workbook.xlsx.writeBuffer().then((data) => {
    const blob = new Blob([data], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8",
    });
    saveAs(blob, "export.xlsx");
  });
}

export function Overview() {
  const records = useRecoilValue(recordState);
  const numbers = useRecoilValue(recordNumberState);
  const scaleIDs = useRecoilValue(scaleIDState);

  return (
    <div>
      <h1>Overview</h1>
      <Line label="总数据条目" value={numbers} />
      <Line label="总问卷数" value={scaleIDs.length} />
      <Button
        variant="contained"
        onClick={() => {
          exportSheet(scaleIDs, records);
        }}
      >
        导出所有数据
      </Button>
    </div>
  );
}
