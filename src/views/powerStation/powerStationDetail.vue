<template>
  <div>
    <a @click="faultStation()">故障信息</a><br />
    <a @click="projectModel()">模型信息</a><br />
    <a @click="projectFile()">项目文档管理</a><br />
    <img src="@/assets/电站详情.jpg" />
  </div>
</template>

<script>
import { ajax } from '@/utils/ajax'
export default {
  data() {
    return {
      id: 12 // 项目id
    }
  },
  mounted() {
    var id = this.$route.query.id
    this.get(id)
  },
  activated() {
    var id = this.$route.query.id
    this.get(id)
  },
  methods: {
    faultStation() {
      this.$router.push({ path: '/faultStation/faultStationDetail', query: { id: this.id } })
    },
    projectModel() {
      this.$router.push({
        path: '/projectModel/modelDetail',
        query: { id: this.id }
      })
    },
    projectFile() {
      // this.$router.push({ path: '/projectFile/projectFileIndex', query: { id: this.id } })
    },
    get(id) {
      var that = this
      ajax.get('/api/PowerStation/PowerStationDetail', { id: id }).then(res => {
        var data = res.result
        that.id = data.id
      })
    }
  }
}
</script>