<template>
  <page-view title="项目维护">
    <a-card :body-style="{ padding: '24px 32px' }" :bordered="false">
      <a-form :form="form">
        <a-form-item label="站点名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['name', { rules: [{ required: true, message: '请输入站点名称' },{validator: checkName,message:'此站点已存在'}] }]" placeholder="请输入站点名称" />
        </a-form-item>
        <a-form-item label="地区" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-cascader :options="options" v-decorator="['area', { rules: [{ required: true, message: '请选择地区' }] }]" placeholder="请选择地区" />
        </a-form-item>
        <a-form-item label="详细地址" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['address', { rules: [{ required: true, message: '请输入详细地址' }] }]" placeholder="请输入详细地址" />
        </a-form-item>
        <a-form-item label="经度" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['longitude', { rules: [{ required: true, message: '请输入经度' },{pattern:/^(-?\d+)(\.\d+)?$/,message:'请输入数字' },{validator:checklongitude,message:'请输入正确的经度'}] }]" placeholder="请输入经度" />
        </a-form-item>
        <a-form-item label="纬度" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['latitude', { rules: [{ required: true, message: '请输入纬度' },{pattern:/^(-?\d+)(\.\d+)?$/,message:'请输入数字' },{validator:checklatitude,message:'请输入正确的纬度'}] }]" placeholder="请输入纬度" />
        </a-form-item>
        <a-form-item label="站点容量" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['siteCapacity', { rules: [{ required: true, message: '请输入站点容量' },{pattern:/^(-?\d+)(\.\d+)?$/,message:'请输入数字' }] }]" placeholder="请输入站点容量" />
        </a-form-item>
        <a-form-item label="电压等级" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['voltageGrade', { rules: [{ required: true, message: '请输入电压等级' },{pattern:/^[0-9]*$/,message:'请输入整数' }] }]" placeholder="请输入电压等级" />
        </a-form-item>
        <a-form-item label="接入方式" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-select v-decorator="['accessMode', { rules: [{ required: true, message: '请选择接入方式' }] }]">
            <a-select-option v-for="(item,index) in accessModes" :key="index" :value="item.value">{{ item.text }}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="施工队" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['constructionTeam', { rules: [{ required: true, message: '请输入施工队' }] }]" placeholder="请输入施工队" />
        </a-form-item>
        <a-form-item label="施工期" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-range-picker v-decorator="['rangeTime', { rules: [{ required: true, message: '请选择施工期' }] }]" />
        </a-form-item>
        <a-form-item label="上传图片" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <div style="display: inline-flex;">
            <a-upload :action="url" accept=".jpg,.png,.jpeg" listType="picture-card" :data="{fileId:0,fileType:0}" :fileList="onefileList" @preview="onehandlePreview" @change="onehandleChange">
              <div v-if="onefileList.length < 1">
                <a-icon type="plus" />
                <div class="ant-upload-text">项目图片</div>
              </div>
            </a-upload>
            <a-modal :visible="onepreviewVisible" :footer="null" @cancel="onehandleCancel">
              <img alt="example" style="width: 100%" :src="onepreviewImage" />
            </a-modal>
          </div>
        </a-form-item>
        <a-form-item label="备注" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-textarea v-decorator="['remark']" placeholder="请输入备注" />
        </a-form-item>
        <a-form-item :wrapperCol="{ span: 19, offset: 5 }"></a-form-item>
        <div style="margin-left:30%;">
          <a-button type="primary" @click="handleSubmit">提交</a-button>
          <a-button style="margin-left: 8px" @click="cancel()">取消</a-button>
        </div>
      </a-form>
    </a-card>
  </page-view>
</template>

<script>
import { PageView } from '@/layouts'
import { ajax } from '@/utils/ajax'
import moment from 'moment'
export default {
  name: '',
  components: {
    PageView
  },
  data() {
    return {
      parentId: '',
      description: '表单页用于向用户收集或验证信息，基础表单常见于数据项较少的表单场景。',
      value: 1,
      labelCol: { lg: { span: 7 }, sm: { span: 7 } },
      wrapperCol: { lg: { span: 10 }, sm: { span: 17 } },
      // form
      form: this.$form.createForm(this),
      id: 0,
      dateFormat: 'YYYY/MM/DD',
      options: [],
      onepreviewVisible: false,
      onepreviewImage: '',
      onefileList: [],
      accessModes: [],
      fileId: 0
    }
  },
  mounted() {
    this.id = this.$route.query.id
    var that = this
    ajax.get('/api/Project/Get', { id: that.id }).then(res => {
      var data = res.result
      that.accessModes = data.accessModes
      that.options = data.areas
      var pro = data.vm
      if (pro !== 1) {
        that.fileId = pro.fileDataId
        that.onefileList = [
          {
            uid: '-1',
            name: 'image.png',
            status: 'done',
            url: pro.filePath
          }
        ]
        const {
          form: { setFieldsValue }
        } = this
        that.$nextTick(() => {
          setFieldsValue({
            name: pro.name,
            area: pro.area,
            address: pro.address,
            longitude: pro.longitude,
            latitude: pro.latitude,
            siteCapacity: pro.siteCapacity,
            voltageGrade: pro.voltageGrade,
            accessMode: pro.accessMode,
            constructionTeam: pro.constructionTeam,
            rangeTime: [that.moment(pro.startTime, that.dateFormat), that.moment(pro.endTime, that.dateFormat)],
            remark: pro.remark
          })
        })
      }
    })
  },
  computed: {
    url: function() {
      return process.env.VUE_APP_API_BASE_URL + 'api/File/UploadImg'
    }
  },
  methods: {
    moment,
    checkName(rule, value, callback) {
      if (value === undefined) {
        value = ''
      }
      var that = this
      ajax
        .get('api/Project/Check', {
          id: that.id,
          name: value
        })
        .then(res => {
          if (res.result) {
            callback()
            return
          } else {
            callback('此名称已存在')
          }
        })
    },
    checklongitude(rule, value, callback) {
      if (value === undefined) {
        value = ''
      }
      if (value < -180 || value > 180) {
        callback('请输入正确的经度')
      } else {
        callback()
      }
    },
    checklatitude(rule, value, callback) {
      if (value === undefined) {
        value = ''
      }
      if (value < -90 || value > 90) {
        callback('请输入正确的纬度')
      } else {
        callback()
      }
    },
    // 提交
    handleSubmit(e) {
      if (this.fileId === 0) {
        this.$message.error('请上传图片')
        return false
      }
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          var id = this.id
          var url = ''
          if (id > 0) {
            url = 'api/Project/Update'
          } else {
            url = 'api/Project/Create'
          }
          var that = this
          ajax.postSuccessCall(
            url,
            {
              Id: id,
              AreaId: values.area[2],
              Address: values.address,
              Name: values.name,
              Longitude: values.longitude,
              Latitude: values.latitude,
              SiteCapacity: values.siteCapacity,
              VoltageGrade: values.voltageGrade,
              AccessMode: values.accessMode,
              ConstructionTeam: values.constructionTeam,
              StartTime: moment(values.rangeTime[0]).format('YYYY-MM-DD'),
              EndTime: moment(values.rangeTime[1]).format('YYYY-MM-DD'),
              FileDataId: that.fileId,
              Remark: values.remark
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
      })
    },
    cancel() {
      this.$router.push({ path: '/maintenance/projectIndex' })
    },

    // 图片上传
    onehandleCancel() {
      this.onepreviewVisible = false
    },
    onehandlePreview(file) {
      this.onepreviewImage = file.url || file.thumbUrl
      this.onepreviewVisible = true
    },
    onehandleChange({ fileList }) {
      this.onefileList = fileList
      if (fileList.length > 0) {
        if (fileList[0].response !== undefined) {
          this.fileId = fileList[0].response.result.fileId
        }
      } else {
        this.fileId = 0
      }
    }
  }
}
</script>