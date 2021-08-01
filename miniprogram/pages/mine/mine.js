// pages/index/jm.js
const app = getApp();
Page({
  data: {
    staticUrl: app.staticUrl,
    lists: [
      { img: '../../imgs/question.png', title: '我的提问', path: "../myQuestion/myQuestion", desc: "" },
      { img: '../../imgs/apply.png', title: '申请专家认证', path: "../applyExpert/applyExpert", desc: "" },
      { img: '../../imgs/message.png', title: '消息通知', path: "../msgNotice/msgNotice", desc: "" },
      { img: '../../imgs/answer.png', title: '我的回答', path: "../myAnswer/myAnswer", desc: "" },
      { img: '../../imgs/feedback.png', title: '意见反馈', path: "../feedback/feedback", desc: "" }
    ],
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  // getUserInfo: function (e) {
  //   console.log(e)
  //   app.globalData.userInfo = e.detail.userInfo
  //   this.setData({
  //     userInfo: e.detail.userInfo,
  //     hasUserInfo: true
  //   })
  // },
  onLoad: function () {
    
  }
})