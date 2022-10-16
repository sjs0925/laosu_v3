<template>
  <el-collapse
    v-for="item in customFun"
    :key="item.functionName"
    v-model="activeName"
    accordion
  >
    <el-collapse-item
      :title="item.title"
      :name="item.functionName"
    >
      <div class="fun">
        <div class="fun-item">
          <div class="fun-item-title">方法名</div>
          <div class="fun-item-content">{{item.functionName}}</div>
        </div>
        <div class="fun-item">
          <div class="fun-item-title">参数：</div>
          <div class="fun-item-content">
            <div
              v-for="param in item.params"
              :key="param.name"
            >

              <div class="name">
                <i><span
                    v-if="param.isRequire"
                    class="important"
                  >*</span>
                  {{param.name}}</i>
              </div>
              {{param.remark}}
            </div>

          </div>
        </div>
        <div class="fun-item">
          <div class="fun-item-title">使用：</div>
          <div class="fun-item-content">
            <li
              v-for="(use,useIndex) in item.use"
              :key="`use${useIndex}`"
            >
              {{use.example}}
              ==========
              {{use.result}}</li>
          </div>
        </div>
        <div
          class="fun-item"
          v-if="item.remark"
        >
          <div class="fun-item-title"><b>注<span class="important">*</span></b></div>
          <div class="fun-item-content"> {{item.remark}}</div>
        </div>
      </div>
    </el-collapse-item>

  </el-collapse>
</template>

<script setup>
import { reactive, ref } from "vue";

const activeName = ref('')
const customFun = reactive([
  {
    title: '解决js浮点计算精度丢失',
    functionName: 'floatOperation',
    params: [
      {
        name: 'num1',
        remark: '需要参与运算的第一个数字',
        isRequire: true
      }, {
        name: 'num2',
        remark: '需要参与运算的第二个数字',
        isRequire: true
      }
    ],
    use: [
      {
        example: 'floatOperation().add( 0.1, 0.2 )',
        result: '0.3'
      },
      {
        example: 'floatOperation().subtract( 1, 0.9 )',
        result: '0.1'
      },
      {
        example: 'floatOperation().multiply( 19.9, 100 )',
        result: '1990'
      },
      {
        example: 'floatOperation().divide( 0.9, 100 )',
        result: '0.009'
      }
    ],
    remark: '',
  },
  {
    title: '判断数组中是否存在相同数据',
    functionName: 'isEqual',
    params: [
      {
        name: 'arr',
        remark: '需要检测的数组',
        isRequire: true
      }
    ],
    use: [
      {
        example: 'isEqual( [1, 2, 3] )',
        result: 'false'
      },
      {
        example: 'isEqual( [1, 2, 3, 1] )',
        result: 'true'
      }
    ],
    remark: 'isEqual不会对空数组进行检测，该方法通过返回一个布尔值来判断数组中是否存在相同的值'
  },
  {
    title: '判断数组中的元素是否完全相同',
    functionName: 'isAllEqual',
    params: [
      {
        name: 'arr',
        remark: '需要检测的数组',
        isRequire: true
      }
    ],
    use: [
      {
        example: 'isAllEqual([1,2,3])',
        result: 'false'
      },
      {
        example: 'isAllEqual[1,1,1]',
        result: 'true'
      }
    ],
    remark: 'isAllEqual不会对空数组进行检测，该方法通过返回一个布尔值来判断数组中所有的值是否都相同'
  },
  {
    title: '数组去重',
    functionName: 'arrUnique',
    params: [
      {
        name: 'arr',
        remark: '接收的原数组',
        isRequire: true
      },
      {
        name: 'key',
        remark: '如果是对象数组[{id: 1}, {id: 2}, {id: 3}]，则该参数必填，值为以作为判断依据的key，普通数组[1,2,3,2]不需要',
        isRequire: false
      }
    ],
    use: [{
      example: 'arrUnique([1,2,3,1])',
      result: '[1,2,3]'
    }, {
      example: " arrUnique([{id: 1}, {id: 2}, {id: 3}, {id: 1}], 'id')",
      result: '[{id: 1}, {id: 2}, {id: 3}]'
    }],
    remark: 'arrUnique用于数组去重，该方法会返回一个新数组，值为经过去重处理后的数组，该方法不会影响原数组'
  },
  {
    title: '对象中所有值是否都为空',
    functionName: 'isNullObj',
    params: [
      {
        name: 'obj',
        remark: '需要判断的对象',
        isRequire: true
      }
    ],
    use: [
      {
        example: 'isNullObj( {} )',
        result: 'true'
      },
      {
        example: "isNullObj( { name : '', age : null } )",
        result: 'true'
      },
      {
        example: "isNullObj( { name : '张三', age : null } )",
        result: 'false'
      }
    ],
    remark: 'isNullObj不会对空对象进行检测，该方法通过返回一个布尔值来判断对象中所有的值是否都为空'
  },
  // {
  //   title: 'pushNewData 往数组尾添加新值，若存在重复值，则删除之前的值 (基于原型链添加自定义方法)',
  //   functionName: 'pushNewData',
  //   params: [
  //     {
  //       name: '',
  //       remark: '',
  //       isRequire: true
  //     }
  //   ],
  //   use: [
  //     {
  //       example: '',
  //       result: ''
  //     },
  //     {
  //       example: '',
  //       result: ''
  //     },
  //     {
  //       example: '',
  //       result: ''
  //     },
  //     {
  //       example: '',
  //       result: ''
  //     }
  //   ],
  //   remark: ''
  // },
  // {
  //   title: '',
  //   functionName: '',
  //   params: [
  //     {
  //       name: '',
  //       remark: '',
  //       isRequire: true
  //     }
  //   ],
  //   use: [
  //     {
  //       example: '',
  //       result: ''
  //     }
  //   ],
  //   remark: ''
  // },
])
</script>
<style lang="scss" scoped>
.fun {
  &-item {
    margin-bottom: 10px;
    &-title {
      display: inline-block;
      width: 60px;
      vertical-align: top;
    }
    &-content {
      display: inline-block;
      width: calc(100% - 90px);
      @include block(#eee);
      .name {
        display: inline-block;
        min-width: 60px;
        max-width: 100px;
        font-weight: 900;
      }
    }
  }
}
</style>