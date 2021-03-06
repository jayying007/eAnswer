// pages/feedback/feedback.js
const app = getApp()
const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasValue: false,
  },
  submit: function(e){
    db.collection("feedback_table").add({
      data:{
        describe:e.detail.value.describe,
        phone:e.detail.value.phone
      },
      success(res){
        wx.showToast({
          title: '感谢您的反馈',
          icon: 'success',
          duration: 1000,
          success: function () {
            setTimeout(function () {
              wx.navigateBack({
                delta: 1
              })
            }, 1000)
          }
        })
      }
    })
    console.log(e.detail.value);
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