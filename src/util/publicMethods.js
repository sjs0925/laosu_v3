import { ElMessage } from "element-plus";

const publicMethods = {
  /**限制文件上传大小和类型
   * @param file 需要检验的文件
   * @param type 限制文件上传的类型 数组
   * @param size 限制文件上传的大小 int  KB
   */
  limitFileUpload(file, type = [], size = "") {
    if (file.name.indexOf(".") == -1) {
      ElMessage.error("请选择正确的文件");
      return;
    }
    const fileName = file.name.substring(file.name.lastIndexOf(".") + 1);
    const fileSize = file.size;

    const typeLimit = type.includes(fileName);
    const sizeLimit = size > fileSize / 1024;

    if (!typeLimit) {
      ElMessage.error(`上传文件只能是 ${type.toString()} 格式!`);
      return false;
    }
    if (!sizeLimit) {
      ElMessage.error(
        `上传文件大小不能超过 ${
          size < 1024 ? size + "KB" : size / 1024 + "M"
        } !`
      );
      return false;
    }
    return typeLimit && sizeLimit;
  },

  /**复制
   * @param data 需要复制的数据 string
   */
  copyData(data, ElMessage = "复制成功") {
    // 模拟 输入框
    let cInput = document.createElement("input");
    cInput.value = data;
    document.body.appendChild(cInput);
    cInput.select();

    document.execCommand("copy");

    ElMessage.success(ElMessage);

    // 复制成功后再将构造的标签 移除
    document.body.removeChild(cInput);
  },

  /**对象中所有值是否都为空
   * @param obj 传入对象
   ** true是   false 不是
   */
  isNullObj(obj) {
    let flag;
    let keys = Object.keys(obj);
    if (keys.length > 0) {
      flag = !keys.some((item) => {
        return !["", null, undefined].includes(obj[item]);
      });
    } else {
      flag = true;
    }
    return flag;
  },

  /** 数组去重
   * @param {*} arr 接收的原数组
   * @param {*} key 如果是对象数组[{id: 1}, {id: 2}, {id: 3}]，则需要以什么key作为重复的标准，普通数组[1,2,3,2]不需要
   */
  arrUnique(arr, key) {
    let returnArr = [];
    if (key) {
      // 对象数组去重
      const obj = {};
      returnArr = arr.reduce((item, next) => {
        obj[next[key]] ? "" : (obj[next[key]] = true && item.push(next));
        return item;
      }, []);
      return returnArr;
    }
    // 普通数组去重
    returnArr = arr.reduce((item, next) => {
      !item.includes(next) && item.push(next);
      return item;
    }, []);
    return returnArr;
  },

  /**判断数组中的元素是否完全相同
   * @param arr 接受的数组  普通数组
   *  true 是  false 否
   */
  isAllEqual(arr) {
    return arr.length > 0 ? !arr.some((value) => value !== arr[0]) : true;
  },

  /**判断数组中是否存在相同数据
   * @param arr 接受的数组  普通数组
   *  true 是  false 否
   */
  isEqual(arr) {
    let hash = {};
    for (let i in arr) {
      if (hash[arr[i]]) {
        return true;
      }
      hash[arr[i]] = true;
    }
    return false;
  },
  floatOperation() {
    function isInteger(obj) {
      return Math.floor(obj) === obj;
    }
    function toInteger(floatNum) {
      var ret = { times: 1, num: 0 };
      var isNegative = floatNum < 0;
      if (isInteger(floatNum)) {
        ret.num = floatNum;
        return ret;
      }
      var strfi = floatNum + "";
      var dotPos = strfi.indexOf(".");
      var len = strfi.substr(dotPos + 1).length;
      var times = Math.pow(10, len);
      var intNum = parseInt(Math.abs(floatNum) * times + 0.5, 10);
      ret.times = times;
      if (isNegative) {
        intNum = -intNum;
      }
      ret.num = intNum;
      return ret;
    }
    function operation(a, b, op) {
      var o1 = toInteger(a);
      var o2 = toInteger(b);
      var n1 = o1.num;
      var n2 = o2.num;
      var t1 = o1.times;
      var t2 = o2.times;
      var max = t1 > t2 ? t1 : t2;
      var result = null;
      switch (op) {
        case "add":
          if (t1 === t2) {
            // 两个小数位数相同
            result = n1 + n2;
          } else if (t1 > t2) {
            // o1 小数位 大于 o2
            result = n1 + n2 * (t1 / t2);
          } else {
            // o1 小数位 小于 o2
            result = n1 * (t2 / t1) + n2;
          }
          return result / max;
        case "subtract":
          if (t1 === t2) {
            result = n1 - n2;
          } else if (t1 > t2) {
            result = n1 - n2 * (t1 / t2);
          } else {
            result = n1 * (t2 / t1) - n2;
          }
          return result / max;
        case "multiply":
          result = (n1 * n2) / (t1 * t2);
          return result;
        case "divide":
          result = (n1 / n2) * (t2 / t1);
          return result;
      }
    }
    let obj = {
      add: (a, b) => operation(a, b, "add"),
      subtract: (a, b) => operation(a, b, "subtract"),
      multiply: (a, b) => operation(a, b, "multiply"),
      divide: (a, b) => operation(a, b, "divide"),
    };
    return obj;
  },
};

export default publicMethods;
