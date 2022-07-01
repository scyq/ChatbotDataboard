import { atom, selector } from "recoil";

export const startDateState = atom({
  key: "startDateState",
  default: new Date(),
});

export const endDateState = atom({
  key: "endDateState",
  default: new Date(),
});

export const recordState = atom({
  key: "recordState",
  default: [],
});

export const recordNumberState = selector({
  key: "recordNumberState",
  get: ({ get }) => {
    const records = get(recordState);
    return records.length;
  },
});

export const scaleIDState = selector({
  key: "scaleIDState",
  get: ({ get }) => {
    const records = get(recordState);
    let scaleIds = [];
    records.forEach((record) => {
      if (scaleIds.indexOf(record["scale_id"]) === -1) {
        scaleIds.push(record["scale_id"]);
      }
    });
    return scaleIds;
  },
});

export const loadingState = atom({
  key: "loadingState",
  default: false,
});
