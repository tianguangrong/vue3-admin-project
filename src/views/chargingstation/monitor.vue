<script setup lang="ts" name="Monitor">
  import { onMounted, reactive, ref } from 'vue';
  import type { FormInstance, ComponentSize } from 'element-plus';
  import { ElNotification } from 'element-plus'
  import http from '@/utils/http';
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
  let loading = ref(false)
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
    form.searchType = '2';
    currentPage.value = 1;
    changeIputsearchType(form.searchType);
    monitorDatas();
  }
  // 表格逻辑
  interface ItableColumnType {
    id: string;
    city: string;
    fast: number;
    slow: number;
    status: number;
    now: number;
    fault: number;
    person: string;
    tel: number;
  }
  const tableColumns = [
    {
      prop: 'name',
      label: '站点名称',
      fixed: false,
      minWidth: '140',
      showTooltip: false,
    },
    {
      prop: 'id',
      label: '站点ID',
      fixed: false,
      minWidth: '110',
      showTooltip: false,
    },
    {
      prop: 'city',
      label: '所属城市',
      fixed: false,
      // width: '100',
      showTooltip: false,
    },
    {
      prop: 'fast',
      label: '快充数',
      fixed: false,
      // minWidth: '100',
      showTooltip: false,
    },
    {
      prop: 'slow',
      label: '慢充数',
      fixed: false,
      // width: '100',
      showTooltip: false,
    },
    {
      prop: 'status',
      label: '状态',
      slot: true,
      fixed: false,
      width: '90',
      showTooltip: false,
    },
    {
      prop: 'now',
      label: '正在充电',
      fixed: false,
      // minWidth: '100',
      showTooltip: false,
    },
    {
      prop: 'fault',
      label: '故障数',
      fixed: false,
      // minWidth: '100',
      showTooltip: false,
    },
    {
      prop: 'person',
      label: '责任人',
      fixed: false,
      // minWidth: '100',
      showTooltip: false,
    },
    {
      prop: 'tel',
      label: '责任人电话',
      fixed: false,
      width:'120',
      showTooltip: false,
    },
  ]
  let tableData = ref<ItableColumnType[]>([]);
  const currentPage = ref(1);
  const pageSize = ref(10);
  let total = ref(0)
  const size = ref<ComponentSize>('default')
  const onSubmit = () => {
    monitorDatas();
  }
  const handleSizeChange = () => {
    monitorDatas();
  }
  const handleCurrentChange = () => {
    monitorDatas();
  }
  const monitorDatas = async () => {
    loading.value = true
    const datas = {
      pageSize: pageSize.value,
      page: currentPage.value,
      id: +form.searchType === 2 ? form.searchByNameOrId.trim() : null,
      name: +form.searchType === 1 ? form.searchByNameOrId.trim() : null,
      status: ''
    }
    try {
      const {code: v_200, data } = await http.post('/api/stationList', datas);
      if (+v_200 === 200 && data) {
        const { list, total: t_number } = data as  { list: any, total: number };
        tableData.value = list;
        total.value = t_number;
        console.log(list);
        // ElNotification({
        //   title: 'Success',
        //   message: '获取数据成功',
        //   type: 'success',
        // })
      } else {
        ElNotification({
          title: 'Warning',
          message: '接口请求数据错误',
          type: 'warning',
        })
      }
      loading.value = false
    } catch (error) {
      ElNotification({
        title: 'Error',
        message: '接口请求异常',
        type: 'error',
      })
      loading.value = false
    }
    
    
  }
  onMounted(() => {
    monitorDatas();
  })
  ///api/stationList
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
    <div class="list-content" v-loading="loading">
      <el-table :data="tableData"  stripe style="width: 99.8%" height="99.8%">
        <el-table-column type="index" label="序号" width="62" />
        <template v-for="item of tableColumns">
          <el-table-column v-if="!item.slot" :key="item.prop" :fixed="item.fixed" :prop="item.prop" :label="item.label" :min-width="item.minWidth || ''" :width="item.width || ''"/>
          <el-table-column v-else :label="item.label" :min-width="item.minWidth || ''" :width="item.width|| ''">
            <template #default="{row}">
              {{ row[item.prop] }}
            </template>
          </el-table-column>
        </template>
        <el-table-column fixed="right" label="操作" width="148">
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
        :page-sizes="[10, 20, 50]"
        :size="size"
        background
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
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
    // width: 100%;
    overflow: hidden;
  }
  .pagination-content {
    display: flex;
    justify-content: flex-end;
  }
}
:deep(.el-table .warning-row) {
  --el-table-tr-bg-color: var(--el-color-warning-light-9);
}
:deep(.el-table .success-row){
  --el-table-tr-bg-color: var(--el-color-success-light-9);
}
</style>