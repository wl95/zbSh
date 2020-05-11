<template>
  <page-view title="单个设备维护记录">
    <a-card :bordered="false">
      <div>
        <div class="table-operator">
          <a-input-search placeholder="请输入设备名称" style="margin-left: 16px; width: 272px;" @search="onSearch" />
          <a-button style=" position:fixed;right:60px;" type="primary" @click="fanhui()">返回</a-button>
        </div>
        <a-table :columns="columns" :rowKey="record => record.id" :dataSource="data" :pagination="pagination" :loading="loading" @change="fanye">
          <span slot="name" slot-scope="text,record">
            {{ text }}
            <a-icon @click="readPmg(record.path)" type="file-jpg" />
          </span>
        </a-table>
        <a-modal :footer="null" title="" :bodyStyle="{'height':'680px','text-align':'center'}" v-model="visible" @ok="handleOk">
          <img style="width:300px;height:200px;margin-top:30px;" v-for="(u,index) in url" :key="index" :src="u" />
        </a-modal>
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
    dataIndex: 'name',
    scopedSlots: { customRender: 'name' }
  },
  {
    title: '维护项',
    align: 'center',
    dataIndex: 'content'
  },
  {
    title: '原序列号',
    align: 'center',
    dataIndex: 'oldSerialNumber'
  },
  {
    title: '新序列号',
    align: 'center',
    dataIndex: 'newSerialNumber'
  },
  {
    title: '维护时间',
    align: 'center',
    dataIndex: 'creationTime'
  },
  {
    title: '维护人员',
    align: 'center',
    dataIndex: 'creatorUser'
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
      modelName: '',
      id: 0,
      visible: false,
      url: ''
    }
  },
  created() {
    this.modelName = this.$route.query.modelName
    this.id = this.$route.query.id
    this.getList(1)
  },
  activated() {
    this.id = this.$route.query.id
    this.modelName = this.$route.query.modelName
    this.getList(1)
  },
  methods: {
    onSearch(value) {
      this.findKeyWords = value
      this.getList(1)
    },
    fanhui() {
      this.$router.push({ path: '/projectModel/modelRecord', query: { id: this.id } })
    },
    fanye(index) {
      this.getList(index.current)
    },
    getList(index) {
      var that = this
      ajax.postSuccessCall(
        'api/ModelComponent/GetListPageDerail',
        {
          PageIndex: index,
          PageSize: 20,
          FindKeyWords: that.findKeyWords,
          ModelName: that.modelName
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
    },
    readPmg(path) {
      var that = this
      // ajax.get('/api/ModelComponent/GetPhotoPath', { fileId: id }).then(res => {
      that.url = path
      that.visible = true
      // })
    },
    handleOk(e) {
      this.visible = false
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
