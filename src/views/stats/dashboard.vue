<template>
  <div class="components-container" style='height:100vh'>
    <el-row>
      <el-col>
        <events_filter @filter="fillData"></events_filter>
      </el-col>
    </el-row>
    <br/>
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
  import events_filter from '@/views/components/events_filter'
  import { getPredictions } from '@/api/apipredictions'

  export default {
    components: { statsChart, events_filter },
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

