import request from '@/util/request'
import {
  ajax
} from '@/utils/ajax'
const wlapi = {
  // 1获取文件夹列表
  getFileListApi: function (projectid, folderid) {
    return ajax.get('api/ProjectFile/getfilelist', {
      projectid: projectid,
      folderid: folderid
    })
    // return request({
    //   url: './data/file-list.json'
    // })
  },
  search: function (file) {
    return ajax.get('api/ProjectFile/search', {
      PId: file.Id,
      Key: file.Key
    })
  },
  // 2新增文件夹
  addFolderApi: function (id, ParentId, Name, Describe) {
    if (id) {
      return ajax.get('api/ProjectFile/updatefolder', {
        ParentId: ParentId,
        Name: Name,
        Describe: Describe,
        Type: 1,
        Id: id
      })
    }
    return ajax.get('api/ProjectFile/addfolder', {
      ParentId: ParentId,
      Name: Name,
      Describe: Describe,
      Type: 1
    })
    // return request({
    //   url: './data/add-file.json',
    //   data
    // });
  },
  // 4获取全部文件夹
  getAllFoldersApi: function (projectid) {
    return ajax.get('api/ProjectFile/getallfolder', {
      projectid: projectid
    })
    // return request({
    //   url: './data/file-list-all.json',
    //   data
    // });
  },
  // 6删除文件|文件夹
  delFileApi: function (data) {
    return ajax.postOnly('api/ProjectFile/delete', {
      vm: data
    })
    // return request({
    //   url: './data/del-file.json',
    //   data
    // })
  },
  // 8下载数据
  downloadDataApi: function (data) {
    return ajax.downloadRequest('api/ProjectFile/download', data, '111')
  },
  // 9文件夹移动
  fileMoveApi: function (data) {
    return ajax.postOnly('api/ProjectFile/Move', data)
  }
}
export default wlapi
