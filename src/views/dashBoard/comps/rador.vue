<script setup lang="ts" name="Rador">
    import { ref, getCurrentInstance, onMounted } from 'vue';
    const radorRef = ref(null);
    const instance = getCurrentInstance();
    const $echarts = instance?.appContext.config.globalProperties.$echarts
    console.log('instance', $echarts, radorRef);
    const option = {
        title: {
            // text: 'Basic Radar Chart'
        },
        legend: {
            data: ['设备总览'],
            left: 'left'
        },
        radar: {
            // shape: 'circle',
            indicator: [
                { name: '闲置数', max: 6500 },
                { name: '报废数', max: 16000 },
                { name: '更换数', max: 30000 },
                { name: '维修数', max: 38000 },
                { name: '故障数', max: 52000 },
                { name: '使用数', max: 25000 }
            ]
        },
        series: [
            {
                type: 'radar',
                data: [
                    {
                        value: [4200, 3000, 20000, 35000, 50000, 18000],
                        name: '设备总览'
                    },
                ]
            }
        ]
    };
    onMounted(() => {
        if (radorRef.value) {
            const radorEchart = $echarts.init(radorRef.value)
            option && radorEchart.setOption(option)
            
        }
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