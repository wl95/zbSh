<template>
  <page-view title="用户维护">
    <a-card :body-style="{ padding: '24px 32px' }" :bordered="false">
      <a-form :form="form">
        <a-form-item label="用户名/手机号" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['userName', { rules: [{ required: true, message: '请输入用户名' },{pattern:/^1[34578]\d{9}$/,message: '请输入正确的手机号'},{validator: checkName,message:'此用户已存在'}] }]" placeholder="请输入用户名" />
        </a-form-item>
        <a-form-item label="姓名" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['name', { rules: [{ required: true, message: '请输入姓名' }] }]" placeholder="请输入姓名" />
        </a-form-item>
        <a-form-item label="性别" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-select v-decorator="['gender']">
            <a-select-option v-for="(item,index) in genders" :key="index" :value="item.value">{{ item.text }}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="部门" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-select v-decorator="['organizationUnitId']">
            <a-select-option v-for="(item,index) in organizationUnits" :key="index" :value="item.value">{{ item.text }}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="角色" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-select v-decorator="['roleName']">
            <a-select-option v-for="(item,index) in roles" :key="index" :value="item.value">{{ item.text }}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item v-if="id==0" label="密码" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input type="password" v-decorator="['password']" placeholder="默认密码123456" />
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
      genders: [],
      roles: [],
      organizationUnits: []
    }
  },
  mounted() {
    this.id = this.$route.query.id
    var that = this
    ajax.get('/api/User/Get', { id: that.id }).then(res => {
      var data = res.result
      that.genders = data.genders
      that.roles = data.roles
      that.organizationUnits = data.organizationUnits
      var user = data.user
      const {
        form: { setFieldsValue }
      } = this
      that.$nextTick(() => {
        setFieldsValue({
          userName: user.userName,
          name: user.name,
          gender: user.gender,
          roleName: user.roleName,
          organizationUnitId: user.organizationUnitId
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
        .get('api/User/Check', {
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
            url = 'api/User/Update'
          } else {
            url = 'api/User/Create'
          }
          var that = this
          var roles = []
          var organizationUnitIds = []
          roles.push(values.roleName)
          organizationUnitIds.push(values.organizationUnitId)
          ajax.postSuccessCall(
            url,
            {
              Id: id,
              UserName: values.userName,
              Name: values.name,
              Surname: values.name,
              RoleNames: roles,
              OrganizationUnitIds: organizationUnitIds,
              Gender: values.gender,
              Password:values.password
            },
            function(response) {
              if (response.result) {
                that.$message.success('提交成功')
                that.$router.push({ path: '/maintenance/userIndex' })
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
      this.$router.push({ path: '/maintenance/userIndex' })
    }
  }
}
</script>