<template>
  <page-view title="角色维护">
    <a-card :body-style="{ padding: '24px 32px' }" :bordered="false">
      <a-form :form="form">
        <a-form-item label="角色" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['name', { rules: [{ required: true, message: '请输入角色名称' },{validator: checkName,message:'此角色已存在'}] }]" placeholder="请输入角色名称" />
        </a-form-item>
        <a-form-item label="备注" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-textarea v-decorator="['description']" placeholder="请输入备注" />
        </a-form-item>
        <a-form-item label="权限" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-tree-select showSearch style="width: 100%" :maxTagCount="3" :dropdownStyle="{'overflow-y':'scroll',height:'380px'}" :treeData="treeData" v-decorator="['permission', { rules: [{ required: true, message: '请选择权限' }]}]" allowClear multiple treeDefaultExpandAll placeholder="请选择权限" />
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
      id: 0,
      treeData: []
    }
  },
  mounted() {
    this.id = this.$route.query.id
    var that = this
    ajax.get('/api/Roles/Get', { id: that.id }).then(res => {
      that.treeData = res.result.treeVms
      var data = res.result
      const {
        form: { setFieldsValue }
      } = this
      that.$nextTick(() => {
        setFieldsValue({
          name: data.disPlayName,
          description: data.description,
          permission: data.grantedPermissionNames
        })
      })
    })
  },
  methods: {
    checkName(rule, value, callback) {
      if (value === undefined) {
        value = ''
      }
      var that = this
      ajax
        .get('api/Roles/Check', {
          id: that.id,
          name: value
        })
        .then(res => {
          if (res.result) {
            callback()
            return
          } else {
            callback('此名称已存在')
          }
        })
    },
    // 提交
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          var id = this.id
          var url = ''
          if (id > 0) {
            url = 'api/Roles/Update'
          } else {
            url = 'api/Roles/Create'
          }
          var that = this
          ajax.postSuccessCall(
            url,
            {
              Id: id,
              DisplayName: values.name,
              Name: values.name,
              Description: values.description,
              GrantedPermissions: values.permission
            },
            function(response) {
              if (response.result) {
                that.$message.success('提交成功')
                that.$router.push({ path: '/maintenance/roleIndex' })
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
      this.$router.push({ path: '/maintenance/roleIndex' })
    }
  }
}
</script>