<script setup lang="ts" name="Monitor">
  import { reactive, ref } from 'vue';
  import type { FormInstance} from 'element-plus'
  interface IMonitorForm {
    searchByNameOrId: string;
    searchType: string;
    monitorUseStatus: number[]
  }
  const form = reactive<IMonitorForm>({
    searchByNameOrId: '',
    searchType: '2',
    monitorUseStatus: [],
  })
  let plher = ref<string>('ID');
  let ruleFormRef = ref<FormInstance>();
  const onSubmit = () => {
    console.log('submit!')
  }
  const options = [
    {
      value: 1,
      label: '空闲中'
    },
    {
      value: 2,
      label: '使用中'
    },
    {
      value: 3,
      label: '待维修'
    },
    {
      value: 4,
      label: '维护中'
    },
  ]
  const changeIputsearchType = (value:string):void => {
    switch (value) {
      case '1':
        plher.value = '名称'
        break;
      default:
        plher.value = 'ID'
        break;
    }
    console.log(value);
  }
  const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields();
    form.searchType = '2'
    changeIputsearchType(form.searchType)
  }
</script>

<template>
  <div class="monitor-container">
    <div class="search-content">
      <el-form :model="form" ref="ruleFormRef" label-width="auto" style="width: 100%;">
          <el-row style="width: 100%;" :gutter="12">
            <el-col :span="8">
              <el-form-item prop="searchByNameOrId">
                <el-input
                  v-model="form.searchByNameOrId"
                  style="max-width: 600px"
                  :placeholder="'请输入查询'+ plher"
                  class="input-with-select"
                >
                  <template #append>
                    <el-select @change="changeIputsearchType" v-model="form.searchType" placeholder="条件查询" style="width: 115px">
                      <el-option label="按名称查询" value="1" />
                      <el-option label="按ID查询" value="2" />
                    </el-select>
                  </template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item prop="monitorUseStatus">
                <el-select v-model="form.monitorUseStatus" multiple placeholder="充电站监控状态" style="width: 100%">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
            </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item>
                <el-button type="primary" @click="onSubmit" size="small">查询</el-button>
                <el-button size="small" @click="resetForm(ruleFormRef)">重置</el-button>
              </el-form-item>
            </el-col>
          </el-row>
      </el-form>
    
    </div>
    <div class="opera-content"></div>
    <div class="list-content"></div>
    <div class="pagination-content"></div>
  </div>
</template>

<style lang="less" scoped>
.monitor-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: var(--el-box-shadow-light);
  &>div {
    box-shadow: var(--el-box-shadow-light);
    margin-bottom: 12px;
  }
  &>div:last-child {
    margin-bottom: 0px;
    flex-shrink: 0;
  }
  .search-content {    
    display: flex;
    align-items: center;
    :deep(.el-form-item) {
      margin-bottom: 0px;
      &:last-child .el-form-item__content {
        justify-content: flex-end;
        height: 32px;
      }
    }
    
  }
  .pagination-content,
  .search-content {
    width: auto;
    height: 70px;
    flex-shrink: 0;
    padding: 0 12px;
  }
  .opera-content {
    width: auto;
    height: 50px;
  }
  .list-content {
    flex: 1;
  }
}
</style>