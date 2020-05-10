<template>
  <page-view title="项目列表">
    <a-card :bordered="false">
      <div>
        <div class="table-operator">
          <a-input-search placeholder="请输入电站名称" style="margin-left: 16px; width: 272px;" @search="onSearch" />
          <!-- <a-button style="margin-left: 16px ; position:relative;top:-1px;" type="primary" icon="plus" @click="add()">新建</a-button> -->
        </div>
        <a-table :columns="columns" :rowKey="record => record.id" :dataSource="data" :pagination="pagination" :loading="loading" @change="fanye">
          <span slot="id" slot-scope="text">
            <template>
              <el-button type="primary" size="mini" @click="read(text)" round>查看详细信息</el-button>
              <!-- <a-divider type="vertical" />
              <a @click="distribution(text)">分配人员</a>
              <a-divider type="vertical" />
              <a @click="deleteRow(text)">删除</a> -->
            </template>
          </span>
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
    title: '当日发电量',
    align: 'center',
    dataIndex: 'dayPowerNumber'
  },
  {
    title: '累计发电量',
    align: 'center',
    dataIndex: 'sumPowerNumber'
  },
  {
    title: '当前功率',
    align: 'center',
    dataIndex: 'power'
  },
  {
    title: '当前辐照度',
    align: 'center',
    dataIndex: 'irradiance'
  },
  {
    title: '电站规模',
    align: 'center',
    dataIndex: 'powerScale'
  },
  {
    title: '操作',
    dataIndex: 'id',
    align: 'center',
    scopedSlots: { customRender: 'id' }
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
      findKeyWords: ''
    }
  },
  created() {
    this.getList(1)
  },
  methods: {
    onSearch(value) {
      this.findKeyWords = value
      this.getList(1)
    },
    read(id) {
      this.$router.push({ path: '/powerStation/powerStationDetail', query: { id: id } })
    },
    fanye(index) {
      this.getList(index.current)
    },
    getList(index) {
      var that = this
      ajax.postSuccessCall(
        'api/PowerStation/PowerStationIndex',
        {
          PageIndex: index,
          PageSize: 20,
          FindKeyWords: that.findKeyWords
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
