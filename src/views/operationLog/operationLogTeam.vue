<template>
  <page-view title="施工队修改记录">
    <a-card :bordered="false">
      <div>
        <div class="table-operator">
          <a-input-search placeholder="项目名称" style="margin-left: 16px; width: 272px;" @search="onSearch" />
          <!-- <a-button style="margin-left: 16px ; position:relative;top:-1px;" type="primary" icon="plus" @click="add()">新建</a-button> -->
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
    title: '操作人',
    align: 'center',
    dataIndex: 'name'
  },
  {
    title: '所属项目',
    align: 'center',
    dataIndex: 'operationStr'
  },
  {
    title: '操作描述',
    align: 'center',
    dataIndex: 'content'
  },
  {
    title: '操作时间',
    align: 'center',
    dataIndex: 'createTime'
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
    fanye(index) {
      this.getList(index.current)
    },
    getList(index) {
      var that = this
      ajax.postSuccessCall(
        'api/OperationLog/GetListPage',
        {
          PageIndex: index,
          PageSize: 20,
          OperationType: 0,
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
