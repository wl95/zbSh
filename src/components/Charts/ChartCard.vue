<template>
  <a-card
    :loading="loading"
    :body-style="{ padding:0, height: '180px' }"
    :bordered="false"
  >
    <div class="chart-card-header">
      <div class="meta">
        <div class="chart-card-action">
          <slot name="action"></slot>
        </div>
        <span class="chart-card-title">
          <slot name="title">
            {{ title }}
          </slot>
        </span>
      </div>
      <div class="total" :style="{fontSize:'40px'}">
        <slot name="total" >
          <span>{{ typeof total === 'function' && total() || total }}</span>
        </slot>
        <slot name="unit">
          <span>{{ unit }}</span>
        </slot>
      </div>
    </div>
    <div class="chart-card-content">
      <div class="content-fix">
        <slot></slot>
      </div>
    </div>
    <!-- <div class="chart-card-footer">
      <div class="field">
        <slot name="footer">bbb</slot>
      </div>
    </div> -->
  </a-card>
</template>

<script>
export default {
  name: 'ChartCard',
  props: {
    title: {
      type: String,
      default: ''
    },
    total: {
      type: [Function, Number, String],
      required: false,
      default: null
    },
    loading: {
      type: Boolean,
      default: false
    },
    unit: {
       type: String,
       default: 'MW'
    }
  }
}
</script>

<style lang="less" scoped>
.chart-card-header {
  position: relative;
  overflow: hidden;
  width: 100%;
  .meta {
    position: relative;
    overflow: hidden;
    box-sizing: border-box;
    width: 100%;
    color: black;
    font-size: 18px;
    font-weight: 800;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #ccc;
    .chart-card-action{
      overflow: hidden;
      width: 46px;
      float: left;
      margin-right: 5px;
    }
    .chart-card-title{
      font-size: 24px;
    }
  }
}

.chart-card-footer {
  border-top: 1px solid #e8e8e8;
  padding-top: 9px;
  margin-top: 8px;

  > * {
    position: relative;
  }

  .field {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 0;
  }
}

.chart-card-content {
  margin-bottom: 12px;
  position: relative;
  height: 46px;
  width: 90%;
  left: 20px;
  top: 26px;
  // border-left: 1px solid #3f93f7;
  // border-bottom: 1px solid #3f93f7;

  .content-fix {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
  }
}

.total {
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
  white-space: nowrap;
  color: red;
  font-weight: 700;
  margin-top: 4px;
  margin-bottom: 0;
  font-size: 30px;
  line-height: 38px;
  height: 38px;
  span{
    font-size: 36px;
  }
  span:last-child{
    font-size: 20px;
    font-weight: normal;
  }
}
</style>
