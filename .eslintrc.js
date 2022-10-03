module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ["plugin:vue/vue3-essential", "eslint:recommended"],
  parserOptions: {
    parser: "@babel/eslint-parser",
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    //关闭eslint检查文件名是否为驼峰命名
    "vue/multi-word-component-names": "off",
    // 变量已定义未使用不报错
    "vue/no-unused-components": "off",
    // "no-unused-vars": "off",
    "eslint-plugin-vue": "off",
  },
};
