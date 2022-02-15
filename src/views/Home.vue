<template xmlns:el-col="http://www.w3.org/1999/html">
<div>
  <el-row>
    <el-col :span="12"> <div id="main" style="width:500px;height: 400px"></div></el-col>
    <el-col :span="12"> <div id="pie" style="width:500px;height: 400px"></div></el-col>
  </el-row>

</div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: "Home",
  data(){
    return {

    }
  },
  mounted() {
    var option = {
      title:{
        text:'各季度用户数量统计',
        subtext: '趋势图',
        left:'center'
      },
      xAxis: {
        type: 'category',
        data: ["第一季度","第二季度","第三季度","第四季度"]
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [],
          type: 'line'
        },
        {
          data: [],
          type: 'bar'
        }
      ]
    };
    var chartDom = document.getElementById('main')
    var myChart = echarts.init(chartDom)
    var pieDom = document.getElementById('pie')
    var pieChart = echarts.init(pieDom)
    var pieOption = {
      title: {
        text: '各季度用户数量统计',
        subtext: '饼状图',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: '60%',
          data: [],
          label:{
            normal:{
              show:true,
              position:'inner',
              textStyle:{
                fontWeight: 300,
                fontSize: 16
              },
              formatter:'{d}%'
            }
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
        ]
    }

    this.request.get('/echarts/members').then (res => {
      //  option.xAxis.data = res.data.x
      option.series[0].data=res.data
      option.series[1].data=res.data
      myChart.setOption(option)
      pieOption.series[0].data = [
        {name:'第一季度',value:res.data[0]},
        {name:'第二季度',value:res.data[1]},
        {name:'第三季度',value:res.data[2]},
        {name:'第四季度',value:res.data[3]},
      ]
      pieChart.setOption(pieOption)
    })

     // pieChart.setOption(pieOption)

  }
}
</script>

<style scoped>

</style>