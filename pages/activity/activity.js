// pages/party/party.js
var app = getApp()
Page({
  data: {

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
      
    ]

    
  },
  onLoad: function () {
    console.log('onLoad')
  }

})