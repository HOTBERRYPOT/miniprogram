Page({
  data: {
    Name:'',
    Class:'',
    Birthday:'',
    Phone:'',
    Speciality:'',
    Experience:'',
    Reason:'',
    sexarr:[],
    sexindex:0,
    job1arr:[],
    job1index:0,
    job2arr:[],
    job2index:0,
    hasfinancing: false,  //是否已融资
    isorg: false,  //是否是机构
    uploadimgs:[], //上传图片列表
    editable: false //是否可编辑
  },
  onLoad: function () {
    this.fetchData()
  },
  fetchData: function(){
    this.setData({
      sexarr:["请选择","男","女"],
      job1arr:["请选择","学术部","文体部","外联部","信息部","人力资源部","志愿者管理部","权益中心"],
      job2arr:["请选择","学术部","文体部","外联部","信息部","人力资源部","志愿者管理部","权益中心"]
    })
  },
  chooseImage:function() {
    let _this = this;
    wx.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
      itemColor: "#f7982a",
      success: function(res) {
        if (!res.cancel) {
          if(res.tapIndex == 0){
            _this.chooseWxImage('album')
          }else if(res.tapIndex == 1){
            _this.chooseWxImage('camera')
          }
        }
      }
    })
  },
  chooseWxImage:function(type){
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
  editImage:function(){
    this.setData({
      editable: !this.data.editable
    })
  },
  deleteImg:function(e){
    console.log(e.currentTarget.dataset.index);
    const imgs = this.data.uploadimgs
    Array.prototype.remove = function(i){
       const l = this.length;
       if(l==1){
         return []
       }else if(i>1){
         return [].concat(this.splice(0,i),this.splice(i+1,l-1))
       }
     }
    this.setData({
      uploadimgs: imgs.remove(e.currentTarget.dataset.index)
    })
  },
  bindPickerChange: function(e){ //下拉选择
    const eindex = e.detail.value;
    const name = e.currentTarget.dataset.pickername;
    // this.setData(Object.assign({},this.data,{name:eindex}))
    switch(name) {
      case 'sex':
        this.setData({
          sexindex: eindex
        })
        break;
      case 'industry':
        this.setData({
          industryindex: eindex
        })
        break;
      case 'status':
        this.setData({
          statusindex: eindex
        })
        break;
      case 'job1':
        this.setData({
          job1index: eindex
        })
        break;
        case 'job2':
          this.setData({
            job2index: eindex
          })
          break;
      default:
        return
    }
  },
  setFinance:function(e){ //选择融资
    this.setData({
      hasfinancing:e.detail.value=="已融资"?true:false
    })
  },
  setIsorg:function(e){ //选择投资主体
    this.setData({
      isorg:e.detail.value=="机构"?true:false
    })
  },
  applySubmit:function(){
    wx.navigateTo({
      url: '../service/service'
    })
  }
})

