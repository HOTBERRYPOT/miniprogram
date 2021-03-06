// pages/party/party.js
var app = getApp()
Page({
  data: {
    background: [
      '',
    ],
    current:'links',
    navItems: [
      {
        name: '文体部',
        url: 'party-join',
      },
      {
        name: '权益中心',
        url: 'party-activity',
        isSplot: true
      },
      {
        name: '人力资源部',
        url: 'activity-find'
      },
      {
        name: '外联部',
        url: 'party-blog',
        isSplot: true
      },
      {
        name: '志管部',
        url: 'party-volun',
        isSplot: true
      },
      {
        name: '信息部',
        url: 'party-info',
        isSplot: true
      },
      {
        name: '学术部',
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
    wx.navigateTo({
      url: '../fake-activity/fake-activity'
    })
  }

})