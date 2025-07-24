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
// import type { INavItem } from '@/types/nav';
  const props = defineProps({
    item: {
      type: Object as PropType<IMenu>,
      required: true
    }
  });
  console.log(props.item);
  const navStacks = useNavStack()
  let { addNavToStack } = navStacks;

  const triggerMenuClicker = function (path: { index: string}) {
    console.log('path', path.index);
    
  }
  
  
</script>
<style lang="less" scoped>

</style>