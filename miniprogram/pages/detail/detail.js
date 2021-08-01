// pages/detail/detail.js
const db = wx.cloud.database();
let app = getApp();

var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:null,
    openID:null,
    title:[],
    content:'',
    time:null,
    comment:'',
    commentLayer:false,
    commentA:null,
    commentB:null,
    hasValue:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this;
    var str = options.title.split(',');//传过来的为字符串
    this.setData({
      id:options.id,
      openID:options.openID,
      title:str,
      content:options.content,
      time:options.time,
    });
    db.collection('comment_table').where({
      infoId:that.data.id,
      state:true
    }).get({
      success(res) {
        console.log(res.data);
        that.setData({
          commentA: res.data
        })
      }
    })
    db.collection('comment_table').where({
      infoId: that.data.id,
      state: false
    }).get({
      success(res) {
        console.log(res.data);
        that.setData({
          commentB: res.data
        })
      }
    })
  },
  commentFocus: function(){
    this.setData({
      commentLayer: true,
    })
  },
  commentNofocus: function(){
    this.setData({
      commentLayer: false,
    })
  },
  commentInput: function(e){
    // console.log(e);
    this.setData({
      comment:e.detail.value,
    })
  },
  addComment: function(e){
    let that = this;
    console.log(e.detail.value.textarea);

    // 获取用户是否为专家
    var user_state;
    db.collection('user_table').where({
      _openid: app.globalData.openid
    }).get({
      success(res){
        user_state=res.data[0].state;
        console.log(user_state);
        // 添加评论
        db.collection('comment_table').add({
          // data 字段表示需新增的 JSON 数据
          data: {
            infoId: that.data.id,
            openID: that.data.openID,
            content: e.detail.value.textarea,
            state: user_state,
            time: util.formatTime(new Date())
          },
          success(res) {
            // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
            console.log(res)
            // 若该评论是专家评论，则将该信息标志为有专家评论
            if (user_state == true) {
              db.collection('information_table').doc(that.data.id).update({
                // data 传入需要局部更新的数据
                data: {
                  // 表示将 done 字段置为 true
                  state: true
                },
                success: console.log,
                fail: console.error
              })
            }
          }
        })

        // 该页面重新获取评论
        db.collection('comment_table').where({
          infoId: that.data.id,
          state: true
        }).get({
          success(res) {
            console.log(res.data);
            that.setData({
              commentA: res.data
            })
          }
        })
        db.collection('comment_table').where({
          infoId: that.data.id,
          state: false
        }).get({
          success(res) {
            console.log(res.data);
            that.setData({
              commentB: res.data
            })
          }
        })
      }
    })
    this.setData({
      comment:"",
      hasValue:false,
    })
  },
  changeValue: function(e){
    var value=e.detail.value;
    if(value!=""){
      this.setData({
        hasValue:true,
      })
    }
    else{
      this.setData({
        hasValue: false,
      })
    }
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