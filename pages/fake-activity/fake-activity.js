// pages/fake-activity/fake-activity.js
var app = getApp()
Page({
  data: {
    background: [
      '',
    ],
    current:'activity',
    navItems: [
      {
        name: '迎新晚会',
        url: 'yingxin',
      },
      {
        name: 'Just搜搜信息检索大赛',
        url: 'Justsoso',
        isSplot: true
      },
      {
        name: '校友小讲堂	',
        url: 'activity-find'
      },
      {
        name: 'C语言辅导',
        url: 'party-blog',
        isSplot: true
      },
      {
        name: '“职来职往”',
        url: 'party-volun',
        isSplot: true
      },
      {
        name: '3v3篮球赛',
        url: 'party-info',
        isSplot: true
      },
      {
        name: '东区之夜',
        url: 'party-getin',
        isSplot: true
      }
      
    ],
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    interval: 2000,
    duration: 500
  },
  changeIndicatorDots() {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },

  changeAutoplay() {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },

  intervalChange(e) {
    this.setData({
      interval: e.detail.value
    })
  },

  durationChange(e) {
    this.setData({
      duration: e.detail.value
    })
  },

  onLoad: function () {
    console.log('onLoad')
  },
  handleCurrent( ){
    wx.switchTab({
      url: '../activity/activity'
    })
  }

})