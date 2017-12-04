<template>
  <div class="echarts">
    <IEcharts :option="opts" :loading="loading" @ready="onReady" @click="onClick"></IEcharts>
  </div>
</template>

<script type="text/javascript">
  import IEcharts from 'vue-echarts-v3/src/full'
  import settings from './statsChart.settings'
  const bows = require('bows')
  const log = bows('LineChart')

  function parseDate(timestamp) {
    let date = new Date(timestamp)
    return [('0' + date.getDate()).slice(-2), ('0' + (date.getMonth() + 1)).slice(-2), date.getFullYear()].join('/')
  }

  export default {
    name: 'LineChart',
    components: {
      IEcharts
    },
    props: ['chartdata'],
    computed: {
      balance() {
        return this.chartdata && this.chartdata.balance !== undefined ? this.chartdata.balance : 0
      }
    },
    data: () => ({
      opts: {},
      loading: true
    }),
    updated() {
      console.log('updated')
      console.log(this.chartdata)
    },
    watch: {
      chartdata(val) {
        console.log(val);
      }
    },
    mounted() {
      this.loading = true;

      log('mounted');
      log(this.chartdata);
      if (this.chartdata !== null) {
        let labels = []
        let data = []
        let balance = 0

        for (let i = 0; i <= this.chartdata.length - 1; i++) {
          let prediction = this.chartdata.reverse()[i]
          console.log(parseDate(prediction.date))
          labels.push(parseDate(prediction.date))

          if (prediction.status === 'WON' || prediction.status[0] === 'WON' /* TODO make it string*/) {
            balance += prediction.stake * prediction.final_odds - prediction.stake
          } else {
            balance -= prediction.stake
          }

          data.push({ value: balance, bet: prediction })
        }

        settings.series[0].data = data
        settings.xAxis[0].data = labels
        log(settings)
        this.opts = settings
        this.loading = false
      }
    },
    methods: {
      onReady(instance) {
        log(instance)
      },
      onClick(event, instance, echarts) {
        log(arguments)
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
