<template>
  <el-sub-menu :index="item.url" v-if="item.children && item.children.length > 0">
    <template #title>
      <el-icon><location /></el-icon>
      <span>{{ item.name }}</span>
    </template>
    <MenuItem v-for="child in item.children" :key="child.url" :item="child"/>
  </el-sub-menu>
  <el-menu-item @click="triggerMenuClicker" :index="item.url" v-else>
    <el-icon><document /></el-icon>
    <span>{{ item.name }}</span>
  </el-menu-item>
  
</template>
<script setup lang="ts" name="MenuItem">
import type { PropType } from 'vue';
import type { IMenu } from '@/types';
import { useNavStack } from '@/store/NavStack';
import { useUserStore } from '@/store/User';
import { storeToRefs } from 'pinia';
// import type { INavItem } from '@/types/nav';
  const props = defineProps({
    item: {
      type: Object as PropType<IMenu>,
      required: true
    }
  });
  console.log(props.item);
  const userStore = useUserStore();
  const navStacks = useNavStack();
  let { addNavToStack } = navStacks;
  const { userConfigDatas }  = storeToRefs(userStore);
  const menulist = userConfigDatas.value.menulist
  function getCurrentRouteOjectToPath(list: IMenu[], url: string): IMenu {
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
  }

  const triggerMenuClicker = function (path: { index: string}) {
    const { name, url, icon } =  getCurrentRouteOjectToPath(menulist, path.index);
    addNavToStack(url, name, icon)
    console.log('path----->', );
    
  }
  
  
</script>
<style lang="less" scoped>

</style>