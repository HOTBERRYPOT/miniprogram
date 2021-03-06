// import { userInfo } from "os"

const db = wx.cloud.database()
const app = getApp()
const newlist = []
Page({
  data: {
    isAdministrator: false, //是否是管理员
    enrolled: false, //是否已注册
    onTime: true, //是否在报名时间

    //报名者
    Name: '',
    Class: '',
    Birthday: '',
    Phone: '',
    Speciality: '',
    Experience: '',
    Reason: '',
    sexarr: [],
    sexindex: 0,
    job1arr: [],
    job1index: 0,
    job2arr: [],
    job2index: 0,
    uploadimgs: [], //上传图片列表
    editable: false, //是否可编辑

    //管理员
    filterdata: {}, //筛选条件数据
    showfilter: false, //是否显示下拉筛选
    showfilterindex: null, //显示哪个筛选类目
    adminlist: [], //学生列表
    scrolltop: null, //滚动位置
    page: 0 //分页
  },
  onLoad: function () {
    this.isAdministrator() //判断是否为管理员
    this.isOnTime()
    this.fetchData()
    this.setSaveData()
    this.fetchServiceData()
    // this.fetchFilterData()

  },

  //判断用户是否为管理员
  isAdministrator: function () {
    var that = this
    wx.cloud.callFunction({ //获取用户openid
      name: 'login',
      data: {}
    }).then((res) => {
      db.collection('administrators').where({
        _openid: res.result._openid
      }).get({
        success: function (e) {
          if (e.data.length) { //是否查找成功
            wx.setTabBarItem({
              index: 0,
              text: '管理员',
            })
            wx.setNavigationBarTitle({
              title: '我是管理员',
            })
            that.setData({
              isAdministrator: true,
            })
          } else {
            db.collection('candidates').where({
              _openid: res.result._openid
            }).get({
              success: function (d) {
                if (d.data.length) { //是否查找成功
                  that.setData({
                    enrolled: true,
                  })
                  wx.setNavigationBarTitle({
                    title: '报名信息',
                  })
                }
              }
            })
          }
        }
      })
    })
  },

  //获取保存信息
  setSaveData: function () {
    var that = this
    wx.cloud.callFunction({ //获取用户openid
      name: 'login',
      data: {}
    }).then((res) => {
      db.collection('temp_save').where({
        _openid: res.result._openid
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
    })
  },

  /*——————————————————————————————————————————————————————————————————————————————————————————————————————*/
  //报名者
  isOnTime: function () {
    if (new Date('2020-12-31').getTime() < new Date().getTime()) {
      this.setData({
        onTime: false
      })
    }
  },
  fetchData: function () {
    this.setData({
      sexarr: ["请选择", "男", "女"],
      job1arr: ["请选择", "学术部", "文体部", "外联部", "信息部", "人力资源部", "志愿者管理部", "权益中心"],
      job2arr: ["请选择", "学术部", "文体部", "外联部", "信息部", "人力资源部", "志愿者管理部", "权益中心"]
    })
  },
  chooseImage: function () {
    let _this = this;
    wx.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
      itemColor: "#f7982a",
      success: function (res) {
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            _this.chooseWxImage('album')
          } else if (res.tapIndex == 1) {
            _this.chooseWxImage('camera')
          }
        }
      }
    })
  },
  chooseWxImage: function (type) {
    let _this = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: [type],
      success: function (res) {
        _this.setData({
          uploadimgs: _this.data.uploadimgs.concat(res.tempFilePaths)
        })
      }
    })
  },
  editImage: function () {
    this.setData({
      editable: !this.data.editable
    })
  },
  deleteImg: function (e) {
    console.log(e.currentTarget.dataset.index);
    const imgs = this.data.uploadimgs
    Array.prototype.remove = function (i) {
      const l = this.length;
      if (l == 1) {
        return []
      } else if (i > 1) {
        return [].concat(this.splice(0, i), this.splice(i + 1, l - 1))
      }
    }
    this.setData({
      uploadimgs: imgs.remove(e.currentTarget.dataset.index)
    })
  },
  //格式化输入
  inputNum: function (e) {
    let pwd = e.detail.value
    return pwd.replace(/[^0-9]/g, '') //只能输入数字
  },
  inputName: function (e) {
    let pwd = e.detail.value
    return pwd.replace(/[^a-zA-Z\u4E00-\u9FA5]/g, '') //只能输入中英文
  },

  bindPickerChange: function (e) { //下拉选择，志愿不能相同
    const eindex = e.detail.value;
    const name = e.currentTarget.dataset.pickername;
    // this.setData(Object.assign({},this.data,{name:eindex}))
    switch (name) {
      case 'sex':
        this.setData({
          sexindex: eindex
        })
        break;
      case 'job1':
        if (eindex != 0 && eindex == this.data.job2index) {
          wx.showToast({
            title: '志愿不能相同！',
            icon: 'none'
          })
        } else {
          this.setData({
            job1index: eindex
          })
        }
        break;
      case 'job2':
        if (eindex != 0 && eindex == this.data.job1index) {
          wx.showToast({
            title: '志愿不能相同！',
            icon: 'none'
          })
        } else {
          this.setData({
            job2index: eindex
          })
        }
        break;
      default:
        return
    }
  },

  submit: function (data) {
    if (data.detail.target.dataset.type == '提交') {
      this.appsubmit(data)
    } else if (data.detail.target.dataset.type == '保存') {
      this.appsave(data)
    }
  },
  appsubmit: function (data) {
    //提交前检验
    var that = this
    var notValidative = data.detail.value.Name == '' || data.detail.value.Class == '' || data.detail.value.Birthday == '' || data.detail.value.Phone == '' || data.detail.value.Speciality == '' || data.detail.value.Experience == '' || data.detail.value.Reason == '' || this.data.sexindex == 0 || this.data.job1index == 0 || this.data.job2index == 0
    if (notValidative) {
      wx.showToast({
        title: '请完整填写报名表！',
        icon: 'none'
      })
    } else {
      this.setData({
        Name: data.detail.value.Name,
        Class: data.detail.value.Class,
        Birthday: data.detail.value.Birthday,
        Phone: data.detail.value.Phone,
        Speciality: data.detail.value.Speciality,
        Experience: data.detail.value.Experience,
        Reason: data.detail.value.Reason
      });
      db.collection("candidates_for_admin").add({
        data: {
          Name: data.detail.value.Name,
          Class: data.detail.value.Class,
          Birthday: data.detail.value.Birthday,
          Phone: data.detail.value.Phone,
          Speciality: data.detail.value.Speciality,
          Experience: data.detail.value.Experience,
          Reason: data.detail.value.Reason,
          sexindex: that.data.sexindex,
          job1index: that.data.job1index,
          job2index: that.data.job2index
        }
      })
      db.collection("candidates").add({
        data: {
          姓名: this.data.Name,
          班级: this.data.Class,
          性别: this.data.sexarr[this.data.sexindex],
          出生日期: this.data.Birthday,
          手机号: this.data.Phone,
          特长: this.data.Speciality,
          个人经历: this.data.Experience,
          申请理由: this.data.Reason,
          第一志愿: this.data.job1arr[this.data.job1index],
          第二志愿: this.data.job1arr[this.data.job2index],
          报名时间: new Date()
        }
      })
      wx.showToast({
        title: '提交成功！请耐心等待录取信息',
        icon: 'success'
      })
      this.appsave(data)
      this.onLoad()
    }
  },
  //暂时保存
  appsave: function (data) {
    var that = this
    wx.cloud.callFunction({ //获取用户openid
      name: 'login',
      data: {}
    }).then((res) => {
      db.collection('temp_save').where({
        _openid: res.result._openid
      }).get({
        success: function (e) {
          if (e.data.length) { //是否查找成功
            db.collection('temp_save').where({
              _openid: res.result._openid
            }).update({
              data: {
                Name: data.detail.value.Name,
                Class: data.detail.value.Class,
                Birthday: data.detail.value.Birthday,
                Phone: data.detail.value.Phone,
                Speciality: data.detail.value.Speciality,
                Experience: data.detail.value.Experience,
                Reason: data.detail.value.Reason,
                sexindex: that.data.sexindex,
                job1index: that.data.job1index,
                job2index: that.data.job2index
              }
            })
          } else {
            db.collection('temp_save').add({
              data: {
                Name: data.detail.value.Name,
                Class: data.detail.value.Class,
                Birthday: data.detail.value.Birthday,
                Phone: data.detail.value.Phone,
                Speciality: data.detail.value.Speciality,
                Experience: data.detail.value.Experience,
                Reason: data.detail.value.Reason,
                sexindex: that.data.sexindex,
                job1index: that.data.job1index,
                job2index: that.data.job2index
              }
            })
          }
        }
      })
    })
  },

  /*————————————————————————————————————————————————————————————————————————————————————————————*/
  //管理员
  fetchServiceData: function () { //获取学生列表
    let that = this;
    wx.showToast({
      title: '加载中',
      icon: 'loading'
    })
    const perpage = 10;
    this.setData({
      page: this.data.page + 1
    })
    const page = this.data.page
    db.collection('candidates_for_admin').get({
      success: function (res) {
        for (var i = 0; i < res.data.length; i++) {
          newlist.push({
            "id": i,
            "name": res.data[i]['Name'],
            "tag1": that.data.job1arr[res.data[i]['job1index']],
            "tag2": that.data.job1arr[res.data[i]['job2index']],
          })
        }
      }
    })

    setTimeout(() => {
      that.setData({
        adminlist: that.data.adminlist.concat(newlist)
      })
    }, 1500)
  },
  setFilterPanel: function (e) { //展开筛选面板
    const d = this.data;
    const i = e.currentTarget.dataset.findex;
    if (d.showfilterindex == i) {
      this.setData({
        showfilter: false,
        showfilterindex: null
      })
    } else {
      this.setData({
        showfilter: true,
        showfilterindex: i,
      })
    }
    console.log(d.showfilterindex);
  },

  hideFilter: function () { //关闭筛选面板
    this.setData({
      showfilter: false,
      showfilterindex: null
    })
  },
  scrollHandle: function (e) { //滚动事件
    this.setData({
      scrolltop: e.detail.scrollTop
    })
  },
  goToTop: function () { //回到顶部
    this.setData({
      scrolltop: 0
    })
  },
  scrollLoading: function () { //滚动加载
    this.fetchServiceData();
  },
  onPullDownRefresh: function () { //下拉刷新
    this.setData({
      page: 0,
      servicelist: []
    })
    this.fetchServiceData();
    // this.fetchFilterData();
    setTimeout(() => {
      wx.stopPullDownRefresh()
    }, 1000)
  }
})