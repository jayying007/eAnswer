// pages/msgNotice/msgNotice.js
let app = getApp();
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //通过openID得到对应的评论数据
    comment: null,
  },
  deleteMsg: function (e) {
    var index = e.currentTarget.dataset['index'];
    // console.log(e.currentTarget.dataset.index);
    var that = this;
    wx.showModal({
      title: '提示',
      content: '是否删除该消息？',
      success(res) {
        if (res.confirm){
          that.data.comment.splice(index, 1);
          that.setData({
            comment: that.data.comment,
          })
        }else{
          console.log('用户点击取消')
        }
      }
    });
  },
  detail: function (e) {
    // console.log(e.currentTarget.dataset.index); 
    var index = e.currentTarget.dataset['index'];
    db.collection("information_table").doc(this.data.comment[index].infoId).get({
      success(res){
        wx.navigateTo({
          url: '../detail/detail?&id=' + res.data._id + '&openID=' + res.data._openid + '&title=' + res.data.keyword + '&content=' + res.data.content + '&time='+res.data.time ,
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that = this;
    var infolist=[];
    db.collection("information_table").where({
      _openid: app.globalData.openid
    }).get({
      success(res) {
        console.log(res);
        for(var i=0;i<res.data.length;i++)
        {
          infolist.push(res.data[i]._id);
        }
        console.log(infolist);
        db.collection("comment_table").where({
          infoId: db.command.in(infolist)
        }).get({
          success(res) {
            console.log(res);
            that.setData({
              comment: res.data
            })
          }
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