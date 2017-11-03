<template>
  <div class="components-container" style='height:100vh'>
    <div class='chart-container'>
      <stats-chart height='100%' width='100%'></stats-chart>
    </div>
  </div>
</template>

<script>
  import statsChart from '@/components/Charts/statsChart'

  export default {
    components: { statsChart }
  }
</script>

<style scoped>
  .chart-container{
    position: relative;
    width: 100%;
    height: 90%;
    padding-bottom: 40px;
  }
</style>

