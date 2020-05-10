<template>
  <page-view title="模型列表">
    <a-card :bordered="false">
      <div>
        <div class="table-operator">
          <a-input-search placeholder="请输入模型名称" style="margin-left: 16px; width: 272px;" @search="onSearch" />
          <!-- <a-button style="margin-left: 16px ; position:relative;top:-1px;" type="primary" icon="plus" @click="add()">新建</a-button> -->
        </div>
        <a-table :columns="columns" :rowKey="record => record.id" :dataSource="data" :pagination="pagination" :loading="loading" @change="fanye">
          <span slot="id" slot-scope="text,record">
            <template>
              <el-button type="primary" size="mini" @click="modelRead(record.modelKey)" round>预览</el-button>
              <a-divider type="vertical" />
              <el-button type="primary" size="mini" @click="$refs.editprojectmodel.edit(record)" round>编辑</el-button>
              <a-divider type="vertical" />
              <el-button type="primary" size="mini" @click="deleteRow(text)" round>删除</el-button>
              <a-divider type="vertical" />
              <el-button type="primary" size="mini" @click="modelRecord(text)" round>设备维护记录</el-button>
            </template>
          </span>
        </a-table>
      </div>
      <editprojectmodel ref="editprojectmodel" @ok="handleAddProperty" />
    </a-card>
  </page-view>
</template>

<script>
import { PageView } from '@/layouts'
import { STable, Ellipsis } from '@/components'
import { ajax } from '@/utils/ajax'
import editprojectmodel from './editprojectmodel'
const columns = [
  {
    title: '模型名称',
    align: 'center',
    dataIndex: 'name'
  },
  {
    title: '所属项目',
    align: 'center',
    dataIndex: 'projectName'
  },
  {
    title: '操作',
    dataIndex: 'id',
    align: 'center',
    scopedSlots: { customRender: 'id' }
  }
]
export default {
  name: '',
  components: {
    PageView,
    STable,
    Ellipsis,
    editprojectmodel
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
      columns: columns,
      findKeyWords: ''
    }
  },
  created() {
    this.getList(1)
  },
  methods: {
    onSearch(value) {
      this.findKeyWords = value
      this.getList(1)
    },
    // 预览
    modelRead(id) {
      this.$router.push({ path: '/projectModel/modelRead', query: { fileId: id } })
    },
    // 维护记录
    modelRecord(id) {
      this.$router.push({ path: '/projectModel/modelRecord', query: { id: id } })
    },
    deleteRow(id) {
      var that = this
      that
        .$confirm('删除后无法修改, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(() => {
          ajax.get('api/ProjectModel/Delete', { id: id }).then(res => {
            if (res.result) {
              that.$message.success('删除成功')
              that.getList(1)
            } else {
              that.$message.error('请求失败请重试')
            }
          })
        })
        .catch(() => {})
      // that.$confirm({
      //   title: '删除后无法修改',
      //   content: '你还要继续吗',
      //   onOk() {
      //     ajax.get('api/ProjectModel/Delete', { id: id }).then(res => {
      //       if (res.result) {
      //         that.$message.success('删除成功')
      //         that.getList(1)
      //       } else {
      //         that.$message.error('请求失败请重试')
      //       }
      //     })
      //   },
      //   onCancel() {}
      // })
    },
    fanye(index) {
      this.getList(index.current)
    },
    getList(index) {
      var that = this
      ajax.postSuccessCall(
        'api/ProjectModel/GetListPage',
        {
          PageIndex: index,
          PageSize: 20,
          FindKeyWords: that.findKeyWords
        },
        function(response) {
          that.data = response.result.list
          that.pagination = {
            current: index,
            pageSize: 20,
            total: response.result.totalCount
          }
        },
        that
      )
    },
    handleAddProperty(form) {
      var that = this
      ajax.postSuccessCall(
        'api/ProjectModel/Update',
        {
          Id: form.id,
          name: form.name
        },
        function(response) {
          if (response.result) {
            that.$message.success('提交成功')
            that.getList(1)
          } else {
            that.$message.error('提交失败')
          }
        },
        null,
        that
      )
    }
  },
  filters: {
    nullableFilter(type) {
      return type === true ? '是' : '否'
    }
  },
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
