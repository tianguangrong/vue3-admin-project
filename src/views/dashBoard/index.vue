<script setup lang="ts" name="DashBoard">
  import SumItem from './comps/sumItem.vue';
  import one from '@/assets/imgs/1.png'
  import two from '@/assets/imgs/2.png'
  import three from '@/assets/imgs/1753530122187(1).png'
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
              <template v-slot:rateData>
                <h2>2263 / 3398</h2>
              </template>
              <span>28%</span>
            </sum-item>
          </div>
        </div>
      </el-card>
      <el-card class="used-content"></el-card>
      <el-card class="statics-content"></el-card>
    </el-col>
    <el-col :span="6" class="right">
      <el-card class="device-view"></el-card>
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
        height: 340px;
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
        height: 300px;
        margin: 12px 0;
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
      }
      .sale-static {
        flex: 1;
        margin: 12px 0;
      }
      .alarm-datas {
        height: 380px;
      }
    }
  }
  :deep(.el-card__body) {
    height: 100%;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
  }
</style>