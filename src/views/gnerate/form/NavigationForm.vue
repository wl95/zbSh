<template>
  <a-modal :width="740" :visible="visible" title="导航属性维护" @ok="handleSubmit" @cancel="visible = false">
    <a-form @submit="handleSubmit" :form="form">
      <a-form-item label="导航model" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <a-select @change="navigationChange" style="width: 100%" placeholder="选择Model" v-decorator="['name']">
          <a-select-option v-for="(navigation,index) in NavigationList" :key="index" :value="navigation.Name">{{ navigation.Name }}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="导航属性外键" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <a-input v-decorator="['navigationKey', {rules:[{required: true, message: '必填项'}]}]" />
      </a-form-item>
      <a-form-item label="是否可空" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <a-checkbox v-decorator="['isNullable', {initialValue: false,rules:[{required: false}]}]">是否可以为Null</a-checkbox>
      </a-form-item>
      <a-form-item label="导航属性类型" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <a-radio-group v-decorator="['navigationType', {initialValue: false,rules:[{required: false}]}]">
          <a-radio value="0">单个</a-radio>
          <a-radio value="1">List集合</a-radio>
        </a-radio-group>
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
      <a-form-item label="导航属性外键数据类型" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <a-select v-decorator="['cSharpDataType', {initialValue:'0',rules:[{required: true, message: '必填项' }]}]">
          <a-select-option value="0">Int</a-select-option>
          <a-select-option value="1">String</a-select-option>
        </a-select>
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script>
export default {
  name: 'NavigationForm',
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
      index: '',
      NavigationList: []
    }
  },
  created() {
    var json = [
      {
        Name: 'Category',
        FullName: 'WenSi.CodeTemplates.Category',
        ParentClassNames: ['Entity', 'IMustHaveTenant'],
        Properties: [
          {
            Name: 'Name',
            TypeOf: 'string',
            Attribute: []
          },
          {
            Name: 'TenantId',
            TypeOf: 'int',
            Attribute: []
          },
          {
            Name: 'CreationTime',
            TypeOf: 'System.DateTime',
            Attribute: []
          },
          {
            Name: 'CreatorUserId',
            TypeOf: 'long?',
            Attribute: []
          },
          {
            Name: 'CategoryToTags',
            TypeOf: 'System.Collections.Generic.List<WenSi.CodeTemplates.CategoryToTag>',
            Attribute: []
          },
          {
            Name: 'Templates',
            TypeOf: 'System.Collections.Generic.List<WenSi.CodeTemplates.Template>',
            Attribute: []
          }
        ]
      },
      {
        Name: 'CategoryToTag',
        FullName: 'WenSi.CodeTemplates.CategoryToTag',
        ParentClassNames: ['Entity', 'IMustHaveTenant'],
        Properties: [
          {
            Name: 'TagId',
            TypeOf: 'int',
            Attribute: []
          },
          {
            Name: 'Tag',
            TypeOf: 'WenSi.CodeTemplates.Tag',
            Attribute: []
          },
          {
            Name: 'CategoryId',
            TypeOf: 'int',
            Attribute: []
          },
          {
            Name: 'Category',
            TypeOf: 'WenSi.CodeTemplates.Category',
            Attribute: []
          },
          {
            Name: 'TenantId',
            TypeOf: 'int',
            Attribute: []
          },
          {
            Name: 'CreationTime',
            TypeOf: 'System.DateTime',
            Attribute: []
          },
          {
            Name: 'CreatorUserId',
            TypeOf: 'long?',
            Attribute: []
          }
        ]
      },
      {
        Name: 'Tag',
        FullName: 'WenSi.CodeTemplates.Tag',
        ParentClassNames: ['Entity', 'IMustHaveTenant'],
        Properties: [
          {
            Name: 'Name',
            TypeOf: 'string',
            Attribute: []
          },
          {
            Name: 'TenantId',
            TypeOf: 'int',
            Attribute: []
          },
          {
            Name: 'CreationTime',
            TypeOf: 'System.DateTime',
            Attribute: []
          },
          {
            Name: 'CreatorUserId',
            TypeOf: 'long?',
            Attribute: []
          },
          {
            Name: 'CategoryToTags',
            TypeOf: 'System.Collections.Generic.List<WenSi.CodeTemplates.CategoryToTag>',
            Attribute: []
          },
          {
            Name: 'TemplateToTags',
            TypeOf: 'System.Collections.Generic.List<WenSi.CodeTemplates.TemplateToTag>',
            Attribute: []
          }
        ]
      },
      {
        Name: 'Template',
        FullName: 'WenSi.CodeTemplates.Template',
        ParentClassNames: ['Entity', 'IMustHaveTenant'],
        Properties: [
          {
            Name: 'Name',
            TypeOf: 'string',
            Attribute: [
              {
                Name: 'Required',
                Value: ''
              }
            ]
          },
          {
            Name: 'Remark',
            TypeOf: 'string',
            Attribute: []
          },
          {
            Name: 'Code',
            TypeOf: 'string',
            Attribute: []
          },
          {
            Name: 'FileDataId',
            TypeOf: 'int',
            Attribute: []
          },
          {
            Name: 'FileData',
            TypeOf: 'WenSi.FileData.FileData',
            Attribute: []
          },
          {
            Name: 'CategoryId',
            TypeOf: 'int',
            Attribute: []
          },
          {
            Name: 'Category',
            TypeOf: 'WenSi.CodeTemplates.Category',
            Attribute: []
          },
          {
            Name: 'TenantId',
            TypeOf: 'int',
            Attribute: []
          },
          {
            Name: 'CreationTime',
            TypeOf: 'System.DateTime',
            Attribute: []
          },
          {
            Name: 'CreatorUserId',
            TypeOf: 'long?',
            Attribute: []
          },
          {
            Name: 'TemplateToTags',
            TypeOf: 'System.Collections.Generic.List<WenSi.CodeTemplates.TemplateToTag>',
            Attribute: []
          }
        ]
      },
      {
        Name: 'TemplateToTag',
        FullName: 'WenSi.CodeTemplates.TemplateToTag',
        ParentClassNames: ['Entity', 'IMustHaveTenant'],
        Properties: [
          {
            Name: 'TagId',
            TypeOf: 'int',
            Attribute: []
          },
          {
            Name: 'Tag',
            TypeOf: 'WenSi.CodeTemplates.Tag',
            Attribute: []
          },
          {
            Name: 'TemplateId',
            TypeOf: 'int',
            Attribute: []
          },
          {
            Name: 'Template',
            TypeOf: 'WenSi.CodeTemplates.Template',
            Attribute: []
          },
          {
            Name: 'TenantId',
            TypeOf: 'int',
            Attribute: []
          },
          {
            Name: 'CreationTime',
            TypeOf: 'System.DateTime',
            Attribute: []
          },
          {
            Name: 'CreatorUserId',
            TypeOf: 'long?',
            Attribute: []
          }
        ]
      },
      {
        Name: 'FileData',
        FullName: 'WenSi.FileData.FileData',
        ParentClassNames: ['Entity', 'IMustHaveTenant', 'IAudited', 'ISoftDelete'],
        Properties: [
          {
            Name: 'FileType',
            TypeOf: 'WenSi.FileData.FileType',
            Attribute: []
          },
          {
            Name: 'ThumbnailRelativePaths',
            TypeOf: 'string',
            Attribute: []
          },
          {
            Name: 'RelativePaths',
            TypeOf: 'string',
            Attribute: []
          },
          {
            Name: 'Extension',
            TypeOf: 'string',
            Attribute: []
          },
          {
            Name: 'FileName',
            TypeOf: 'string',
            Attribute: []
          },
          {
            Name: 'Md5',
            TypeOf: 'string',
            Attribute: []
          },
          {
            Name: 'FileSize',
            TypeOf: 'string',
            Attribute: []
          },
          {
            Name: 'TenantId',
            TypeOf: 'int',
            Attribute: []
          },
          {
            Name: 'CreationTime',
            TypeOf: 'System.DateTime',
            Attribute: []
          },
          {
            Name: 'CreatorUserId',
            TypeOf: 'long?',
            Attribute: []
          },
          {
            Name: 'LastModificationTime',
            TypeOf: 'System.DateTime?',
            Attribute: []
          },
          {
            Name: 'LastModifierUserId',
            TypeOf: 'long?',
            Attribute: []
          },
          {
            Name: 'IsDeleted',
            TypeOf: 'bool',
            Attribute: []
          }
        ]
      },
      {
        Name: 'EfModelInfo',
        FullName: 'WenSi.Generate.EfModelInfo',
        ParentClassNames: ['Entity', 'ICreationAudited', 'IMustHaveTenant'],
        Properties: [
          {
            Name: 'NameSpace',
            TypeOf: 'string',
            Attribute: [
              {
                Name: 'Required',
                Value: ''
              },
              {
                Name: 'MaxLength',
                Value: '100'
              }
            ]
          },
          {
            Name: 'ModelName',
            TypeOf: 'string',
            Attribute: [
              {
                Name: 'Required',
                Value: ''
              },
              {
                Name: 'MaxLength',
                Value: '50'
              }
            ]
          },
          {
            Name: 'KeyCSharpDataType',
            TypeOf: 'WenSi.Generate.CSharpDataType',
            Attribute: []
          },
          {
            Name: 'ParentClassNames',
            TypeOf: 'string',
            Attribute: [
              {
                Name: 'MaxLength',
                Value: '200'
              }
            ]
          },
          {
            Name: 'ContainsTenant',
            TypeOf: 'bool',
            Attribute: []
          },
          {
            Name: 'EfModelProperties',
            TypeOf: 'System.Collections.Generic.IEnumerable<WenSi.Generate.EfModelProperties>',
            Attribute: []
          },
          {
            Name: 'CreationTime',
            TypeOf: 'System.DateTime',
            Attribute: []
          },
          {
            Name: 'CreatorUserId',
            TypeOf: 'long?',
            Attribute: []
          },
          {
            Name: 'TenantId',
            TypeOf: 'int',
            Attribute: []
          }
        ]
      },
      {
        Name: 'EfModelProperties',
        FullName: 'WenSi.Generate.EfModelProperties',
        ParentClassNames: ['Entity'],
        Properties: [
          {
            Name: 'Name',
            TypeOf: 'string',
            Attribute: [
              {
                Name: 'Required',
                Value: ''
              },
              {
                Name: 'MaxLength',
                Value: '50'
              }
            ]
          },
          {
            Name: 'CSharpDataType',
            TypeOf: 'WenSi.Generate.CSharpDataType',
            Attribute: []
          },
          {
            Name: 'Attributes',
            TypeOf: 'string',
            Attribute: []
          },
          {
            Name: 'IsNullable',
            TypeOf: 'bool',
            Attribute: []
          },
          {
            Name: 'Comment',
            TypeOf: 'string',
            Attribute: []
          },
          {
            Name: 'EfModelInfoId',
            TypeOf: 'int',
            Attribute: []
          },
          {
            Name: 'EfModelInfo',
            TypeOf: 'WenSi.Generate.EfModelInfo',
            Attribute: []
          }
        ]
      },
      {
        Name: 'WebSiteType',
        FullName: 'WenSi.WebSiteType.WebSiteType',
        ParentClassNames: ['Entity', 'ISoftDelete', 'IAudited', 'IMustHaveTenant'],
        Properties: [
          {
            Name: 'Name',
            TypeOf: 'string',
            Attribute: []
          },
          {
            Name: 'ParentId',
            TypeOf: 'int?',
            Attribute: []
          },
          {
            Name: 'IsDeleted',
            TypeOf: 'bool',
            Attribute: []
          },
          {
            Name: 'CreationTime',
            TypeOf: 'System.DateTime',
            Attribute: []
          },
          {
            Name: 'CreatorUserId',
            TypeOf: 'long?',
            Attribute: []
          },
          {
            Name: 'LastModificationTime',
            TypeOf: 'System.DateTime?',
            Attribute: []
          },
          {
            Name: 'LastModifierUserId',
            TypeOf: 'long?',
            Attribute: []
          },
          {
            Name: 'TenantId',
            TypeOf: 'int',
            Attribute: []
          },
          {
            Name: 'WebSiteTypePurpose',
            TypeOf: 'WenSi.WebSiteType.WebSiteTypePurpose',
            Attribute: []
          }
        ]
      }
    ]
    this.NavigationList = json
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
          navigationKey: record.navigationKey,
          isNullable: record.isNullable,
          navigationType: record.navigationType,
          comment: record.comment,
          attributes: record.attributes == null ? [] : record.attributes,
          cSharpDataType: record.cSharpDataType
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
          values.navigation = true
          if (that.isAdd) {
            this.$emit('ok', values, true, 0)
          } else {
            this.$emit('ok', values, false, that.index)
            that.isAdd = true
          }
          this.form.resetFields()
        }
      })
    },
    navigationChange(value) {
      const {
        form: { setFieldsValue }
      } = this
      this.$nextTick(() => {
        setFieldsValue({
          navigationKey: value + 'Id'
        })
      })
    }
  }
}
</script>
