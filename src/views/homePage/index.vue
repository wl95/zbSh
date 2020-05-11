<template>
  <div class="content">
    <!-- <div class="header"><img src="../../assets/header.jpg"/></div> -->
    <div class="middlepart">
      <div class="middletop">
        <div class="page-header-index-wide">
          <a-row :gutter="24">
            <a-col :sm="24" :md="12" :xl="6" :style="{ marginBottom: '24px' }">
              <chart-card :loading="loading" title="实时总功率" :total="12423 | NumberFormat" unit="MW">
                <a-tooltip title="实时总功率" slot="action">
                  <img src="../../assets/realtime.jpg" />
                </a-tooltip>
                <div class="home-card">
                  <mini-area />
                </div>
              </chart-card>
            </a-col>

            <a-col :sm="24" :md="12" :xl="6" :style="{ marginBottom: '24px' }">
              <chart-card :loading="loading" title="装机总容量" :total="12423 | NumberFormat"  unit="MW">
                <a-tooltip title="装机总容量" slot="action">
                  <img src="../../assets/total.jpg" />
                </a-tooltip>
                <div class="home-card">
                  <mini-area />
                </div>
              </chart-card>
            </a-col>
            <a-col :sm="24" :md="12" :xl="6" :style="{ marginBottom: '24px' }">
              <chart-card :loading="loading" title="累计发电量" :total="60000 | NumberFormat" unit="kwh">
                <a-tooltip title="累计发电量" slot="action">
                  <img src="../../assets/electricity.jpg" />
                </a-tooltip>
                <div class="home-card">
                  <mini-area />
                </div>
              </chart-card>
            </a-col>
            <a-col :sm="24" :md="12" :xl="6" :style="{ marginBottom: '24px' }">
              <chart-card :loading="loading" title="当日发电量" :total="300000 | NumberFormat" unit="kwh">
                <a-tooltip title="当日发电量" slot="action">
                  <img src="../../assets/today.jpg" />
                </a-tooltip>
                <div class="home-card">
                  <mini-area />
                </div>
              </chart-card>
            </a-col>

          </a-row>

        </div>
      </div>
      <div class="middlecontent">
        <div class="middle-left">
          <div class="midLeft-text">
            <div class="midText-left">
              <img src="../../assets/co.jpg" />
              <span>二氧化碳</span>
            </div>
            <span>126,560吨</span>
          </div>
          <div class="midLeft-text">
            <div class="midText-left">
              <img src="../../assets/coal.jpg" />
              <span>标准煤</span>
            </div>
            <span>8,8846吨</span>
          </div>
          <div class="midLeft-text">
            <div class="midText-left">
              <img src="../../assets/tree.jpg" />
              <span>植树</span>
            </div>
            <span>6,560棵</span>
          </div>
          <div class="midLeft-text">
            <div class="midText-left">
              <img src="../../assets/so.jpg" />
              <span>二氧化硫</span>
            </div>
            <span>7,833吨</span>
          </div>
        </div>
        <div class="middle-ear">
          <img src="../../assets/ear.jpg" />
        </div>
        <div class="middle-right">
          <!-- <div class="page-header-index-wide"> -->
          <a-card :body-style="{ padding: '0px' }">
            <div class="right-title">
              <span>等效小时数</span>
              <span>显示所有电站
                <a-icon type="caret-down" /></span>
            </div>
            <rank-list :list="rankList" />
          </a-card>
          <!-- </div> -->
        </div>

      </div>
      <div class="middlebottom">
        <div class="pie">
          <div class="left">
            <a-icon type="left" style="color:white;fontSize:18px" />
          </div>
          <a-row :gutter="36" class="pieRow">
            <a-col :sm="24" :md="12" :xl="6" :style="{ marginBottom: '24px' }">
              <a-card :loading="loading" :bordered="false" :bodyStyle="{ padding: '5px' }" :headStyle="{ textAlign: 'center',color: '#333333', fontSize: '22px' }" title="电站1" total="当前功率" :style="{background:'#f7f7f7',height:'233px',width:'100%'}">
                <div class="veRing">
                  <ve-ring :data="chartData1" :title="veRingTitle" :legend-visible="false" :settings="chartSettings" :graphic="graphic1" :extend="chartExtend" :colors="colors" height="170px"></ve-ring>
                </div>
              </a-card>
            </a-col>

            <a-col :sm="24" :md="12" :xl="6" :style="{ marginBottom: '24px' }">
              <a-card :loading="loading" title="电站2" total="当前功率" :bordered="false" :bodyStyle="{ padding: '5px' }" :headStyle="{ textAlign: 'center',color: '#333333', fontSize: '22px' }" :style="{height:'233px',width:'100%'}">
                <div class="veRing">
                  <ve-ring :data="chartData2" :legend-visible="false" :settings="chartSettings" :title="veRingTitle" :tooltip-visible="false" :graphic="graphic2" :colors="colors" :extend="chartExtend" height="170px"></ve-ring>
                </div>
              </a-card>
            </a-col>
            <a-col :sm="24" :md="12" :xl="6" :style="{ marginBottom: '24px' }">
              <a-card :loading="loading" title="电站3" :bordered="false" total="当前功率" :bodyStyle="{ padding: '5px' }" :headStyle="{ textAlign: 'center',color: '#333333', fontSize: '22px' }" :style="{height:'233px',width:'100%'}">
                <div class="veRing">
                  <ve-ring :data="chartData3" :title="veRingTitle" :legend-visible="false" :settings="chartSettings" :graphic="graphic3" :tooltip="tooltip" :colors="colors" :extend="chartExtend" height="170px"></ve-ring>
                </div>
              </a-card>
            </a-col>
            <a-col :sm="24" :md="12" :xl="6" :style="{ marginBottom: '24px' }">
              <a-card :loading="loading" title="电站4" total="当前功率" :bordered="false" :bodyStyle="{ padding: '5px' }" :headStyle="{ textAlign: 'center',color: '#333333', fontSize: '22px' }" :style="{height:'233px',width:'100%'}">
                <div class="veRing">
                  <ve-ring :title="veRingTitle" :data="chartData4" :colors="colors" :legend-visible="false" :settings="chartSettings" :graphic="graphic4" :extend="chartExtend" height="170px"></ve-ring>
                </div>
              </a-card>
            </a-col>
          </a-row>
          <div class="right">
            <a-icon type="right" style="color:white;fontSize:18px" />
          </div>
        </div>
        <div class="line">
          <div class="title">
            <span>今日发电量趋势图</span>
            <p class="line-right">
              <span class="round"></span>
              <span>今日发电量</span>
            </p>
          </div>
          <ve-line :data="lineChartData" :colors="colors1" :settings="lineChartSettings" height="228px" :extend="lineChartSettings"></ve-line>
        </div>

      </div>

    </div>
  </div>
</template>

<script>
// import moment from 'moment'
import 'echarts/lib/component/title'
import {
  ChartCard,
  MiniArea,
  MiniBar,
  MiniProgress,
  RankList,
  Bar,
  Trend,
  NumberInfo,
  MiniSmoothArea,
  Radar
} from '@/components'
import { mixinDevice } from '@/utils/mixin'
import LinePack from './LinePack'

const rankList = []
for (let i = 0; i < 7; i++) {
  rankList.push({
    name: '西安电站',
    total: '323,234KW'
  })
}

export default {
  name: 'Analysis',
  mixins: [mixinDevice],
  components: {
    ChartCard,
    MiniArea,
    MiniBar,
    MiniProgress,
    RankList,
    Bar,
    Trend,
    Radar,
    NumberInfo,
    LinePack,
    MiniSmoothArea
  },
  data() {
    this.chartExtend = {
      series: {
        center: ['50%', '50%']
      }
    }
    this.chartSettings = {
      radius: [55, 40],
      offsetY: 10,
      label: {
        show: false
      },
      labelLine: {
        show: false
      },
      hoverAnimation: false
    }
    this.lineChartSettings = {
      legend: {
        show: false
      },
      xAxis: [
        {
          axisLine: {
            lineStyle: {
              type: 'dashed'
            }
          }
        }
      ]
    }
    this.tooltip = {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)'
    }
    this.colors = ['#3964A5', '#619EF0']
    this.colors1 = ['#F29253']
    this.graphic1 = [
      {
        type: 'text',
        left: 'center',
        top: '43%',
        style: {
          text: '80%',
          textAlign: 'center',
          fill: '#999999',
          fontSize: 21,
          color: '#4d4f5c'
        }
      }
    ]
    this.graphic2 = [
      {
        type: 'text',
        left: 'center',
        top: '43%',
        style: {
          text: '78%',
          textAlign: 'center',
          fill: '#999999',
          fontSize: 21,
          color: '#4d4f5c'
        }
      }
    ]
    this.graphic3 = [
      {
        type: 'text',
        left: 'center',
        top: '43%',
        style: {
          text: '45%',
          textAlign: 'center',
          fill: '#999999',
          fontSize: 21,
          color: '#4d4f5c'
        }
      }
    ]
    this.graphic4 = [
      {
        type: 'text',
        left: 'center',
        top: '43%',
        style: {
          text: '30%',
          textAlign: 'center',
          fill: '#999999',
          fontSize: 21,
          color: '#4d4f5c'
        }
      }
    ]
    this.veRingTitle = {
      text: '当前功率',
      left: 'center',
      top: 0,
      textStyle: {
        fontWeight: 'normal',
        fontSize: 18
      }
    }

    return {
      loading: true,
      rankList,
      chartData1: {
        columns: ['日期', '访问用户'],
        hoverAnimation: false,
        rows: [
          { 日期: '1/1', 访问用户: 18 },
          { 日期: '1/2', 访问用户: 82 }
        ]
      },
      chartData2: {
        columns: ['日期', '访问用户'],
        hoverAnimation: false,
        rows: [
          { 日期: '1/1', 访问用户: 22 },
          { 日期: '1/2', 访问用户: 78 }
        ]
      },
      chartData3: {
        columns: ['日期', '访问用户'],
        hoverAnimation: false,
        rows: [
          { 日期: '1/1', 访问用户: 55 },
          { 日期: '1/2', 访问用户: 45 }
        ]
      },
      chartData4: {
        columns: ['日期', '访问用户'],
        hoverAnimation: false,
        rows: [
          { 日期: '1/1', 访问用户: 70 },
          { 日期: '1/2', 访问用户: 30 }
        ]
      },
      lineChartData: {
        columns: ['日期', '今日发电量'],
        rows: [
          { 日期: '10:00', 今日发电量: 18 },
          { 日期: '10:30', 今日发电量: 30 },
          { 日期: '11:00', 今日发电量: 20 },
          { 日期: '11:30', 今日发电量: 28 },
          { 日期: '12:00', 今日发电量: 58 },
          { 日期: '12:30', 今日发电量: 26 },
          { 日期: '13:00', 今日发电量: 56 },
          { 日期: '13:30', 今日发电量: 28 }
        ]
      },
      line: {
        xAxis: [
          {
            axisLine: {
              lineStyle: {
                type: 'dashed'
              }
            }
          }
        ]
      }
    }
  },
  created() {
    setTimeout(() => {
      this.loading = !this.loading
    }, 1000)
  }
}
</script>

<style lang="less" scoped>
.content {
  width: 100%;
  // background: url('../../assets/bg.jpg') no-repeat;
  .header {
    width: 100%;
    height: 70px;
    > img {
      width: 100%;
    }
  }
  .home-card {
    position: relative;
    height: 100%;
  }
  .home-card:after {
    content: '';
    position: absolute;
    left: 0;
    top: -59px;
    width: 102%;
    height: 64px;
    border-left: 1.2px solid #619ef1;
    border-bottom: 1.2px solid #619ef1;
  }
  .antv-chart-mini {
    z-index: 999;
  }
  .middlepart {
    // padding: 20px;
    overflow: hidden;

    box-sizing: border-box;
    .middlecontent {
      display: flex;
      .middle-left {
        width: 24.5%;
        height: 460px;
        // background-color: aqua;
        margin-right: 25px;
        .midLeft-text {
          width: 100%;
          height: 97px;
          line-height: 97px;
          margin-bottom: 24px;
          background: url('../../assets/bar.jpg') no-repeat;
          .midText-left {
            width: 52%;
            padding-left: 8px;
            display: inline-block;
            color: #fff;
            font-size: 22px;
            font-weight: 800;
            // &:first-child {
            //   width: 48%;
            //   display: inline-block;
            //   padding-left: 8px;
            //   box-sizing: border-box;
            // }
            // &:last-child {
            //   text-align: center;
            //   width: 46%;
            //   display: inline-block;
            //   color: #e60012;
            //   font-size: 32px;
            //   font-weight: 800;
            // }
          }
          > span {
            width: 46%;
            display: inline-block;
            font-size: 29px;
            text-align: right;
            font-weight: 655;
            color: #e60012;
          }
          @media screen and (min-width: 1700px) {
            .midText-left {
              font-size: 24px;
            }
            > span {
              padding-right: 2%;
              font-size: 33px;
            }
          }
          @media screen and (max-width: 1366px) {
            .midText-left {
              font-size: 21px;
            }
            > span {
              font-size: 24px;
            }
          }
        }
      }
      .middle-ear {
        width: 50%;
        margin-right: 24px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .middle-right {
        width: 24.5%;
        > .ant-card {
          height: 460px;
        }
        .right-title {
          width: 100%;
          height: 49px;
          border-bottom: 1px solid #ccc;
          padding: 15px 20px;
          box-sizing: border-box;
          color: #333333;
          span {
            &:first-child {
              font-size: 20px;
              font-weight: 800;
            }
            &:last-child {
              float: right;
              font-size: 18px;
              i {
                margin-left: 10px;
              }
            }
          }
        }
      }
    }
    .middlebottom {
      height: 270px;
      display: flex;
      margin-top: 20px;
      box-sizing: border-box;
      > div {
        flex: 1;
        margin-right: 25px;
        background-color: #fff;
        &:last-child {
          margin-right: 0;
        }
      }
      .pie {
        position: relative;
        padding: 20px 20px;
        .left,
        .right {
          display: inline-block;
          width: 29px;
          height: 55px;
          line-height: 55px;
          text-align: center;
          background-color: red;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 999;
        }
        .left {
          left: 0;
        }
        .right {
          right: 0;
        }
      }
      .line {
        .title {
          padding: 7px 28px;
          font-size: 22px;
          font-weight: 800;

          border-bottom: 1px solid #ccc;
          .line-right {
            font-size: 16px;
            float: right;
            font-weight: normal;
            .round {
              display: inline-block;
              width: 8px;
              height: 8px;
              margin-right: 4px;
              background-color: #ff6500;
              border-radius: 5px;
            }
          }
        }
      }
      .veRing {
        height: 100px;
      }
      .pieRow {
        margin: 0 !important;
      }
    }
  }
}
.chart-card-action {
  img {
    width: 30px;
    margin-left: 18px;
    height: 22px;
  }
}
// .extra-wrapper {
//   line-height: 55px;
//   padding-right: 24px;

//   .extra-item {
//     display: inline-block;
//     margin-right: 24px;

//     a {
//       margin-left: 24px;
//     }
//   }
// }

// .antd-pro-pages-dashboard-analysis-twoColLayout {
//   position: relative;
//   display: flex;
//   display: block;
//   flex-flow: row wrap;
// }

// .antd-pro-pages-dashboard-analysis-salesCard {
//   height: calc(100% - 24px);
//   /deep/ .ant-card-head {
//     position: relative;
//   }
// }

// .dashboard-analysis-iconGroup {
//   i {
//     margin-left: 16px;
//     color: rgba(0, 0, 0, 0.45);
//     cursor: pointer;
//     transition: color 0.32s;
//     color: black;
//   }
// }
// .analysis-salesTypeRadio {
//   position: absolute;
//   right: 54px;
//   bottom: 12px;
// }
</style>
