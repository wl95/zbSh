<template>
  <a-modal :width="740" :visible="visible" title="设备维护" @ok="handleSubmit" @cancel="visible = false">
    <a-form @submit="handleSubmit" :form="form">
      <a-form-item label="设备名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <a-input v-decorator="['componentName', {rules:[{required: true, message: '必填项'}]}]" />
      </a-form-item>
      <a-form-item label="所属模型" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <a-input v-decorator="['name']" :disabled="true" />
      </a-form-item>
      <a-form-item label="维护操作说明" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <a-input v-decorator="['content', {rules:[{required: true, message: '必填项'}]}]" />
      </a-form-item>
      <a-form-item label="备注" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <a-input v-decorator="['remark']" />
      </a-form-item>
      <a-form-item label="原设备序列号" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <a-input v-decorator="['oldSerialNumber']" />
      </a-form-item>
      <a-form-item label="更换后设备序列号" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <a-input v-decorator="['newSerialNumber']" />
      </a-form-item>
      <a-form-item label="上传图片" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <div style="display: inline-flex;">
          <a-upload :action="url" accept=".jpg,.png,.jpeg" listType="picture-card" :data="{fileId:0,fileType:1}" :fileList="onefileList" @preview="onehandlePreview" @change="onehandleChange">
            <!-- <div v-if="onefileList.length < 1"> -->
            <a-icon type="plus" />
            <div class="ant-upload-text">构件图片</div>
            <!-- </div> -->
          </a-upload>
          <a-modal :visible="onepreviewVisible" :footer="null" @cancel="onehandleCancel">
            <img alt="example" style="width: 100%" :src="onepreviewImage" />
          </a-modal>
        </div>
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
      id: 0,
      fileId: '',
      onepreviewVisible: false,
      onepreviewImage: '',
      onefileList: []
    }
  },
  computed: {
    url: function() {
      return process.env.VUE_APP_API_BASE_URL + 'api/File/UploadImg'
    }
  },
  methods: {
    add(id, name, componentName) {
      this.id = id
      this.form.resetFields()
      const {
        form: { setFieldsValue }
      } = this
      this.visible = true
      this.$nextTick(() => {
        setFieldsValue({
          name: name,
          componentName: componentName
        })
      })
    },
    handleSubmit() {
      var fileId = this.fileId
      if (fileId === '') {
        this.$message.error('请上传图片')
        return false
      }
      const {
        form: { validateFields }
      } = this
      this.visible = true
      validateFields((errors, values) => {
        if (!errors) {
          this.visible = false
          this.confirmLoading = false
          values.id = this.id
          values.fileId = fileId
          this.$emit('ok', values)
          this.form.resetFields()
        }
      })
    },
    // 图片上传
    onehandleCancel() {
      this.onepreviewVisible = false
    },
    onehandlePreview(file) {
      this.onepreviewImage = file.url || file.thumbUrl
      this.onepreviewVisible = true
    },
    onehandleChange({ fileList }) {
      this.onefileList = fileList
      if (fileList.length > 0) {
        this.fileId = ''
        for (var i = 0; i < fileList.length; i++) {
          if (fileList[i].response !== undefined) {
            this.fileId += fileList[i].response.result.fileId + ','
          }
        }
      } else {
        this.fileId = ''
      }
    }
  }
}
</script>
