export const deepClone = <T>(initData: T): T => {
  if (!initData) {
    return initData;
  }
  const deep = (data: unknown): unknown => {
    if (Array.isArray(data)) {
      let res: Array<unknown> = [];
      data.forEach((item: unknown) => {
        res = [...res, deep(item)];
      });
      return res;
    } else if (data instanceof Object) {
      const res = {};
      Object.entries(data).forEach((item) => {
        res[item[0]] = deep(item[1]);
      });
      return res;
    } else {
      return data;
    }
  };
  return deep(initData) as T;
};
