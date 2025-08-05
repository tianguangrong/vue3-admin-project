<script setup lang="ts" name="IncomeItem">
  import { ref, reactive } from 'vue';
  interface IicomeType<T> {
    item: T;
    index: number
  }
 interface IincomeDatas {
    city: string;
    percent: string;
    income: number;
    type: string;
  }
  withDefaults(defineProps<IicomeType<IincomeDatas>>(), {
    index: 1,
    item: () => {
      return {
        city: '上海',
        income: 456454,
        percent: '24%',
        type: 'up'
      }
    }
  })
</script>

<template>
<div class="income-item">
  <div class="index">
    <span 
      v-if="'color' in item" 
      :class="{'circle-index': ('color' in item)}"
      :style="{'background': (('color' in item) ? item.color as string : '')}">
      {{ index }}
    </span>
    <sub v-else>{{ index }}</sub>
  </div>
  <div class="item">{{ item.city }}</div>
  <div class="fill-remain-space"></div>
  <div class="item">{{ item.income }}</div>
  <div class="item" style="display: flex;">
    <div class="per-box">{{ item.percent }}</div>&nbsp;
    <template v-if="item.type === 'up'">
      <el-icon color="green">
        <CaretTop />
      </el-icon>
    </template>
    <template v-else>
      <el-icon color="red">
        <CaretBottom />
      </el-icon>
    </template>
  </div>
</div>
</template>

<style lang="less" scoped>
  .fill-remain-space {
    flex: 1;
  }
  .income-item {
    width: 100%;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-left: 8px;
     .index {
      width: 40px;
      .circle-index {
        border-radius: 50%;
        display: block;
        width: 16px;
        height: 16px;
        color: #ffffff;
        text-align: center;
        line-height: 16px;
        position: relative;
        left: -4px;
      }
     }
     .item {
      min-width: 68px;
      .per-box {
        min-width: 30px;
      }
     }
  }
  .income-item:nth-child(even) {
    background: rgb(227, 235, 245);
  }
</style>