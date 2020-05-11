import { axios } from '@/utils/carRequest'
import qs from 'qs'
const carajax = {
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
  carajax
}