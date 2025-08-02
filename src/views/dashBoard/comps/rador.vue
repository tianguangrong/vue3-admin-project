<script setup lang="ts" name="Rador">
    import { ref, onMounted, watchEffect } from 'vue';
    import type { Tlenget, TData, ICategory } from '@/types/dashBoard';
    import { useChart } from '@/hooks/useCharts';
    const props = defineProps<{
        legend: Tlenget,
        record: TData,
        category: ICategory[]
    }>();
    const radorRef = ref(null);
    const option = ref({
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
    });
    const { initCharts } = useChart(radorRef, option)
    watchEffect(() => {
        if (props.record.length) {
            option.value.legend.data = props.legend;
            option.value.radar.indicator = props.category;
            option.value.series[0].data[0].value = props.record;
            option.value.series[0].data[0].name = props.legend[0];
            initCharts()
        }
    });
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