<template>
  <div>
    <a-form style="max-width: 500px; margin: 40px auto 0;">
      <a-form-item label="选择模板" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <a-select v-model="templateId" @change="templateChange">
          <a-select-option v-for="template in templates" :key="template.id" :value="template.id">{{ template.name }}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="选择ViewModel" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <a-select v-model="dtoId" change="">
          <a-select-option v-for="dto in dtoList" :key="dto.id" :value="dto.id">{{ dto.name }}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="$refs.readImg.read(imgUrl)">查看图片</a-button>
        <br />
        <textarea rows="4" cols="100" v-model="code"></textarea>
        <br />
        <a-button type="primary" @click="addFinalModel()">添加</a-button>
      </a-form-item>
      <a-form-item>
        <a-table :columns="columns" :rowKey="record => record.id" :dataSource="data" :pagination="false" :loading="loading">
          <span slot="templateId" slot-scope="text">
            {{ text|templateIdFilter }}
          </span>
          <span slot="efModelCodeId" slot-scope="text">
            {{ text|efModelCodeIdFilter }}
          </span>
          <span slot="code" slot-scope="text">
            {{ text|codeFilter }}
          </span>
        </a-table>
      </a-form-item>
      <a-form-item :wrapperCol="{span: 19, offset: 5}">
        <a-button @click="prevStep" type="primary">上一步</a-button>
        <a-button style="margin-left: 8px" @click="toOrderList">完成</a-button>
      </a-form-item>
      <read-img ref="readImg" />
    </a-form>
  </div>
</template>

<script>
import { Result } from '@/components'
import { ajax } from '@/utils/ajax'
import readImg from './form/readImg'
const columns = [
  {
    title: '模板',
    dataIndex: 'templateId',
    scopedSlots: { customRender: 'templateId' }
  },
  {
    title: 'ViewModel',
    dataIndex: 'efModelCodeId',
    scopedSlots: { customRender: 'efModelCodeId' }
  },
  {
    title: '代码',
    dataIndex: 'code',
    scopedSlots: { customRender: 'code' }
  }
]
let that
export default {
  name: 'Step5',
  components: {
    Result,
    readImg
  },
  data() {
    return {
      labelCol: { lg: { span: 5 }, sm: { span: 5 } },
      wrapperCol: { lg: { span: 19 }, sm: { span: 19 } },
      loading: false,
      id: 0,
      templates: [],
      dtoList: [],
      code: '',
      imgUrl: '',
      columns: columns,
      data: [],
      dtoId: '',
      templateId: ''
    }
  },
  created() {
    var data = this.$parent.Step2Form
    this.id = data.id
    const that = this
    ajax.postSuccessCall(
      'api/CodeTemplateSetting/TemplateList',
      {
        id: that.id
      },
      function(response) {
        that.templates = response.result.templateList
        that.dtoList = response.result.dtoList
        that.dtoId = response.result.dtoList[0].id
        that.templateId = response.result.templateList[0].id
        that.templateChange()
      },
      that
    )
  },
  methods: {
    templateChange() {
      var template = this.templates.filter(d => d.id === this.templateId)
      this.code = template[0].code
      this.imgUrl = template[0].imgUrl
    },
    addFinalModel() {
      var templateId = this.templateId
      var dtoId = this.dtoId
      var code = this.code
      var final = this.data.filter(d => d.templateId === templateId && d.efModelCodeId === dtoId)
      if (final.length > 0) {
        alert('请勿重复添加')
      } else {
        this.data.push({
          templateId: templateId,
          efModelCodeId: dtoId,
          code: code
        })
      }
    },
    prevStep() {
      this.$emit('prevStep')
    },
    toOrderList() {
      const that = this
      ajax.postSuccessCall(
        'api/Generate/SaveEfModelFinal',
        {
          id: that.id,
          EfModelFinalDtos: that.data
        },
        function(response) {
          if (response.result) {
            that.$router.push('/codeTemplate/GetEfModelList')
          }
        },
        that
      )
    }
  },
  beforeCreate: function() {
    that = this
  },
  filters: {
    templateIdFilter(type) {
      var template = that.templates.filter(d => d.id === type)
      return template[0].name
    },
    efModelCodeIdFilter(type) {
      var dto = that.dtoList.filter(d => d.id === type)
      return dto[0].name
    },
    codeFilter(type) {
      return type.substring(0, 9) + '...'
    }
  }
}
</script>
<style lang="less" scoped>
.information {
  line-height: 22px;

  .ant-row:not(:last-child) {
    margin-bottom: 24px;
  }
}
.money {
  font-family: 'Helvetica Neue', sans-serif;
  font-weight: 500;
  font-size: 20px;
  line-height: 14px;
}
</style>
