import {
  setLocaStore,
  getLocaStore,
  setSessionStore,
  getSessionStore,
} from "../../util/localStorage";
const system = {
  state: {
    /**面包屑 */
    crumbs: getSessionStore("crumbs") || [],
    /**白名单本地缓存 */
    whiteListCache: getLocaStore("whiteListCache") || ["whiteListCache"],
  },
  mutations: {
    /**设置面包屑值 */
    setCrumbs: (state, data) => {
      state.crumbs.pushNewData(data, "path");
      setSessionStore({ name: "crumbs", content: state.crumbs });
    },
    /**删除面包屑值 */
    delCrumbs: (state, path) => {
      state.crumbs = state.crumbs.filter((item) => item.path !== path);
      setSessionStore({ name: "crumbs", content: state.crumbs });
    },
    /**设置白名单缓存值 */
    setWhiteListCache: (state, data) => {
      if (data) {
        state.whiteListCache.pushNewData(data);
      }
      setLocaStore({
        name: "whiteListCache",
        content: ["whiteListCache", ...state.whiteListCache],
      });
    },
  },
};
export default system;
