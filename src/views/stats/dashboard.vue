<template>
  <div class="components-container" style='height:100vh'>
    <button @click="rerender()">Refresh</button>
    <div class='chart-container' v-if="show">
      <stats-chart height='100%' width='100%' :chartdata="predictions"></stats-chart>
    </div>
  </div>
</template>

<script>
  import statsChart from './charts/statsChart'
  import { getPredictions } from '@/api/apipredictions'

  export default {
    components: { statsChart },
    data() {
      return {
        predictions: null,
        show: false
      }
    },
    mounted() {
      console.log('stats mounted')
      this.$nextTick(() => {
        this.fillData();
      })
    },
    methods: {
      rerender() {
        this.show = false
        this.$nextTick(() => {
          this.show = true
          console.log('re-render start')
          this.$nextTick(() => {
            console.log('re-render end')
          })
        })
      },
      fillData() {
        getPredictions()
          .then(response => {
            this.predictions = response.data
            console.log(this.predictions)
            this.rerender();
          });
      }
    }
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

