<template>
  <div class="dashboard-guest-container">
    <div class=" clearfix">
      <div class="info-container">
        <span style='font-size:20px;padding-top:20px;display:inline-block;'>dashboard</span>
      </div>
    </div>
    <div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'dashboard-editor',
  components: {},
  data() {
    return {
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
