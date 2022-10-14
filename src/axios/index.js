/**
 * 全站http配置
 *
 * axios参数说明
 * isSerialize是否开启form表单提交
 * isToken是否需要token
 */
 import axios from "axios";
 import store from "@/store/";
 import router from "@/router/router";
 import { serialize } from "@/util/util";
 import { getToken } from "@/util/auth";
 import { Message } from "element-ui";
 import website from "@/config/website";
 // import { Base64 } from "js-base64";
 import NProgress from "nprogress";
 import "nprogress/nprogress.css";
 
 //默认超时时间
 // axios.defaults.timeout = 20000;
 
 // //设置全局的最高请求次数，请求间隙
 // /**次数 */
 // axios.defaults.retry = 6;
 // /**间隙 */
 // axios.defaults.retryDelay = 100;
 
 // axios.interceptors.response.use(undefined, function axiosRetryInterceptor (err) {
 //   let config = err.config;
 //   /**如果配置不存在或未设置重试选项，则返回错误信息 */
 //   if (!config || !config.retry) return Promise.reject(err.response.data);
 
 //   config.__retryCount = config.__retryCount || 0;
 //   /**检查是否已经超过了总重试次数 */
 //   if (config.__retryCount >= config.retry) {
 //     /**返回错误信息 */
 //     return Promise.reject(err.response.data);
 //   }
 
 //   /**重试次数加1 */
 //   config.__retryCount += 1;
 
 //   /**创建延时器等待发送重试请求 */
 //   let backoff = new Promise(function (resolve) {
 //     setTimeout(function () {
 //       resolve();
 //     }, config.retryDelay || 1);
 //   });
 
 //   /**返回调用AXIOS来重试请求 */
 //   return backoff.then(function () {
 //     return axios(config);
 //   });
 // });
 
 //返回其他状态码
 axios.defaults.validateStatus = function (status) {
   return status >= 200 && status <= 500;
 };
 //跨域请求，允许保存cookie
 axios.defaults.withCredentials = true;
 // NProgress 配置
 NProgress.configure({
   showSpinner: false
 });
 //http request拦截
 axios.interceptors.request.use(
   config => {
     // debugger
     //开启 progress bar
     NProgress.start();
     const meta = config.meta || {};
     // const isToken = meta.isToken === false;
     if (
       config.url == "/api/auth/oauth/captcha" ||
       config.url == "/api/auth/oauth/smsCode" ||
       config.url === '/api/dfs/oss/put-file-attach'
     ) {
       config.headers["Authorization"] = "";
     } else if (config.url == "/api/auth/login") {
       // removeToken()
     } else if (config.url == "/api/auth/oauth/token") {
       config.headers["Authorization"] = "";
       // removeToken()
     } else {
       config.headers["Authorization"] = "bearer " + getToken();
     }
     //让每个请求携带token
     // if (getToken() && !isToken) {
     //   config.headers[website.tokenHeader] = "bearer " + getToken();
     // }
     //headers中配置text请求
     if (config.text === true) {
       config.headers["Content-Type"] = "text/plain";
     }
     //headers中配置serialize为true开启序列化
     if (config.method === "post" && meta.isSerialize === true) {
       config.data = serialize(config.data);
     }
     return config;
   },
   error => {
     return Promise.reject(error);
   }
 );
 //http response 拦截
 axios.interceptors.response.use(
   res => {
     // debugger
     //关闭 progress bar
     NProgress.done();
     //获取状态码
     const status = res.data.code || res.status;
     const statusWhiteList = website.statusWhiteList || [];
     const message =
       res.data.msg ||
       res.data.message ||
       res.data.error_description ||
       "未知错误";
     //如果在白名单里则自行catch逻辑处理
     if (statusWhiteList.includes(status)) return Promise.reject(res);
     //如果是401则跳转到登录页面
     if (status === 401) {
       store.dispatch("FedLogOut").then(() => router.push({ path: "/login" }));
       return
     }
     // 如果请求为非200否者默认统一处理]
     if (status != 200 && status !== 401) {
         Message({
           message: message,
           type: "error"
         });
       return Promise.reject(new Error(message))
     }
 
     return res;
   },
   error => {
     NProgress.done();
     return Promise.reject(new Error(error));
   }
 );
 
 export default axios;
 