<template>
  <div>
    <a-form style="max-width: 1200px; margin: 40px auto 0;">
      <a-form-item>
        <div style="width:300px;float:left;">
          <template>
            <a-tree checkable @expand="onExpand" :expandedKeys="expandedKeys" :autoExpandParent="autoExpandParent" v-model="checkedKeys" @select="onSelect" :selectedKeys="selectedKeys" :treeData="treeData" @check="onCheck" :loadData="onLoadData" />
          </template>
        </div>
        <div style="float:left;">
          <a-button type="primary" icon="plus" @click="$refs.addTad.add()">添加tab</a-button>
          <a-tabs v-model="currentTab" @change="handleTabChange">
            <a-tab-pane v-for="v in entitys" :tab="v.name" :key="v.name">
              <div v-if="v.iscode">
                <div v-if="editcode">
                  <a-button type="primary" icon="save" @click="SaveCode()">保存代码</a-button>
                  <textarea rows="25" cols="100" v-model="v.code"></textarea>
                </div>
                <div v-else>
                  <a-button type="primary" icon="" @click="GetModelList(v)">列表</a-button>
                  <a-button type="primary" icon="edit" @click="EditCode()" style="margin-left:30px;">编辑代码</a-button>
                  <pre class="language-csharp"><code class="language-csharp">{{ v.code }}</code></pre>
                </div>
              </div>
              <div v-else>
                <a-button type="primary" icon="" @click="GetCode(v)">代码</a-button>
                <a-table :columns="v.columns" :rowKey="record => record.name" :dataSource="v.data" :pagination="false" :loading="loading">
                  <span slot="xuhao" slot-scope="text, record, index">{{ index + 1 }}</span>
                  <span slot="name" slot-scope="text">
                    {{ text }}
                  </span>
                  <span slot="typeOf" slot-scope="text">
                    {{ text }}
                  </span>
                </a-table>
              </div>
            </a-tab-pane>
          </a-tabs>
        </div>
      </a-form-item>
      <a-form-item :wrapperCol="{span: 19, offset: 5}">
        <a-button @click="prevStep">上一步</a-button>
        <a-button style="margin-left: 8px" type="primary" @click="nextStep">下一步</a-button>
      </a-form-item>
      <add-tad ref="addTad" @ok="addTad" />
    </a-form>
  </div>
</template>

<script>
import { Result } from '@/components'
import addTad from './form/addTad'
import { ajax } from '@/utils/ajax'
const dataType = 'string,int?,DateTime,long?,System.DateTime,bool,double'
const columns = [
  {
    title: '#',
    scopedSlots: { customRender: 'xuhao' }
  },
  {
    title: '属性名称',
    dataIndex: 'name'
  },
  {
    title: '数据类型',
    dataIndex: 'typeOf',
    scopedSlots: { customRender: 'typeOf' }
  }
]
export default {
  name: 'Step4',
  // props: ['id'],
  components: {
    Result,
    addTad
  },
  data() {
    return {
      labelCol: { lg: { span: 5 }, sm: { span: 5 } },
      wrapperCol: { lg: { span: 19 }, sm: { span: 19 } },
      loading: false,
      expandedKeys: [],
      autoExpandParent: true,
      checkedKeys: [],
      selectedKeys: [],
      treeData: [],
      columns: columns,
      entitys: [],
      currentTab: '',
      dataVms: [],
      num: 0,
      id: 0,
      editcode: false
    }
  },
  created() {
    var data = this.$parent.Step2Form
    this.id = data.id
    var json = {
      Name: 'Category',
      FullName: 'WenSi.CodeTemplates.Category',
      ParentClassNames: ['Entity', 'IMustHaveTenant'],
      Properties: [
        {
          Name: 'Name',
          TypeOf: 'string',
          Attribute: []
        },
        {
          Name: 'TenantId',
          TypeOf: 'int',
          Attribute: []
        },
        {
          Name: 'CreationTime',
          TypeOf: 'System.DateTime',
          Attribute: []
        },
        {
          Name: 'CreatorUserId',
          TypeOf: 'long?',
          Attribute: []
        },
        {
          Name: 'Templates',
          TypeOf: 'System.Collections.Generic.List<WenSi.CodeTemplates.Template>',
          Attribute: []
        }
      ]
    }
    this.GetModelVm(this.id, json.Name)
    var treeData = {}
    treeData.title = json.Name
    treeData.key = json.Name + '-1'
    treeData.disabled = false
    treeData.children = []
    var childs = json.Properties
    for (var i = 0; i < childs.length; i++) {
      var child = {}
      child.title = childs[i].Name
      child.key = childs[i].Name + this.num
      if (dataType.indexOf(childs[i].TypeOf) > -1) {
        child.isLeaf = true
        var vms = this.dataVms.filter(d => d.name === childs[i].Name)
        if (vms.length === 0) {
          this.dataVms.push({
            typeOf: childs[i].TypeOf,
            name: childs[i].Name
          })
        }
      }
      treeData.children.push(child)
    }
    this.treeData.push(treeData)
    this.num++
  },
  methods: {
    GetModelVm(id, name) {
      var that = this
      ajax.postSuccessCall(
        'api/Generate/GetModelVm',
        {
          id: id
        },
        function(response) {
          // console.log(response.result)
          var list = response.result
          if (list.length > 0) {
            for (var i = 0; i < list.length; i++) {
              that.entitys.push({
                name: list[i].name,
                columns: that.columns,
                code: list[i].code,
                iscode: false,
                data: list[i].data
              })
            }
          } else {
            that.entitys.push({
              name: name + 'Vm',
              columns: that.columns,
              code: '',
              iscode: false,
              data: []
            })
            that.entitys.push({
              name: 'Create' + name + 'Vm',
              columns: that.columns,
              code: '',
              iscode: false,
              data: []
            })
          }
          that.currentTab = name + 'Vm'
        },
        that
      )
    },
    onLoadData(treeNode) {
      var json = {
        Name: 'Template',
        FullName: 'WenSi.CodeTemplates.Template',
        ParentClassNames: ['Entity', 'IMustHaveTenant'],
        Properties: [
          {
            Name: 'Name',
            TypeOf: 'string',
            Attribute: [
              {
                Name: 'Required',
                Value: ''
              }
            ]
          },
          {
            Name: 'Remark',
            TypeOf: 'string',
            Attribute: []
          },
          {
            Name: 'Code',
            TypeOf: 'string',
            Attribute: []
          },
          {
            Name: 'FileDataId',
            TypeOf: 'int',
            Attribute: []
          },
          {
            Name: 'CategoryId',
            TypeOf: 'int',
            Attribute: []
          },
          {
            Name: 'TenantId',
            TypeOf: 'int',
            Attribute: []
          },
          {
            Name: 'CreationTime',
            TypeOf: 'System.DateTime',
            Attribute: []
          },
          {
            Name: 'CreatorUserId',
            TypeOf: 'long?',
            Attribute: []
          }
        ]
      }
      var children = []
      var childs = json.Properties
      for (var i = 0; i < childs.length; i++) {
        var child = {}
        child.title = childs[i].Name
        child.key = childs[i].Name + this.num
        if (dataType.indexOf(childs[i].TypeOf) > -1) {
          child.isLeaf = true
          var vms = this.dataVms.filter(d => d.name === childs[i].Name)
          if (vms.length === 0) {
            this.dataVms.push({
              typeOf: childs[i].TypeOf,
              name: childs[i].Name
            })
          }
        }
        children.push(child)
      }
      this.num++
      return new Promise(resolve => {
        if (treeNode.dataRef.children) {
          resolve()
          return
        }
        setTimeout(() => {
          treeNode.dataRef.children = children
          this.treeData = [...this.treeData]
          resolve()
        }, 1000)
      })
    },
    onExpand(expandedKeys) {
      // console.log('onExpand', expandedKeys)
      // if not set autoExpandParent to false, if children expanded, parent can not collapse.
      // or, you can remove all expanded children keys.
      this.expandedKeys = expandedKeys
      this.autoExpandParent = false
    },
    onCheck(checkedKeys) {
      // console.log('onCheck', checkedKeys)
      this.checkedKeys = checkedKeys
      var dataVms = this.dataVms
      var currentTab = this.currentTab
      this.entitys.filter(d => d.name === currentTab)[0].data = []
      if (checkedKeys.length > 0) {
        for (var i = 0; i < checkedKeys.length; i++) {
          var name = checkedKeys[i].substr(0, checkedKeys[i].length - 1)
          var vm = this.entitys.filter(d => d.name === currentTab)[0].data.filter(d => d.name === name)
          if (vm.length === 0) {
            var datavm = dataVms.filter(d => d.name === name)[0]
            if (datavm !== undefined) {
              this.entitys
                .filter(d => d.name === currentTab)[0]
                .data.push({
                  name: datavm.name,
                  typeOf: datavm.typeOf
                })
            }
          }
        }
      }
    },
    onSelect(selectedKeys, info) {
      console.log('111', selectedKeys)
      console.log('onSelect', info)
      this.selectedKeys = selectedKeys
    },
    handleTabChange(activeKey) {
      this.checkedKeys = []
      this.currentTab = activeKey
    },
    addTad(name) {
      this.entitys.push({
        name: name,
        columns: this.columns,
        code: '',
        iscode: false,
        data: []
      })
    },
    GetCode(record) {
      // console.log(record)
      var that = this
      ajax.postSuccessCall(
        'api/Generate/GenerateCode',
        {
          name: record.name,
          code: record.code,
          data: record.data
        },
        function(response) {
          var index = that.entitys.indexOf(record)
          that.$set(that.entitys[index], `iscode`, true)
          that.$set(that.entitys[index], `code`, response.result)
          // console.log(response.result)
        },
        that
      )
    },
    GetModelList(record) {
      var index = this.entitys.indexOf(record)
      this.$set(this.entitys[index], `iscode`, false)
    },
    EditCode() {
      this.editcode = true
    },
    SaveCode() {
      this.editcode = false
    },
    prevStep() {
      this.$emit('prevStep')
    },
    nextStep() {
      const that = this
      var list = that.entitys
      ajax.postSuccessCall(
        'api/Generate/SaveModelVm',
        {
          vmTables: list,
          id: that.id
        },
        function(response) {
          if (response.result) {
            that.$emit('nextStep')
          }
        },
        that
      )
    }
  }
}
</script>
<style lang="less" scoped>
.information {
  line-height: 22px;

  .ant-row:not(:last-child) {
    margin-bottom: 24px;
  }
}
.money {
  font-family: 'Helvetica Neue', sans-serif;
  font-weight: 500;
  font-size: 20px;
  line-height: 14px;
}
</style>
