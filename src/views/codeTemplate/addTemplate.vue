<template>
  <a-modal :width="1000" :visible="visible" title="模板维护" @ok="handleSubmit" @cancel="visible = false">
    <a-form @submit="handleSubmit" :form="form">
      <a-form-item label="模板名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <a-input placeholder="不超过10个字符" v-decorator="['name', {rules:[{required: true, message: '必填项'}]}]" />
      </a-form-item>
      <a-form-item label="所属分类" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <a-radio-group @change="onChange" v-model="categoryId">
          <a-radio v-for="(cate,index) in categoryVms" :key="index" :value="cate.id">{{cate.name}}</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="标签" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <template v-for="(tag, index) in tags">
          <a-tag :key="index" :closable="true" :afterClose="() => handleClose(tag)">
            {{ tag }}
          </a-tag>
        </template>
        <a-input v-if="inputVisible" ref="input" type="text" size="small" :style="{ width: '78px' }" :value="inputValue" @change="handleInputChange" @blur="handleInputConfirm" @keyup.enter="handleInputConfirm" />
        <a-tag v-else @click="showInput" style="background: #fff; borderStyle: dashed;">
          <a-icon type="plus" /> New Tag
        </a-tag>
      </a-form-item>
      <a-form-item label="选择标签" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <template v-for=" tag in taglist">
          <a-checkable-tag :key="tag.id" :checked="SelectTags.indexOf(tag.name)>-1" @change="(checked) =>handleTagChange(tag,checked)">
            {{tag.name}}
          </a-checkable-tag>
        </template>
      </a-form-item>
      <a-form-item label="代码" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <a-button icon="snippets" @click="$refs.editOrReadCode.read(code)">查看</a-button>
        <a-button icon="edit" @click="$refs.editOrReadCode.edit(code)">编辑</a-button>
      </a-form-item>
      <a-form-item label="描述(可选)" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <a-textarea rows="4" placeholder="请输入备注" v-decorator="[
            'remark',
          ]" />
      </a-form-item>
      <a-form-item label="页面或代码截图" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <div class="clearfix">
          <a-upload action="http://localhost:21021/api/File/UploadImg" listType="picture-card" :data="{fileId:0,fileType:0}" :fileList="fileList" @preview="handlePreview" @change="handleChange">
            <div v-if="fileList.length < 1">
              <a-icon type="plus" />
              <div class="ant-upload-text">Upload</div>
            </div>
          </a-upload>
          <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
            <img alt="example" style="width: 100%" :src="previewImage" />
          </a-modal>
        </div>
      </a-form-item>
    </a-form>
    <edit-or-read-code ref="editOrReadCode" @ok="handleAddProperty" />
  </a-modal>
</template>
<script>
import EditOrReadCode from './editOrReadCode'
import { ajax } from '@/utils/ajax'
export default {
  name: 'AddTemplate',
  components: {
    EditOrReadCode
  },
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
      value: 1,
      tags: [],
      SelectTags: [],
      taglist: [],
      inputVisible: false,
      inputValue: '',
      previewVisible: false,
      previewImage: '',
      fileList: [],
      categoryVms: [],
      categoryId: '',
      code: '123456',
      fileId: 1,
      id: 0
    }
  },
  mounted() {
    var that = this
    ajax.get('/api/CodeTemplateSetting/GetCategoryList').then(res => {
      that.categoryVms = res.result
    })
  },
  methods: {
    handleTagChange(tag, checked) {
      if (checked) {
        this.SelectTags.push(tag.name)
      } else {
        this.SelectTags.splice(this.SelectTags.indexOf(tag.name), 1)
      }
    },
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
          'api/CodeTemplateSetting/GetTemplate',
          {
            id: id
          },
          function(response) {
            // console.log(response.result)
            that.categoryId = response.result.categoryId
            that.GetTagList1(response.result.categoryId)
            if (response.result.tags != null) {
              that.SelectTags = response.result.tags
            }
            that.code = response.result.code
            that.previewImage = response.result.photoPath
            that.id = response.result.id
            // that.fileList.push({
            //   name:response.result.photoPath
            // })
            setFieldsValue({
              name: response.result.name,
              remark: response.result.remark
            })
          },
          that
        )
      })
    },
    GetTagList1(categoryId) {
      var that = this
      ajax.postSuccessCall(
        'api/CodeTemplateSetting/GetTagList1',
        {
          categoryId: categoryId
        },
        function(response) {
          that.taglist = response.result
        },
        that
      )
    },
    onChange(e) {
      this.categoryId = e.target.value
      this.GetTagList1(e.target.value)
      this.SelectTags = []
    },
    handleClose(removedTag) {
      this.SelectTags.splice(this.SelectTags.indexOf(removedTag), 1)
      const tags = this.tags.filter(tag => tag !== removedTag)
      this.tags = tags
    },
    showInput() {
      this.inputVisible = true
      this.$nextTick(function() {
        this.$refs.input.focus()
      })
    },
    handleInputChange(e) {
      this.inputValue = e.target.value
    },
    handleInputConfirm() {
      const inputValue = this.inputValue
      this.SelectTags.push(inputValue)
      let tags = this.tags
      if (inputValue && tags.indexOf(inputValue) === -1) {
        tags = [...tags, inputValue]
      }
      Object.assign(this, {
        tags,
        inputVisible: false,
        inputValue: ''
      })
    },
    // 以下三个方法 图片上传
    handleCancel() {
      this.previewVisible = false
    },
    handlePreview(file) {
      this.previewImage = file.url || file.thumbUrl
      this.previewVisible = true
    },
    handleChange({ fileList }) {
      console.log(fileList)
      this.fileList = fileList
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
          var data = {
            id: that.id,
            Name: values.name,
            Remark: values.remark,
            Code: this.code,
            FileDataId: this.fileId,
            CategoryId: this.categoryId,
            Tags: this.SelectTags
          }
          this.$emit('ok', data)
          this.form.resetFields()
          this.code = ''
          //this.fileId = ''
          this.categoryId = ''
          this.SelectTags = []
          this.id = ''
        }
      })
    },
    handleAddProperty(code) {
      this.code = code
    }
  }
}
</script>
