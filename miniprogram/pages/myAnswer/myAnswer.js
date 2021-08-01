// pages/myAnswer/myAnswer.js
let app = getApp();
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //通过openID得到对应的评论数据
    comment: [], 
  },
  delete: function(e){
    var index = e.currentTarget.dataset['index'];
    var that = this;

    wx.showModal({
      title: '提示',
      content: '是否删除回复？',
      success(res) {
        if (res.confirm) {
          
          // console.log(e.currentTarget.dataset.index);
          db.collection("comment_table").doc(that.data.comment[index]._id).remove({
            success(res) {
              console.log(res);
            }
          })
          wx.showToast({
            title: '删除成功',
            icon: 'success',
            duration: 1000
          })
          db.collection("comment_table").where({
            _openid: app.globalData.openid
          }).get({
            success(res) {
              that.setData({
                comment: res.data
              })
            }
          })

        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
    
  },
  detail: function(e){
    // console.log(e.currentTarget.dataset.index); 
    var index = e.currentTarget.dataset['index'];
    // console.log(item.keyword);
    var info = this.data.comment[index].infoId;
    db.collection("information_table").doc(info).get({
      success(res){
        console.log(res)
        var item = res.data;
        wx.navigateTo({
          url: '../detail/detail?&id=' + item._id + '&openID=' + item._openid + '&title=' + item.keyword + '&content=' + item.content+'&time='+item.time,
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    db.collection("comment_table").where({
      _openid: app.globalData.openid
    }).get({
      success(res){
        that.setData({
          comment:res.data
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