// miniprogram/pages/audioList/audioList.js
var app = getApp();
const db = wx.cloud.database();
const innerAudioContext = wx.createInnerAudioContext();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    audioFile:[

    ],
    tempFile:null
  },
  delete: function(e){
    var item = e.currentTarget.dataset['item'];
    var that = this;
    wx.showModal({
      title: '提示',
      content: '是否删除该录音？',
      success(res) {
        if (res.confirm) {
          console.log('确定删除')
        }
        else{
          console.log('取消')
        }
      }
    })
  },
  play: function(e){
    var item = e.currentTarget.dataset['item'];
    var myfileID = item.fileID;
    var that = this;
    wx.cloud.downloadFile({
      fileID: myfileID,
      success: res => {
        // get temp file path
        
        that.setData({
          tempFile: res.tempFilePath
        })
        console.log(that.data.tempFile)
        innerAudioContext.src=that.data.tempFile;
        innerAudioContext.onPlay(() => {
          console.log('开始播放')
        })
        innerAudioContext.play();
      },
      fail: err => {
        // handle error
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    db.collection("record_table").where({
      _openid: app.globalData.openid
    })
    .get({
      success(res) {
        console.log(res.data);
        that.setData({
          audioFile: res.data
        })
      }
    })
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