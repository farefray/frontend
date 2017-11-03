let graphic = {}
graphic.LinearGradient = require('zrender/lib/graphic/LinearGradient')

const settings = {
  backgroundColor: 'rgba(137,189,125,0.1)',
  tooltip: {
    show: true,
    formatter: function(params, ticket, callback) {
      let cl = params[0].data.bet.status === 'win' ? 'green' : 'red'
      let profit = (params[0].data.bet.status === 'win' ? ('+ ' + (params[0].data.bet.stake * params[0].data.bet.odds - params[0].data.bet.stake)) : ('- ' + params[0].data.bet.stake))

      let res = '<span style="display:inline-block;width:10px;height:10px;border-radius:50%;background-color:' + cl + ';margin-right:5px;"></span>' + params[0].data.bet.discipline +
        '<br/>' +
        params[0].data.bet.participants[0] + ' vs ' + params[0].data.bet.participants[1] +
        '<br/>' +
        params[0].data.bet.stake + ' ' + params[0].data.bet.currency + ' with ' + params[0].data.bet.odds + ' odds' +
        '<br/>' +
        profit + ' ' + params[0].data.bet.currency

      return res
    },
    trigger: 'axis',
    axisPointer: {
      lineStyle: {
        type: 'cross'
      }
    }
  },
  axisPointer: {
    link: {
      xAxisIndex: 'all'
    },
    label: {
      backgroundColor: '#777'
    }
  },
  calculable: true,
  dataZoom: {
    type: 'slider',
    show: true,
    realtime: true,
    start: 0,
    end: 100
  },
  toolbox: {
    show: true,
    itemSize: 15,
    itemGap: 10,
    feature: {
      dataView: {
        title: 'View data',
        readOnly: false,
        show: true,
        lang: ['data view', 'turn off', 'refresh'],
        optionToContent: function(opt) {
          console.log(opt)
          let axisData = opt.xAxis[0].data
          let series = opt.series
          let table = '<table style="width:100%;text-align:center"><tbody><tr>' +
            '<td>Time:</td>' +
            '<td>' + series[0].name + '</td>' +
            '</tr>'

          for (let i = 0, l = axisData.length; i < l; i++) {
            table += '<tr>' +
              '<td>' + axisData[i] + '</td>' +
              '<td>' + series[0].data[i] + '</td>' +
              '</tr>'
          }

          table += '</tbody></table>'
          return table
        }
      },
      magicType: {
        show: true,
        type: ['line', 'bar']
      },
      saveAsImage: {
        show: true,
        name: 'MyBettingStats',
        title: 'Save as image'
      }
    }
  },
  legend: {
    icon: 'rect',
    itemWidth: 14,
    itemHeight: 5,
    itemGap: 13,
    data: ['Balance'],
    right: '4%',
    textStyle: {
      fontSize: 12,
      color: '#F1F1F3'
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: [{
    type: 'category',
    boundaryGap: false,
    axisPointer: {
      show: true
    },
    axisLine: {
      lineStyle: {
        color: '#57617B'
      }
    },
    /* axisLabel: {
      formatter: function (value, index) {
          // Formatted to be month/day; display year only in the first label
          var date = new Date(value)
          var texts = [(date.getMonth() + 1), date.getDate()]
          if (idx === 0) {
              texts.unshift(date.getYear())
          }

          return texts.join('/')
      }
    }, */
    data: []
  }],
  yAxis: [{
    type: 'value',
    name: 'Profit',
    axisTick: {
      show: false
    },
    axisLine: {
      lineStyle: {
        color: '#57617B'
      }
    },
    axisLabel: {
      margin: 10,
      textStyle: {
        fontSize: 14
      }
    },
    splitLine: {
      lineStyle: {
        color: '#57617B'
      }
    }
  }],
  series: [{
    name: 'Timeline',
    type: 'line',
    smooth: false,
    symbol: 'circle',
    symbolSize: 4,
    showSymbol: true,
    showAllSymbol: true,
    lineStyle: {
      normal: {
        color: '#414141',
        width: 2
      }
    },
    areaStyle: {
      normal: {
        color: new graphic.LinearGradient(0, 0, 0, 1, [{
          offset: 1,
          color: '#960208' // 0%
        }, {
          offset: 0,
          color: '#00842b' // 100%
        }], false),
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowBlur: 10
      }
    },
    itemStyle: {
      normal: {
        color: 'rgb(137,189,27)'
      }
    },
    data: []
  }
  ]
}

export default settings
