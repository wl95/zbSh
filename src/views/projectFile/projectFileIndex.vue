<template>
  <wlExplorer
    ref="wl-explorer-cpt"
    :columns="file_table_columns"
    :all-path="all_folder_list"
    :is-folder-fn="isFolderFn"
    :folderType="rource_type"
    :data="file_table_data"
    :props="explorer_prop"
    size="small"
    @handleFolder="handleFolder"
    @search="fileSearch"
    @del="fileDel"
    @closeFade="closeOtherLayout(fade)"
    @upload="upload"
    :uploadUrl="uploadUrl"
    :uploadHeaders="uploadHeaders"
    :uploadOptions="uploadOptions"
    @uploadBefore="uploadBefore"
    @download="download"
    @uploadSuccess="uploadSuccess"
    @move="move"
  >
    <!-- 操作文件夹滑入区 -->
    <fadeIn v-show="fade.folder">
      <h3 class="edit-header">
        <p>{{ folder_form.Id?'编辑':'新增' }}文件夹</p>
      </h3>
      <el-scrollbar class="scroll">
        <el-form
          size="medium"
          ref="folder_form"
          label-position="top"
          :model="folder_form"
          :rules="folder_rules"
          class="folder_form rule-form"
          @keyup.enter.native="submitFolderFrom('folder_form')"
        >
          <el-form-item label="文件路径" prop="ParentId">
            <wlTreeSelect
              class="u-full"
              nodeKey="Id"
              placeholder="请选择文件路径"
              :props="tree_select_prop"
              :data="tree_folder_list"
              v-model="folder_form.ParentId"
            ></wlTreeSelect>
          </el-form-item>
          <el-form-item label="文件夹名称 " prop="Name">
            <el-input v-model="folder_form.Name" placeholder="请输入文件夹名称"></el-input>
          </el-form-item>
          <el-form-item label="备注说明" prop="Describe">
            <el-input
              :rows="3"
              type="textarea"
              v-model="folder_form.Describe"
              placeholder="请输入备注说明"
            ></el-input>
          </el-form-item>
        </el-form>
      </el-scrollbar>
      <div class="submit-btn-box">
        <submit-btn @btn="submitFolderFrom('folder_form')" :status="load.folder"></submit-btn>
        <el-button size="medium" @click="fade.folder = false">取消</el-button>
      </div>
    </fadeIn>
  </wlExplorer>
</template>

<script>
import WlExplorer from '@/pages/WlExplorer' // 导入文件管理器
import fadeIn from '@/components/fade-in' // 导入文件管理器
import submitBtn from '@/components/submit-btn' // 导入防抖提交组件
import { closeOtherLayout, arrayToTree } from '@/util' // 导入关闭其他弹出类视图函数
import wlapi from '../../api/index2'
import Vue from 'vue'
import { ACCESS_TOKEN } from '@/store/mutation-types'
const apiok = 200
export default {
  components: {
    fadeIn,
    submitBtn,
    WlExplorer
  },
  data() {
    const _GB = 1024 * 1024
    // const vm = this;
    return {
      uploadUrl: process.env.VUE_APP_API_BASE_URL + 'api/ProjectFile/upload',
      uploadHeaders: { Authorization: 'Bearer ' + Vue.ls.get(ACCESS_TOKEN) },
      uploadOptions: { folderId: 0 },
      load: {
        folder: false
      }, // loading管理
      fade: {
        folder: false
      }, // 弹出类视图管理
      file_table_columns: [
        {
          label: '名称',
          prop: 'Name',
          minWidth: 120
        },
        {
          label: '修改日期',
          align: 'center',
          width: 120,
          formatter(row) {
            return row.EditTime.split('T')[0] || '-'
          }
        },
        {
          label: '类型',
          align: 'center',
          width: 90,
          formatter(row) {
            return row.Type === 0 ? '文件夹' : row.SuffixName
          }
        },
        {
          label: '大小',
          minWidth: 90,
          align: 'center',
          formatter(row) {
            if (row.Size === null) return '-'
            if (row.Size < 1024) {
              // 1024以下显示kb
              return row.Size + 'B'
            }
            if (row.Size < _GB) {
              // 1024*1024
              var _mb = (row.Size / 1024).toFixed(2)
              return parseFloat(_mb) + 'KB'
            }
            var _gb = (row.Size / _GB).toFixed(2)
            return parseFloat(_gb) + 'MB'
          }
        },
        {
          label: '创建日期',
          align: 'center',
          width: 120,
          formatter(row) {
            return row.CreateTime.split('T')[0] || '-'
          }
        },
        {
          label: '作者',
          minWidth: 100,
          align: 'center',
          formatter(row) {
            return row.CreateUserName || '-'
          }
        },
        {
          label: '描述',
          minWidth: 100,
          formatter(row) {
            return row.Describe || '-'
          }
        }
      ], // 自定义表格列
      file_table_data: [], // 表格数据
      all_folder_list: [], // 所有文件夹列表
      tree_folder_list: [], // 树形文件夹列表
      type: {
        folder: 1,
        img: 2,
        video: 3,
        other: 4
      }, // 文件类型
      rource_type: {
        self: 1 // 自建
      }, // 数据来源类型
      explorer_prop: {
        name: 'Name',
        match: 'Name',
        splic: true,
        suffix: 'SuffixName',
        pathId: 'Id',
        pathPid: 'ParentId',
        pathName: 'Name',
        pathChildren: 'Children', // String 路径数据 children字段
        pathConnector: '\\', // String 路径父子数据拼接连接符,默认为'\'
        pathParents: 'Parents', // String 路径数据所有直系祖先节点自增长identityId逗号拼接
        pathIdentityId: 'IdentityId' // String 路径数据自增长id
      }, // 文件管理器配置项
      path: {}, // 路径数据
      folder_form: {
        ParentId: '',
        Name: '',
        preview: [],
        handle: [],
        Describe: ''
      }, // 文件夹表单
      folder_rules: {
        Name: [{ required: true, message: '请填写文件夹名称', trigger: 'blur' }]
      }, // 文件夹表单验证
      child_act_saved: {}, // 存储子组件数据，用于编辑更新
      tree_select_prop: {
        label: 'Name',
        children: 'Children'
      } // 树形下拉框配置项
    }
  },
  methods: {
    /**
     * 根据关键词搜索文件
     * file: Object 文件属性
     * update: Boolean 数据是否需要更新（不需要表示已存在）
     */
    fileSearch(file, key) {
      this.path = file
      if (!file) {
        file = {}
      }
      if (key === true) {
        file.Id = file.id
      } else {
        file.Key = key
      }
      wlapi.search(file).then(data => {
        if (data.success === true) {
          data.result = this.toUpperCase(data.result)
          this.file_table_data = data.result || []
        }
      })
      // }
    },
    // 获取文件夹列表
    getFileList() {
      var that = this
      wlapi.getFileListApi(null).then(data => {
        if (data.success === true) {
          data.result = that.toUpperCase(data.result)
          this.file_table_data = data.result || []
        }
      })
    },
    /**
     * 编辑文件夹
     * act:Object 当前选中文件夹
     * type:String 操作类型 add添加edit编辑
     * file:Object 当前路径信息
     */
    handleFolder(act, type, file) {
      this.path = file
      this.fade.folder = true
      if (type === 'add') {
        this.$refs['folder_form'].resetFields()
        this.folder_form.Id = ''
        this.folder_form.ParentId = file.id
        return
      }
      // var data = {
      //   ParentId: act.parentId,
      //   Name: act.name,
      //   preview: act.preview,
      //   handle: act.handle,
      //   Describe: act.describe,
      //   Id: act.id
      // }
      this.child_act_saved = act
      this.folder_form = { ...act }
    },
    // 提交文件夹表单
    submitFolderFrom(formName) {
      var that = this
      this.$refs[formName].validate(valid => {
        if (valid) {
          that.load.folder = true
          var parentId = null
          if (that.folder_form.ParentId) {
            parentId = that.folder_form.ParentId[0].Id
          }
          wlapi
            .addFolderApi(that.folder_form.Id, parentId, that.folder_form.Name, that.folder_form.Describe)
            .then(res => {
              that.load.folder = false
              if (res.success !== true) {
                return
              }
              if (!that.folder_form.Id) {
                // 新增
                
                if (that.folder_form.ParentId === that.path.id) {
                  // 新增到当前路径
                  var addobject = that.toUpperCase(res.result.getFileListVm)
                  this.file_table_data.unshift(addobject)
                } else {
                  // 新增其他路径
                  var new_data = {
                    id: res.result.getFileListVm.Id,
                    pid: res.result.getFileListVm.parentId,
                    path: res.result.getFileListVm.Name
                  }
                  that.$refs['wl-explorer-cpt'].updateHistoryData({ Id: that.folder_form.ParentId }, [new_data])
                }
              } else {
                // 编辑
                that.child_act_saved.Name = that.folder_form.Name
                that.child_act_saved.Describe = that.folder_form.Describe
              }
              that.fade.folder = false
              that.$message({
                showClose: true,
                message: '操作成功',
                type: 'success'
              })
            })
        } else {
          return false
        }
      })
    },
    // 删除文件
    fileDel(data) {
      var cannot_del_data = [] // 收集不可删除数据
      var normal_data_file = [] // 收集可删除文件
      var normal_data_folder = [] // 收集可删除文件夹
      data.forEach(i => {
        i.RourceType !== this.rource_type.self
          ? cannot_del_data.push(i) // 不可删除数据
          : i.Type === this.type.folder
          ? normal_data_folder.push(i.Id) // 可删除文件夹
          : normal_data_file.push(i.Id) // 可删除文件
      })
      // 不可删除数据进行提示
      if (cannot_del_data.length > 0) {
        let _msg = '<p class="title">以下文件或文件夹不可删除，已自动过滤</p>'
        cannot_del_data.forEach(i => {
          _msg += `<p class="msg">${i.Name}</p>`
        })
        this.$message({
          dangerouslyUseHTMLString: true,
          showClose: true,
          message: _msg,
          type: 'warning',
          customClass: 'mulit-msg'
        })
      }
      if (normal_data_folder.length === 0 && normal_data_file.length === 0) return
      // 可删除数据正常删除
      var _data = {
        FolderIds: normal_data_folder,
        FolderFileIds: normal_data_file
      }
      wlapi.delFileApi(_data).then(res => {
        if (res.success === true) {
          this.file_table_data = this.file_table_data.filter(
            i => ![...normal_data_file, ...normal_data_folder].includes(i.Id)
          )
          this.$message({
            showClose: true,
            message: '删除成功',
            type: 'success'
          })
        }
      })
    },
    // 获取所有文件夹
    getAllFolders() {
      wlapi.getAllFoldersApi().then(data => {
        if (data.success === true) {
          data.result = this.toUpperCase(data.result)
          this.all_folder_list = data.result || []
          var _list = [...this.all_folder_list]
          var options = {
            id: this.explorer_prop.pathId,
            pid: this.explorer_prop.pathPid,
            children: 'Children'
          }
          this.tree_folder_list = arrayToTree(_list, options)
          console.log(this.tree_folder_list)
        }
      })
    },
    // 判断是否文件夹函数
    isFolderFn(row) {
      return row.Type === 1
    },
    upload(select, cb) {
      cb()
    },
    uploadBefore() {
      var upload_selected = this.$refs['wl-explorer-cpt'].upload_selected
      if (upload_selected) {
        this.uploadOptions.folderId = upload_selected[0].Id
      }
    },
    download(data, cb) {
      var normal_data_folder = []
      var normal_data_file = []
      data.forEach(function(item) {
        if (item.Type === 1) {
          normal_data_folder.push(item.Id)
        } else {
          normal_data_file.push(item.Id)
        }
      })
      var _data = {
        FolderIds: normal_data_folder,
        FolderFileIds: normal_data_file
      }
      window.open(process.env.VUE_APP_API_BASE_URL + 'api/ProjectFile/download?data=' + JSON.stringify(_data), '_blank')
    },
    uploadSuccess(res) {
      if (res.result.data) {
        if (res.result.getFileListVm.parentId == this.path.id) {
          // 新增到当前路径
          var addobject = this.toUpperCase(res.result.getFileListVm)
          this.file_table_data.unshift(addobject)
        } else {
          // 新增其他路径
          var new_data = {
            id: res.result.getFileListVm.Id,
            pid: res.result.getFileListVm.ParentId,
            path: res.result.getFileListVm.Name
          }
          this.$refs['wl-explorer-cpt'].updateHistoryData({ Id: res.result.getFileListVm.parentId }, [new_data])
        }
        this.$message({
          showClose: true,
          message: '操作成功',
          type: 'success'
        })
      }
    },
    toUpperCase(jsonObj) {
      if (jsonObj instanceof Array) {
        jsonObj.forEach(item => {
          if (typeof item == 'object') {
            for (var key in item) {
              item[key.substring(0, 1).toUpperCase() + key.substring(1)] = item[key]
              delete item[key]
            }
          }
        })
        return jsonObj
      } else {
        if (typeof jsonObj == 'object') {
          for (var key in jsonObj) {
            jsonObj[key.substring(0, 1).toUpperCase() + key.substring(1)] = jsonObj[key]
            delete jsonObj[key]
          }
          return jsonObj
        }
      }
      return jsonObj
    },
    move(to, data, load) {
      var that = this
      var normal_data_folder = []
      var normal_data_file = []
      data.forEach(function(item) {
        if (item.Type === 1) {
          normal_data_folder.push(item.Id)
        } else {
          normal_data_file.push(item.Id)
        }
      })
      var _data = {
        folderId: to.Id,
        FolderIds: normal_data_folder,
        FolderFileIds: normal_data_file
      }
      wlapi.fileMoveApi(_data).then(res => {
        if (res.success === true) {
          that.$message({
            showClose: true,
            message: '操作成功',
            type: 'success'
          })
          this.getFileList()
        }
      })
    }
  },
  created() {
    this.closeOtherLayout = closeOtherLayout
    this.getAllFolders()
    this.getFileList()
  }
}
</script>