
<script setup lang="ts" name="AddMonitor">
  import { ref, reactive } from 'vue';
  import type { FormInstance, FormRules } from 'element-plus';
   // 表格逻辑
  interface RuleForm {
    id?: string;
    name: string,
    city: string;
    fast: number | null;
    slow: number | null;
    status: number | null;
    now: number | null;
    fault: number | null;
    person: string;
    tel: number | null;
  }
  const monitorFormRef = ref<FormInstance | null>(null)
  const centerDialogVisible = ref(false);
  withDefaults(defineProps<{
    title?: string
  }>(), {
    title: '新增充电站'
  })
  const ruleForm = reactive<RuleForm>({
    name: '',
    fast: null,
    city: '',
    slow: null,
    now: null,
    fault: null,
    person: '',
    tel: null,
    status: null
  });
  const rules = reactive<FormRules<RuleForm>>({
    name: [
      { required: true, message: '充电站名称为必填项', trigger: 'blur' },
    ],
    fast: [
      { required: true, message: '快充数为必填项', trigger: 'blur' },
      { type: 'number', message: '快充数必须为数字类型' },
    ],
    city: [
      { required: true, message: '所属城市为必选项', trigger: 'blur' },
    ],
    slow: [
      { required: true, message: '慢充数为必填项', trigger: 'blur' },
    ],
    person: [
      { required: true, message: '责任人为必填项', trigger: 'blur' },
    ],
    tel: [
      { required: true, message: '责任人电话为必填项', trigger: 'blur' },
    ],
    status: [
      { required: true, message: '充电状态为必选项', trigger: 'blur' },
    ],
    fault: [
      { required: true, message: '故障数为必填项', trigger: 'blur' },
    ],
  })
  const statusOptions = [
    {
      value: 1,
      label: '空闲中',
    },
    {
      value: 2,
      label: '使用中',
    },
    {
      value: 3,
      label: '待维修',
    },
    {
      value: 4,
      label: '维护中',
    },
    {
      value: 5,
      label: '维修中',
    },
  ]
  const cityOptions = [
    {
      value: '天津',
      label: '天津',
    },
    {
      value: '北京',
      label: '北京',
    },
    {
      value: '成都',
      label: '成都',
    },
    {
      value: '安徽',
      label: '安徽',
    },
    {
      value: '唐山',
      label: '唐山',
    }
  ];
  const submitForm = async (formEl: FormInstance | null) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
      if (valid) {
        centerDialogVisible.value = false;
        console.log('submit!')
      } else {
        console.log('error submit!', fields)
      }
    })
  }

const resetForm = (formEl: FormInstance | null) => {
  if (!formEl) return;
  centerDialogVisible.value = false;
  formEl.resetFields();
}
  defineExpose({
    centerDialogVisible
  })
</script>

<template>
  <el-dialog
    v-model="centerDialogVisible"
    :title="title"
    transition="dialog-bounce"
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
        <el-form-item label="所属城市" prop="city"  style="width: 45%;">
          <el-select
            v-model="ruleForm.city"
            clearable
            placeholder="选择城市"
          >
            <el-option
              v-for="item in cityOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="慢充数" prop="slow"  style="width: 45%;">
          <el-input v-model.number="ruleForm.slow" />
        </el-form-item>
        <el-form-item label="充电状态" prop="status"  style="width: 45%;">
          <el-select
            v-model="ruleForm.status"
            clearable
            placeholder="选择充电状态"
          >
            <el-option
              v-for="item in statusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="正在充电" prop="now"  style="width: 45%;">
          <el-input v-model.number="ruleForm.now" />
        </el-form-item>
        <el-form-item label="故障数" prop="fault"  style="width: 45%;">
          <el-input v-model.number="ruleForm.fault" />
        </el-form-item>
        <el-form-item label="责任人" prop="person" style="width: 45%;">
          <el-input v-model="ruleForm.person" />
        </el-form-item>
        <el-form-item label="责任人电话" prop="tel"  style="width: 45%;">
          <el-input v-model.number="ruleForm.tel" />
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="resetForm(monitorFormRef)">关 闭</el-button>
        <el-button type="primary"  @click="submitForm(monitorFormRef)">
          提 交
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style ladng="less" scoped>
  
</style>