<template>
  <a-modal :width="740" :visible="visible" title="属性添加" @ok="handleSubmit" @cancel="visible = false">
    <a-form @submit="handleSubmit" :form="form">
      <a-form-item label="字段名" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <a-input v-decorator="['name', {rules:[{required: true, message: '必填项'}]}]" />
      </a-form-item>
      <a-form-item label="数据类型" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <a-select v-decorator="['cSharpDataType', {initialValue:'0',rules:[{required: true, message: '必填项' }]}]">
          <a-select-option value="0">Int</a-select-option>
          <a-select-option value="1">String</a-select-option>
          <a-select-option value="2">DateTime</a-select-option>
          <a-select-option value="6">Bool</a-select-option>
          <a-select-option value="3">Float</a-select-option>
          <a-select-option value="4">Decimal</a-select-option>
          <a-select-option value="5">Long</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="是否可空" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <a-checkbox v-decorator="['isNullable', {initialValue: false,rules:[{required: false}]}]">是否可以为Null</a-checkbox>
      </a-form-item>
      <a-form-item label="特性" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <a-select mode="tags" style="width: 100%" placeholder="选择特性" v-decorator="['attributes']">
          <a-select-option value="[Required]">[Required]</a-select-option>
          <a-select-option value="[MaxLength(50)]">[MaxLength(50)]</a-select-option>
          <a-select-option value="[MaxLength(200)]">[MaxLength(200)]</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="注释" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <a-textarea v-decorator="['comment']"></a-textarea>
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script>
export default {
  name: 'ModelPropertyForm',
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
      attribute: 'Entity',
      id: 1,
      isAdd: true,
      index: ''
    }
  },
  methods: {
    add(id) {
      this.form.resetFields()
      this.visible = true
      this.id = id
      // this.$refs['fromline'].resetFields()
    },
    edit(record, index) {
      this.form.resetFields()
      this.isAdd = false
      this.index = index
      const {
        form: { setFieldsValue }
      } = this
      this.id = record.id
      this.visible = true
      this.$nextTick(() => {
        setFieldsValue({
          name: record.name,
          isNullable: record.isNullable,
          comment: record.comment,
          cSharpDataType: record.cSharpDataType,
          attributes: record.attributes == null ? [] : record.attributes
        })
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
          // values.id = that.id
          values.navigation = false
          values.navigationKey = ''
          if (that.isAdd) {
            this.$emit('ok', values, true, 0)
          } else {
            this.$emit('ok', values, false, that.index)
            that.isAdd = true
          }
          this.form.resetFields()
        }
      })
    }
  }
}
</script>
