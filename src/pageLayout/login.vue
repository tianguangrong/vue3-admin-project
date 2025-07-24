<template>
  <div class="login-container">
    <div class="login-content">
      <div class="title">
        <img :src="title" alt="">
        <span>中国石化能源管理平台</span>
      </div>
      <el-form
        ref="ruleFormRef"
        style="max-width: 600px"
        :model="ruleForm"
        status-icon
        :rules="rules"
        label-width="auto"
        class="demo-ruleForm"
      >
        <el-form-item prop="loginName">
          <el-input v-model="ruleForm.loginName"  prefix-icon="User" type="text" placeholder="请输入登录名称" />
        </el-form-item>
        <el-form-item prop="loginPsw">
          <el-input v-model="ruleForm.loginPsw"  prefix-icon="Hide" type="password"  placeholder="请输入登录密码" autocomplete="off" />
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="submitForm()">登 录</el-button>
        </div>
        <div class="login-btn">
          <el-button @click="resetForm()">重 置</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { ref, reactive } from 'vue';
import { type FormInstance, type FormRules } from 'element-plus';
import { useUserStore } from '@/store/User';
import { useRouter } from 'vue-router';
import title from '@/assets/imgs/title.jpeg';

const router = useRouter()
const userStore = useUserStore()
  const ruleFormRef = ref<FormInstance>();
  interface FormRule {
    loginName: string;
    loginPsw: string
  }
  const ruleForm = reactive<FormRule>({
    loginName: '',
    loginPsw: ''
  })
  //  const rules = reactive<FormRules<typeof ruleForm>>({
  const rules = reactive<FormRules<FormRule>>({
    loginName: [
      {
        required: true,
        message: '登录名为必填项！',
        trigger: 'blur'
      }
    ],
    loginPsw: [
      {
        required: true,
        message: '登录密码为必填项！',
        trigger: 'blur'
      }
    ]
  })
  const submitForm = () => {
    ruleFormRef.value!.validate((valid) => {
      if (valid) {
        userStore.login('/api/login', ruleForm).then(() => {
          router.push('/')
        })
      }
    })
  };
  const resetForm = () => {
  };
</script>
<style lang="less" scoped>
  .login-container {
    display: flex;
    width: 100vw;
    height: 100vh;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: url('../assets/imgs/bg.jpeg');
    background-size: cover;
    .login-content {
      .title {
        width: 100%;
        height: 120px;
        margin-top: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          width: 40px;
        }
        span {
          font-size: 24px;
          font-weight: bold;
        }
      }
      width: 600px;
      height: 420px;
      padding: 20px;
      box-sizing: border-box;
      background: rgba(255, 255, 255, 0.8);
      .login-btn {
        text-align: center;
      }
      .login-btn .el-button {
        width: 100%;
        margin-top: 20px;
      }
      .login-btn:first-chil .el-buttond {
        margin-top: 40px;
      }
    }
  }
</style>