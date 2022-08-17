// const host = "http://47.112.121.228:8000";
const host = "https://thupsy.tech:8000";

// TODO: 加登录验证
// TODO: 目前所有查询都是查询所有记录，后续需要改成查询指定记录，把工作放在后端

const Net = {
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
  getByName: async (name) => {
    let res = await fetch(`${host}/records/${name}`);
    res = await res.json();
    return res;
  },
};

export default Net;
