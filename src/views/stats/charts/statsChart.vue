<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>

<script type="text/javascript">
import echarts from "echarts";
require("echarts/theme/macarons"); // theme
import { debounce } from "@/utils";

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
    chartData: {
      type: Array
    }
  },
  computed: {
    balance() {
      return this.chartData && this.chartData.balance !== undefined
        ? this.chartData.balance
        : 0;
    },
    loading() {
      return this.chart_data.length === 0;
    }
  },
  data: () => ({
    chart: null,
    opts: {},
    chart_data: []
  }),
  updated() {
    console.log("updated");
    console.log(this.chartData);
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
      let data = [];
      let balance = 0

      console.log(this.chartData);
      if (this.chartData !== null) {
          for (let i = 0; i <= this.chartData.length - 1; i++) {
            let prediction = this.chartData[i]
            console.log(prediction);
            console.log(parseDate(prediction.date))
            labels.push(parseDate(prediction.date * 1000))

            if (prediction.status === 'WON' || prediction.status[0] === 'WON') {
              balance += prediction.stake * prediction.final_odds - prediction.stake
            } else {
              balance -= prediction.stake
            }

            data.push(balance);
            // data.push({ value: balance, bet: prediction })
          }
      }

      console.log(labels);
      console.log(data)
      this.setOptions(
        labels,
        data
      );
    },
    setOptions(labels, data) {
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
          padding: [5, 10]
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
            data: data,
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
