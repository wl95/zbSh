<template>
  <div class="content">
    <div class="management-header">
      <div>
         <a-icon type="book" />
          <span class="electricity-name">前台电站列表</span>
      </div>
    </div>
    <div class="middlepart">
      <div class="middletop">
        <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" @submit="handleSubmit" >
        <a-row :gutter="24">
            <a-col
              :sm="24"
              :md="12"
              :xl="6"
              :style="{ marginBottom: '24px' }"
            >
       <a-form-item v-bind="formItemLayout" label="地区:" >
      <a-cascader
        v-decorator="[
          'residence',
          {
            initialValue: ['zhejiang', 'hangzhou', 'xihu'],
            rules: [
              { type: 'array',  message: '请选择不可为空!' },
            ],
          },
        ]"
        :options="residences"
      />
    </a-form-item>
            </a-col>
            <a-col
              :sm="24"
              :md="12"
              :xl="6"
              :style="{ marginBottom: '24px' }"
            >
                <a-form-item
      label="电站名称:"
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
    >
      <a-input placeholder="请输入电站名称" />
    </a-form-item>
            </a-col>
            <a-col
              :sm="24"
              :md="12"
              :xl="6"
              :style="{ marginBottom: '24px' }"
            >
                      <a-form-item
      label="施工队:"
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
    >
      <a-input placeholder="请输入施工队名称" />
    </a-form-item>
            </a-col>
            <a-col
              :sm="24"
              :md="12"
              :xl="6"
              :style="{ marginBottom: '24px' }"
            >
             <a-form-item label="状态:" has-feedback>
      <a-select
        v-decorator="[
          'select',
        
        ]"
        placeholder="Please select a country"
      >
        <a-select-option value="china">
          有故障
        </a-select-option>
        <a-select-option value="usa">
         无故障
        </a-select-option>
      </a-select>
    </a-form-item>

            </a-col>
            <a-col
              :sm="24"
              :md="12"
              :xl="6"
              :style="{ marginBottom: '24px' }"
            >
            </a-col>
            <a-col
              :sm="24"
              :md="12"
              :xl="6"
              :style="{ marginBottom: '24px' }"
            >
            <a-button type="primary" html-type="submit">
            查询
          </a-button>
          <a-button :style="{ marginLeft: '8px' }" @click="handleReset">
            重置
          </a-button>
            </a-col>

        </a-row>
        </a-form>
      </div>
      <div class="middlecontent">
        <div class="middle-left">
  
        </div>

      </div>
      <div class="middlebottom">
    
  

      </div>

    </div>
  </div>
</template>

<script>
// import moment from 'moment'
import 'echarts/lib/component/title'
import { ChartCard, MiniArea, MiniBar, MiniProgress, RankList, Bar, Trend, NumberInfo, MiniSmoothArea, Radar } from '@/components'
import { mixinDevice } from '@/utils/mixin'

const rankList = []
for (let i = 0; i < 7; i++) {
  rankList.push({
    name: '西安电站',
    total: '323,234KW'
  })
}

const residences = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
          },
        ],
      },
    ],
  },
];


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
   beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'register' });
  },
  data () {


    return {
      residences,
        formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
      },
    

    }
  },
  methods: {
        handleSubmit(e) {
      e.preventDefault();
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
        }
      });
    },
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
