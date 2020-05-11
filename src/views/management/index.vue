<template>
  <div class="content">
    <div class="management-header">
      <div>
          <a-icon type="file-protect" />
          <span class="electricity-name">电站名称:西安电站</span>
      </div>
    
      <div class="status">
        <div>
           <span>状态:</span>
           <span>异常</span>
           <span>警告</span>
           <span>正常</span>
        </div>
        <div class="type">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
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
                :total="12423 | NumberFormat"
                 unit="MW"
              >
                <a-tooltip
                  title="实时总功率"
                  slot="action"
                >
                  <img src="../../assets/项目管理1.jpg" />
                </a-tooltip>
                <div class="home-card">
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
                :total="300000 | NumberFormat"
                unit="kwh"
              >
                <a-tooltip
                  title="当日发电量"
                  slot="action"
                >
                  <img src="../../assets/项目管理2.jpg" />
                </a-tooltip>
                <div class="home-card">

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
                :total="60000 | NumberFormat"
                unit="kwh"
              >
                <a-tooltip
                  title="累计发电量"
                  slot="action"
                >
                  <img src="../../assets/项目管理3.jpg" />
                </a-tooltip>
                <div class="home-card">
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
                title="收益"
              >
                <a-tooltip title="收益" slot="action">
                  <img src="../../assets/项目管理4.jpg" />
                </a-tooltip>
             
                  <div class="income" >
                  <div class="income-item">
                    <img src="../../assets/项目管理6.jpg"/>
                    <p class="inc-type">当日收益</p>
                    <p class="inc-money">12,423元</p>
                  </div>
                  <div class="income-item">
                    <img src="../../assets/项目管理5.jpg"/>
                    <p class="inc-type">累计收益</p>
                    <p class="inc-money">12,423元</p>
                  </div>
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

      </div>
      <div class="middlebottom">
        <div class="pie">
          <div class="pie-title">项目基本信息</div>
          <div class="pie-mesg">
            <div class="pie-type">
              <p>电站名称</p>
              <p>电站1</p>
            </div>
            <div class="pie-type">
              <p>电站容量</p>
              <p>505000</p>
            </div>
            <div class="pie-type">
              <p>电压等级</p>
              <p>123</p>
            </div>
            <div class="pie-type">
              <p>接入方式</p>
              <p>置入</p>
            </div>
            <div class="pie-type">
              <p>投产日期</p>
              <p>2017-01-10 20:26:24</p>
            </div>
            <div class="pie-type">
              <p>位置</p>
              <p>陕西省西安市碑林区</p>
            </div>
          </div>
        </div>
        <div class="line">
          <div class="title">
            <span>发电量趋势图</span>
            <div class="line-right">
              <a-radio-group default-value="a" button-style="solid" size="small">
                <a-radio-button value="a">
                  年
                </a-radio-button>
                <a-radio-button value="b">
                  月
                </a-radio-button>
                <a-radio-button value="c">
                  日
                </a-radio-button>
              </a-radio-group>
              
            </div>
          </div>
          <ve-line
            :data="lineChartData"
            :colors="colors1"
            :settings="lineChartSettings"
            height="450px"
            :extend="lineChartSettings"
          ></ve-line>
        </div>

      </div>

    </div>
  </div>
</template>

<script>
// import moment from 'moment'
import 'echarts/lib/component/title'
import { ChartCard, MiniArea, MiniBar, MiniProgress, RankList, Bar, Trend, NumberInfo, MiniSmoothArea, Radar } from '@/components'
import { mixinDevice } from '@/utils/mixin'
// import LinePack from './LinePack'

// const barData = []
// const barData2 = []
// for (let i = 0; i < 12; i += 1) {
//   barData.push({
//     x: `${i + 1}月`,
//     y: Math.floor(Math.random() * 1000) + 200
//   })
//   barData2.push({
//     x: `${i + 1}月`,
//     y: Math.floor(Math.random() * 1000) + 200
//   })
// }

const rankList = []
for (let i = 0; i < 7; i++) {
  rankList.push({
    name: '西安电站',
    total: '323,234KW'
  })
}

// const searchUserData = []
// for (let i = 0; i < 7; i++) {
//   searchUserData.push({
//     x: moment().add(i, 'days').format('YYYY-MM-DD'),
//     y: Math.ceil(Math.random() * 10)
//   })
// }
// const searchUserScale = [
//   {
//     dataKey: 'x',
//     alias: '时间'
//   },
//   {
//     dataKey: 'y',
//     alias: '用户数',
//     min: 0,
//     max: 10
//   }]

// const searchTableColumns = [
//   {
//     dataIndex: 'index',
//     title: '排名',
//     width: 90
//   },
//   {
//     dataIndex: 'keyword',
//     title: '搜索关键词'
//   },
//   {
//     dataIndex: 'count',
//     title: '用户数'
//   },
//   {
//     dataIndex: 'range',
//     title: '周涨幅',
//     align: 'right',
//     sorter: (a, b) => a.range - b.range,
//     scopedSlots: { customRender: 'range' }
//   }
// ]
// const searchData = []
// for (let i = 0; i < 50; i += 1) {
//   searchData.push({
//     index: i + 1,
//     keyword: `搜索关键词-${i}`,
//     count: Math.floor(Math.random() * 1000),
//     range: Math.floor(Math.random() * 100),
//     status: Math.floor((Math.random() * 10) % 2)
//   })
// }

// const DataSet = require('@antv/data-set')

// const sourceData = [
//   { item: '家用电器', count: 32.2 },
//   { item: '食用酒水', count: 21 },
//   { item: '个护健康', count: 17 },
//   { item: '服饰箱包', count: 13 },
//   { item: '母婴产品', count: 9 },
//   { item: '其他', count: 7.8 }
// ]

// const pieScale = [{
//   dataKey: 'percent',
//   min: 0,
//   formatter: '.0%'
// }]

// const dv = new DataSet.View().source(sourceData)
// dv.transform({
//   type: 'percent',
//   field: 'count',
//   dimension: 'item',
//   as: 'percent'
// })
// const pieData = dv.rows

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
    // LinePack,
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
         legend: {
           show: false
         },
         xAxis: [{
           axisLine: {
             lineStyle: {
               type: 'dashed'
             }

           }
         }]

      }
      this.tooltip = {
           trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
        }
      this.colors = ['#3964A5', '#619EF0']
      this.colors1 = ['#619EF0']
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

      // 搜索用户数
      // searchUserData,
      // searchUserScale,
      // searchTableColumns,
      // searchData,

      // barData,
      // barData2,

      //
      // pieScale,
      // pieData,
      // sourceData,
      // pieStyle: {
      //   stroke: '#fff',
      //   lineWidth: 1
      // },
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
      },
      line: {
         xAxis: [{
           axisLine: {
             lineStyle: {
               type: 'dashed'
             }

           }
         }]

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
   .management-header{
    width: 100%;
    font-size: 24px;
    font-weight: 600;
    color: #333333;
    margin-bottom: 16px;
    display: flex;
    justify-content:space-between;
    .electricity-name{
      margin-left: 11px;
    }
    .status{
      font-size: 14px;
      span{
         margin-right: 5px;
      }
      span:first-child{
        font-size: 16px;
        font-weight: 800;
       
      }
     
      .type{
      width: 120px;
      height: 7px;
      display:flex;
      border-radius: 5px;
      div:nth-child(1){
        flex: 1;
        background-color: #e60012;
      }
      div:nth-child(2){
        flex: 1;
        background-color: #ffae3a;
      }
      div:nth-child(3){
        flex: 1;
        background-color: #66c064;
      }
    }
    }
   
  }
  .home-card{
    position: relative;
    height: 100%;
  }
  .home-card:after{
    content: '';
    position: absolute;
    left: 0;
    top:-59px;
    width: 102%;
    height: 64px;
    border-left: 1.2px solid #619EF1;
    border-bottom: 1.2px solid #619EF1;
  }
  .income{
    // background-color: #619EF1;
    display: flex;
    text-align: center;
    // height: 100%;
   
    >div{
      flex: 1;
      // background-color: #66c064;
      // position: absolute;
      // top:-129px;

       &:last-child{
         right: 0;
       }
   
    }
        .inc-type{
          font-size: 18px;
          margin-bottom:0;

       }
       .inc-money{
         color: red;
         font-size: 30px;
         font-weight: 800;
       }
  
  }
  .antv-chart-mini{
    z-index: 999;
  }
  .middlepart {
    // padding: 20px;
    overflow: hidden;

    box-sizing: border-box;
    .middlecontent {
      .middle-left {
        width: 100%;
        display: flex;
        // height: 460px;
        // background-color: aqua;
        // margin-right: 25px;
        .midLeft-text {
          width: 24%;
          margin-right: 25px;
          height: 97px;
          line-height: 97px;
          margin-bottom: 24px;
          background: url('../../assets/bar.jpg') no-repeat;
          &:last-child{
            margin-right: 0px;
          }
          .midText-left {
            width: 52%;
            padding-left: 8px;
            display: inline-block;
            color: #fff;
            font-size: 22px;
            font-weight: 800;
          }
          >span{
            width: 46%;
            display: inline-block;
            font-size: 29px;
            text-align: right;
            font-weight: 655;
            color: #e60012;
          }
          @media screen and (min-width:1700px) {
             .midText-left {
               font-size: 24px;
             }
               >span{
                padding-right: 2%;
                font-size: 33px;
              }
          }
          @media screen and (max-width:1366px) {
             .midText-left {
               font-size: 21px;
             }
            >span{
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
        >.ant-card{
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
      height: 479px;
      // display: flex;
      box-sizing: border-box;
      > div {
        // flex: 0.64;
        float: left;
        width: 23.7%;
        margin-right: 25px;
        background-color: #fff;
        &:last-child {
          // flex: 2;
          width: 74.5%;
          height: 100%;
          margin-right: 0;
        }
      }
      .pie {
        .pie-title{
          height: 58px;
          border-bottom: 1px solid #ccc;
          padding: 21px 19px;
          box-sizing: border-box;
          font-size: 18px;
          color:#333333;
        }
        .pie-type{
          width: 50%;
          height: 140px;
          text-align: center;
          float: left;
          padding-top: 20px;
          box-sizing: border-box;
          border-left:1px solid #cccccc;
          border-bottom:1px solid #cccccc;
          p{
             color:#333333;
            &:first-child{
              font-size: 16px;
              
            }
            &:last-child{
              font-size: 18px;
            }
          }
          &:nth-child(odd){
            border-left: 0;
          }
          &:nth-child(5),&:nth-child(6){
            border-bottom: 0;
          }
        }

      }
      .line{
        .title{
          padding: 7px 28px;
          font-size: 18px;
          color:#333333;
          border-bottom: 1px solid #ccc;
          .line-right{
            font-size: 14px;
            color:#333333;
            float: right;
            font-weight: normal;
            .ant-radio-group-solid .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled){
              background-color: #619EF1;
              border-color: #619EF1;
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
.chart-card-action{
  img{
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
