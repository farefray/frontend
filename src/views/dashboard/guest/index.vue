<template>
  <div class="dashboard-guest-container">
    <el-row>
      <el-col :span="6">
        <el-card class="box-card">
          <div class="info-item">
            <count-to class="info-item-num" :startVal='0' :endVal='statisticsData.article_count' :duration='3400'></count-to>
            <span class="info-item-text">users registered</span>
          </div>
          <div class="info-item">
            <count-to class="info-item-num" :startVal='0' :endVal='statisticsData.pageviews_count' :duration='3600'></count-to>
            <span class="info-item-text">bets stored</span>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <div>
    </div>
  </div>
</template>

<script>

import countTo from 'vue-count-to'

export default {
  name: 'dashboard-editor',
  components: {
      countTo
  },
  data() {
    return {
        statisticsData: {
            article_count: 4,
            pageviews_count: Math.random() * 100 + 100
        }
    }
  },
  computed: {
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
