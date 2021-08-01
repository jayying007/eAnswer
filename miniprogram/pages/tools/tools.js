const app = getApp()
const db = wx.cloud.database()

Page({
  data: {
    kinds:[
      {
        name:'录音',
        tools:[
          {
            toolName:'开始录音',
            iconPath:'../../imgs/luyin.png',
            url:'../audio/audio'
          },
          {
            toolName:'录音记录',
            iconPath: '../../imgs/jilu.png',
            url:'../records/records'
          }
        ]
      },
      {
        name:'急救电话',
        tools:[
          {
            toolName:'医院电话',
            iconPath: '../../imgs/yiyuan.png',
            url:'../hospitalPhone/hospitalPhone'
          },
          {
            toolName:'一键拨打',
            iconPath: '../../imgs/dianhua.png',
            url: 'callNow'
          },
          {
            toolName:'联系人设置',
            iconPath: '../../imgs/lianxiren.png',
            url: '../contact/contact'
          }
        ]
      },
      {
        name:'紧急处理',
        tools:[
          {
            toolName:'急救知识',
            iconPath: '../../imgs/tushu.png',
            url: '../knowledge/knowledge'
          },
          // {
          //   toolName:'拍照分析',
          //   iconPath: '../../imgs/paizhao.png'
          // }
        ]
      },
      // {
      //   name:'其他',
      //   tools:[
      //     {
      //       toolName:'其他',
      //       iconPath: '../../imgs/qita.png'
      //     }
      //   ]
      // }
    ]
  },
  onLoad: function () {
    //console.log(this.data.kinds);
  },
  select: function(e){
    var link = e.currentTarget.dataset['url'];
    if (link == 'callNow') {
      db.collection("user_table").where({
        _openid: app.globalData.openid
      }).get({
        success(res){
          var number = res.data[0].contact;
          wx.makePhoneCall({
            phoneNumber: number // 仅为示例，并非真实的电话号码
          })
        }
      })
    }
    else {
      wx.navigateTo({
        url: link,
      })
    }
  }
})  