<script setup lang="ts" name="Monitor">
  import { reactive, ref } from 'vue';
  import type { FormInstance, ComponentSize} from 'element-plus'
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
  // 表格逻辑
  interface ItableColumnType {
    date: string
    name: string
    address: string
  }
  let tableData = reactive<ItableColumnType[]>([
    {
      date: '2016-05-03',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
    },
    {
      date: '2016-05-02',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
    },
    {
      date: '2016-05-04',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
    },
    {
      date: '2016-05-01',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
    },
  ]);
  const currentPage = ref(4);
  const pageSize = ref(100);
  const background = ref(false);
  const size = ref<ComponentSize>('default')
  const handleSizeChange = (val: number) => {
    console.log(`${val} items per page`)
  }
  const handleCurrentChange = (val: number) => {
    console.log(`current page: ${val}`)
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
    <div class="intro-content">
      <div class="item">
        <span>累计充电量(度)</span>
        <h3>97,556,425</h3>
      </div>
      <div class="fill-remaining-space"></div>
      <div class="item">
        <span>累计充电次数(次)</span>
        <h3>1,6572</h3>
      </div>
      <div class="fill-remaining-space"></div>
      <div class="item">
        <span>服务区域(个)</span>
        <h3>123</h3>
      </div>
    </div>
    <div class="opera-content">
      <el-button type="primary">
        <el-icon><Plus /></el-icon>
        新增充电站
      </el-button>
    </div>
    <div class="list-content">
      <el-table :data="tableData" height="100%">
        <el-table-column label="日期">
          <template #default="scope">
            <div >
              <el-icon><timer /></el-icon>
              <span>{{ scope.row.date }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="姓名" >
          <template #default="scope">
            {{ scope.row.name }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template #default="scope">
            <el-button type="primary" size="small">
              编辑
            </el-button>
            <el-button
              size="small"
              type="danger"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-content">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[100, 200, 300, 400]"
        :size="size"
        :background="background"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<style lang="less" scoped>
.fill-remaining-space {
  flex: 1;
}
.monitor-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: var(--el-box-shadow-light);
  &>div {
    box-shadow: var(--el-box-shadow-light);
    margin-bottom: 8px;
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
  .intro-content{
    width: auto;
    height: 60px;
    display: flex;
    box-sizing: border-box;
    padding-top: 6px;
    .item {
      width: 120px;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }
  .opera-content {
    width: auto;
    height: 50px;
    display: flex;
    padding: 0 12px;
    align-items: center;
  }
  .list-content {
    flex: 1;
    width: 100%;
    overflow: hidden;
  }
  .pagination-content {
    display: flex;
    justify-content: flex-end;
  }
}
</style>