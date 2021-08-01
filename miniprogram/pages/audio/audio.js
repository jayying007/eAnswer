// miniprogram/pages/audio/audio.js
let app = getApp();
const recorderManager = wx.getRecorderManager()
var tempFile;
const db = wx.cloud.database();

recorderManager.onStart(() => {
  console.log('recorder start')
})
recorderManager.onPause(() => {
  console.log('recorder pause')
})
recorderManager.onResume(() => {
  console.log('recorder resume')
})
recorderManager.onFrameRecorded((res) => {
  const { frameBuffer } = res
  console.log('frameBuffer.byteLength', frameBuffer.byteLength)
})
 
const options = {
  duration: 600000,
  sampleRate: 44100,
  numberOfChannels: 1,
  encodeBitRate: 192000,
  format: 'aac',
  frameSize: 50
}

Page({
  /**
   * 页面的初始数据
   */
  data: {
    ishidden: false,
    mhidden: true,
    fileID: null,
    filename: null,
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

  },

  Start() {
    recorderManager.start(options)
    this.setData({
      ishidden: true
    })
  },

  Pause() {
    recorderManager.pause()
  },

  Resume() {
    recorderManager.resume()
  },

  Stop() {
    this.setData({
      ishidden: false
    })
    recorderManager.stop()
    recorderManager.onStop((res) => {
      console.log('recorder stop', res)
      const { tempFilePath } = res
      tempFile = res.tempFilePath
      var timestamp = Date.parse(new Date());
      timestamp = timestamp / 1000;
      wx.cloud.uploadFile({
        cloudPath: app.globalData.openid + timestamp, // 上传至云端的路径
        filePath: tempFile, // 小程序临时文件路径
        success: res => {
          // 返回文件 ID
          console.log(res.fileID);
          this.setData({
            mhidden: false,
            fileID: res.fileID
          })
        },
        fail: console.error
      })
    })
  },

  Cancel() {
    this.setData({
      ishidden: false
    })
    recorderManager.stop()
  },

  changeModel: function (e) {
    if (this.data.filename == null) {
      wx.showToast({
        title: '标题不能为空',
        duration: 800,
        icon: 'none'
      })
      return;
    }
    this.setData({
      mhidden: true
    })
    db.collection("record_table").add({
      data: {
        filename: this.data.filename,
        fileID: this.data.fileID
      },
      success(res) {
        console.log(res)
        wx.showToast({
          title: '保存成功',
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
        this.setData({
          filename: null
        })
      }
    })
  },

  modalCancel: function () {
    this.setData({
      mhidden: true,
      filename: null
    })
    console.log('name'+this.data.filename);
  },


  bindinput: function (e) {
    this.setData({
      filename: e.detail.value
    })
  }
})