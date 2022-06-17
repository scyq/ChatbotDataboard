import * as React from "react";
import { Box } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import Button from "@mui/material/Button";
import { Stack } from "@mui/material";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const host = "http://47.112.121.228:8000";

const net = {
  deleteAll: async () => {
    const res = await fetch(`${host}/deleteall`, {
      method: "DELETE",
    });
    return await res.json();
  },
  getAll: async () => {
    let res = await fetch(`${host}/getall`);
    res = await res.json();
    return res;
  },
};

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

const Loading = (props) => {
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={props.open}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

// TODO: 加登录验证

export default function Admin() {
  const [records, setRecords] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [filterModel, setFilterModel] = useState({
    items: [],
  });
  const [scaleIDs, setScaleIDs] = useState(null);
  const [inputScaleIDs, setInputScaleIDs] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100vw",
        height: "100vh",
      }}
    >
      <Loading open={loading} />
      <Stack direction="row" spacing={5} sx={{ marginTop: "30px" }}>
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
          }}
          inputValue={inputScaleIDs}
          onInputChange={(event, newInputValue) => {
            setInputScaleIDs(newInputValue);
          }}
        />
        <Button
          variant="contained"
          onClick={async () => {
            setLoading(true);
            let res = await net.getAll();
            let scaleIds = [];
            res = res.map((item, index) => {
              if (scaleIds.indexOf(item["scale_id"]) === -1) {
                scaleIds.push(item["scale_id"]);
              }
              return {
                ...item,
                id: index + 1,
              };
            });
            setRecords(res);
            setScaleIDs(scaleIds);
            setLoading(false);
          }}
        >
          获取所有记录
        </Button>
        <Button
          variant="contained"
          onClick={async () => {
            let exportDate = ["06-11", "06-12", "06-13", "06-14"];
            let students = {};
            for (let date of exportDate) {
              students[date] = [];
            }
            let res = await net.getAll();
            for (let record of res) {
              for (let date of exportDate) {
                if (
                  record.time.indexOf(date) !== -1 &&
                  students[date].indexOf(record.name) === -1
                ) {
                  students[date].push(record.name);
                }
              }
            }
            const element = document.createElement("a");
            let ans = "";
            for (let date of exportDate) {
              ans += `${date}:\n`;
              for (let student of students[date]) {
                ans += `${student}\n`;
              }
            }

            const file = new Blob([ans], { type: "text/plain" });
            element.href = URL.createObjectURL(file);
            element.download = "名单.txt";
            document.body.appendChild(element);
            element.click();
          }}
        >
          导出所有被测人名单
        </Button>
        {/* <Button
          variant="contained"
          color="error"
          onClick={async () => {
            let choice = window.confirm("确定删除所有数据？该操作不可恢复！");
            if (choice) {
              const res = await net.deleteAll();
              console.log(res);
              alert(`已经删除${res}条数据`);
            }
          }}
        >
          清空数据库
        </Button> */}
      </Stack>
      <Box
        sx={{
          width: "100%",
          height: "100%",
        }}
      >
        <DataGrid
          rows={records}
          columns={columns}
          pageSize={pageSize}
          rowsPerPageOptions={[10, 25, 50, 100]}
          checkboxSelection
          disableSelectionOnClick
          filterModel={filterModel}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          pagination
        />
      </Box>
    </Box>
  );
}
