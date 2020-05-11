<template>
  <page-view title="模型详情">
    <a-card :bordered="false">
      <div>
        <!-- <a @click="add()">先放着</a> -->
        <div class='model' style="height:600px;" id="domId"></div>
      </div>
      <modelcomponent ref="modelcomponent" @ok="handleAddProperty" />
    </a-card>
  </page-view>
</template>

<script>
import { PageView } from '@/layouts'
// import BimFace from './BimfaceSDKLoader@latest-release.js'
import { ajax } from '@/utils/ajax'
import modelcomponent from './modelcomponent'
export default {
  name: '',
  components: {
    PageView,
    modelcomponent
  },
  data() {
    return {
      viewToken: '',
      id: 0,
      fileId: 0,
      name: '',
      componentName: '', // 构件名称
      componentId: 0, // 构件id
      viewer: null,
      modelList: []
    }
  },
  created() {
    this.id = this.$route.query.id // 项目id
    // this.fileId = this.$route.query.fileId // /模型fileid
    // this.name = this.$route.query.name // 模型名称
    this.get()
  },
  methods: {
    get(id) {
      var that = this
      ajax.get('/api/ProjectModel/GetList', { projectId: that.id }).then(res => {
        that.modelList = res.result
        that.name = res.result[0].name
        that.id = res.result[0].id
        that.getVIewToken(that.modelList[0].modelKey)
      })
    },
    getVIewToken(fileId) {
      var that = this
      ajax.get('/api/ProjectModel/GetViewToken', { fileId: fileId }).then(res => {
        var data = JSON.parse(res.result)
        that.viewToken = data.data
        that.getmodel(data.data)
      })
    },
    getmodel(token) {
      // 设置BIMFACE JSSDK加载器的配置信息
      var loaderConfig = new BimfaceSDKLoaderConfig()
      loaderConfig.viewToken = token
      // 加载BIMFACE JSSDK加载器
      BimfaceSDKLoader.load(loaderConfig, this.successCallback, this.failureCallback)
    },
    successCallback(viewMetaData) {
      var that = this
      // 创建WebApplication，直接显示模型或图纸
      var dom4Show = document.getElementById('domId')
      var webAppConfig = new Glodon.Bimface.Application.WebApplication3DConfig()
      webAppConfig.domElement = dom4Show
      // 创建WebApplication
      var app = new Glodon.Bimface.Application.WebApplication3D(webAppConfig)
      // 添加待显示的模型
      app.addView(that.viewToken)
      var viewer = app.getViewer()
      that.viewer = viewer
      viewer.addEventListener(Glodon.Bimface.Viewer.Viewer3DEvent.ComponentsSelectionChanged, function(componentData) {
        if (componentData && componentData.objectId) {
          // console.log(componentData)
          console.log(componentData.objectId)
          that.componentId = componentData.objectId
        }
      })
      viewer.addEventListener(Glodon.Bimface.Viewer.Viewer3DEvent.ContextMenu, function(objectData) {
        setTimeout(function() {
          that.addContextMenu(app)
        }, 0)
      })
    },
    failureCallback(error) {
      console.log(error)
    },
    getComponentProperty() {
      var that = this
      that.viewer.getComponentProperty(that.componentId, function(objectdata) {
        // console.log(JSON.stringify(objectdata))
        var data = JSON.parse(JSON.stringify(objectdata))
        that.componentName = data.properties[0].items[4].value
        that.add()
      })
    },
    addContextMenu(app) {
      var that = this
      let menu = `<div id="starting" class="bf-menu-item">构件维护</div>`
      if ($('.bf-menu.bf-menu-right')[0]) {
        $('.bf-menu.bf-menu-right').append(menu)
      } else {
        $('.bf-menu.bf-menu-left').append(menu)
      }
      $('#starting').on('click', function() {
        that.getComponentProperty()
        $('.bf-menu.bf-menu-right').hide()
      })
    },
    add() {
      this.$refs.modelcomponent.add(this.id, this.name, this.componentName)
    },
    handleAddProperty(form) {
      var that = this
      ajax.postSuccessCall(
        'api/ModelComponent/Create',
        {
          ProjectModelId: form.id,
          FileDataId: form.fileId,
          Name: form.componentName,
          Content: form.content,
          Remark: form.remark,
          OldSerialNumber: form.oldSerialNumber,
          NewSerialNumber: form.newSerialNumber
        },
        function(response) {
          if (response.result) {
            that.$message.success('提交成功')
          } else {
            that.$message.error('提交失败')
          }
        },
        null,
        that
      )
    }
  },
  beforeDestroy() {
    clearTimeout(this.timer)
  }
}
</script>

<style media="screen">
* {
  margin: 0;
  padding: 0;
}
html,
body {
  height: 100%;
}
.main {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: 100%;
  width: 100%;
}
.model {
  flex: 1;
}
.button {
  margin: 5px auto;
  width: 80px;
  height: 30px;
  background: #11dab7;
  color: #ffffff;
  border-radius: 3px;
  border: none;
  cursor: pointer;
}
</style>
