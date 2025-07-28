<script setup lang="ts" name="PowerStatics">

  import { ref, onMounted, getCurrentInstance } from 'vue';
  let powerStaticRef = ref(null);
  const instance = getCurrentInstance();
  const $echarts = instance?.appContext.config.globalProperties.$echarts;
  let option = {
    title: {
      text: '充电量统计'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['充电量', '充电时长', '充电功率']
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    toolbox: {
      // feature: {
      //   saveAsImage: {}
      // }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '充电量',
        type: 'line',
        stack: 'Total',
        data: [120, 132, 101, 134, 90, 230, 210]
      },
      {
        name: '充电时长',
        type: 'line',
        stack: 'Total',
        data: [220, 182, 191, 234, 290, 330, 310]
      },
      {
        name: '充电功率',
        type: 'line',
        stack: 'Total',
        data: [150, 232, 201, 154, 190, 330, 410]
      }
    ]
  };
  onMounted(() => {
    if (powerStaticRef.value) {
      let myPowerChart = $echarts.init(powerStaticRef.value)
      option && myPowerChart.setOption(option);
    }
  })
</script>

<template>
<div class="power-static-content" ref="powerStaticRef">
</div>
</template>

<style lang="less" scoped>
.power-static-content {
  width: 100%;
  height: 100%;
}
</style>