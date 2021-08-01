// miniprogram/pages/records/records.js
let app = getApp();
const db = wx.cloud.database()
const player = wx.createInnerAudioContext();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
      db.collection("record_table").where({
        _openid: app.globalData.openid
      }).get({
        success(res){
          that.setData({
            list: res.data
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

  },

  play:function(e){
    var item = e.currentTarget.dataset['item'];
    wx.cloud.downloadFile({
      fileID: item.fileID, // 文件 ID
      success: res => {
        // 返回临时文件路径
        console.log(res);
        player.src = res.tempFilePath;
        player.play();
        player.onPlay(() => {
          console.log('开始播放')
          wx.showToast({
            title: '正在播放'+item.filename,
            icon: 'success',
            duration: 2000,
            success: function () {
            }
          })
        })
      },
      fail: console.error
    })
  },

  delete:function(e){
    var item = e.currentTarget.dataset['item'];
    var that = this;
    wx.showModal({
      title: '提示',
      content: '是否删除该录音？',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          //将提问表中对应的id编号数据删除
          var id = item.fileID;
          wx.cloud.deleteFile({
            fileList: [id],
            success: res => {
              // handle success
              console.log(res.fileList);
              db.collection("record_table").doc(item._id).remove({
                success(res) {
                  console.log(res);
                  wx.showToast({
                    title: '删除成功',
                    icon: 'success',
                    duration: 1000
                  })
                  db.collection("record_table").where({
                    _openid: app.globalData.openid
                  }).get({
                    success(res) {
                      that.setData({
                        list: res.data
                      })
                    }
                  })
                }
              })
            },
            fail: err => {
              // handle error
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }
})