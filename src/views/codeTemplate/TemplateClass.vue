<template>
  <a-card :bordered="false">
    <div>
      <div class="table-operator">
        <a-button type="primary" icon="plus" @click="$refs.addClassTemlate.add()">新建</a-button>
      </div>
      <a-table :columns="columns" :rowKey="record => record.id" :dataSource="data" :pagination="pagination" :loading="loading" @change="fanye">
        <span slot="xuhao" slot-scope="text, record, index">{{ index + 1 }}</span>
        <span slot="name" slot-scope="text">
          {{ text }}
        </span>
        <span slot="id" slot-scope="text">
          <template>
            <a @click="$refs.addClassTemlate.edit(text)">编辑</a>
            <a-divider type="vertical" />
            <a @click="deleteRow(text)">删除</a>
          </template>
        </span>
      </a-table>
      <add-class-temlate ref="addClassTemlate" @ok="handleAddProperty" />
    </div>
  </a-card>
</template>

<script>
import AddClassTemlate from './addClassTemlate'
import { STable, Ellipsis } from '@/components'
import { ajax } from '@/utils/ajax'
const columns = [
  {
    title: '#',
    scopedSlots: { customRender: 'xuhao' }
  },
  {
    title: '分类名称',
    dataIndex: 'name',
    scopedSlots: { customRender: 'name' }
  },
  {
    title: '操作',
    dataIndex: 'id',
    width: '150px',
    scopedSlots: { customRender: 'id' }
  }
]
export default {
  name: 'TemplateClass',
  components: {
    AddClassTemlate,
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
    this.getTemplate(1)
  },
  methods: {
    fanye(index) {
      this.getTemplate(index.current)
    },
    getTemplate(index) {
      var that = this
      ajax.postSuccessCall(
        'api/CodeTemplateSetting/GetTemplateCategoryList',
        {
          pageIndex: index,
          pageSize: 20,
          findKeyWords: that.findKeyWords
        },
        function(response) {
          that.data = response.result.list
          that.pagination = {
            current: response.result.pageIndex,
            pageSize: response.result.pageSize,
            total: response.result.total
          }
        },
        that
      )
    },
    handleAddProperty(values, id) {
      var that = this
      ajax.postSuccessCall(
        'api/CodeTemplateSetting/AddOrEditTemplateCategory',
        {
          id: id,
          name: values.name
        },
        function(response) {
          console.log(response.result)
          that.getTemplate(1)
        },
        that
      )
    },
    deleteRow(id) {
      var that = this
      ajax.postSuccessCall(
        'api/CodeTemplateSetting/DeleteTemplateCategory',
        {
          id: id
        },
        function(response) {
          console.log(response.result)
          that.getTemplate(1)
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
