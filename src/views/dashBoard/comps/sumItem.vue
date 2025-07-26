<template>
    <div>
        <h5>{{ props.title }}</h5><br/>
        <img :src="props.imgSrc" alt="">
        <br/><br/>
        <slot name="rateData"></slot>
    </div>
    <div class="statistic-card">
        <el-statistic :value="props.val">
          <template #title>
            <div style="display: inline-flex; align-items: center">
              <span style="margin-bottom: 8px;">异常设备</span>
              <el-tooltip
                effect="dark"
                content="存在多组设备异常，请尽快查看"
                placement="top"
              >
                <el-icon style="margin-left: 4px" :size="12">
                  <Warning />
                </el-icon>
              </el-tooltip>
            </div>
          </template>
        </el-statistic>
        <div class="statistic-footer">
          <div class="footer-item">
            <span>相较昨日: </span>
            <span>
              <slot></slot>
              <el-icon :color="props.color">
                <CaretTop />
              </el-icon>
            </span>
          </div>
        </div>
      </div>
</template>
<script setup lang="ts" name="SumItem">
    interface ISumItem {
        title: string,
        imgSrc: string,
        color: string,
        val: number
    }
    const props = defineProps<ISumItem>();
    console.log(props.title);
    
</script>

<style lang="less" scoped>
    .statistic-card {
        margin-top: 24px;
    }
    .footer-item {
        margin-top: 12px;
    }
</style>