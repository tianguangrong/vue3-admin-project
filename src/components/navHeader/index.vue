<template>
  <div class="nav-header-container">
    <el-tabs
      v-model="currentNav.url"
      type="card"
      class="demo-tabs"
      closable
    >
      <el-tab-pane
        v-for="item in navStack"
        :name="item.url"
        :key="item.url"
      >
      <template #label>
        <span class="custom-tabs-label">
          <el-icon>
            <component :is='item.icon'></component>
          </el-icon>
          <span>
          {{ item.name }}
        </span>
        </span>
      </template>
    </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts" name="NavHeader">
  import { useNavStack } from '@/store/NavStack.ts';
  import { storeToRefs } from 'pinia';
  const navStacks = useNavStack();
  let { navStack, currentNav } = storeToRefs(navStacks)
  console.log(navStack.value, currentNav.value, '11222');
  

</script>

<style lang="less" scoped>
:deep(.el-tabs__content) {
  display: none !important;
}
:deep(.el-tabs__item) {
  // margin: 0 2px;
  // border: 1px solid gray;
}
:deep(.custom-tabs-label) {
  display: flex;
  .el-icon {
    margin-right: 6px;
  }
}


</style>