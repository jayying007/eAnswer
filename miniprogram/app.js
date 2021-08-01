//app.js
App({
  onLaunch: function () {
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    

    wx.cloud.callFunction({
      name:'login',
      complete:res=>{
        // console.log(res.result.openid);
        var openid=res.result.openid;
        this.globalData.openid=openid;
        const db = wx.cloud.database()
        // 获取用户在该小程序的信息，若未使用过，则添加该用户
        db.collection('user_table').where({
          _openid: openid
        }).get({
          success(res) {
            // console.log(res.data.length);
            if (res.data.length==0)
            {
              db.collection('user_table').add({
                data:{
                  state:false
                },
                success(res){
                  console.log(res)
                }
              })
            }
          }
        })
      }
    })

  },
  globalData: {
    userInfo: null,
    openid:null
  },
  staticUrl: "https://staticimgs.oss-cn-beijing.aliyuncs.com/" 
})
