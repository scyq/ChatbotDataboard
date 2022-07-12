import { TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import Button from "@mui/material/Button";
import Net from "../Net";
import { useRecoilState } from "recoil";
import { loadingState } from "../States";

export function InformationQuery() {
  const [loading, setLoading] = useRecoilState(loadingState);
  const [queryStudent, setQueryStudent] = useState("");

  return (
    <Box>
      <TextField
        id="outlined-basic"
        label="学生姓名"
        variant="outlined"
        onChange={(e) => {
          setQueryStudent(e.target.value);
        }}
        value={queryStudent}
      />
      <Button
        variant="contained"
        onClick={async () => {
          setLoading(true);
          let res = await Net.getByName(queryStudent);
          let dates = [];
          for (let record of res) {
            const date = record.time.split("####")[0].split(" ")[0];
            if (dates.indexOf(date) === -1) {
              dates.push(date);
            }
          }
          console.log(dates);
          alert(`${queryStudent}已填写${dates.length}天`);
          setLoading(false);
        }}
      >
        查询某位学生的参与天数
      </Button>
    </Box>
  );
}
