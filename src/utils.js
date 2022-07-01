import Net from "./Net";

export async function getAll(setLoading, setRecords) {
  setLoading(true);
  let res = await Net.getAll();
  res = res.map((item, index) => {
    return {
      ...item,
      id: index + 1,
    };
  });
  console.log("数据加载完成", res);
  setRecords(res);
  setLoading(false);
}
