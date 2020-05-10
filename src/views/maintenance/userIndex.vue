<template>
  <page-view title="用户列表">
    <a-card :bordered="false">
      <div>
        <div class="table-operator">
          <a-input-search placeholder="用户名/姓名" style="margin-left: 16px; width: 272px;" @search="onSearch" />
          <a-button style="margin-left: 16px ; position:relative;top:-1px;" type="primary" icon="plus" @click="add()">新建</a-button>
        </div>
        <a-table :columns="columns" :rowKey="record => record.id" :dataSource="data" :pagination="pagination" :loading="loading" @change="fanye">
          <span slot="id" slot-scope="text,record">
            <template>
              <el-button type="primary" size="mini" @click="edit(text)" round>编辑</el-button>
              <a-divider type="vertical" />
              <el-button type="primary" size="mini" @click="deleteRow(text)" round>删除</el-button>
              <a-divider type="vertical" />
              <el-button type="primary" size="mini" @click="stateType(record)" round>{{ stateStr(record) }}</el-button>
            </template>
          </span>
        </a-table>
      </div>
    </a-card>
  </page-view>
</template>

<script>
import { PageView } from '@/layouts'
import { STable, Ellipsis } from '@/components'
import { ajax } from '@/utils/ajax'
const columns = [
  {
    title: '用户名',
    align: 'center',
    dataIndex: 'userName'
  },
  {
    title: '姓名',
    align: 'center',
    dataIndex: 'name'
  },
  {
    title: '性别',
    align: 'center',
    dataIndex: 'gender'
  },
  {
    title: '部门',
    align: 'center',
    dataIndex: 'organizationUnitName'
  },
  {
    title: '角色',
    align: 'center',
    dataIndex: 'roleName'
  },
  {
    title: '状态',
    align: 'center',
    dataIndex: 'isActive'
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
      pageIndex: 1,
      columns: columns,
      findKeyWords: ''
    }
  },
  created() {
    this.getList(1)
  },
  computed: {
    stateStr() {
      return function(record) {
        if (record.isActive === '启用') {
          return '禁用'
        }
        return '启用'
      }
    }
  },
  methods: {
    onSearch(value) {
      this.findKeyWords = value
      this.getList(1)
    },
    add() {
      this.$router.push({ path: '/maintenance/userModel', query: { id: 0 } })
    },
    edit(id) {
      this.$router.push({ path: '/maintenance/userModel', query: { id: id } })
    },
    stateType(record) {
      var state = true
      if (record.isActive === '启用') {
        state = false
      }
      var that = this
      that
        .$confirm('是否继续修改?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(() => {
          ajax.postSuccessCall(
            'api/User/UserState',
            { id: record.id, State: state },
            function(response) {
              if (response.result) {
                that.$message.success('修改成功')
                that.getList(that.pageIndex)
              } else {
                that.$message.error('请求失败请重试')
              }
            },
            that
          )
        })
        .catch(() => {})
      // that.$confirm({
      //   title: '是否禁用',
      //   content: '你还要继续吗',
      //   onOk() {
      //     ajax.postSuccessCall(
      //       'api/User/UserState',
      //       { id: record.id, State: state },
      //       function(response) {
      //         if (response.result) {
      //           that.$message.success('修改成功')
      //           that.getList(that.pageIndex)
      //         } else {
      //           that.$message.error('请求失败请重试')
      //         }
      //       },
      //       that
      //     )
      //   },
      //   onCancel() {}
      // })
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
          ajax.get('api/User/Delete', { id: id }).then(res => {
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
      //     ajax.get('api/User/Delete', { id: id }).then(res => {
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
      this.pageIndex = index.current
      this.getList(index.current)
    },
    getList(index) {
      var that = this
      ajax.postSuccessCall(
        'api/User/GetListPage',
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
