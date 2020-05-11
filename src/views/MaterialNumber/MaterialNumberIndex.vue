<template>
  <page-view title="物料编号列表">
    <a-card :bordered="false">
      <div>
        <div class="table-operator">
          <a-input-search placeholder="请输入编号" style="margin-left: 16px; width: 272px;" @search="onSearch" />
          <a-button style="margin-left: 16px ; position:relative;top:-1px;" type="primary" icon="plus" @click="add()">新建</a-button>
        </div>
        <a-table :columns="columns" :rowKey="record => record.id" :dataSource="data" :pagination="pagination" :loading="loading" @change="fanye">
          <span slot="id" slot-scope="text">
            <template>
              <el-button type="primary" size="mini" @click="edit(text)" round>编辑</el-button>
              <a-divider type="vertical" />
              <el-button type="primary" size="mini" @click="deleteRow(text)" round>删除</el-button>
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
    title: '编号',
    align: 'center',
    dataIndex: 'number'
  },
  {
    title: '物料描述',
    align: 'center',
    dataIndex: 'description'
  },
  {
    title: '流水号',
    align: 'center',
    dataIndex: 'serialNumber'
  },
  {
    title: '创建时间',
    align: 'center',
    dataIndex: 'createTime'
  },
  {
    title: '操作',
    dataIndex: 'id',
    align: 'center',
    width: '200px',
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
      columns: columns,
      findKeyWords: ''
    }
  },
  mounted() {
    this.getList(1)
  },
  activated() {
    this.getList(1)
  },
  methods: {
    onSearch(value) {
      this.findKeyWords = value
      this.getList(1)
    },
    add() {
      this.$router.push({ path: '/MaterialNumber/MaterialNumberModel', query: { id: 0 } })
    },
    edit(id) {
      this.$router.push({ path: '/MaterialNumber/MaterialNumberModel', query: { id: id } })
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
          ajax.get('api/MaterialNumber/Delete', { id: id }).then(res => {
            if (res.result) {
              that.$message.success('删除成功')
              that.getList(1)
            } else {
              that.$message.error('请求失败请重试')
            }
          })
        })
        .catch(() => {})
      //   that.$confirm({
      //     title: '删除后无法修改',
      //     content: '你还要继续吗',
      //     onOk() {
      //       ajax.get('api/MaterialNumber/Delete', { id: id }).then(res => {
      //         if (res.result) {
      //           that.$message.success('删除成功')
      //           that.getList(1)
      //         } else {
      //           that.$message.error('请求失败请重试')
      //         }
      //       })
      //     },
      //     onCancel() {}
      //   })
    },
    fanye(index) {
      this.getList(index.current)
    },
    getList(index) {
      var that = this
      ajax.postSuccessCall(
        'api/MaterialNumber/GetListPage',
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
