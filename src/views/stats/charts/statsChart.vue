<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>

<script type="text/javascript">
import echarts from "echarts";
require("echarts/theme/macarons"); // theme
import { debounce } from "@/utils";
const _ = require('lodash'); // Move global if used a lot?

function parseDate(timestamp) {
  let date = new Date(timestamp);
  return [
    ("0" + date.getDate()).slice(-2),
    ("0" + (date.getMonth() + 1)).slice(-2),
    date.getFullYear()
  ].join("/");
}

export default {
  name: "stats-chart",
  components: {},
  props: {
    className: {
      type: String,
      default: "chart"
    },
    width: {
      type: String,
      default: "100%"
    },
    height: {
      type: String,
      default: "450px"
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    stats: {
      type: Array
    }
  },
  watch: {
    stats: {
      deep: true,
      handler() {
        this.processData();
      }
    }
  },
  computed: {
    balance() {
      return this.stats && this.stats.balance !== undefined
        ? this.stats.balance
        : 0;
    },
    loading() {
      return this.stats.length === 0;
    }
  },
  data: () => ({
    chart: null,
    opts: {}
  }),
  updated() {
    console.log("updated");
    console.log(this.stats);
  },
  mounted() {
    console.log("chart mounted");

    this.initChart();
    if (this.autoResize) {
      this.__resizeHanlder = debounce(() => {
        if (this.chart) {
          this.chart.resize();
        }
      }, 100);
      window.addEventListener("resize", this.__resizeHanlder);
    }
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    if (this.autoResize) {
      window.removeEventListener("resize", this.__resizeHanlder);
    }

    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    processData() {
      let labels = [];
      let dataForChart = []; // ToDo data rewored as dataset - https://ecomfe.github.io/echarts-doc/public/en/tutorial.html#Dataset
      let balance = 0

      console.log(this.stats);
      if (this.stats !== null) {
          let tmp = _.cloneDeep(this.stats).reverse();
          for (let i = 0; i <= tmp.length - 1; i++) {
            let prediction = tmp[i];
            console.log(prediction);
            console.log(parseDate(prediction.date))
            labels.push(parseDate(prediction.date * 1000))

            if (prediction.status === 'WON' || prediction.status[0] === 'WON') {
              balance += prediction.stake * prediction.final_odds - prediction.stake
            } else {
              balance -= prediction.stake
            }

            dataForChart.push(balance);
            // data.push({ value: balance, bet: prediction })
          }
      }

      console.log(labels);
      console.log(dataForChart)
      this.setOptions(
        labels,
        dataForChart
      );
    },
    setOptions(labels, dataForChart) {
      this.chart.setOption({
        xAxis: {
          data: labels,
          boundaryGap: false,
          axisTick: {
            show: false
          }
        },
        grid: {
          left: 10,
          right: 10,
          bottom: 20,
          top: 30,
          containLabel: true
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross"
          },
          padding: [5, 10],
          enterable: true,
          formatter: function(params, ticket, callback) {
            console.log(params);
            console.log(ticket);
            // TODO optimize this?
            /*
            let event = params[0].data.bet;
            let status = event.status[0];

            let status_color = (status === 'WON' ? 'green' : (status === 'LOST' ? 'red' : 'gray'));
            let status_circle_block = '<span style="display:inline-block;width:10px;height:10px;border-radius:50%;background-color:' + status_color + ';margin-right:5px;"></span>';

            let status_block = '<span style="color: ' + status_color + ';">' + status + '</span>';
            let final_odds_block = '<span class="el-tag" style="position:absolute; right:5px; top: 3px;">' + event.final_odds + '</span>';
            
            let participants_block = '<div style="padding-top:5px;">';
            for (let i = 0; i < event.selected_events.length; i++) {
              participants_block += (event.selected_events[i].selected_event === 'odds_1' ? '<strong>' : '') + event.selected_events[i].team_A.name + (event.selected_events[i].selected_event === 'odds_1' ? '</strong>' : '') +
                " vs " +
                (event.selected_events[i].selected_event === 'odds_2' ? '<strong>' : '') + event.selected_events[i].team_B.name + (event.selected_events[i].selected_event === 'odds_1' ? '<strong>' : '') + '</br>';
            }
            participants_block += '</div>';

            let profit_block = '<strong>' + (status === 'WON'
              ? ('+ ' + (event.stake * event.final_odds - event.stake).toFixed(2))
              : ('- ' + event.stake.toFixed(2))) + '</strong>';

            return status_circle_block +
              status_block + 
              final_odds_block +
              '<br/>' +
              participants_block + 
              '<br/>' +
              profit_block;
              */
          }
        },
        yAxis: {
          axisTick: {
            show: false
          }
        },
        legend: {
          data: ["actual"]
        },
        series: [
          {
            name: "actual",
            smooth: true,
            type: "line",
            itemStyle: {
              normal: {
                color: "#3888fa",
                lineStyle: {
                  color: "#3888fa",
                  width: 2
                },
                areaStyle: {
                  color: "#f3f8ff"
                }
              }
            },
            data: dataForChart,
            animationDuration: 2800,
            animationEasing: "quadraticOut"
          }
        ]
      });
    },
    initChart() {
      this.chart = echarts.init(this.$el, "macarons");
      this.processData();
    }
  }
};
</script>

<style scoped>

</style>
