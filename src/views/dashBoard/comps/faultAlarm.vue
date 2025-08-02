<script setup lang="ts" name="FaultAlarm">
    import { onBeforeMount, ref } from 'vue';
    import type { TimelineItemProps } from 'element-plus'
    import http from '@/utils/http';
    interface ActivityType extends Partial<TimelineItemProps> {
    content: string
    }
    let alarmDatas = ref<ActivityType[]>([])
    async function getAlarmDatasForApi():Promise<void> {
        const result = await http.get('/api/alarm-static');
        if (result) {
            const { data } = result;
            alarmDatas.value = data as ActivityType[];
        }
    }
    onBeforeMount(() => {
        getAlarmDatasForApi()
    })
</script>

<template>
    <div class="fault-alarm-conent">
        <div class="title">故障报警</div>
        <div class="text">
            <el-scrollbar>
                <el-timeline style="max-width: 600px">
                    <el-timeline-item
                        v-for="(activity, index) in alarmDatas"
                        :key="index"
                        :icon="activity.icon"
                        :type="activity.type"
                        :color="activity.color"
                        :size="activity.size"
                        :hollow="activity.hollow"
                        :timestamp="activity.timestamp"
                        >
                            <el-card>
                                <span class="alarm-des">{{ activity.content }}</span>
                            </el-card>
                        </el-timeline-item>
                </el-timeline>
            </el-scrollbar>
        </div>
        
    </div>
</template>

<style lang="less" scoped>
.fault-alarm-conent {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    .title {
        font-size: 14px;
        font-weight: bold;
        padding: 12px 8px;
        border-bottom: 1px solid #dcdfe6;
        flex-shrink: 0;
    }
    .text {
        flex: 1;
        overflow: hidden;
        padding-bottom: 12px;
        box-sizing: border-box;
    }
    .alarm-des {
        // padding: 20px;
        font-size: 15px;
        font-weight: 500;
    }
}
</style>