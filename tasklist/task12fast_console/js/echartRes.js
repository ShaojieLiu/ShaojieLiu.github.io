let chartElt = document.getElementById('echartRes')
let consoleWin = document.querySelector('.console-window')
// console.log(consoleWin.clientWidth)
chartElt.style.width = `${consoleWin.clientWidth*0.95}px`
chartElt.style.height = `${consoleWin.clientWidth*2/3}px`
let myChart = echarts.init(chartElt)
let option = {
  title: {
        text: 'ECharts 入门示例'
    },
    tooltip: {},
    legend: {
        data:['销量']
    },
    xAxis: {
        data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
    },
    yAxis: {},
    series: [{
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
    }]
}
// 使用刚指定的配置项和数据显示图表。
myChart.setOption(option)
