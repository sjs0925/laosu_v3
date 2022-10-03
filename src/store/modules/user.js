import {
  // setLocaStore,
  // getLocaStore,
  // removeLocaStore,
  // clearLocaStore,
  setSessionStore,
  getSessionStore,
  // removeSessionStore,
  // clearSessionStore,
} from "../../util/localStorage";

const user = {
  state: {
    /**用户是否登录 */
    isLogin: getSessionStore("isLogin") || false,
    /**用户菜单 */
    userMenu: getSessionStore("menu") || [],
  },
  mutations: {
    /**设置登陆状态 */
    setLoginState(state, flag) {
      state.isLogin = flag;
      setSessionStore({ name: "isLogin", content: flag });
    },
    /**设置用户菜单 */
    setUserMenu(state, data) {
      state.userMenu = data;
      setSessionStore({ name: "menu", content: data });
    },
  },
};
export default user;
