<template>
  <a-card :bordered="false">
    <div>
      <a-form :form="form" style="margin: 0px auto 0;">
        <a-form-item label="命名空间" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['NameSpace', { initialValue: 'WenSi', rules: [{required: true, message: '必填项'}] }]" />
        </a-form-item>
        <a-form-item label="Model名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['ModelName', { rules: [{required: true, message: '必填项'}] }]" />
        </a-form-item>
        <a-form-item label="主键类型" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-select v-decorator="['KeyCSharpDataType', {initialValue: '0', rules: [{required: true, message: '必填项'}] }]">
            <a-select-option value="0">int</a-select-option>
            <a-select-option value="5">long</a-select-option>
            <a-select-option value="1">string</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="继承父类" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-select mode="tags" style="width: 100%" placeholder="继承父类" v-decorator="['ParentClassNames', {initialValue: 'Entity', rules: [{required: true, message: '必填项'}] }]">
            <a-select-option value="Entity">Entity</a-select-option>
            <a-select-option value="IHasCreationTime">IHasCreationTime(自动设置该属性的值为当前时间)</a-select-option>
            <a-select-option value="ISoftDelete">ISoftDelete(软删除)</a-select-option>
            <a-select-option value="IFullAudited">IFullAudited(创建（creation），修改（modification）和删除（deletion）)</a-select-option>
            <a-select-option value="ICreationAudited ">ICreationAudited(自动设置 CreatorUserId 的属性值为当前用户的 Id)</a-select-option>
            <a-select-option value="IModificationAudited">IModificationAudited(自动设置 CreatorUserId 的属性值为当前用户的 Id)</a-select-option>
            <a-select-option value="IDeletionAudited">IDeletionAudited(软删除)</a-select-option>
            <!-- <a-select-option value="IAudited">IAudited(审计接口)</a-select-option> -->
            <a-select-option value="Active">激活状态/闲置状态(Active/Passive)</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="注释" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['remark']"></a-input>
        </a-form-item>
        <a-form-item label="包含租户" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-checkbox style="color:red" v-decorator="['ContainsTenant',{initialValue: false}]">包含一个租户标识,查数据时候可以自动根据当前租户过滤数据</a-checkbox>
        </a-form-item>
        <a-form-item :wrapperCol="{span: 19, offset: 5}">
          <a-button type="primary" @click="nextStep">下一步</a-button>
        </a-form-item>
      </a-form>
      <a-divider />
      <div class="step-form-style-desc">
        <h3>说明</h3>
        <h4>实体继承相关说明,点击 <a target="_blank" href="https://www.52abp.com/Wiki/abp-cn/latest/3.1ABP%E9%A2%86%E5%9F%9F%E5%B1%82-%E5%AE%9E%E4%BD%93">这里</a></h4>
        <!-- <p>如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。</p>
      <h4>转账到银行卡</h4>
      <p>如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。</p> -->
      </div>
    </div>
  </a-card>
</template>
<script>
import { ajax } from '@/utils/ajax'
export default {
  name: 'Step1',
  props: ['id'],
  data() {
    return {
      labelCol: { lg: { span: 5 }, sm: { span: 5 } },
      wrapperCol: { lg: { span: 19 }, sm: { span: 19 } },
      form: this.$form.createForm(this)
    }
  },
  created() {
    console.log(this.id)
    if (this.id > 0) {
      var that = this
      const {
        form: { setFieldsValue }
      } = this
      this.$nextTick(() => {
        ajax.postSuccessCall(
          'api/Generate/GetEfModel',
          {
            id: that.id
          },
          function(response) {
            console.log(response.result)
            setFieldsValue({
              NameSpace: response.result.nameSpace,
              ModelName: response.result.modelName,
              KeyCSharpDataType: response.result.keyCSharpDataType,
              ParentClassNames: response.result.parentClassNames,
              remark: response.result.remark,
              ContainsTenant: response.result.containsTenant
            })
          },
          that
        )
      })
    }
  },
  methods: {
    nextStep() {
      const {
        form: { validateFields }
      } = this
      // 先校验，通过表单校验后，才进入下一步
      validateFields((err, values) => {
        if (!err) {
          if (!Array.isArray(values.ParentClassNames)) {
            var array = []
            array.push(values.ParentClassNames)
            values.ParentClassNames = array
          }
          this.$parent.Step1Form = values
          console.log(values)
          this.$emit('nextStep')
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.step-form-style-desc {
  padding: 0 56px;
  color: rgba(0, 0, 0, 0.45);

  h3 {
    margin: 0 0 12px;
    color: rgba(0, 0, 0, 0.45);
    font-size: 16px;
    line-height: 32px;
  }

  h4 {
    margin: 0 0 4px;
    color: rgba(0, 0, 0, 0.45);
    font-size: 14px;
    line-height: 22px;
  }

  p {
    margin-top: 0;
    margin-bottom: 12px;
    line-height: 22px;
  }
}
</style>
