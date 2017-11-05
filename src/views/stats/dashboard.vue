<template>
  <div class="components-container" style='height:100vh'>
    <button @click="refreshChart()">Refresh</button>
    <div class='chart-container'>
      <stats-chart height='100%' width='100%' :chartdata="dataPoints"></stats-chart>
    </div>
  </div>
</template>

<script>
  import statsChart from '@/components/Charts/statsChart'
  import { getPredictions } from '@/api/apipredictions'

  function parseDate(timestamp) {
    let date = new Date(timestamp * 1000)
    return [('0' + date.getDate()).slice(-2), ('0' + (date.getMonth() + 1)).slice(-2), date.getFullYear()].join('/')
  }

  export default {
    components: { statsChart },
    data() {
      return {
        predictions: null,
        dataPoints: null
      }
    },
    mounted() {
      console.log('stats mounted')
      this.$nextTick(() => {
        getPredictions()
          .then(response => {
            this.predictions = response.data
            console.log(this.predictions)
            this.fillData()
          });
      })
    },
    methods: {
      refreshChart() {
        this.fillData()
      },
      fillData() {
        let labels = []
        let data = []
        let balance = 0

        for (let i = 0; i <= this.predictions.length - 1; i++) {
          let prediction = this.predictions.reverse()[i]
          labels.push(parseDate(prediction.date))

          if (prediction.status === 'WON') {
            balance += prediction.stake * prediction.final_odds - prediction.stake
          } else {
            balance -= prediction.stake
          }

          data.push({ value: balance, bet: prediction })
        }

        this.dataPoints = {
          labels: labels,
          data: data,
          balance: balance
        }
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

