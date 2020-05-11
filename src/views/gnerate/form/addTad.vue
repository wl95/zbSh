<template>
  <a-modal :width="740" :visible="visible" title="添加tab" @ok="handleSubmit" @cancel="visible = false">
    <a-form @submit="handleSubmit" :form="form">
      <a-form-item label="字段名" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <a-input v-decorator="['name', {rules:[{required: true, message: '必填项'}]}]" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script>
export default {
  name: 'addTab',
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
      isAdd: true,
      name: ''
    }
  },
  methods: {
    add(id) {
      this.form.resetFields()
      this.visible = true
      this.id = id
      // this.$refs['fromline'].resetFields()
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
          this.$emit('ok', values.name)
          this.form.resetFields()
        }
      })
    }
  }
}
</script>
