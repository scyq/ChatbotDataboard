import { Box } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { Stack } from "@mui/material";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { RecoilRoot, useRecoilState } from "recoil";
import MainLayout from "./components/MainLayout";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import ScreenSearchDesktopOutlinedIcon from "@mui/icons-material/ScreenSearchDesktopOutlined";
import { loadingState, recordState, scaleIDState } from "./States";
import Loading from "./components/Loading";
import Net from "./Net";
import { Overview } from "./components/Overview";
import { getAll } from "./utils";
import { BuildDialogue } from "./components/BuildDialogue";

const columns = [
  { field: "id", headerName: "顺序", width: 80, editable: false },
  { field: "record_id", headerName: "记录号", width: 80, editable: false },
  { field: "scale_id", headerName: "问卷号", width: 100, editable: false },
  {
    field: "name",
    headerName: "姓名",
    width: 100,
    editable: false,
  },
  {
    field: "school",
    headerName: "学校",
    width: 150,
    editable: false,
  },
  {
    field: "grade",
    headerName: "年级",
    width: 100,
    editable: false,
  },
  {
    field: "class_id",
    headerName: "班级",
    width: 100,
    editable: false,
  },
  {
    field: "question",
    headerName: "问题",
    width: 300,
    editable: false,
  },
  {
    field: "answer",
    headerName: "回答",
    width: 300,
    editable: false,
  },
  {
    field: "time",
    headerName: "时间",
    width: 200,
    editable: false,
  },
];

const getBetweenDate = (start, end) => {
  let res = [];
  let currentTimeStamp = start.getTime();
  while (currentTimeStamp <= end.getTime()) {
    let currentTime = new Date(currentTimeStamp);
    let month = (currentTime.getMonth() + 1).toString().padStart(2, "0");
    let day = currentTime.getDate().toString().padStart(2, "0");
    res.push(`${month}-${day}`);
    currentTimeStamp += 24 * 60 * 60 * 1000;
  }
  return res;
};

const mainParts = [
  { text: "信息概览", content: <Overview />, icon: <BarChartOutlinedIcon /> },
  { text: "信息查询", content: <div>2</div>, icon: <InfoOutlinedIcon /> },
  {
    text: "对话复现",
    content: <BuildDialogue />,
    icon: <ScreenSearchDesktopOutlinedIcon />,
  },
];

function App() {
  const [loading, setLoading] = useRecoilState(loadingState);
  const [records, setRecords] = useRecoilState(recordState);

  useEffect(() => {
    getAll(setLoading, setRecords);
  }, []);

  return (
    <div>
      <Loading open={loading} />
      <MainLayout options={mainParts} />
    </div>
  );
}

export default function Root() {
  return (
    <RecoilRoot>
      <App />
    </RecoilRoot>
  );
}

// export default function Admin() {
//   const [pageSize, setPageSize] = useState(10);
//   const [filterModel, setFilterModel] = useState({
//     items: [],
//   });
//   const [inputScaleIDs, setInputScaleIDs] = useState("");
//   const [queryStudent, setQueryStudent] = useState("");

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         justifyContent: "center",
//         width: "100vw",
//         height: "100vh",
//       }}
//     >
//       <Loading open={loading} />
//       <Stack direction="row" spacing={5} sx={{ marginTop: "30px" }}>
//         <Autocomplete
//           disablePortal
//           id="combo-box-demo"
//           options={scaleIDs}
//           sx={{ width: 300 }}
//           renderInput={(params) => <TextField {...params} label="选择问卷号" />}
//           onChange={(event, newValue) => {
//             if (newValue) {
//               setFilterModel({
//                 items: [
//                   {
//                     columnField: "scale_id",
//                     operatorValue: "contains",
//                     value: newValue,
//                   },
//                 ],
//               });
//             } else {
//               setFilterModel({
//                 items: [],
//               });
//             }
//           }}
//           inputValue={inputScaleIDs}
//           onInputChange={(event, newInputValue) => {
//             setInputScaleIDs(newInputValue);
//           }}
//         />

//         <Button
//           variant="contained"
//           onClick={async () => {
//             let students = {};
//             let res = await net.getAll();
//             const empty = "尚未填写";
//             for (let record of res) {
//               if (!(record.name in students)) {
//                 students[record.name] = {
//                   name: record.name,
//                   class: record["class_id"],
//                   grade: record.grade,
//                   school: record.school,
//                 };
//               } else {
//                 if (record["class_id"] === empty) {
//                   students[record.name]["class"] = record["class_id"];
//                 }
//                 if (record.grade === empty) {
//                   students[record.name]["grade"] = record.grade;
//                 }
//                 if (record.school === empty) {
//                   students[record.name]["school"] = record.school;
//                 }
//               }
//             }
//             console.log(students);
//             let ans = "";
//             for (let student in students) {
//               ans += `${students[student].school}\t${students[student].grade}\t${students[student].class}班\t${students[student].name}\n`;
//             }
//             const element = document.createElement("a");
//             const file = new Blob([ans], { type: "text/plain" });
//             element.href = URL.createObjectURL(file);
//             element.download = "花名册.txt";
//             document.body.appendChild(element);
//             element.click();
//           }}
//         >
//           导出花名册
//         </Button>

//         <Button
//           variant="contained"
//           onClick={async () => {
//             let exportDate = getBetweenDate(startDate, endDate);
//             let students = {};
//             for (let date of exportDate) {
//               students[date] = [];
//             }
//             let res = await net.getAll();
//             for (let record of res) {
//               for (let date of exportDate) {
//                 if (
//                   record.time.indexOf(date) !== -1 &&
//                   students[date].indexOf(record.name) === -1
//                 ) {
//                   students[date].push(record.name);
//                 }
//               }
//             }
//             const element = document.createElement("a");
//             let ans = "";
//             for (let date of exportDate) {
//               ans += `${date}:\n`;
//               for (let student of students[date]) {
//                 ans += `${student}\n`;
//               }
//             }

//             const file = new Blob([ans], { type: "text/plain" });
//             element.href = URL.createObjectURL(file);
//             element.download = "名单.txt";
//             document.body.appendChild(element);
//             element.click();
//           }}
//         >
//           导出日期内被测人名单
//         </Button>
//         <TextField
//           id="outlined-basic"
//           label="学生姓名"
//           variant="outlined"
//           onChange={(e) => {
//             setQueryStudent(e.target.value);
//           }}
//           value={queryStudent}
//         />
//         <Button
//           variant="contained"
//           onClick={async () => {
//             setLoading(true);
//             let res = await net.getByName(queryStudent);
//             let dates = [];
//             for (let record of res) {
//               const date = record.time.split("####")[0].split(" ")[0];
//               if (dates.indexOf(date) === -1) {
//                 dates.push(date);
//               }
//             }
//             console.log(dates);
//             alert(`${queryStudent}已填写${dates.length}天`);
//             setLoading(false);
//           }}
//         >
//           查询某位学生的参与天数
//         </Button>
//         {/* <Button
//           variant="contained"
//           color="error"
//           onClick={async () => {
//             let choice = window.confirm("确定删除所有数据？该操作不可恢复！");
//             if (choice) {
//               const res = await net.deleteAll();
//               console.log(res);
//               alert(`已经删除${res}条数据`);
//             }
//           }}
//         >
//           清空数据库
//         </Button> */}
//       </Stack>
//       <Box
//         sx={{
//           width: "100%",
//           height: "100%",
//         }}
//       >
//         <DataGrid
//           rows={records}
//           columns={columns}
//           pageSize={pageSize}
//           rowsPerPageOptions={[10, 25, 50, 100]}
//           checkboxSelection
//           disableSelectionOnClick
//           filterModel={filterModel}
//           onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
//           pagination
//         />
//       </Box>
//     </Box>
//   );
// }
