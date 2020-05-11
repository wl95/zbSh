<template>
  <page-view title="单个故障电站详细">
    <a-card :bordered="false">
      <div>
        <div class="table-operator">
          设备名称：
          <a-input placeholder="请输入设备名称" style="width: 140px;" />
          状态：
          <a-select defaultValue="" style="width: 120px" @change="handleChange">
            <a-select-option value="">全部</a-select-option>
            <a-select-option value="0">待确认</a-select-option>
            <a-select-option value="1">已确认</a-select-option>
          </a-select>
          时间：
          <a-range-picker @change="onChange" />
          <a-button style="margin-left: 16px ; position:relative;top:-1px;" type="primary" icon="search" @click="onSearch()">查询</a-button>
        </div>
        <a-table :columns="columns" :rowKey="record => record.id" :dataSource="data" :pagination="pagination" :loading="loading" @change="fanye">
        </a-table>
      </div>
    </a-card>
  </page-view>
</template>

<script>
import { PageView } from '@/layouts'
import { STable, Ellipsis } from '@/components'
import { ajax } from '@/utils/ajax'
const columns = [
  {
    title: '电站名称',
    align: 'center',
    dataIndex: 'name'
  },
  {
    title: '设备名称',
    align: 'center',
    dataIndex: 'equipmentName'
  },
  {
    title: '故障类别',
    align: 'center',
    dataIndex: 'category'
  },
  {
    title: '级别',
    align: 'center',
    dataIndex: 'level'
  },
  {
    title: '故障内容',
    align: 'center',
    dataIndex: 'faultContent'
  },
  {
    title: '状态',
    align: 'center',
    dataIndex: 'state'
  },
  {
    title: '时间',
    align: 'center',
    dataIndex: 'dateTime'
  }
]
export default {
  name: '',
  components: {
    PageView,
    STable,
    Ellipsis
  },
  data() {
    return {
      data: [],
      pagination: {},
      labelCol: { lg: { span: 5 }, sm: { span: 5 } },
      wrapperCol: { lg: { span: 19 }, sm: { span: 19 } },
      form: this.$form.createForm(this),
      loading: false,
      timer: 0,
      columns: columns,
      findKeyWords: '',
      id: 0
    }
  },
  created() {
    this.id = this.$route.query.id
    this.getList(1)
  },
  methods: {
    onSearch(value) {
      this.findKeyWords = value
      this.getList(1)
    },
    onChange(date, dateString) {
      console.log(date, dateString)
    },
    handleChange(value) {
      console.log(`selected ${value}`)
    },
    fanye(index) {
      this.getList(index.current)
    },
    getList(index) {
      var that = this
      ajax.postSuccessCall(
        'api/FaultStation/FaultStationDetail',
        {
          PageIndex: index,
          PageSize: 20,
          FindKeyWords: that.findKeyWords,
          id: that.id
        },
        function(response) {
          that.data = response.result.list
          that.pagination = {
            current: index,
            pageSize: 20,
            total: response.result.totalCount
          }
        },
        that
      )
    }
  },
  filters: {
    nullableFilter(type) {
      return type === true ? '是' : '否'
    }
  },
  beforeDestroy() {
    clearTimeout(this.timer)
  }
}
</script>

<style lang="less" scoped>
.stepFormText {
  margin-bottom: 24px;
  .ant-form-item-label,
  .ant-form-item-control {
    line-height: 22px;
  }
}
</style>
