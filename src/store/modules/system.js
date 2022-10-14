import {
  setLocaStore,
  getLocaStore,
  setSessionStore,
  getSessionStore,
} from "../../util/localStorage";
import { ElLoading } from "element-plus";
const system = {
  state: {
    /**路由菜单 */
    menu: [],
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
    /**设置菜单值 */
    SET_MENU: (state, data) => {
      state.menu = data;
      setSessionStore({ name: "menu", content: data });
    },
  },
  actions: {
    GET_MENU({ commit }) {
      const loadingInstance = ElLoading.service({
        lock: true,
        text: "Loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      return new Promise((resolve) => {
        setTimeout(() => {
          const laosu_menu = [
            {
              name: "学习",
              path: "/study",
              component: () => import("@/page/index/layout"),
              children: [
                {
                  path: "/study/vue",
                  name: "vue",
                  component: () => import("@/views/vue/index"),
                },
                {
                  path: "/study/js",
                  name: "js",
                  component: () => import("@/views/js/index"),
                },
              ],
            },
            // {
            //   name: "听歌",
            //   path: "/music",
            //   component: () => import("@/page/index/layout"),
            //   children: [
            //     {
            //       path: "/music/list",
            //       name: "音乐",
            //       component: () => import("@/views/music/index"),
            //     },
            //   ],
            // },
          ];
          resolve(laosu_menu);
          commit("SET_MENU", laosu_menu);
          loadingInstance.close();
        }, 1000);
      });
    },
  },
};
export default system;
