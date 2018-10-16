// pages/activity/create.js
const app = getApp();
var limit = 50;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    peopleNumArray: [50, 40, 30],
    peopleNum: 0,
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

  },

  /**
   * 提交表单
   */
  formSubmit: function (e) {
    var data = {};
    data.title = e.detail.value.title;
    data.deadline = '2017-11-26';
    data.limit = limit;
    data.content = e.detail.value.content;

    if (!data.title) {
      app.msgModal('拼团标题不能为空！');
      return false;
    }

    if (!data.content) {
      app.msgModal('公告内容不能为空！');
      return false;
    }

    app.showLoading();
    wx.request({
      url: getApp().globalData.apiUrl + 'create_group',
      method: 'POST',
      header: {
        'Accept': '*/*'
      },
      data: {
        sessionid: app.globalData.sessionId,
        group: data
      },
      success: res => {
        wx.hideLoading();
        wx.showToast({
          title: '建团成功',
          icon: 'success',
          mask: true,
          duration: 2000
        });
        setTimeout(() => {
          wx.redirectTo({
            url: '/pages/activity/recharge?sn=' + res.data.data.sn
          })
        }, 2000);
      }
    })
  },

  /**
  * 人数
  */
  bindPeopleChange: function (e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value);
    this.setData({
      peopleNum: e.detail.value
    });
    limit = this.data.peopleNumArray[e.detail.value];
  }


})