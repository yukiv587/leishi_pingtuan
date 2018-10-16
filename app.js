//app.js
App({
  onLaunch: function() {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || [];
    logs.unshift(Date.now());
    wx.setStorageSync('logs', logs);

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
          //发起网络请求
          wx.request({
            url: getApp().globalData.apiUrl + 'login',
            method: 'POST',
            header: {
              'Accept': '*/*'
            },
            data: {
              code: res.code
            },
            success: res => {
              console.log('wx.login');
              if (res.data.status) {
                console.log(res.data.status);
                this.globalData.sessionId = res.data.data.sessionid;
                this.globalData.curUserInfo = res.data.data;
                console.log(this.globalData.sessionId);

                if (res.data.data.manager && res.data.data.manager && res.data.data.mobile) {
                  this.globalData.perfection = true;
                }

                // 获取用户信息
                wx.getSetting({
                  success: res => {
                    if (res.authSetting['scope.userInfo']) {
                      // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                      wx.showLoading({
                        title: '加载中',
                        mask: true
                      });
                      wx.getUserInfo({
                        success: res => {
                          wx.hideLoading();
                          this.globalData.userInfo = res.userInfo;

                          //保存用户信息
                          this.saveUserinfo(res.userInfo);

                          //获取审核信息
                          setInterval(()=>{
                            this.getRecords();
                          },10000);

                          // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                          // 所以此处加入 callback 以防止这种情况
                          if (this.userInfoReadyCallback) {
                            this.userInfoReadyCallback(res)
                          }
                        }
                      })
                    } else {
                      this.getUserInfo();
                    }
                  }
                });
              }
            }
          })
        }
      }
    })


    if (!wx.openSetting || !wx.getSetting || !wx.showLoading) {
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，请升级到最新微信版本后重试。'
      })
      return false
    }

  },

  /**
   * 公共全局变量
   */
  globalData: {
    userInfo: null,
    sessionId: null,
    curUserInfo: null,
    userGroupInfo: null,
    perfection: false, //资料是否完善
    
    // apiUrl: `https://www.leishichina.com/pt/api/v1/`,
    // uploadUrl: 'https://www.leishichina.com/pt/paycallback.php/index/upload',

    apiUrl: `https://xcx.leishipay.com/pt/api/v1/`,
    uploadUrl: 'https://xcx.leishipay.com/pt/paycallback.php/index/upload',
  
  },

  /**
   * 获取用户信息
   */
  getUserInfo: function() {
    wx.showLoading({
      title: '加载中',
      mask: true
    });
    wx.getUserInfo({
      success: res => {
        wx.hideLoading();
        this.globalData.userInfo = res.userInfo;

        console.log('保存用户信息');
        //保存用户信息
        this.saveUserinfo(res.userInfo);

        if (this.userInfoReadyCallback) {
          this.userInfoReadyCallback(res)
        }
      },
      fail: res => {
        wx.hideLoading();
        wx.showModal({
          title: '警告',
          cancelText: '不授权',
          confirmText: '授权',
          content: '若不授权登录，则无法参与拼团活动；点击重新获取授权，则可以重新使用；若点击不授权，后期还使用小程序，需在微信【发现】—【小程序】—删除【拼团活动】，重新搜索授权登录，方可使用。',
          success: res => {
            if (res.confirm) {
              this.reAuthorize();
            }
          }
        })
      }
    })
  },

  /**
   * 重新授权
   */
  reAuthorize: function() {
    wx.openSetting({
      success: res => {
        if (res.authSetting["scope.userInfo"]) {
          console.log('authorize');
          this.getUserInfo();
        }
      }
    })
  },

  /**
   * 存储用户信息
   */
  saveUserinfo: function(data) {
    console.log('存储用户信息');
    wx.request({
      url: getApp().globalData.apiUrl + 'save_userinfo',
      method: 'POST',
      header: {
        'Accept': '*/*'
      },
      data: {
        sessionid: this.globalData.sessionId,
        userinfo: data
      },
      success: function(res) {
        console.log(res);
      }
    })
  },

  /**
   * 提示弹框
   */
  msgModal: function(content, title) {
    wx.showModal({
      title: title || '提示',
      content: content,
      showCancel: false
    })
  },

  /**
   * 加载等待提示
   */
  showLoading: function(title) {
    wx.showLoading({
      title: title || '加载中',
      mask: true
    });
  },

  /**
   * 审核成功提示
   */
  getRecords: function() {
    wx.request({
      url: getApp().globalData.apiUrl + 'records',
      method: 'GET',
      header: {
        'Accept': '*/*'
      },
      data: {
        sessionid: getApp().globalData.sessionId
      },
      success: res => {
        console.log(res.data.data);
        let routes = getCurrentPages();
        let currentPage = routes[routes.length - 1] ;

        if (res.data.data.orders.find(n => n.send == 1 && n.state==2)){
          if (currentPage.route != 'pages/activity/pay-success') {
            wx.redirectTo({
              url: '/pages/activity/pay-success'
            })
          }
        }
      }
    })
  },
})