<template>
  <a-modal :width="740" :visible="visible" title="模型编辑" @ok="handleSubmit" @cancel="visible = false">
    <a-form @submit="handleSubmit" :form="form">
      <a-form-item label="模型名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <a-input v-decorator="['name', {rules:[{required: true, message: '必填项'}]}]" />
      </a-form-item>
      <a-form-item style="display:none;" label="隐藏" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <a-input />
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script>
export default {
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
      visible: false,
      form: this.$form.createForm(this),
      id: 0
    }
  },
  methods: {
    edit(record) {
      this.form.resetFields()
      const {
        form: { setFieldsValue }
      } = this
      this.id = record.id
      this.visible = true
      this.$nextTick(() => {
        setFieldsValue({
          name: record.name
        })
      })
    },
    handleSubmit() {
      const {
        form: { validateFields }
      } = this
      this.visible = true
      validateFields((errors, values) => {
        if (!errors) {
          this.visible = false
          this.confirmLoading = false
          values.id = this.id
          this.$emit('ok', values)
          this.form.resetFields()
        }
      })
    }
  }
}
</script>
