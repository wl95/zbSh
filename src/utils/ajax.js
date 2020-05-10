import {
  axios
} from '@/utils/request'
import qs from 'qs'
const ajax = {
  downloadRequest(url, data, fileName) {
    return axios({
      // 用axios发送post请求
      method: 'get',
      url: url, // 请求地址 ，也可以传递参数
      params: data,
      headers: {
        // 可以自定义header
        // 可以携带token
      },
      crossDomain: true,
      responseType: 'blob' // 表明返回服务器返回的数据类型
    }).then(res => {
      console.log(res.data)
      // 处理返回的文件流
      // 主要是将返回的data数据通过blob保存成文件
      var content = res
      var blob = new Blob([content])
      //var fileName = '回收审核台账.xlsx' //  要保存的文件名称
      if ('download' in document.createElement('a')) {
        // 非IE下载
        var elink = document.createElement('a')
        elink.download = fileName
        elink.style.display = 'none'
        elink.href = URL.createObjectURL(blob)
        document.body.appendChild(elink)
        elink.click()
        URL.revokeObjectURL(elink.href) // 释放URL 对象
        document.body.removeChild(elink)
      } else {
        // IE10+下载
        navigator.msSaveBlob(blob, fileName)
      }
      console.log(res)
    })
  },
  get(url, parameter) {
    return axios({
      url: url,
      method: 'get',
      params: parameter
    })
  },
  /**
   * post方法
   * @param {string} url 网址
   * @param {object} parameter  参数
   * @param {*} successFunc 成功回调,不传就返回Promise
   * @param {*} failFunc 失败回调,不传就返回Promise
   * @param {*} that 当前调用组件的this对象 用于显示或者关闭加载图标
   */
  post(url, parameter, successFunc, failFunc, that, tishi) {
    if (that && that.loading) {
      that.loading = true
    }
    axios({
      url: url,
      method: 'post',
      data: qs.stringify(parameter)
    }).then(res => {
      if (successFunc) {
        return successFunc(res)
      }
    }).catch(err => {
      if (failFunc) {
        return failFunc(err)
      }
      if (tishi !== false) {
        that.$notification.error({
          message: '提示',
          description: '请求失败,请重试',
          duration: 3
        })
      }
    }).finally(() => {
      if (that && that.loading) {
        that.loading = false
      }
    })
  },
  postOnly(url, parameter) {
    return axios({
      url: url,
      method: 'post',
      data: qs.stringify(parameter)
    })
  },
  postSuccessCall(url, parameter, successFunc, that) {
    if (that && that.loading) {
      that.loading = true
    }
    axios({
      url: url,
      method: 'post',
      data: qs.stringify(parameter)
    }).then(res => {
      if (successFunc) {
        return successFunc(res)
      }
    }).catch(err => {
      if (err) {
        console.log(err)
        var desc = '请重试'
        var title = '请求失败'
        if (err.response && err.response.data) {
          desc = err.response.data.error.details
          title = err.response.data.error.message
        }
        that.$notification.error({
          message: title,
          description: desc,
          duration: 3
        })
      }
    }).finally(() => {
      if (that && that.loading) {
        that.loading = false
      }
    })
  }
}
export {
  ajax
}