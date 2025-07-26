<template>
  <div class="nav-header-container">
    <el-tabs
      v-model="currentNav.url"
      type="card"
      @tab-change="handleTabChanger"
      @tab-remove="handleRemoveClicker"
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
  import type {TabPaneName} from 'element-plus';
  import { useRouter, useRoute } from 'vue-router';
  import { useUserStore } from '@/store/User'
  const navStacks = useNavStack();
  const router = useRouter();
  import type { IMenu } from '@/types';
  const { userConfigDatas } = storeToRefs(useUserStore());
  const menulist = userConfigDatas.value.menulist;
  // userConfigDatas
  let { navStack, currentNav } = storeToRefs(navStacks);
  const { updateCurrentNav, removeSliceOnNavStack, addNavToStack } = navStacks;
  const handleTabChanger = (urlValue: TabPaneName):void => {
    const [{ url, name,  icon }] = navStack.value.filter(item => item.url === urlValue);
    updateCurrentNav(url, name, icon)
    router.push(url as string)
  };
  function getCurrentRouteOjectToPath(list: IMenu[], url: string): IMenu | undefined {
    for (const item of list) {
      if (item.url === url) {
        return item
      }
      if (item.children && item.children.length) {
        const result = getCurrentRouteOjectToPath(item.children, url);
        if (result) {
          return result
        }
      }
    }
    return;
  }
  const getCurrentPathUrl = ():void => {
    const {path} = useRoute();
    const { url, name,  icon } = getCurrentRouteOjectToPath(menulist, path) as IMenu;
    console.info('menulist------', url, name, icon);
    addNavToStack(url, name, icon);
    updateCurrentNav(url, name, icon)
  }
  getCurrentPathUrl()
  const handleRemoveClicker = (urlValue: string):void => {
    const removeIndex = navStack.value.findIndex(item => item.url === urlValue);
    removeSliceOnNavStack(urlValue, removeIndex);
    console.log('currentNav.value.url', currentNav.value.url);
    // debugger
    router.push(currentNav.value.url)
  }

  

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
:deep(.el-tabs__header) {
  margin-bottom:  0;
}

</style>