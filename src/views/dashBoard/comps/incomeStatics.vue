<script setup lang="ts" name="IncomeStatics">
  import { ref, reactive, getCurrentInstance } from 'vue';
  import http from '@/utils/http'
  import incomeItem from './incomeItem.vue';
  import type { IicomeType, IincomeDatas } from '@/types/dashBoard';

  let incomeDatas = reactive<IincomeDatas[]>([])
  const getIncomesDatas = async () => {
    const res = await http.get('/api/income-static')
    if (res.data) {
      const results = res.data as IincomeDatas[]
      for (const item of results) {
        incomeDatas.push(item)
      };
    }
  }
  getIncomesDatas()
</script>

<template>
  <div class="income-static-content">
    <div class="title">营收统计</div>
    <el-scrollbar>
      <incomeItem v-for="(item, index) in incomeDatas" :key="item.city" :item="item" :index="index+1" />
    </el-scrollbar>
  </div>
</template>

<style lang="less" scoped>
  .income-static-content {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    .title {
      font-size: 14px;
      font-weight: bold;
      padding: 12px 8px;
      border-bottom: 1px solid #dcdfe6;
      flex-shrink: 0;
    }
  }
  
</style>