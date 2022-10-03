import { createStore } from "vuex";

import user from "./modules/user";
import system from "./modules/system";

const getters = {
  /**是否登录 */
  isLogin: (state) => state.user.isLogin,
  /**用户菜单 */
  userMenu: (state) => state.user.userMenu,
  /**面包屑 */
  crumbs: (state) => state.system.crumbs,
};

export default createStore({
  modules: {
    user,
    system,
  },
  getters,
});
