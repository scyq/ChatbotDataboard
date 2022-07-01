import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useRecoilState } from "recoil";
import { startDateState, endDateState } from "../States";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import TextField from "@mui/material/TextField";

export default function DateSelector() {
  const [startDate, setStartDate] = useRecoilState(startDateState);
  const [endDate, setEndDate] = useRecoilState(endDateState);

  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DesktopDatePicker
          label="起始日期"
          inputFormat="yyyy/MM/dd"
          value={startDate}
          onChange={(e) => {
            if (e > endDate) {
              alert("起始日期不能大于结束日期");
              return;
            }
            setStartDate(e);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
        <DesktopDatePicker
          label="结束日期"
          inputFormat="yyyy/MM/dd"
          value={endDate}
          onChange={(e) => {
            if (e < startDate) {
              alert("结束日期不能小于起始日期");
              return;
            }
            setEndDate(e);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
    </div>
  );
}
