<script setup lang="ts" name="Monitor">
  
</script>

<template>
  <div class="monitor-container">
    <div class="search-content"></div>
    <div class="opera-content"></div>
    <div class="list-content"></div>
    <div class="pagination-content"></div>
  </div>
</template>

<style lang="less" scoped>
.monitor-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: var(--el-box-shadow-light);
  &>div {
    box-shadow: var(--el-box-shadow-light);
    margin-bottom: 12px;
  }
  &>div:last-child {
    margin-bottom: 0px;
    flex-shrink: 0;
  }
  .pagination-content,
  .search-content {
    width: auto;
    height: 70px;
    flex-shrink: 0;
  }
  .opera-content {
    width: auto;
    height: 50px;
  }
  .list-content {
    flex: 1;
  }
}
</style>