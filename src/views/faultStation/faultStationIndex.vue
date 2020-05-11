<template>
  <page-view title="故障电站列表">
    <a-card :bordered="false">
      <div>
        <div class="table-operator">
          <a-input-search placeholder="电站名称/施工队" style="margin-left: 16px; width: 272px;" @search="onSearch" />
          <!-- <a-button style="margin-left: 16px ; position:relative;top:-1px;" type="primary" icon="plus" @click="add()">新建</a-button> -->
        </div>
        <a-table :columns="columns" :rowKey="record => record.id" :dataSource="data" :pagination="pagination" :loading="loading" @change="fanye">
          <span slot="faultNum" slot-scope="text,record">
            <template>
              <a style="text-decoration:underline;color:#e60012" @click="detail(record.id)">{{ text }}</a>
            </template>
          </span>
          <span slot="alarmNum" slot-scope="text,record">
            <template>
              <a style="text-decoration:underline;color:#e60012" @click="detail(record.id)">{{ text }}</a>
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
    title: '地区',
    align: 'center',
    dataIndex: 'area'
  },
  {
    title: '站点容量',
    align: 'center',
    dataIndex: 'siteCapacity'
  },
  {
    title: '施工队',
    align: 'center',
    dataIndex: 'constructionTeam'
  },
  {
    title: '故障次数',
    align: 'center',
    dataIndex: 'faultNum',
    scopedSlots: { customRender: 'faultNum' }
  },
  {
    title: '告警次数',
    align: 'center',
    dataIndex: 'alarmNum',
    scopedSlots: { customRender: 'alarmNum' }
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
    detail(id) {
      this.$router.push({ path: '/faultStation/faultStationDetail', query: { id: id } })
    },
    fanye(index) {
      this.getList(index.current)
    },
    getList(index) {
      var that = this
      ajax.postSuccessCall(
        'api/FaultStation/FaultStationIndex',
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
