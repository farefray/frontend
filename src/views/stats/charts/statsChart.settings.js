let graphic = {}
graphic.LinearGradient = require('zrender/lib/graphic/LinearGradient')

const settings = {
  backgroundColor: '#EEF6EE',
  title: {
    text: 'Profit graph',
    x: '4%',
    textStyle: {
      color: '#476b3b',
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
      // TODO optimize this?
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
  // TODO make it dynamically built after chart submitting
  visualMap: /* [{
    show: false,
    type: 'continuous',
    dimension: 0,
    min: 0,
    max: 400,
    color: '#007e02'
  }],*/
  {
    show: false,
    pieces: [
    {
      lte: 0,
      color: '#cc0033'
    },
    {
      gt: 0,
      lte: 100,
      color: '#096'
    }, {
      gt: 300,
      color: '#007e02'
    }],
    outOfRange: {
      color: '#999'
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
        color: '#e2e58a'
      },
      textStyle: {
        color: '#476b3b'
      }
    },
    {
      type: 'inside',
      show: true,
      height: 15,
      start: 1,
      end: 35,
      dataBackgroundStyle: {
        color: '#f99008'
      },
      handleStyle: {
        color: '#f99008'
      }
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
      saveAsImage: {
        show: true,
        name: 'StatMyBets',
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
    areaStyle: {
      normal: {
        color: new graphic.LinearGradient(0, 0, 0, 1, [{
          offset: 1,
          color: '#f99008' // 0%
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
