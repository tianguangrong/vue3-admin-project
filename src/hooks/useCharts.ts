import type { Ref } from "vue";
import { onBeforeMount, onMounted, ref, watch, markRaw } from "vue";
import * as echarts from 'echarts'

export function useChart(refDom: Ref<HTMLElement | null>, option: any) {
    // 这里存放的是初始化的echarts实例
    let chartInstance = ref<echarts.ECharts | null>(null);
    const initCharts = () => {
        if (refDom.value) {
            chartInstance.value = markRaw(echarts.init(refDom.value))
            chartInstance.value.setOption(option.value)
        }
    }
    const resize = () => {
        chartInstance.value?.resize()
    }
    onMounted(() => {
        window.addEventListener('resize', resize)
    })
    onBeforeMount(() => {
        window.removeEventListener('resize', resize);
        if (chartInstance.value) {
            chartInstance.value.dispose()
        }
    })
    return {
        initCharts
    }
}