
<script setup lang="ts" name="AddMonitor">
  import { ref, reactive } from 'vue';
  import type { FormInstance, FormRules } from 'element-plus';
  interface RuleForm {
    name: string,
    fast: number | null
  }
  const centerDialogVisible = ref(false);
  withDefaults(defineProps<{
    title?: string
  }>(), {
    title: '新增充电站'
  })
  const ruleForm = reactive<RuleForm>({
    name: '',
    fast: null,
  });
  const rules = reactive<FormRules<RuleForm>>({
    name: [
      { required: true, message: '充电站名称为必填项', trigger: 'blur' },
    ],
    fast: [
      { required: true, message: '快充数为必填项', trigger: 'blur' },
      { type: 'number', message: '快充数必须为数字类型' },
    ],
  })
  defineExpose({
    centerDialogVisible
  })
</script>

<template>
  <el-dialog
    v-model="centerDialogVisible"
    :title="title"
    draggable
    width="70%"
    destroy-on-close
    right
  >
    <div class="form-content">
      <el-form
        ref="monitorFormRef"
        :model="ruleForm"
        :rules="rules"
        :inline="true"
        label-width="auto"
      >
        <el-form-item label="充电站名称" prop="name" style="width: 45%;">
          <el-input v-model="ruleForm.name" />
        </el-form-item>
        <el-form-item label="快充数" prop="fast"  style="width: 45%;">
          <el-input v-model.number="ruleForm.fast" />
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="centerDialogVisible = false">关 闭</el-button>
        <el-button type="primary" @click="centerDialogVisible = false">
          提 交
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style ladng="less" scoped>
  
</style>