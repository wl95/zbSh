
<template>
  <div>
    <div>
      <a-button style="margin-left:16px;margin-bottom:20px;" type="primary" @click="fanhui()">返回</a-button>
    </div>
    <div></div>
    <div style="position:relative;height:670px;overflow:hidden;">
      <iframe id="iframeId" name="iframeId" style="position:relative;top:-50px;width:100%;height:760px; overflow:hidden;" frameborder="no" border="0" marginwidth="0" marginheight="0" scrolling="no" allowtransparency="yes" :src="url">
      </iframe>
    </div>
  </div>
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
      url: '',
      fileId: 0
    }
  },
  mounted() {
    this.fileId = this.$route.query.fileId
    this.yulan()
    // this.url = 'https://bimface.com/api/console/preview?fileId=' + fileId + '&appKey=3GnR05F2VwbgrdADxUrlMk1dKlqrA5Ux'
  },
  activated() {
    this.fileId = this.$route.query.fileId
    this.yulan()
    // this.url = 'https://bimface.com/api/console/preview?fileId=' + fileId + '&appKey=3GnR05F2VwbgrdADxUrlMk1dKlqrA5Ux'
  },
  methods: {
    fanhui() {
      this.$router.push({ path: '/projectModel/projectModelIndex' })
    },
    yulan() {
      var that = this
      ajax.get('/api/ProjectModel/YuLan', { fileId: that.fileId }).then(res => {
        var data = JSON.parse(res.result)
        that.url = data.data.url
      })
    }
  }
}
</script>