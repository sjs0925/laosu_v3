import store from "@/store/index";

/**缓存名关键字 */
const keyName = "laosu_";
/**用于需要持久化存储在本地的数据 */
export const setLocaStore = (params = {}, whiteList = false) => {
  let { name, content } = params;
  name = keyName + name;
  if (whiteList) {
    store.commit("setWhiteListCache", name);
  }
  const obj = { name, content };
  localStorage.setItem(name, JSON.stringify(obj));
};
export const getLocaStore = (name) => {
  name = keyName + name;
  return JSON.parse(localStorage.getItem(name))?.content;
};
export const removeLocaStore = (name) => {
  name = keyName + name;
  localStorage.removeItem(name);
};

export const clearLocaStore = () => {
  const arr = store.getters.whiteListCache.map((item) => {
    return item;
  });
  localStorage.clear();
  arr.map((item) => setLocaStore(item, true));
};

/**用于临时存储在本地的数据 */
export const setSessionStore = (params = {}) => {
  let { name, content } = params;
  name = keyName + name;
  const obj = { name, content };
  sessionStorage.setItem(name, JSON.stringify(obj));
};
export const getSessionStore = (name) => {
  name = keyName + name;
  return JSON.parse(sessionStorage.getItem(name))?.content;
};
export const removeSessionStore = (name) => {
  name = keyName + name;
  sessionStorage.removeItem(name);
};
export const clearSessionStore = () => {
  sessionStorage.clear();
};
