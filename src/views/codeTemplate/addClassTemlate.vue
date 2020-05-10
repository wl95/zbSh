<template>
  <a-modal :width="1000" :visible="visible" title="模板分类维护" @ok="handleSubmit" @cancel="visible = false">
    <a-form @submit="handleSubmit" :form="form">
      <a-form-item label="模板分类名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <a-input placeholder="不超过10个字符" v-decorator="['name', {rules:[{required: true, message: '必填项'}]}]" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script>
import { ajax } from '@/utils/ajax'
export default {
  components: {},
  data() {
    return {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 15 }
      },
      form: this.$form.createForm(this),
      visible: false,
      id: 0
    }
  },
  methods: {
    add() {
      this.form.resetFields()
      this.visible = true
      this.id = 0
    },
    edit(id) {
      this.id = id
      this.form.resetFields()
      this.visible = true
      var that = this
      const {
        form: { setFieldsValue }
      } = this
      this.$nextTick(() => {
        ajax.postSuccessCall(
          'api/CodeTemplateSetting/GetTemplateCategory',
          {
            id: id
          },
          function(response) {
            setFieldsValue({
              name: response.result.name
            })
          },
          that
        )
      })
    },
    handleSubmit() {
      var that = this
      const {
        form: { validateFields }
      } = this
      this.visible = true
      validateFields((errors, values) => {
        if (!errors) {
          this.visible = false
          this.confirmLoading = false
          console.log(values)
          this.$emit('ok', values, that.id)
          this.form.resetFields()
        }
      })
    }
  }
}
</script>
