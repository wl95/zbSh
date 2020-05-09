<template>
  <div class="content">
    <div class="header"></div>
    <div class="middlepart">
      <div class="middletop">
        <div class="page-header-index-wide">
          <a-row :gutter="24">
            <a-col
              :sm="24"
              :md="12"
              :xl="6"
              :style="{ marginBottom: '24px' }"
            >
              <chart-card
                :loading="loading"
                title="实时总功率"
                :total="8846 | NumberFormat"
              >
                <a-tooltip
                  title="指标说明"
                  slot="action"
                >
                  <img src="../../assets/realtime.jpg" />
                </a-tooltip>
                <div>
                  <mini-area />
                </div>
              </chart-card>
            </a-col>

            <a-col
              :sm="24"
              :md="12"
              :xl="6"
              :style="{ marginBottom: '24px' }"
            >
              <chart-card
                :loading="loading"
                title="装机总容量"
                :total="8846 | NumberFormat"
              >
                <a-tooltip
                  title="指标说明"
                  slot="action"
                >
                  <img src="../../assets/total.jpg" />
                </a-tooltip>
                <div>

                  <mini-area />
                </div>
              </chart-card>
            </a-col>
            <a-col
              :sm="24"
              :md="12"
              :xl="6"
              :style="{ marginBottom: '24px' }"
            >
              <chart-card
                :loading="loading"
                title="累计发电量"
                :total="8846 | NumberFormat"
              >
                <a-tooltip
                  title="指标说明"
                  slot="action"
                >
                  <img src="../../assets/electricity.jpg" />
                </a-tooltip>
                <div>
                  <mini-area />
                </div>
              </chart-card>
            </a-col>
            <a-col
              :sm="24"
              :md="12"
              :xl="6"
              :style="{ marginBottom: '24px' }"
            >
              <chart-card
                :loading="loading"
                title="当日发电量"
                :total="8846 | NumberFormat"
              >
                <a-tooltip slot="action">
                  <img src="../../assets/today.jpg" />
                </a-tooltip>
                <div>
                  <mini-area />
                </div>
              </chart-card>
            </a-col>

          </a-row>

        </div>
      </div>
      <div class="middlecontent">
        <div class="middle-left">
          <div class="co">
            <span>
              <img src="../../assets/co.jpg" />
              <i>二氧化碳</i>
            </span>
            <span>ggg</span>
          </div>
          <div class="coal">
            <span>
              <img src="../../assets/coal.jpg" />
              <i>标准煤</i>
            </span>
            <span>ggg</span>
          </div>
          <div class="tree">
            <span>
              <img src="../../assets/tree.jpg" />
              <i>植树</i>
            </span>
            <span>ggg</span>
          </div>
          <div class="dioxide">
            <span>
              <img src="../../assets/so.jpg" />
              <i>二氧化硫</i>
            </span>
            <span>ggg</span>
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
            <a-icon
              type="left"
              style="color:white;fontSize:18px"
            />
          </div>
          <a-row
            :gutter="36"
            class="pieRow"
          >
            <a-col
              :sm="24"
              :md="12"
              :xl="6"
              :style="{ marginBottom: '24px' }"
            >
              <a-card
                :loading="loading"
                :bordered="false"
                :bodyStyle="{ padding: '5px' }"
                :headStyle="{ textAlign: 'center' }"
                title="电站1"
                total="当前功率"
              >
                <div class="veRing">
                  <ve-ring
                    :data="chartData1"
                    :title="veRingTitle"
                    :legend-visible="false"
                    :settings="chartSettings"
                    :graphic="graphic1"
                    :extend="chartExtend"
                    :colors="colors"
                    height="170px"
                  ></ve-ring>
                </div>
              </a-card>
            </a-col>

            <a-col
              :sm="24"
              :md="12"
              :xl="6"
              :style="{ marginBottom: '24px' }"
            >
              <a-card
                :loading="loading"
                title="电站2"
                total="当前功率"
                :bordered="false"
                :bodyStyle="{ padding: '5px' }"
                :headStyle="{ textAlign: 'center' }"
              >
                <div class="veRing">
                  <ve-ring
                    :data="chartData2"
                    :legend-visible="false"
                    :settings="chartSettings"
                    :title="veRingTitle"
                    :tooltip-visible="false"
                    :graphic="graphic2"
                    :colors="colors"
                    :extend="chartExtend"
                    height="170px"
                  ></ve-ring>
                </div>
              </a-card>
            </a-col>
            <a-col
              :sm="24"
              :md="12"
              :xl="6"
              :style="{ marginBottom: '24px' }"
            >
              <a-card
                :loading="loading"
                title="电站3"
                :bordered="false"
                total="当前功率"
                :bodyStyle="{ padding: '5px' }"
                :headStyle="{ textAlign: 'center' }"
              >
                <div class="veRing">
                  <ve-ring
                    :data="chartData3"
                    :title="veRingTitle"
                    :legend-visible="false"
                    :settings="chartSettings"
                    :graphic="graphic3"
                    :tooltip="tooltip"
                    :colors="colors"
                    :extend="chartExtend"
                    height="170px"
                  ></ve-ring>
                </div>
              </a-card>
            </a-col>
            <a-col
              :sm="24"
              :md="12"
              :xl="6"
              :style="{ marginBottom: '24px' }"
            >
              <a-card
                :loading="loading"
                title="电站4"
                total="当前功率"
                :bordered="false"
                :bodyStyle="{ padding: '5px' }"
                :headStyle="{ textAlign: 'center' }"
              >
                <div class="veRing">
                  <ve-ring
                    :title="veRingTitle"
                    :data="chartData4"
                    :colors="colors"
                    :legend-visible="false"
                    :settings="chartSettings"
                    :graphic="graphic4"
                    :extend="chartExtend"
                    height="170px"
                  ></ve-ring>
                </div>
              </a-card>
            </a-col>
          </a-row>
          <div class="right">
            <a-icon
              type="right"
              style="color:white;fontSize:18px"
            />
          </div>
        </div>
        <div class="line">
          <ve-line
            :data="lineChartData"
            :title="chartTitle"
            :colors="colors1"
            :settings="lineChartSettings"
            height="270px"
          ></ve-line>
        </div>

      </div>

    </div>
  </div>
</template>

<script>
import moment from 'moment'
import 'echarts/lib/component/title'
import { ChartCard, MiniArea, MiniBar, MiniProgress, RankList, Bar, Trend, NumberInfo, MiniSmoothArea, Radar } from '@/components'
import { mixinDevice } from '@/utils/mixin'
import LinePack from './LinePack'

const barData = []
const barData2 = []
for (let i = 0; i < 12; i += 1) {
  barData.push({
    x: `${i + 1}月`,
    y: Math.floor(Math.random() * 1000) + 200
  })
  barData2.push({
    x: `${i + 1}月`,
    y: Math.floor(Math.random() * 1000) + 200
  })
}

const rankList = []
for (let i = 0; i < 7; i++) {
  rankList.push({
    name: '白鹭岛 ' + (i + 1) + ' 号店',
    total: 1234.56 - i * 100
  })
}

const searchUserData = []
for (let i = 0; i < 7; i++) {
  searchUserData.push({
    x: moment().add(i, 'days').format('YYYY-MM-DD'),
    y: Math.ceil(Math.random() * 10)
  })
}
const searchUserScale = [
  {
    dataKey: 'x',
    alias: '时间'
  },
  {
    dataKey: 'y',
    alias: '用户数',
    min: 0,
    max: 10
  }]

const searchTableColumns = [
  {
    dataIndex: 'index',
    title: '排名',
    width: 90
  },
  {
    dataIndex: 'keyword',
    title: '搜索关键词'
  },
  {
    dataIndex: 'count',
    title: '用户数'
  },
  {
    dataIndex: 'range',
    title: '周涨幅',
    align: 'right',
    sorter: (a, b) => a.range - b.range,
    scopedSlots: { customRender: 'range' }
  }
]
const searchData = []
for (let i = 0; i < 50; i += 1) {
  searchData.push({
    index: i + 1,
    keyword: `搜索关键词-${i}`,
    count: Math.floor(Math.random() * 1000),
    range: Math.floor(Math.random() * 100),
    status: Math.floor((Math.random() * 10) % 2)
  })
}

const DataSet = require('@antv/data-set')

const sourceData = [
  { item: '家用电器', count: 32.2 },
  { item: '食用酒水', count: 21 },
  { item: '个护健康', count: 17 },
  { item: '服饰箱包', count: 13 },
  { item: '母婴产品', count: 9 },
  { item: '其他', count: 7.8 }
]

const pieScale = [{
  dataKey: 'percent',
  min: 0,
  formatter: '.0%'
}]

const dv = new DataSet.View().source(sourceData)
dv.transform({
  type: 'percent',
  field: 'count',
  dimension: 'item',
  as: 'percent'
})
const pieData = dv.rows

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
  data () {
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

      }
      this.tooltip = {
           trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
        }
      this.colors = ['#3964A5', '#619EF0']
      this.colors1 = ['#F29253']
      this.graphic1 = [{
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
      }]
      this.graphic2 = [{
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
      }]
      this.graphic3 = [{
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
      }]
      this.graphic4 = [{
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
      }]
      this.chartTitle = {
        text: '今日发电量趋势图',
         textStyle: {
          fontSize: 14,
          left: '30px'
        }
      }
      this.veRingTitle = {
        text: '当前功率',
        left: 'center',
        top: 0,
        textStyle: {
          fontWeight: 'normal',
          fontSize: 14
        }
      }

    return {
      loading: true,
      rankList,

      // 搜索用户数
      searchUserData,
      searchUserScale,
      searchTableColumns,
      searchData,

      barData,
      barData2,

      //
      pieScale,
      pieData,
      sourceData,
      pieStyle: {
        stroke: '#fff',
        lineWidth: 1
      },
      chartData1: {
          columns: ['日期', '访问用户'],
          hoverAnimation: false,
          rows: [
            { '日期': '1/1', '访问用户': 18 },
            { '日期': '1/2', '访问用户': 82 }
          ]
      },
      chartData2: {
          columns: ['日期', '访问用户'],
          hoverAnimation: false,
          rows: [
            { '日期': '1/1', '访问用户': 22 },
            { '日期': '1/2', '访问用户': 78 }
          ]
      },
      chartData3: {
          columns: ['日期', '访问用户'],
          hoverAnimation: false,
          rows: [
            { '日期': '1/1', '访问用户': 55 },
            { '日期': '1/2', '访问用户': 45 }
          ]
      },
      chartData4: {
          columns: ['日期', '访问用户'],
          hoverAnimation: false,
          rows: [
            { '日期': '1/1', '访问用户': 70 },
            { '日期': '1/2', '访问用户': 30 }
          ]
      },
      lineChartData: {
        columns: ['日期', '今日发电量'],
        rows: [
          { '日期': '10:00', '今日发电量': 18 },
          { '日期': '10:30', '今日发电量': 30 },
          { '日期': '11:00', '今日发电量': 20 },
          { '日期': '11:30', '今日发电量': 28 },
          { '日期': '12:00', '今日发电量': 58 },
          { '日期': '12:30', '今日发电量': 26 },
          { '日期': '13:00', '今日发电量': 56 },
          { '日期': '13:30', '今日发电量': 28 }
        ]
      }
    }
  },
  created () {
    setTimeout(() => {
      this.loading = !this.loading
    }, 1000)
  }
}
</script>

<style lang="less" scoped>
.content {
  width: 100%;
  height: 100%;
  background: url('../../assets/bg.jpg') no-repeat;
  .header {
    width: 100%;
    height: 70px;
    background: url('../../assets/header.jpg') no-repeat;
  }
  .middlepart {
    margin-top: 20px;
    padding: 8px;
    box-sizing: border-box;
    .middlecontent {
      display: flex;
      div {
        width: 456px;
        height: 460px;
      }
      .middle-left {
        height: 460px;
        // background-color: aqua;
        margin-right: 24px;
        div {
          width: 100%;
          height: 97px;
          line-height: 97px;
          margin-bottom: 24px;
          background: url('../../assets/bar.jpg') no-repeat;
          span {
            text-align: center;
            i {
              font-style: normal;
              color: white;
              font-size: 18px;
              font-weight: 800;
            }
            &:first-child {
              width: 50%;
              display: inline-block;
            }
            &:last-child {
              width: 49%;
              display: inline-block;
              color: red;
              font-size: 18px;
              font-weight: 800;
            }
          }
          &:last-child {
            margin-bottom: 0px;
          }
        }
      }
      .middle-ear {
        width: 945px;
        margin-right: 24px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .middle-right {
        .right-title {
          width: 100%;
          height: 49px;
          border-bottom: 1px solid #ccc;
          padding: 15px 20px;
          box-sizing: border-box;
          span {
            &:first-child {
              font-size: 18px;
              font-weight: 800;
            }
            &:last-child {
              float: right;
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
      .veRing {
        height: 100px;
      }
      .pieRow {
        margin: 0 !important;
      }
    }
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
