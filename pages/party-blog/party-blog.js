// pages/party-blog/party-blog.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
//gameType切换
navbtn(event) {
  const that = this;
  const id = event.currentTarget.dataset.id;
  if (id == that.data.gameType) {
    return;
  }
  let ballType = '1';
  if (id == '') {
    ballType = '';
  }
  that.setData({
    gameType: id,
    ballType: ballType,
  })
  that.getList(true);
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

  }
})