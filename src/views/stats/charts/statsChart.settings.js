let graphic = {}
graphic.LinearGradient = require('zrender/lib/graphic/LinearGradient')

const settings = {
  backgroundColor: '#344b58',
  title: {
    text: '统计',
    x: '4%',
    textStyle: {
      color: '#fff',
      fontSize: '22'
    },
    subtextStyle: {
      color: '#90979c',
      fontSize: '16'
    }
  },
  tooltip: {
    show: true,
    formatter: function(params, ticket, callback) {
      console.log(params);
      let cl = params[0].data.bet.status[0] === 'WON' ? 'green' : (params[0].data.bet.status[0] === 'LOST' ? 'red' : 'gray');
      let profit = (params[0].data.bet.status[0] === 'WON' ? ('+ ' + (params[0].data.bet.stake * params[0].data.bet.final_odds - params[0].data.bet.stake)) : ('- ' + params[0].data.bet.stake))

      return '<span style="display:inline-block;width:10px;height:10px;border-radius:50%;background-color:' + cl + ';margin-right:5px;"></span>' +
        '<br/>' +
        params[0].data.bet.stake + ' with ' + params[0].data.bet.final_odds + ' odds' +
        '<br/>' +
        profit;
    },
    trigger: 'axis',
    axisPointer: {
      textStyle: {
        color: '#fff'
      },
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
  dataZoom: [{
    type: 'slider',
    show: true,
    realtime: true,
    start: 0,
    end: 100,
    height: 30,
    xAxisIndex: [
      0
    ],
    bottom: 30,
    handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
    handleSize: '110%',
    handleStyle: {
      color: '#d3dee5'

    },
    textStyle: {
      color: '#fff' },
    borderColor: '#90979c'
    }, {
    type: 'inside',
    show: true,
    height: 15,
    start: 1,
    end: 35
  }],
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
    containLabel: true,
    borderWidth: 0,
    top: 110,
    bottom: 95,
    textStyle: {
      color: '#fff'
    }
  },
  xAxis: [{
    type: 'category',
    boundaryGap: false,
    axisPointer: {
      show: true
    },
    axisLine: {
      lineStyle: {
        color: '#90979c'
      }
    },
    splitLine: {
      show: false
    },
    axisTick: {
      show: false
    },
    splitArea: {
      show: false
    },
    axisLabel: {
      interval: 0

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
    },
    axisLine: {
      lineStyle: {
        color: '#90979c'
      }
    },
    splitArea: {
      show: false
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
