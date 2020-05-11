<template>
  <a-card :bordered="false">
    <div>
      <a-form :form="form" style="margin: 0px auto 0;">
        <a-alert :closable="true" message="确认转账后，资金将直接打入对方账户，无法退回。" style="margin-bottom: 24px;" />
        <div class="table-operator">
          <a-button type="primary" icon="plus" @click="$refs.modelPropertyForm.add(data.length+1)">新建</a-button>
          <a-button type="primary" icon="plus" @click="$refs.navigationform.add(data.length+1)">添加导航属性</a-button>
        </div>
        <a-form-item>
          <a-table :columns="columns" :rowKey="record => record.id" :dataSource="data" :pagination="false" :loading="loading">
            <span slot="xuhao" slot-scope="text, record, index">{{ index + 1 }}</span>
            <span slot="isNullable" slot-scope="text">
              {{ text|nullableFilter }}
            </span>
            <span slot="cSharpDataType" slot-scope="text">
              {{ text|cSharpDataTypeFilter }}
            </span>
            <span slot="navigation" slot-scope="text">
              {{ text|Navigation }}
            </span>
            <span slot="navigationKey" slot-scope="text">
              {{ text }}
            </span>
            <span slot="comment" slot-scope="text">
              <ellipsis :length="4" tooltip>{{ text }}</ellipsis>
            </span>
            <span slot="action" slot-scope="text, record, index">
              <template>
                <a @click="handleEdit(record,index)">编辑</a>
                <a-divider type="vertical" />
                <a @click="deleteRow(record)">删除</a>
              </template>
            </span>
          </a-table>
        </a-form-item>
        <a-form-item :wrapperCol="{span: 19, offset: 5}">
          <a-button @click="prevStep">上一步</a-button>
          <a-button style="margin-left: 8px" type="primary" @click="nextStep">下一步</a-button>
        </a-form-item>
        <model-property-form ref="modelPropertyForm" @ok="handleAddProperty" />
        <navigation-form ref="navigationform" @ok="navigationProperty" />
      </a-form>
    </div>
  </a-card>
</template>

<script>
import ModelPropertyForm from './form/ModelPropertyForm'
import NavigationForm from './form/NavigationForm'
import { STable, Ellipsis } from '@/components'
import { ajax } from '@/utils/ajax'
const columns = [
  {
    title: '#',
    scopedSlots: { customRender: 'xuhao' }
  },
  {
    title: '属性名称',
    dataIndex: 'name'
  },
  {
    title: '数据类型',
    dataIndex: 'cSharpDataType',
    scopedSlots: { customRender: 'cSharpDataType' }
  },
  {
    title: '是否导航属性',
    dataIndex: 'navigation',
    scopedSlots: { customRender: 'navigation' }
  },
  {
    title: '导航外键',
    dataIndex: 'navigationKey',
    scopedSlots: { customRender: 'navigationKey' }
  },
  {
    title: '特性',
    dataIndex: 'attributes'
  },
  {
    title: '可以为NULL',
    width: '120px',
    dataIndex: 'isNullable',
    scopedSlots: { customRender: 'IsNullable' }
  },
  {
    title: '注释',
    dataIndex: 'comment',
    scopedSlots: { customRender: 'Comment' }
  },
  {
    title: '操作',
    dataIndex: 'action',
    width: '150px',
    scopedSlots: { customRender: 'action' }
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
  name: 'Step2',
  props: ['id'],
  components: {
    ModelPropertyForm,
    NavigationForm,
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
      columns: columns
    }
  },
  created() {
    console.log(this.id)
    if (this.id > 0) {
      var that = this
      ajax.postSuccessCall(
        'api/Generate/GetEfModelProperties',
        {
          id: that.id
        },
        function(response) {
          console.log(response.result)
          that.data = response.result
        },
        that
      )
    }
  },
  methods: {
    handleAddProperty(form, isAdd, index) {
      if (isAdd) {
        this.data.push(form)
      } else {
        // 第一个参数是要修改的数据, 第二个值是修改当前数组的哪一个字段,第三个是要修改为什么值
        this.$set(this.data[index], `name`, form.name)
        this.$set(this.data[index], `isNullable`, form.isNullable)
        this.$set(this.data[index], `comment`, form.comment)
        this.$set(this.data[index], `cSharpDataType`, form.cSharpDataType)
        this.$set(this.data[index], `attributes`, form.attributes)
      }
    },
    navigationProperty(form, isAdd, index) {
      if (isAdd) {
        this.data.push(form)
      } else {
        // 第一个参数是要修改的数据, 第二个值是修改当前数组的哪一个字段,第三个是要修改为什么值
        this.$set(this.data[index], `name`, form.name)
        this.$set(this.data[index], `navigationKey`, form.navigationKey)
        this.$set(this.data[index], `isNullable`, form.isNullable)
        this.$set(this.data[index], `navigationType`, form.navigationType)
        this.$set(this.data[index], `comment`, form.comment)
        this.$set(this.data[index], `attributes`, form.attributes)
        this.$set(this.data[index], `cSharpDataType`, form.cSharpDataType)
      }
    },
    handleEdit(record, index) {
      console.log(record)
      if (record.navigation) {
        this.$refs.navigationform.edit(record, index)
      } else {
        this.$refs.modelPropertyForm.edit(record, index)
      }
    },
    deleteRow(record) {
      let index = this.data.indexOf(record)
      if (index != -1) {
        this.data.splice(index, 1)
      }
      // this.data = this.data.filter(c => c.id !== record.id)
    },
    fetch(params = {}) {},
    nextStep() {
      const that = this
      const {
        form: { validateFields }
      } = this
      that.loading = true
      validateFields((err, values) => {
        if (!err) {
          var postData = that.$parent.Step1Form
          postData.CreateEfModelPropertiesDtos = this.data
          postData.id = that.id
          console.log(postData)
          ajax.postSuccessCall(
            'api/Generate/SaveModelInfoAndGenerateDto',
            postData,
            function(response) {
              // console.log(response)
              that.$parent.Step3Form = that.data
              that.$parent.Step2Form = response.result
              that.$emit('nextStep')
            },
            that
          )
        } else {
          that.loading = false
        }
      })
    },
    prevStep() {
      this.$emit('prevStep')
    }
  },
  filters: {
    nullableFilter(type) {
      return type === true ? '是' : '否'
    },
    Navigation(type) {
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
