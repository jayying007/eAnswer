// miniprogram/pages/knowledge/knowledge.js
const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    advices:[
      {
        iconPath:'../../imgs/tang.jpg',
        name:'烫伤处理'
      },
      {
        iconPath: '../../imgs/shao.jpg',
        name: '烧伤处理'
      },
      {
        iconPath: '../../imgs/ca.jpg',
        name: '擦伤处理'
      },
      {
        iconPath: '../../imgs/yao.jpg',
        name: '蛇咬伤处理'
      },
      {
        iconPath: '../../imgs/dong.jpg',
        name: '冻伤处理'
      },
      {
        iconPath: '../../imgs/zhong.jpg',
        name: '中暑处理'
      }
    ]
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

  detail: function (e) {
    // console.log(e.currentTarget.dataset['item']);
    var item = e.currentTarget.dataset['item'];
    var principle,methods,notice,prevent;
    db.collection('knowledge_table').where({
      name:item.name
    })
      .get({
        success(res) {
          console.log(res.data);
          principle=res.data[0].principle;
          methods=res.data[0].methods;
          notice=res.data[0].notice; 
          prevent=res.data[0].prevent;
          wx.navigateTo({
            url: '../knowledge_detail/knowledge_detail?name=' + item.name + '&principle=' + principle + '&methods=' + methods + '&notice=' + notice + '&prevent=' + prevent,
          })
        }
      })
  },
})