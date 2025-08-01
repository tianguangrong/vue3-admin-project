<template>
  <div class="body-container">
    <el-container>
      <el-header>
        <TopHeader/>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <AsideMenu/>
        </el-aside>
        <div class="main-content">
            <NavHeader/>
          <el-main>
            <el-scrollbar>
              <router-view/>
             </el-scrollbar>
          </el-main>
        </div>
      </el-container>
    </el-container>
  </div>
</template>
<script setup lang="ts" name="DefaultPage">
import NavHeader from '@/components/navHeader/index.vue'
import TopHeader from '@/components/topHeader/index.vue';
import AsideMenu from '@/components/asideMenu/index.vue';
</script>
<style lang="less" scoped>
.body-container {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  .el-container {
    height: 100%;
    width: 100%;
    .el-aside {
      box-shadow: 6px 0 8px -8px rgba(0, 0, 0, 0.2);
    }
    .el-header {
      box-shadow: 0 2px 4px -2px rgba(0, 0, 0, 0.2);
      // background-color: #f5f5f5;
      padding: 0 !important;
    }
    .main-content {
      width: 100%;
      height: calc(100vh - 60px);
      overflow: hidden;
      display: flex;
      flex-direction: column;
      .el-main {
        flex: 1;
        padding: 0;
      }
    }
  }
}
:deep(.el-scrollbar__view) {
  width: auto;
  height: 100% !important;
  padding: 12px;
  box-sizing: border-box;
}
</style>
