<template>
  <a-modal :width="740" :visible="visible" title="查看图片" @ok="handleSubmit" @cancel="visible = false">
    <img :src="imgUrl" />
  </a-modal>
</template>
<script>
export default {
  name: 'readImg',
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
      imgUrl: ''
    }
  },
  methods: {
    read(imgUrl) {
      this.visible = true
      this.imgUrl = imgUrl
    },
    handleSubmit() {
        this.visible = false
    }
  }
}
</script>
