//app.js
App({
  onLaunch: function () {
    //云开发初始化
    wx.cloud.init({
      env: "berrypot-2pevh",
      traceUser: true,
    })
    this.globalData = {}
    this.userInfo = {}
  }
})