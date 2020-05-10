<template>
  <a-modal :width="1000" :visible="visible" title="模板维护" @ok="handleSubmit" @cancel="visible = false">
    <a-form @submit="handleSubmit" :form="form">
      <div v-if="isEdit">
        <a-textarea rows="20" v-model="code" />
      </div>
      <div style="height:430px; overflow:auto" v-else>
        <pre>
              <code>
                  {{code}}
              </code>
          </pre>
      </div>
    </a-form>
  </a-modal>
</template>
<script>
export default {
  name: 'EditOrReadCode',
  components: {},
  data() {
    return {
      form: this.$form.createForm(this),
      visible: false,
      isEdit: true,
      code: ''
    }
  },
  methods: {
    read(code) {
      this.form.resetFields()
      this.visible = true
      this.isEdit = false
      this.code = code
    },
    edit(code) {
      this.form.resetFields()
      this.visible = true
      this.isEdit = true
      this.code = code
    },
    handleSubmit() {
      this.visible = false
      this.$emit('ok', this.code)
      this.form.resetFields()
    }
  }
}
</script>
