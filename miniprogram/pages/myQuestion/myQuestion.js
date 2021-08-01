// pages/myQuestion/myQuestion.js
let app = getApp();
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    question: null
  },
  delete: function(e){
    var item = e.currentTarget.dataset['item'];
    var that = this;
    console.log(item);
    wx.showModal({
      title: '提示',
      content: '是否删除该提问？',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          //将提问表中对应的id编号数据删除
          var id=item._id;
          // console.log(that.data.question);
          db.collection("information_table").doc(id).remove({
            success(res){
              console.log(res);
              wx.showToast({
                title: '删除成功',
                icon: 'success',
                duration: 1000
              })
              db.collection("information_table").where({
                _openid: app.globalData.openid
              }).get({
                success(res) {
                  that.setData({
                    question: res.data
                  })
                }
              })
              db.collection("comment_table").where({
                infoId: id
              }).remove({
                success(res) {
                  console.log(success)
                }
              })
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  detail: function (e) {
    // console.log(e.currentTarget.dataset['item']);
    var item = e.currentTarget.dataset['item'];
    console.log(item);
    if(item=='')console.log('提问已被删除')
    // console.log(item.keyword);
    wx.navigateTo({
      url: '../detail/detail?&id=' + item._id + '&openID=' + item._openid + '&title=' + item.keyword + '&content=' + item.content+'&time='+item.time,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this;
    db.collection("information_table").where({
      _openid: app.globalData.openid
    }).get({
      success(res){
        that.setData({
          question:res.data
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