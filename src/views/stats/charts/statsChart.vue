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
       let dataForChart = [];
      let balance = 0

      console.log(this.stats);
      if (this.stats !== null) {
          let tmp = _.cloneDeep(this.stats).reverse();
          
          for (let i = 0; i <= tmp.length - 1; i++) {
            let prediction = tmp[i];

            if (prediction.status === 'WON' || prediction.status[0] === 'WON') {
              balance += prediction.stake * prediction.final_odds - prediction.stake
            } else {
              balance -= prediction.stake
            }

            let date = new Date(prediction.date * 1000);
            dataForChart.push({
                name: date.toString(),
                value: [
                    [date.getFullYear(), date.getMonth() + 1, date.getDate()].join('/'),
                    Math.round(balance)
                ],
                prediction: prediction
            });
          }
      }

      console.log(dataForChart)
      this.setOptions(
        dataForChart
      );
    },
    setOptions(dataForChart) {
      this.chart.setOption({
        xAxis: {
          boundaryGap: false, // отступ от краев
          type: 'time',
          axisTick: {
            show: false
          },
          splitLine: {
            show: false
          }
        },
        yAxis: {
          type: 'value',
          axisTick: {
            show: false
          },
          boundaryGap: true,
          splitLine: {
              show: false
          }
        },
        dataZoom: [
            {
                type: 'slider',
                show: true,
                start: 100,
                end: 0,
                handleSize: 8
            }
        ],
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
            type: "shadow"
          },
          triggerOn: 'click',
          enterable: true,
          formatter: function(params, ticket, callback) {
            // TODO optimize this?
            console.log(params);
            let event = params[0].data.prediction;
            let status = event.status[0];

            let status_color = (status === 'WON' ? '#3e5f33' : (status === 'LOST' ? '#f99008' : '#cacbcf'));
            let status_circle_block = '<span style="display:inline-block;width:10px;height:10px;border-radius:50%;background-color:' + status_color + ';margin-right:5px;"></span>';

            let event_date = parseDate(event.date * 1000);
            let event_date_block = '<span>' + event_date + '</span>';

            let status_block = '<span style="color: ' + status_color + ';"></span>';
            let final_odds_block = '<span style="position:absolute; right:5px; top: 3px;">' + event.final_odds + '</span>';
            
            let participants_block = '<div style="padding-top:5px;">';
            for (let i = 0; i < event.selected_events.length; i++) {
              participants_block += (event.selected_events[i].selected_event === 'odds_1' ? '<strong style="color: ' + status_color + ';">' : '') + event.selected_events[i].team_A.name + (event.selected_events[i].selected_event === 'odds_1' ? '</strong>' : '') +
                " vs " +
                (event.selected_events[i].selected_event === 'odds_2' ? '<strong style="color: ' + status_color + ';">' : '') + event.selected_events[i].team_B.name + (event.selected_events[i].selected_event === 'odds_1' ? '</strong>' : '') + '</br>';
            }
            participants_block += '</div>';

            let profit_block = '<strong style="color:' + status_color + '; position:absolute; right:5px; bottom: 3px;">' + (status === 'WON'
              ? ('+' + (event.stake * event.final_odds - event.stake).toFixed(2))
              : ('-' + event.stake.toFixed(2))) + '</strong>';

            return status_circle_block +
              event_date_block +
              status_block + 
              final_odds_block +
              '<br/>' +
              participants_block + 
              '<br/>' +
              profit_block;
          }
        },        
        series: [
          {
            name: "balance",
            smooth: false,
            showSymbol: false,
            hoverAnimation: false,
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
