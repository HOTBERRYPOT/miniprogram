// pages/candidate-info/candidate-info.js
const db = wx.cloud.database()
Page({
  data: {
    Name:'这里是姓名',
    Class:'这里是班级',
    Birthday:'这里是出生年月',
    Phone:'这里是手机',
    Speciality:'这里是特长',
    Experience:'这里是个人经历',
    Reason:'这里是申请理由',
    sexarr:[],
    sexindex:1,
    job1arr:[],
    job1index:2,
    job2arr:[],
    job2index:3,
    hasfinancing: false,  //是否已融资
    isorg: false,  //是否是机构
    uploadimgs:[], //上传图片列表
    editable: false //是否可编辑
  },
  onLoad: function (options) {
    this.setData({
      Name: options.Name,
    })
    this.ini()
    this.fetchData()
  },
  fetchData: function(){
    this.setData({
      sexarr:["请选择","男","女"],
      job1arr:["请选择","学术部","文体部","外联部","信息部","人力资源部","志愿者管理部","权益中心"],
      job2arr:["请选择","学术部","文体部","外联部","信息部","人力资源部","志愿者管理部","权益中心"]
    })
  },
  ini: function () {
    var that = this
    db.collection('temp_save').where({
      Name: this.data.Name
    }).get({
      success: function (e) {
        if (e.data.length) { //是否查找成功
          that.setData({
            Name: e.data[0]['Name'],
            Class: e.data[0]['Class'],
            Birthday: e.data[0]['Birthday'],
            Phone: e.data[0]['Phone'],
            Speciality: e.data[0]['Speciality'],
            Experience: e.data[0]['Experience'],
            Reason: e.data[0]['Reason'],
            sexindex: e.data[0]['sexindex'],
            job1index: e.data[0]['job1index'],
            job2index: e.data[0]['job2index'],
          })
        }
      }
    })
  }
})