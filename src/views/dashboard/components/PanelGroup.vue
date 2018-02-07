<template>
  <el-row class="panel-group" :gutter="40">
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class='card-panel well-black' @click="handleSetLineChartData('newVisitis')">
        <div class="statistic-group">
            <span class="SPBarPositive" values="1,4,6,4,7,5,9,0,10,7,3,6,4,4,7,5,9,10,7,3,6,4">
              <canvas width="109" height="24" style="display: inline-block; width: 109px; height: 24px; vertical-align: top;"></canvas>
            </span>
            <h3 class="statistic-values">
              <count-to class="card-panel-num" :startVal="0" :endVal="102400" :duration="2600"></count-to>
              <sup>84%</sup>
            </h3>
            <p class="info-block">The content below are loaded</p>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('messages')">
        <div class="card-panel-icon-wrapper icon-message">
          <svg-icon icon-class="message" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">Messages</div>
          <count-to class="card-panel-num" :startVal="0" :endVal="81212" :duration="3000"></count-to>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('purchases')">
        <div class="card-panel-icon-wrapper icon-money">
          <svg-icon icon-class="money" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">Purchases</div>
          <count-to class="card-panel-num" :startVal="0" :endVal="9280" :duration="3200"></count-to>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('shoppings')">
        <div class="card-panel-icon-wrapper icon-shoppingCard">
          <svg-icon icon-class="shoppingCard" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">Shoppings</div>
          <count-to class="card-panel-num" :startVal="0" :endVal="13600" :duration="3600"></count-to>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import CountTo from 'vue-count-to'

export default {
  components: {
    CountTo
  },
  methods: {
    handleSetLineChartData(type) {
      this.$emit('handleSetLineChartData', type)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.panel-group {
  margin-top: 18px;
  .card-panel-col{
    margin-bottom: 32px;
  }
  .card-panel {
    text-align: -webkit-match-parent;
    text-align: center;
    border-color: #d3d5d9;
    background-color: #f6f7fe;
    color: #333333;

    min-height: 20px;
    padding: 19px;
    margin-bottom: 20px;
    border: 1px solid #d3d5d9;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
    -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.05);
    -moz-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.05);
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.05);

    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;

    .well-black {
      color: #eeeeee;
      background: #373b3e;
      border-color: #303336;
    }

  
    h1, h2, h3, h4, h5, h6 {
      display: block;
      margin-bottom: 10px;
      padding-bottom: 8px;
      border-bottom: 1px solid #c8cbd0;
      line-height: 30px;
      -webkit-box-shadow: 0 1px 0 #ffffff;
      -moz-box-shadow: 0 1px 0 #ffffff;
      box-shadow: 0 1px 0 #ffffff;
      padding-bottom: 5px;
      line-height: 30px;

      &:first-child {
        margin-top: -10px;
      }
    }
  }
}
</style>
