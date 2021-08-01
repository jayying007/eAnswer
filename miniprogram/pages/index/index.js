// pages/index/index.js
let app = getApp();
const db = wx.cloud.database()

Page({
  data: {
    staticUrl: app.staticUrl,
    filterLayer: true,//悬浮层不显示
    popmenuShow: true,//悬浮按钮的菜单是否显示
    searchKey:"",//搜索栏的内容
    searchAll: true,
    question:null,
    selectItem:false,
    labels: [
      {
        kind: '头部',
        content: [
          {
            name:'头晕',
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
  onLoad: function(){
    
    let that = this;
    db.collection('information_table').where({
    })
      .get({
        success(res) {
          // console.log(res.data);
          that.setData({
            question:res.data
          })
        }
      })
  },
  onShow: function () {
    this.setData({
      searchAll: true,
    })
    let that = this;
    db.collection('information_table').where({
    })
      .get({
        success(res) {
          // console.log(res.data);
          that.setData({
            question: res.data
          })
        }
      })
  },
  //隐藏悬浮层
  filter: function(){
    this.setData({
      filterLayer: !this.data.filterLayer,
    })
  },
  //评论筛选样式变化
  selAll: function(){
    this.setData({
      searchAll:true,
    })
  },
  sel: function(){
    this.setData({
      searchAll:false,
    })
  },
  //筛选内容显示到搜索框
  filterItem: function(){
    let that = this;
    var str="";
    var arr=[];
    for(var i=0;i<this.data.labels.length;i++){
      for(var j=0;j<this.data.labels[i].content.length;j++){
        if(this.data.labels[i].content[j].choose){
          str = str + this.data.labels[i].content[j].name+" ";
          arr.push(this.data.labels[i].content[j].name);
        }
      }
    }
    this.setData({
      searchKey: str,
      filterLayer: true
    })
    console.log(this.data.searchKey,this.data.searchAll?'全部':'专家');

    // 重新获取全部数据
    db.collection('information_table').get({
        success(res){
          console.log(res);
          that.setData({
            question:res.data
          })
          var post_que = [];
          // 筛选数据
          if (that.data.searchAll == true) {
            if(arr.length==0){
              post_que=that.data.question;
            }
            else{
              for (var i = 0; i < that.data.question.length; i++) {
                for (var j = 0; j < arr.length; j++)
                  if (that.data.question[i].keyword.indexOf(arr[j]) != -1) {
                    post_que.push(that.data.question[i]);
                    break;
                  }
              } 
            }
          }
          else {
            for (var i = 0; i < that.data.question.length; i++) {
              if (that.data.question[i].state == true) {
                if(arr.length==0)
                  post_que.push(that.data.question[i]);
                else{
                  for (var j = 0; j < arr.length; j++)
                    if (that.data.question[i].keyword.indexOf(arr[j]) != -1) {
                      post_que.push(that.data.question[i]);
                      break;
                    }
                }
              }
            }
          }
          that.setData({
            question: post_que
          })
          console.log(that.data.question);
        }
    })
    

  },
  clearAllItem:function(){
    for (var i = 0; i < this.data.labels.length; i++) {
      for (var j = 0; j < this.data.labels[i].content.length; j++) {
        if (this.data.labels[i].content[j].choose == true) {
          const kk = 'labels['+i+'].content['+j+'].choose';
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
  clickItem: function(e){
    var selected=0;
    var cancel=false;
    
    var first = e.currentTarget.dataset['first'];
    var second = e.currentTarget.dataset['second'];

    for(var i=0;i<this.data.labels.length;i++)
    {
      for(var j=0;j<this.data.labels[i].content.length;j++)
      {
        if(this.data.labels[i].content[j].choose==true){
          selected++;
          if(i==first&&j==second)cancel=true;
        }
      }
    }
    if(selected<5||cancel)
    {
      const kk = 'labels[' + first + '].content[' + second + '].choose';

      this.setData({
        [kk]: !this.data.labels[first].content[second].choose,
      });
    }else{
      wx.showToast({
        title: '最多可选5个标签',
        icon: 'none',
        duration: 1000
      })
    }
    
    selected=0;
    for (var i = 0; i < this.data.labels.length; i++) {
      for (var j = 0; j < this.data.labels[i].content.length; j++) {
        if (this.data.labels[i].content[j].choose == true) {
          selected++;
        }
      }
    }
    if(selected==0){
      this.setData({
        selectItem:false,
      })
    }else{
      this.setData({
        selectItem:true,
      })
    }

  },
  detail: function(e){
    // console.log(e.currentTarget.dataset['item']);
    var item = e.currentTarget.dataset['item'];
    // console.log(item.keyword);
    wx.navigateTo({
      url: '../detail/detail?&id='+item._id+'&openID='+item._openid+'&title='+item.keyword+'&content='+item.content+'&time='+item.time,
    })
  },
  addQuestion: function(){
    this.setData({
      popmenuShow:true,
    })
    wx.navigateTo({
      url: '../addQuestion/addQuestion'
    })
  },
  askAI: function(){
    wx.navigateTo({
      url: '../askAI/askAI',
    })
  },
  showmenu: function () {
    this.setData({ popmenuShow: !this.data.popmenuShow });
  }
})