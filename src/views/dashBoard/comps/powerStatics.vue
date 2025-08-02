<script setup lang="ts" name="PowerStatics">

  import { ref, type PropType, watchEffect } from 'vue';
  import type { Tlenget, ICharge } from '@/types/dashBoard';
  import {useChart} from '@/hooks/useCharts';

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
  let powerStaticRef = ref(null);
  let option = ref({
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
  });
  const { initCharts } = useChart(powerStaticRef, option);
  watchEffect(() => {
      option.value.legend.data = props.lenged;
      option.value.xAxis.data = props.category;
      option.value.series[0].data = props.record.charges;
      option.value.series[1].data = props.record.chargeTime;
      option.value.series[2].data = props.record.chargeRate;
      initCharts();
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