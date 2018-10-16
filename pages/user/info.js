// pages/user/info.js
//获取应用实例
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    gender: {
      '0': '未知',
      '1': '男',
      '2': '女'
    },
    userInfo2: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      userInfo: app.globalData.userInfo
    });

    wx.getStorage({
      key: 'userInfo2',
      success: function (res) {
        console.log(res.data)
        that.setData({
          userInfo2: res.data
        });
      }
    })
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
   * 提交保存
   */
  formSubmit: function (e) {
    console.log(e.detail.value);
    var mobile_preg = /^13[\d]{9}$|^14[\d]{9}$|^15[\d]{9}$|^17[\d]{9}$|^18[\d]{9}$/;
    if (!e.detail.value.realname){
      app.msgModal('真实姓名不能为空！');
      return false;
    }
    if (!e.detail.value.mobile) {
      app.msgModal('手机号不能为空！');
      return false;
    }

    if (!mobile_preg.test(e.detail.value.mobile)){
      app.msgModal('请输入正确手机号！');
      return false;
    }
    if (!e.detail.value.manager) {
      app.msgModal('市场经理不能为空！');
      return false;
    }
    app.showLoading();
    wx.request({
      url: getApp().globalData.apiUrl + 'save_userinfo',
      method: 'POST',
      header: {
        'Accept': '*/*'
      },
      data: {
        sessionid: app.globalData.sessionId,
        userinfo: e.detail.value
      },
      success: res => {
        console.log(res);
        wx.hideLoading();
        if (res.data.status) {
          app.globalData.perfection = true;
          wx.showToast({
            title: '保存成功',
            mark: true,
            icon: 'success',
            duration: 2000
          });

          //缓存数据
          wx.setStorage({
            key: "userInfo2",
            data: e.detail.value
          });

          setTimeout(() => {
            wx.navigateBack({
              delta: 1
            })
          }, 2000);

          this.setData({
            groupList: res.data.data,
          });
        }
      }
    })
  }
})