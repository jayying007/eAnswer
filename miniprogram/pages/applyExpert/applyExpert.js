// pages/applyExpert/applyExpert.js
let app = getApp();
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    filepath: '',
    hasValue: false,
  },
  chooseImg: function () {
    var that = this;
    wx.chooseImage({
      count: 1,
      success: function (res) {
        console.log(res);
        that.setData({
          filepath: res.tempFilePaths[0],
        });
      },
    })
  },
  formSubmit: function (e) {
    console.log(e.detail.value.describe);
    console.log(this.data.filepath);
    var timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000;
    wx.cloud.uploadFile({
      cloudPath: app.globalData.openid + timestamp, // 上传至云端的路径
      filePath: this.data.filepath, // 小程序临时文件路径
      success: res => {
        // 返回文件 ID
        console.log(res.fileID);
        db.collection("application_table").add({
          data: {
            describe: e.detail.value.describe,
            fileID: res.fileID
          },
          success(res) {
            console.log(res)
            wx.showToast({
              title: '提交成功',
              icon: 'success',
              duration: 2000,
              success: function () {
                setTimeout(function () {
                  wx.navigateBack({
                    delta: 1
                  })
                }, 800)
              }
            })
          }
        })
      },
      fail: console.error
    })
  },
  changeValue: function (e) {
    var value = e.detail.value;
    if (value != "") {
      this.setData({
        hasValue: true,
      })
    }
    else {
      this.setData({
        hasValue: false,
      })
    }
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