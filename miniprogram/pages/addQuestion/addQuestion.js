// pages/addQuestion/addQuestion.js
const db = wx.cloud.database();

var util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectItem: false,
    labels: [
      {
        kind: '头部',
        content: [
          {
            name: '头晕',
            choose: false
          },
          {
            name: '头痛',
            choose: false
          },
          {
            name: '耳鸣',
            choose: false
          },
          {
            name: '打喷嚏',
            choose: false
          },
          {
            name: '鼻塞',
            choose: false
          },
          {
            name: '失眠',
            choose: false
          },
          {
            name: '口臭',
            choose: false
          }
        ]
      },
      {
        kind: '胸部',
        content: [
          {
            name: '胸闷',
            choose: false
          },
          {
            name: '胸痛',
            choose: false
          },
          {
            name: '咳嗽',
            choose: false
          },
          {
            name: '呼吸困难',
            choose: false
          }
        ]
      },
      {
        kind: '腹部',
        content: [
          {
            name: '腹痛',
            choose: false
          },
          {
            name: '腹胀',
            choose: false
          },
          {
            name: '腹泻',
            choose: false
          }
        ]
      },
      {
        kind: '泌尿部',
        content: [
          {
            name: '尿急',
            choose: false
          },
          {
            name: '尿频',
            choose: false
          },
          {
            name: '尿痛',
            choose: false
          }
        ]
      },
      {
        kind: '皮肤',
        content: [
          {
            name: '瘙痒',
            choose: false
          },
          {
            name: '皮肤干燥',
            choose: false
          },
          {
            name: '皮疹',
            choose: false
          }
        ]
      },
      {
        kind: '其他',
        content: [
          {
            name: '消瘦',
            choose: false
          },
          {
            name: '肥胖',
            choose: false
          },
          {
            name: '焦虑',
            choose: false
          }
        ]
      }
    ]
  },
  clearAllItem: function () {
    for (var i = 0; i < this.data.labels.length; i++) {
      for (var j = 0; j < this.data.labels[i].content.length; j++) {
        if (this.data.labels[i].content[j].choose == true) {
          const kk = 'labels[' + i + '].content[' + j + '].choose';
          this.setData({
            [kk]: !this.data.labels[i].content[j].choose,
          });
        }
      }
    }
    this.setData({
      selectItem: false,
    })
  },
  // 点击标签发生变化
  clickItem: function (e) {
    var selected = 0;
    var cancel = false;

    var first = e.currentTarget.dataset['first'];
    var second = e.currentTarget.dataset['second'];

    for (var i = 0; i < this.data.labels.length; i++) {
      for (var j = 0; j < this.data.labels[i].content.length; j++) {
        if (this.data.labels[i].content[j].choose == true) {
          selected++;
          if (i == first && j == second) cancel = true;
        }
      }
    }
    if (selected < 5 || cancel) {
      const kk = 'labels[' + first + '].content[' + second + '].choose';

      this.setData({
        [kk]: !this.data.labels[first].content[second].choose,
      });
    } else {
      wx.showToast({
        title: '最多可选5个标签',
        icon: 'none',
        duration: 1000
      })
    }

    selected = 0;
    for (var i = 0; i < this.data.labels.length; i++) {
      for (var j = 0; j < this.data.labels[i].content.length; j++) {
        if (this.data.labels[i].content[j].choose == true) {
          selected++;
        }
      }
    }
    if (selected == 0) {
      this.setData({
        selectItem: false,
      })
    } else {
      this.setData({
        selectItem: true,
      })
    }
  },
  uploadInfo: function(e){
    // 获取关键词
    var str = [];
    var text="";
    var openid;
    for (var i = 0; i < this.data.labels.length; i++) {
      for (var j = 0; j < this.data.labels[i].content.length; j++) {
        if (this.data.labels[i].content[j].choose) {
          str.push(this.data.labels[i].content[j].name);
        }
      }
    }
    console.log(str);
    // 获取内容
    text = e.detail.value.textarea
    console.log(text);
    if(str.length==0){
      wx.showToast({
        title: '请选择至少一个标签',
        icon: 'none',
        duration: 1000
      })
      return;
    }
    if(text==""){
      wx.showToast({
        title: '详细描述不能为空',
        icon: 'none',
        duration: 1000
      })
      return;
    }
    db.collection('information_table').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        keyword: str,
        content: text,
        state:false,
        time: util.formatTime(new Date())
      },
      success(res) {
        // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
        console.log(res)
      }
    })

    wx.showToast({
      title: '成功',
      icon: 'success',
      duration: 2000,
      success:function(){
        setTimeout(function(){
          wx.navigateBack({
            delta: 1
          })
        },1000)
      }
    })
  },
  goBack: function(){
    wx.navigateBack({
      delta: 1
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