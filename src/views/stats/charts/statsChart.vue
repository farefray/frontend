<template>
  <div class="echarts">
    <IEcharts :option="opts" :loading="loading" @ready="onReady" @click="onClick"></IEcharts>
  </div>
</template>

<script type="text/javascript">
  import IEcharts from 'vue-echarts-v3/src/full'
  import settings from './statsChart.settings'

  function parseDate(timestamp) {
    let date = new Date(timestamp)
    return [('0' + date.getDate()).slice(-2), ('0' + (date.getMonth() + 1)).slice(-2), date.getFullYear()].join('/')
  }

  export default {
    name: 'stats-chart',
    components: {
      IEcharts
    },
    props: ['chartdata'],
    computed: {
      balance() {
        return this.chartdata && this.chartdata.balance !== undefined ? this.chartdata.balance : 0
      },
      loading() {
        return this.chart_data.length === 0
      }
    },
    data: () => ({
      opts: {},
      chart_data: []
    }),
    updated() {
      console.log('updated')
      console.log(this.chartdata)
    },
    watch: {
      chartdata(val) {
        console.log('chartdata changed');
      }
    },
    mounted() {
      console.log('chart mounted');
    },
    methods: {
      onReady(instance) {
        console.log('on ready');
        console.log(instance)
        this.chart_data = this.chartdata.reverse();
        if (this.chart_data !== null) {
          let labels = []
          let data = []
          let balance = 0

          for (let i = 0; i <= this.chart_data.length - 1; i++) {
            let prediction = this.chart_data[i]
            console.log(prediction);
            console.log(parseDate(prediction.date))
            labels.push(parseDate(prediction.date * 1000))

            if (prediction.status === 'WON' || prediction.status[0] === 'WON' /* TODO make it string*/) {
              balance += prediction.stake * prediction.final_odds - prediction.stake
            } else {
              balance -= prediction.stake
            }

            data.push({ value: balance, bet: prediction })
          }

          settings.series[0].data = data
          settings.xAxis[0].data = labels
          this.opts = settings
        }
      },
      onClick(event, instance, echarts) {
        console.log('onClick');
        console.log(arguments)
      }
    }
  }
</script>

<style scoped>
  .echarts {
    width: 1200px;
    height: 450px;
    margin: auto;
  }
</style>
