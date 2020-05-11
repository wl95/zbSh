<template>
  <a-modal :width="1000" :visible="visible" title="标签分类维护" @ok="handleSubmit" @cancel="visible = false">
    <a-form @submit="handleSubmit" :form="form">
      <a-form-item label="选择分类" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <template v-for=" category in categorys">
          <a-checkable-tag :key="category.id" :checked="Selectcategorys.indexOf(category.id)>-1" @change="(checked) =>handleTagChange(category,checked)">
            {{ category.name }}
          </a-checkable-tag>
        </template>
      </a-form-item>
      <a-form-item label="标签分类名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
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
      id: 0,
      categorys: [],
      Selectcategorys: []
    }
  },
  methods: {
    add() {
      this.form.resetFields()
      this.visible = true
      this.id = 0
      this.getcategorys()
    },
    edit(id) {
      this.getcategorys()
      this.id = id
      this.form.resetFields()
      this.visible = true
      var that = this
      const {
        form: { setFieldsValue }
      } = this
      this.$nextTick(() => {
        ajax.postSuccessCall(
          'api/CodeTemplateSetting/GetTag',
          {
            id: id
          },
          function(response) {
            if (response.result.selectCategory != null) {
              that.Selectcategorys = response.result.selectCategory
            }
            setFieldsValue({
              name: response.result.name
            })
          },
          that
        )
      })
    },
    getcategorys() {
      var that = this
      ajax.postSuccessCall(
        'api/CodeTemplateSetting/GetCategories',
        {},
        function(response) {
          that.categorys = response.result
        },
        that
      )
    },
    handleTagChange(category, checked) {
      if (checked) {
        this.Selectcategorys.push(category.id)
      } else {
        this.Selectcategorys.splice(this.Selectcategorys.indexOf(category.id), 1)
      }
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
          this.$emit('ok', values, that.id, that.Selectcategorys)
          this.form.resetFields()
        }
      })
    }
  }
}
</script>
