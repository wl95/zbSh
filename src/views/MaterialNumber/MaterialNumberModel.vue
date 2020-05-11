<template>
  <page-view title="物料编号维护">
    <a-card :body-style="{ padding: '24px 32px' }" :bordered="false">
      <a-form :form="form">
        <a-form-item label="编号" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['number', { rules: [{ required: true, message: '请输入编号' }] }]" placeholder="请输入编号" />
        </a-form-item>
        <a-form-item label="流水号" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['serialNumber', { rules: [{ required: true, message: '请输入流水号' }] }]" placeholder="请输入流水号" />
        </a-form-item>
        <a-form-item label="物料描述" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-textarea v-decorator="['description']" placeholder="请输入描述" />
        </a-form-item>
        <a-form-item :wrapperCol="{ span: 19, offset: 5 }"></a-form-item>
        <div style="margin-left:30%;">
          <a-button type="primary" @click="handleSubmit">提交</a-button>
          <a-button style="margin-left: 8px" @click="cancel()">取消</a-button>
        </div>
      </a-form>
    </a-card>
  </page-view>
</template>

<script>
import { PageView } from '@/layouts'
import { ajax } from '@/utils/ajax'
import { TreeSelect } from 'ant-design-vue'
export default {
  name: '',
  components: {
    PageView
  },
  data() {
    return {
      parentId: '',
      description: '表单页用于向用户收集或验证信息，基础表单常见于数据项较少的表单场景。',
      value: 1,
      labelCol: { lg: { span: 7 }, sm: { span: 7 } },
      wrapperCol: { lg: { span: 10 }, sm: { span: 17 } },
      // form
      form: this.$form.createForm(this),
      id: 0
    }
  },
  mounted() {
    this.id = this.$route.query.id
    this.get(this.id)
  },
  activated() {
    this.id = this.$route.query.id
    this.get(this.id)
  },
  methods: {
    get(id) {
      var that = this
      if (id > 0) {
        ajax.get('/api/MaterialNumber/Get', { id: id }).then(res => {
          var data = res.result
          var serialNumber = ('0000' + data.serialNumber).slice(-4)
          const {
            form: { setFieldsValue }
          } = this
          that.$nextTick(() => {
            setFieldsValue({
              number: data.number,
              serialNumber: serialNumber,
              description: data.description
            })
          })
        })
      }
    },
    // 提交
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          var id = this.id
          var url = ''
          if (id > 0) {
            url = 'api/MaterialNumber/Update'
          } else {
            url = 'api/MaterialNumber/Create'
          }
          var that = this
          ajax.postSuccessCall(
            url,
            {
              Id: id,
              Number: values.number,
              Description: values.description,
              SerialNumber: values.serialNumber
            },
            function(response) {
              if (response.result) {
                that.$message.success('提交成功')
                that.form.resetFields()
                that.$router.push({ path: '/MaterialNumber/MaterialNumberIndex' })
              } else {
                that.$message.error('提交失败')
              }
            },
            null,
            that
          )
        }
      })
    },
    cancel() {
      this.form.resetFields()
      this.$router.push({ path: '/MaterialNumber/MaterialNumberIndex' })
    }
  }
}
</script>