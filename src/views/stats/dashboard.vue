<template>
  <div class="components-container" style='height:100vh'>
    <el-row>
      <el-col>
        <predictions_filter @filter="fillData"></predictions_filter>
        <button @click="rerender()">Refresh</button>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <div class='chart-container' v-if="show">
          <stats-chart height='100%' width='100%' :chartdata="predictions"></stats-chart>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import statsChart from './charts/statsChart'
  import predictions_filter from './predictions_filter'
  import { getPredictions } from '@/api/apipredictions'

  export default {
    components: { statsChart, predictions_filter },
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
      fillData(query) {
        this.predictions = null;
        getPredictions(query)
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

</style>

