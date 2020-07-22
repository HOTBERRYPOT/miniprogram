// pages/candidate-info/candidate-info.js
const db = wx.cloud.database()
Page({
  data: {
    Name: '',
    sex: '',
    Class: '',
    Birthday: '',
    Phone: '',
    Speciality: '',
    Experience: '',
    Reason: '',
    Time: '',
    job1: '',
    job2: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      Name: options.Name,
    })
    this.ini()
  },
  ini: function () {
    var that = this
    db.collection('candidates').where({
      姓名: this.data.Name
    }).get({
      success: function (e) {
        console.log(e.data)
        that.setData({
          sex: e.data[0]["性别"],
          Class: e.data[0]["班级"],
          Reason: e.data[0]["申请理由"],
          Phone: e.data[0]["手机号"],
          Birthday: e.data[0]["出生日期"],
          Experiencee: e.data[0]["个人经历"],
          Speciality: e.data[0]["特长"],
          Time: e.data[0]["报名时间"],
          job1: e.data[0]["第一志愿"],
          job2: e.data[0]["第二志愿"],
        })
      }
    })
  }
})