import { setSessionStore, getSessionStore } from "../../util/localStorage";
const system = {
  state: {
    /**面包屑 */
    crumbs: getSessionStore("crumbs") || [],
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
  },
};
export default system;
