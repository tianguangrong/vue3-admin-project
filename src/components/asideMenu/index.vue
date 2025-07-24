<template>
  <el-menu
      router
      :default-active="route.path"
      class="el-menu-vertical-demo"
    >
      <MenuItem v-for="(item) of menulist" :key="item.url" :item="item"/>
    </el-menu>
</template>
<script setup lang="ts" name="AsideMenu">
  import MenuItem from './comps/menuItem.vue';
  import { storeToRefs } from 'pinia';
  import { useUserStore } from '@/store/User';
  import { useRoute } from 'vue-router';
  const route = useRoute();
  const userStore = useUserStore();
  const { userConfigDatas } = storeToRefs(userStore);
  const  menulist  =  JSON.parse(JSON.stringify(userConfigDatas.value.menulist));
  console.info('menulist------', menulist);
</script>
<style lang="less" scoped>


</style>