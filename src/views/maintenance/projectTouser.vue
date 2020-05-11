<template>
  <page-view title="分配人员">
    <div style="margin:0 auto;width:650px;">
      <a-transfer :dataSource="mockData" showSearch :listStyle="{
      width: '300px',
      height: '400px',
    }" :filterOption="filterOption" :targetKeys="targetKeys" @change="handleChange" @search="handleSearch" :render="item => item.title">
      </a-transfer>
      <div style="margin-top:50px;text-align: center;">
        <a-button type="primary" @click="handleSubmit()">提交</a-button>
        <a-button style="margin-left: 8px" @click="cancel()">取消</a-button>
      </div>
    </div>
  </page-view>
</template>
<script>
import { PageView } from '@/layouts'
import { ajax } from '@/utils/ajax'
export default {
  components: {
    PageView
  },
  data() {
    return {
      mockData: [],
      targetKeys: [],
      id: 0
    }
  },
  mounted() {
    this.getMock()
  },
  methods: {
    getMock() {
      this.id = this.$route.query.id
      var that = this
      ajax.get('/api/Project/GetUserList', { id: that.id }).then(res => {
        //console.log(res)
        that.mockData = res.result.list
        that.targetKeys = res.result.user
      })
    },
    filterOption(inputValue, option) {
      return option.title.indexOf(inputValue) > -1
    },
    handleChange(targetKeys, direction, moveKeys) {
      //console.log(targetKeys, direction, moveKeys)
      this.targetKeys = targetKeys
    },
    handleSearch(dir, value) {
      //console.log('search:', dir, value)
    },
    cancel() {
      this.$router.push({ path: '/maintenance/projectIndex' })
    },
    handleSubmit() {
      var that = this
      if (that.targetKeys.length === 0) {
        that.$message.error('请分配人员')
        return false
      }
      ajax.postSuccessCall(
        'api/Project/CreateUser',
        {
          ProjectId: that.id,
          UserIdList: that.targetKeys
        },
        function(response) {
          if (response.result) {
            that.$message.success('提交成功')
            that.$router.push({ path: '/maintenance/projectIndex' })
          } else {
            that.$message.error('提交失败')
          }
        },
        null,
        that
      )
    }
  }
}
</script>
