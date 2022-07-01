import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import { useState } from "react";
import { scaleIDState, recordState } from "../States";
import { useRecoilValue } from "recoil";

// TODO: 改为利用服务端搜索某一问卷号的

export function BuildDialogue(props) {
  const scaleIDs = useRecoilValue(scaleIDState);
  const records = useRecoilValue(recordState);
  const [filterModel, setFilterModel] = useState({
    items: [],
  });
  const [inputScaleIDs, setInputScaleIDs] = useState("");
  const [qa, setQA] = useState([]);

  return (
    <div>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={scaleIDs}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="选择问卷号" />}
        onChange={(event, newValue) => {
          if (newValue) {
            setFilterModel({
              items: [
                {
                  columnField: "scale_id",
                  operatorValue: "contains",
                  value: newValue,
                },
              ],
            });
          } else {
            setFilterModel({
              items: [],
            });
          }
          let temp = [];
          for (let record of records) {
            if (record.scale_id === newValue) {
              temp.push(`Q: ${record.question}`);
              temp.push(`A: ${record.answer}`);
            }
          }
          setQA(temp);
        }}
        inputValue={inputScaleIDs}
        onInputChange={(event, newInputValue) => {
          setInputScaleIDs(newInputValue);
        }}
      />
      {qa.map((item) => {
        return <div>{item}</div>;
      })}
    </div>
  );
}
