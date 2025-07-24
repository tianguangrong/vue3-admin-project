<template>
  <div class="top-header-container">
    <div>
      <img src="../../assets/imgs/title.jpeg" alt="">
      <div class="title">中国石化</div>
    </div>
    <div class="personal-center-content">
      <el-badge style="margin-top: 8px;" :is-dot="message > 0">
        <el-icon><Bell /></el-icon>
      </el-badge>
      <div style="margin: 0 12px;">
        <el-avatar
        style="width: 30px;height: 30px"
          :src="avatar"
        />
      </div>
      <div>
        <el-dropdown trigger="click" @command="commandChange">
        <span class="el-dropdown-link">
          欢迎你，{{ userConfigDatas.user.username }}<el-icon class="el-icon--right"><arrow-down /></el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item  command="1">
              <el-icon><User /></el-icon>
              个人中心
            </el-dropdown-item>
            <el-dropdown-item command="2">
              <el-icon><SwitchButton /></el-icon>
              退出登录
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts" name="TopHeader">
  import { ref } from 'vue';
  import { useUserStore } from '@/store/User';
  import { storeToRefs } from 'pinia';
  import { useRouter } from 'vue-router'

  let avatar = 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
  const router = useRouter();
  const useStore = useUserStore();
  const { userConfigDatas }  = storeToRefs(useStore);
  const { logout } = useStore;
  console.log('userConfigDatas', userConfigDatas.value.user);
  
  let message = ref(2);

  const commandChange = (value: string):void => {
    console.log(value);
    if (value === '1') {
      router.push('/personal')
    } else {
      logout();
      router.push('/login')
    }
    
  }



</script>
<style lang="less" scoped>
.top-header-container {
  height: 100%;
  width: 100%;
  padding: 0 20px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  justify-content: space-between;
  &>div {
    display: flex;
    align-items: center;
  }
  img {
    height: 40px;
    width: 40px;
  }
  .title {
    font-size: 20px;
    color: #270a0a;
    margin-left: 10px;
    font-weight: 600;
  }
}
</style>