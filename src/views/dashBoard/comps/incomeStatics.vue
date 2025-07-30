<script setup lang="ts" name="IncomeStatics">
  import { ref, reactive } from 'vue';
  import incomeItem from './incomeItem.vue';
  const item = {
        city: '上海',
        income: 456453,
        percent: '24%',
        type: 'up'
  }
</script>

<template>
  <div class="title">营收统计</div>
  <incomeItem :item="item" :index="1" />
</template>

<style lang="less" scoped>
  .title {
    font-size: 14px;
    font-weight: bold;
    padding: 12px 8px;
    border-bottom: 1px solid #dcdfe6;
  }
</style>