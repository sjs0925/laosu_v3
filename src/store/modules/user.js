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
  },
  mutations: {
    /**设置登陆状态 */
    setLoginState(state, flag) {
      state.isLogin = flag;
      setSessionStore({ name: "isLogin", content: flag });
    },
  },
};
export default user;
