
<script setup lang="ts" name="AddMonitor">
  import { ref } from 'vue';  
  const centerDialogVisible = ref(false);
  withDefaults(defineProps<{
    title?: string
  }>(), {
    title: '新增充电站'
  })
  
  defineExpose({
    centerDialogVisible
  })
</script>

<template>
  <el-dialog
    v-model="centerDialogVisible"
    :title="title"
    width="500"
    destroy-on-close
    right
  >
    <div>
      111
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