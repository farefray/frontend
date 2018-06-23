<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>

<script type="text/javascript">
import echarts from "echarts";
require("echarts/theme/macarons"); // theme
import { debounce } from "@/utils";
const _ = require("lodash"); // Move global if used a lot?

function parseDate(timestamp) {
  let date = new Date(timestamp);
  return [
    ("0" + date.getDate()).slice(-2),
    ("0" + (date.getMonth() + 1)).slice(-2),
    date.getFullYear()
  ].join("/");
}

var globalChartData = {
  minValue: 0,
  avgValue: 0,
  maxValue: 0,
  absoluteMaxChange: 0,
  absoluteAvgValue: 0
};

// TODO: use this function in order to group values and later split into points sizes
/*function groupBy(ary, keyFunc) {
  var r = {};
  ary.forEach(function(x) {
    var y = keyFunc(x);
    r[y] = (r[y] || []).concat(x);
  });
  return Object.keys(r).map(function(y) {
    return r[y];
  });
}*/

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
        this.prepareData();
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
    prepareData() {
      if (this.stats === null || this.stats.length === 0) {
        return;
      }

      let dataForChart = [];
      let balance = 0;

      let tmp = _.cloneDeep(this.stats).reverse();
      let absoluteChange = 0;
      for (let i = 0; i <= tmp.length - 1; i++) {
        let prediction = tmp[i];

        // TODO status shouldn't be array?
        let balanceChange =
          prediction.status[0] === "WON"
            ? prediction.stake * prediction.final_odds - prediction.stake
            : -prediction.stake;

        if (globalChartData.maxValue < balanceChange) {
          globalChartData.maxValue = balanceChange;

          if (balanceChange > globalChartData.absoluteMaxChange) {
            globalChartData.absoluteMaxChange = balanceChange;
          }
        } else if (globalChartData.minValue > balanceChange) {
          globalChartData.minValue = balanceChange;

          if (
            Math.abs(globalChartData.minValue) >
            globalChartData.absoluteMaxChange
          ) {
            globalChartData.absoluteMaxChange = Math.abs(
              globalChartData.minValue
            );
          }
        }

        absoluteChange += Math.abs(balanceChange);
        balance += balanceChange;
        let date = new Date(prediction.date * 1000);
        dataForChart.push({
          name: date.toString(),
          value: [
            [date.getFullYear(), date.getMonth() + 1, date.getDate()].join(
              "/"
            ) +
              " " +
              date.getHours() +
              ":" +
              date.getMinutes() +
              ":0" +
              i,
            // + i in this case made to avoid stacking events on the same y value
            Math.round(balance),
            balanceChange
          ],
          prediction: prediction
        });
      }

      globalChartData.avgValue = Math.floor(balance / tmp.length - 1);
      globalChartData.absoluteChange = Math.floor(
        absoluteChange / tmp.length - 1
      );

      this.setOptions(dataForChart);
    },
    setOptions(dataForChart) {
      console.log(dataForChart);
      this.chart.setOption({
        xAxis: {
          boundaryGap: true,
          type: "category",
          axisTick: {
            show: false
          },
          splitLine: {
            show: false
          }
        },
        yAxis: {
          type: "value",
          axisTick: {
            inside: true
          },
          splitLine: {
            show: false
          },
          axisLabel: {
            inside: true,
            formatter: "{value}\n"
          },
          z: 10
        },
        dataZoom: [
          {
            type: "slider",
            show: true
          },
          {
            type: "inside"
          }
        ],
        grid: {
          left: 75,
          right: 10,
          bottom: 25,
          top: 15,
          containLabel: true
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          },
          triggerOn: "click",
          enterable: true,
          formatter: function(params, ticket, callback) {
            // TODO optimize this?
            // console.log(params);
            let event = params[0].data.prediction;
            let status = event.status[0];

            let status_color =
              status === "WON"
                ? "#3e5f33"
                : status === "LOST" ? "#f99008" : "#cacbcf";
            let status_circle_block =
              '<span style="display:inline-block;width:10px;height:10px;border-radius:50%;background-color:' +
              status_color +
              ';margin-right:5px;"></span>';

            let event_date = parseDate(event.date * 1000);
            let event_date_block = "<span>" + event_date + "</span>";

            let status_block =
              '<span style="color: ' + status_color + ';"></span>';
            let final_odds_block =
              '<span style="position:absolute; right:5px; top: 3px;">' +
              event.final_odds +
              "</span>";

            let participants_block = '<div style="padding-top:5px;">';
            for (let i = 0; i < event.selected_events.length; i++) {
              participants_block +=
                (event.selected_events[i].selected_event === "odds_1"
                  ? '<strong style="color: ' + status_color + ';">'
                  : "") +
                event.selected_events[i].team_A.name +
                (event.selected_events[i].selected_event === "odds_1"
                  ? "</strong>"
                  : "") +
                " vs " +
                (event.selected_events[i].selected_event === "odds_2"
                  ? '<strong style="color: ' + status_color + ';">'
                  : "") +
                event.selected_events[i].team_B.name +
                (event.selected_events[i].selected_event === "odds_1"
                  ? "</strong>"
                  : "") +
                "</br>";
            }
            participants_block += "</div>";

            let profit_block =
              '<strong style="color:' +
              status_color +
              '; position:absolute; right:5px; bottom: 3px;">' +
              (status === "WON"
                ? "+" +
                  (event.stake * event.final_odds - event.stake).toFixed(2)
                : "-" + event.stake.toFixed(2)) +
              "</strong>";

            return (
              status_circle_block +
              event_date_block +
              status_block +
              final_odds_block +
              "<br/>" +
              participants_block +
              "<br/>" +
              profit_block
            );
          }
        },
        visualMap: {
          show: true,
          type: "continuous",
          min: globalChartData.minValue,
          max: globalChartData.maxValue,
          text: ["Best", "Worst"],
          realtime: true,
          color: ["green", "gray", "red"]
        },
        series: [
          {
            name: "balance",
            smooth: false,
            showSymbol: true,
            hoverAnimation: true,
            type: "line",
            itemStyle: {
              normal: {
                areaStyle: {
                  color: "#f3f8ff"
                }
              }
            },
            lineStyle: {
              normal: { width: 3 }
            },
            symbol: "circle",
            symbolSize: (value, params) => {
              // return value from 5 to 25, based on how much value close to max/min value
              let val = Math.max(
                5,
                Math.floor(
                  30 /
                    250 *
                    Math.floor(
                      Math.abs(value[2]) /
                        globalChartData.absoluteMaxChange *
                        100
                    )
                )
              );
              console.log(val);
              return val;
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
      this.prepareData();
    }
  }
};
</script>

<style scoped>
</style>
