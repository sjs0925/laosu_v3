/**
 * 往数组尾添加新值，若存在重复值，则删除之前的值
 * @param e 需要添加的值
 * @param key 若e为对象，需要指定唯一标识用作判断
 * @param flag 是否在找到重复值时删除该值
 * @returns
 */
const pushNewData = () => {
  Array.prototype.pushNewData = function (e, key) {
    if (Array.isArray(e)) {
      console.error("暂不支持传入数组");
      return;
    }
    if (typeof e === "object" && !key) {
      console.error("请指定标识");
      return;
    }
    for (var i = 0; i < this.length; i++) {
      if (typeof e === "object") {
        if (this[i] && this[i][key] === e[key]) {
          this.splice(i, 1);
        }
      } else {
        if (this[i] === e) {
          this.splice(i, 1);
        }
      }
    }
    this[this.length] = e;
    return this;
  };
};

const laosu_array = () => {
  pushNewData();
};

export default laosu_array;
