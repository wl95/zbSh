<template>
  <a-card :bordered="false">
    <div>
      <div class="table-operator">
        <a-button type="primary" icon="plus" @click="add()">新建</a-button>
      </div>
      <a-table :columns="columns" :rowKey="record => record.id" :dataSource="data" :pagination="pagination" :loading="loading" @change="fanye">
        <span slot="xuhao" slot-scope="text, record, index">{{ index + 1 }}</span>
        <span slot="nameSpace" slot-scope="text">
          {{ text }}
        </span>
        <span slot="modelName" slot-scope="text">
          {{ text }}
        </span>
        <span slot="keyCSharpDataType" slot-scope="text">
          {{ text|cSharpDataTypeFilter }}
        </span>
        <span slot="parentClassNames" slot-scope="text">
          {{ text }}
        </span>
        <span slot="remark" slot-scope="text">
          {{ text }}
        </span>
        <span slot="containsTenant" slot-scope="text">
          {{ text|containsTenantFilter }}
        </span>
        <span slot="id" slot-scope="text">
          <template>
            <a @click="edit(text)">编辑</a>
            <a-divider type="vertical" />
            <a @click="deleteRow(text)">删除</a>
          </template>
        </span>
      </a-table>
      <addoredittag ref="addoredittag" @ok="handleAddProperty" />
    </div>
  </a-card>
</template>

<script>
import Addoredittag from './addoredittag'
import { STable, Ellipsis } from '@/components'
import { ajax } from '@/utils/ajax'
const columns = [
  {
    title: '#',
    scopedSlots: { customRender: 'xuhao' }
  },
  {
    title: '命名空间',
    dataIndex: 'nameSpace'
  },
  {
    title: 'Model名称',
    dataIndex: 'modelName'
  },
  {
    title: '主键类型',
    dataIndex: 'keyCSharpDataType',
    scopedSlots: { customRender: 'keyCSharpDataType' }
  },
  {
    title: '继承父类',
    dataIndex: 'parentClassNames'
  },
  {
    title: '注释',
    dataIndex: 'remark'
  },
  {
    title: '包含租户',
    dataIndex: 'containsTenant',
    scopedSlots: { customRender: 'containsTenant' }
  },
  {
    title: '操作',
    dataIndex: 'id',
    width: '150px',
    scopedSlots: { customRender: 'id' }
  }
]
const cSharpDataType = {
  0: { text: 'Int' },
  1: { text: 'String' },
  2: { text: 'DateTime' },
  3: { text: 'Float' },
  4: { text: 'Decimal' },
  5: { text: 'Bool' }
}
export default {
  name: 'TemplateClass',
  components: {
    Addoredittag,
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
    this.getEfModelInfoList(1)
  },
  methods: {
    fanye(index) {
      this.getEfModelInfoList(index.current)
    },
    getEfModelInfoList(index) {
      var that = this
      ajax.postSuccessCall(
        'api/Generate/GetEfModelList',
        {
          pageIndex: index,
          pageSize: 20,
          findKeyWords: that.findKeyWords
        },
        function(response) {
          that.data = response.result.list
          //console.log(that.data)
          that.pagination = {
            current: response.result.pageIndex,
            pageSize: response.result.pageSize,
            total: response.result.total
          }
        },
        that
      )
    },
    add() {
      this.$router.push({ path: '/gnerate/generateAllForm', query: { id: 0 } })
    },
    edit(id) {
      this.$router.push({ path: '/gnerate/generateAllForm', query: { id: id } })
    },
    handleAddProperty(values, id, SelectCategory) {
      var that = this
      ajax.postSuccessCall(
        'api/CodeTemplateSetting/AddOrEditTag',
        {
          id: id,
          name: values.name,
          SelectCategory: SelectCategory
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
        'api/Generate/DeleteEfModelInfo',
        {
          id: id
        },
        function(response) {
          console.log(response.result)
          that.getEfModelInfoList(1)
        },
        that
      )
    }
  },
  filters: {
    containsTenantFilter(type) {
      return type === true ? '是' : '否'
    },
    cSharpDataTypeFilter(type) {
      if (type !== '') {
        return cSharpDataType[type].text
      } else {
        return ''
      }
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
