<script setup lang="ts" name="IncomeItem">
  import { ref, reactive, withDefaults } from 'vue';
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
  <div class="index">{{ index }}</div>
  <div class="item">{{ item.city }}</div>
  <div class="fill-remain-space"></div>
  <div class="item">{{ item.income }}</div>
  <div class="item" style="display: flex;">
    <span>{{ item.percent }}</span>
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
     }
     .item {
      width: 60px;
     }
  }
  .income-item:nth-child(even) {
    background: rgb(227, 235, 245);
  }
</style>