import { createRouter, createWebHashHistory } from "vue-router";
import store from "@/store/index";
import layout from "../page/index/layout";

const routes = [
  {
    path: "/login",
    name: "login",
    component: () => import("../page/login/login"),
  },
  {
    path: "/",
    name: "学习",
    component: layout,
    //默认进入重定向页面
    // redirect:'/',
    children: [
      {
        path: "/vue",
        name: "vue",
        component: () => import("../views/vue/index"),
      },
      {
        path: "/js",
        name: "js",
        component: () => import("../views/js/index"),
      },
    ],
  },
  {
    path: "/music",
    name: "听歌",
    component: layout,
    children: [
      {
        path: "/music/list",
        name: "音乐",
        component: () => import("../views/music/index"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
// const store = useStore();

/**路由拦截
 * @param to 下一个页面/即将要进入的目标
 * @param form 当前页面
 * @param next 执行下一步操作
 */
router.beforeEach((to, form, next) => {
  if (store.getters.isLogin) {
    next();
  } else {
    if (to.path === "/login") {
      next();
    } else {
      next("/login");
    }
  }
});
export default router;
