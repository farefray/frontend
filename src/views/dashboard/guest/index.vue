<template>
  <div class="dashboard-guest-container">
    <el-row>
      <el-col :span="6">
        <el-card class="box-card">
          <div class="info-item">
            <count-to class="info-item-num" :startVal='0' :endVal='statisticsData.article_count' :duration='3400'></count-to>
            <span class="info-item-text">esss</span>
          </div>
          <div class="info-item">
            <count-to class="info-item-num" :startVal='0' :endVal='statisticsData.pageviews_count' :duration='3600'></count-to>
            <span class="info-item-text">asdsadas</span>
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
            article_count: 1024,
            pageviews_count: 1024
        }
    }
  },
  computed: {
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	.dashboard-guest-container {
		background-color: #e3e3e3;
		min-height: 100vh;
		margin-top: -50px;
		padding: 100px 60px 0px;
		.pan-info-roles {
			font-size: 12px;
			font-weight: 700;
			color: #333;
			display: block;
		}
		.info-container {
			position: relative;
			margin-left: 190px;
			height: 150px;
			line-height: 200px;
			.display_name {
				font-size: 48px;
				line-height: 48px;
				color: #212121;
				position: absolute;
				top: 25px;
			}
		}
	}
</style>
