<template>
  <page-view title="设备维护记录">
    <a-card :bordered="false">
      <div>
        <div class="table-operator" style="position:relative;">
          <a-input-search placeholder="请输入设备名称" style="margin-left: 16px; width: 272px;" @search="onSearch" />
          <a-button style=" position:fixed;right:60px;" type="primary" @click="fanhui()">返回</a-button>
        </div>
        <a-table :columns="columns" :rowKey="record => record.id" :dataSource="data" :pagination="pagination" :loading="loading" @change="fanye">
          <span slot="num" slot-scope="text,record">
            <template>
              <a style="text-decoration:underline;color:#e60012" @click="detail(record.modelName)">{{ text }}</a>
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
    title: '设备名称',
    align: 'center',
    dataIndex: 'modelName'
  },
  {
    title: '所属模型',
    align: 'center',
    dataIndex: 'name'
  },
  {
    title: '维护次数',
    align: 'center',
    dataIndex: 'num',
    scopedSlots: { customRender: 'num' }
  },
  {
    title: '最后维护时间',
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
  activated() {
    this.id = this.$route.query.id
    this.getList(1)
  },
  methods: {
    onSearch(value) {
      this.findKeyWords = value
      this.getList(1)
    },
    detail(modelName) {
      this.$router.push({ path: '/projectModel/modelRecordDetail', query: { modelName: modelName, id: this.id } })
    },
    fanhui() {
      this.$router.push({ path: '/projectModel/projectModelIndex' })
    },
    fanye(index) {
      this.getList(index.current)
    },
    getList(index) {
      var that = this
      ajax.postSuccessCall(
        'api/ModelComponent/GetListPage',
        {
          PageIndex: index,
          PageSize: 20,
          FindKeyWords: that.findKeyWords,
          ProjectModelId: that.id
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
