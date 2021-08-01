// pages/hospitalPhone/hospitalPhone.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      tels:[
        {
          name:'广州协同中医医院',
          phone:'020-86635999'
        },
        {
          name: '深圳仁爱医院',
          phone: '0755-88308080'
        },
        {
          name: '中山大学附属第一医院',
          phone: '020-87755766'
        },
        {
          name: '北京大学深圳医院',
          phone: '0755-83923333'
        }
      ]
  },
  call: function(e){
    var index = e.currentTarget.dataset['index'];
    console.log(e.currentTarget.dataset['index']);
    var phone = this.data.tels[index].phone;
    wx.makePhoneCall({
      phoneNumber: phone,
    })
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