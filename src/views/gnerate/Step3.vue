<template>
  <a-card :bordered="false">
    <div>
      <a-form :form="form" style="margin: 0px auto 0;">
        <a-tabs v-model="currentTab" @change="handleTabChange">
          <a-tab-pane v-for="(v, key) in entitys" :tab="v.name" :key="v.key">
            <div v-if="isEdit">
              <a-button type="primary" icon="edit" @click="editCode(key)">编辑</a-button>
              <pre class="language-csharp"><code class="language-csharp">{{ v.code }}</code></pre>
            </div>
            <div v-else>
              <a-button type="primary" icon="edit" @click="saveCode()">保存</a-button>
              <br /><br />
              <textarea rows="25" cols="200" v-model="editCodeStr"></textarea>
            </div>
          </a-tab-pane>
        </a-tabs>
        <a-form-item :wrapperCol="{span: 19, offset: 5}">
          <a-button @click="prevStep">上一步</a-button>
          <a-button style="margin-left: 8px" type="primary" @click="nextStep">下一步4444444444</a-button>
        </a-form-item>
        <model-property-form ref="modelPropertyForm" @ok="handleAddProperty" />
      </a-form>
    </div>
  </a-card>
</template>

<script>
import ModelPropertyForm from './form/ModelPropertyForm'
import { STable, Ellipsis } from '@/components'
import Prism from 'prismjs'
import { ajax } from '@/utils/ajax'

export default {
  name: 'Step3',
  // props: ['id'],
  components: {
    ModelPropertyForm,
    STable,
    Ellipsis
  },
  data() {
    return {
      data: [],
      pagination: {},
      labelCol: { lg: { span: 5 }, sm: { span: 5 } },
      wrapperCol: { lg: { span: 19 }, sm: { span: 19 } },
      form: this.$form.createForm(this),
      loading: false,
      timer: 0,
      // columns: columns,
      entitys: [],
      currentTab: 'Entity',
      isEdit: true,
      entityIndex: '',
      editCodeStr: '',
      id: 0
    }
  },
  // created() {
  //   if (this.id > 0) {
  //     var that = this
  //     ajax.postSuccessCall(
  //       'api/Generate/GetEfModelCodes',
  //       {
  //         id: that.id
  //       },
  //       function(response) {
  //         console.log(response.result)
  //         that.data = response.result
  //       },
  //       that
  //     )
  //   }
  // },
  mounted: function() {
    var data = this.$parent.Step2Form
    this.entitys = data.list
    this.id = data.id
    Prism.highlightAll()
    // console.log(data.result)
  },
  methods: {
    handleTabChange(activeKey) {
      this.currentTab = activeKey
    },
    handleAddProperty(form) {
      this.data.push(form)
    },
    nextStep() {
      const that = this
      var list = that.entitys
      ajax.postSuccessCall(
        'api/Generate/SaveEntityDtoVm',
        {
          list: list,
          id: that.id
        },
        function(response) {
          console.log(response)
          that.$emit('nextStep')
        },
        that
      )
    },
    prevStep() {
      this.$emit('prevStep')
    },
    editCode(obj) {
      this.isEdit = false
      this.entityIndex = obj
      this.editCodeStr = this.entitys[obj].code
    },
    saveCode() {
      // 第一个参数是要修改的数据, 第二个值是修改当前数组的哪一个字段,第三个是要修改为什么值
      this.$set(this.entitys[this.entityIndex], `code`, this.editCodeStr)
      this.isEdit = true
    }
  },
  filters: {},
  beforeDestroy() {
    clearTimeout(this.timer)
  }
}
</script>

<style lang="less" scoped>
.stepFormText {
  margin-bottom: 24px;
  .ant-form-item-label,
  .ant-form-item-control {
    line-height: 22px;
  }
}
</style>
