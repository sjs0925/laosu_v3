import { createRouter, createWebHashHistory } from "vue-router";
import store from "@/store/index";
import layout from "@/page/index/layout";

const routes = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/page/login/login"),
  },
  {
    path: "/",
    name: "主页",
    component: layout,
  },
  // {
  //   path: "/:catchAll(.*)",
  //   name: "login",
  //   component: () => import("@/page/login/login"),
  // },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

/**路由拦截
 * @param to 下一个页面/即将要进入的目标
 * @param form 当前页面
 * @param next 执行下一步操作
 */
router.beforeEach(async (to, form, next) => {
  if (store.getters.isLogin) {
    if (to.path === "/login") {
      next({ path: "/" });
    } else {
      if (store.getters.userMenu.length > 0) {
        next();
      } else {
        const response = await store.dispatch("GET_MENU");
        await response.map((item) => router.addRoute(item));
        next({ ...to, replace: true });
      }
    }
  } else {
    if (to.path === "/login") {
      next();
    } else {
      next("/login");
    }
  }
});
export default router;
