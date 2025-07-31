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
  <div class="title">营收统计</div>
  <incomeItem v-for="(item, index) in incomeDatas" :key="item.city" :item="item" :index="index+1" />
</template>

<style lang="less" scoped>
  .title {
    font-size: 14px;
    font-weight: bold;
    padding: 12px 8px;
    border-bottom: 1px solid #dcdfe6;
  }
</style>