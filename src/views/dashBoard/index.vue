<script setup lang="ts" name="DashBoard">
  import SumItem from './comps/sumItem.vue';
  import one from '@/assets/imgs/1.png'
  import two from '@/assets/imgs/2.png'
  import three from '@/assets/imgs/1753530122187(1).png'
  import four from '@/assets/imgs/4.png'
  import wu from '@/assets/imgs/5.png'
  import liu from '@/assets/imgs/6.png'
  import qi from '@/assets/imgs/7.png'
  import ba from '@/assets/imgs/8.png'
  import jiu from '@/assets/imgs/9.png'
  import Rador from './comps/rador.vue'
  import http from '@/utils/http';
  import { ref, reactive } from  'vue'
  import type { Tlenget, TData, ICategory, IDeviceDataRes } from '@/types/dashBoard';
  let getLegend = ref<Tlenget>([]);
  let getCategory = reactive<ICategory[]>([]);
  let getDeviceData = ref<TData>([]);

  async function getDeviceSumaryDatas(): Promise<IDeviceDataRes<string[], number[], string[]> | null>{
    const res = await http.get('/api/get-device-sumary', {})
    if (res.data) {
      const { legend, category, record } = res.data as IDeviceDataRes<string[], number[], string[]>;
      return Promise.resolve({
        legend,
        record,
        category
      })
    }
    return Promise.reject(null)
  }
  getDeviceSumaryDatas().then(result => {
    if (result) {
        getCategory = result.category.map(item => {
          return { name: item }
        });
        getLegend.value = result.legend;
        getDeviceData.value = result.record; 
        console.log('result:', getLegend, getDeviceData, getCategory);
    }
  });
</script>

<template>
  <el-row :gutter="12" class="dashboard-container">
    <el-col :span="18" class="left">
      <el-card class="datas-sumary">
        <div class="title">
          <h3>今日设备运行状态</h3>
          <div>
            <span>更新时间：</span>
            <span>2024年8月26日</span>
          </div>
          &nbsp;
          <div class="icon">
            <el-icon><Refresh /></el-icon>
          </div>
        </div>
        <div class="content">
          <div class="sum-item">
            <sum-item :val="5" title="充电桩使用率：" color="green" :imgSrc="one">
              <template v-slot:rateData>
                <h2>72 / 95</h2>
              </template>
              <span>24%</span>
            </sum-item>
          </div>
          <div class="fill-remaining-space"></div>
          <div class="sum-item">
            <sum-item :val="22" title="充电柜使用率：" color="red" :imgSrc="two">
              <template v-slot:rateData>
                <h2>655 / 1233</h2>
              </template>
              <span>21%</span>
            </sum-item>
          </div>
          <div class="fill-remaining-space"></div>
          <div class="sum-item">
            <sum-item :val="49" title="充电站使用率：" color="green" :imgSrc="three">
              <template #rateData>
                <h2>2263 / 3398</h2>
              </template>
              <span>28%</span>
            </sum-item>
          </div>
        </div>
      </el-card>
      <el-card class="used-content">
        <div class="used-item">
          <img :src="four" width="60px" alt="">
          <div>设备维修</div>
        </div>
        <div class="used-item">
          <img :src="wu" width="60px" alt="">
          <div>每日日报</div>
        </div>
        <div class="used-item">
          <img :src="liu" width="60px" alt="">
          <div>任务进度</div>
        </div>
        <div class="used-item">
          <img :src="qi" width="60px" alt="">
          <div>营收占比</div>
        </div>
        <div class="used-item">
          <img :src="ba" width="60px" alt="">
          <div>营收统计</div>
        </div>
        <div class="used-item">
          <img :src="jiu" width="60px" alt="">
          <div>待办事项</div>
        </div>
      </el-card>
      <el-card class="statics-content"></el-card>
    </el-col>
    <el-col :span="6" class="right">
      <el-card class="device-view">
        <template v-slot:header>设备总览</template>
        <Rador :legend="getLegend" :record="getDeviceData" :category="getCategory"/>
      </el-card>
      <el-card class="sale-static"></el-card>
      <el-card class="alarm-datas"></el-card>
    </el-col>
  </el-row>

</template>

<style lang="less" scoped>
.fill-remaining-space {
  flex: 1;
}
  .dashboard-container {
    width: 100%;
    height: 100%;
    .el-col.left {
      display: flex;
      flex-direction: column;
      .el-card.datas-sumary {
        height: 310px;
        .title {
          display: flex;
          align-items: center;
          h3 {
            margin-right: 12px;
            color: #0d0d0d;
          }
          .icon {
            cursor: pointer;
          }
        }
         :deep(.el-card__body) {
            height: 100%;
            display: flex;
            flex-direction: column;
            box-sizing: border-box;
          }
        .content {
          flex: 1;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-sizing: border-box;
          margin-left: 12px;
          .sum-item {
            flex: 1;
          }
        }
      }
      .used-content {
        margin: 12px 0;
        display: flex;
        align-items: center;
        justify-content: space-around;
        :deep(.el-card__body) {
          flex-direction: row;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-around;
        }
        .used-item {
          flex: 1;
          height: 100%;
          /* text-align: center; */
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          img {
            margin-bottom: 20px;
          }
          &>div {
            font-size: 16px;
          }
        }
      }
      .statics-content {
        flex: 1;
      }
    }
    .el-col.right {
      display: flex;
      flex-direction: column;
      .el-card.device-view {
        height: 320px;
        display: flex;
        flex-direction: column;
        :deep(.el-card__body) {
          display: flex;
          flex: 1;
          box-sizing: border-box;
        }
      }
      .sale-static {
        flex: 1;
        margin: 12px 0;
      }
      .alarm-datas {
        flex: 1;
      }
    }
  }
 
</style>