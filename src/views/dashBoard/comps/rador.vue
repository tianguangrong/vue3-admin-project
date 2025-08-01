<script setup lang="ts" name="Rador">
    import { ref, getCurrentInstance, onMounted, watchEffect } from 'vue';
    import type { Tlenget, TData, ICategory, IDeviceDataRes } from '@/types/dashBoard';
    const props = defineProps<{
        legend: Tlenget,
        record: TData,
        category: ICategory[]
    }>();
    console.log('props', props);
    
    const radorRef = ref(null);
    const instance = getCurrentInstance();
    const $echarts = instance?.appContext.config.globalProperties.$echarts;
    const option = {
        legend: {
            data: [''],
            left: 'left'
        },
        radar: {
            indicator: [
                { name: '' },
            ]
        },
        series: [
            {
                type: 'radar',
                data: [
                    {
                        value: [0],
                        name: '',
                    },
                ]
            }
        ]
    };
    watchEffect(() => {
        if (props.record.length) {
            option.legend.data = props.legend;
            option.radar.indicator = props.category;
            option.series[0].data[0].value = props.record;
            option.series[0].data[0].name = props.legend[0];
            if (radorRef.value) {
                const radorEchart = $echarts.init(radorRef.value)
                option && radorEchart.setOption(option)
                
            }
        }
    })
    onMounted(() => {
    })
</script>

<template>
    <div class="rador-content" ref="radorRef"></div>
</template>

<style lang="less" scoped>
    .rador-content {
        width: 100%;
        height: 100%;
    }
</style>