<script setup lang="ts" name="PowerStatics">

  import { ref, watch, onMounted, getCurrentInstance, type PropType } from 'vue';
  import type { Tlenget, ICharge } from '@/types/dashBoard';
  
  const props = defineProps({
    lenged: {
      type: Array as PropType<Tlenget>,
      default: () => {
        return []
      }
    },
    category: {
      type: Array as PropType<Tlenget>,
      default: () => {
        return []
      }
    },
    record: {
      type: Object as PropType<ICharge>,
      default: () => {
        return []
      }
    },
  })
  watch(() => props, (newVal) => {
    option.legend.data = newVal.lenged;
    option.xAxis.data = newVal.category;
    option.series[0].data = newVal.record.charges;
    option.series[1].data = newVal.record.chargeTime;
    option.series[2].data = newVal.record.chargeRate;
    if (powerStaticRef.value) {
      let myPowerChart = $echarts.init(powerStaticRef.value)
      option && myPowerChart.setOption(option);
    }
  }, {
    deep: true
  })
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
      data: ['']
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '充电量',
        type: 'line',
        stack: 'Total',
        data: [0]
      },
      {
        name: '充电时长',
        type: 'line',
        stack: 'Total',
        data: [0]
      },
      {
        name: '充电功率',
        type: 'line',
        stack: 'Total',
        data: [0]
      }
    ]
  };
  onMounted(() => {
   option.legend.data = props.lenged;
    option.xAxis.data = props.category;
    option.series[0].data = props.record.charges;
    option.series[1].data = props.record.chargeTime;
    option.series[2].data = props.record.chargeRate;
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
  flex: 1;
  flex-shrink: 0;
  padding: 20px;
  box-sizing: border-box;
  overflow: hidden;
}
</style>