// pages/editUserInfo/number/number.js
const app=getApp()
const db=wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
      studentID:app.userInfo.studentID
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  handleText(ev){
    let value=ev.detail.value;
    this.setData({
      studentID:value
    });
  },
  handleBtn(){
      this.updatestudentID();
  },
  updatestudentID(){
     wx.showLoading({
       title: '更新中',
     })
     db.collection('users').doc(app.userInfo._id).update({
       data:{
         studentID:this.data.studentID
       }
     }).then((res)=>{
       wx.hideLoading();
       wx.showToast({
         title: '更新成功'
       });
       app.userInfo.studentID=this.data.studentID;
     });
  }
})