// pages/index/index.js
//获取应用实例
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    clicktag: 0
  },

  /**
     * 生命周期函数--监听页面加载
     */
  onLoad: function (options) {
    // 登录
    // wx.login({
    //   success: res => {
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //     if (res.code) {
    //       //发起网络请求
    //       wx.request({
    //         url: getApp().globalData.apiUrl + 'login',
    //         method: 'POST',
    //         header: {
    //           'Accept': '*/*'
    //         },
    //         data: {
    //           code: res.code
    //         },
    //         success: res => {
    //           console.log('wx.login');
    //           if (res.data.status) {
    //             console.log(res.data.status);
    //             app.globalData.sessionId = res.data.data.sessionid;
    //             app.globalData.curUserInfo = res.data.data;
    //             console.log(app.globalData.sessionId);
               

    //             // 获取用户信息
    //             wx.getSetting({
    //               success: res => {
    //                 if (res.authSetting['scope.userInfo']) {
    //                   // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //                   wx.showLoading({ title: '加载中', mask: true });
    //                   wx.getUserInfo({
    //                     success: res => {
    //                       wx.hideLoading();
    //                       app.globalData.userInfo = res.userInfo;
                          
    //                       console.log(res.userInfo);
    //                       app.saveUserinfo(res.userInfo);

    //                       // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //                       // 所以此处加入 callback 以防止这种情况
    //                       if (app.userInfoReadyCallback) {
    //                         app.userInfoReadyCallback(res);
    //                       }
    //                     }
    //                   })
    //                 } else {
    //                   app.getUserInfo();
    //                 }
    //               }
    //             });
    //           }
    //         }
    //       })
    //     }
    //   }
    // });

    wx.getSetting({
      success: res => {
        if (!res.authSetting['scope.userInfo']) {
          app.getUserInfo();
        }
      }
    });


  },

  /**
   * 跳转拼团列表页
   */
  navigateToList: function () {
    if (!app.globalData.userInfo) {
      app.getUserInfo();
      return false;
    }
    if (!app.globalData.perfection){
      app.msgModal("请先在【我的】——【个人信息】中完善个人资料！");
      return false;
    }
    if (this.data.clicktag == 0) {
      this.data.clicktag = 1;
      wx.navigateTo({
        url: '/pages/activity/list',
      });
    }
    setTimeout(() => { this.data.clicktag = 0 }, 500);
  },


})