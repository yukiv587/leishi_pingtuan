//index.js
//获取应用实例
const app = getApp();

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    userGroupInfo: {}
  },

  onLoad: function () {
    console.log(app.globalData.userInfo);
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },

  onShow: function () {
    this.getRecords();
    if (!app.globalData.userInfo) {
      app.getUserInfo();
    } else {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    }
  },

  //获取用户基本信息
  getUserInfo: function () {
    app.getUserInfo();
  },

  //获取记录
  getRecords: function () {
    // app.showLoading();
    wx.request({
      url: getApp().globalData.apiUrl + 'records',
      method: 'GET',
      header: {
        'Accept': '*/*'
      },
      data: {
        sessionid: app.globalData.sessionId
      },
      success: res => {
        wx.hideLoading();
        var userGroupInfo = res.data.data;
        app.globalData.userGroupInfo = userGroupInfo;
        var totalAmount = 0;
        for (let i = 0; i < userGroupInfo.orders.length; i++) {
          if (userGroupInfo.orders[i].state == 2) {
            totalAmount += Number(userGroupInfo.orders[i].amount) * 100;
          }
        }

        this.setData({
          userGroupInfo: {
            myGroup: userGroupInfo.mygroups.length,
            joinGroup: userGroupInfo.joingroups.length,
            totalAmount: totalAmount / 100
          }
        })
      }
    })
  },
})
