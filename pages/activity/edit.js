// pages/activity/edit.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: null,
    content: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.setData({
      id: options.id,
      content: options.content
    });
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
  * 修改公告
  */
  edit: function (e) {
    app.showLoading();
    wx.request({
      url: getApp().globalData.apiUrl + 'update_group',
      method: 'POST',
      header: {
        'Accept': '*/*'
      },
      data: {
        sessionid: app.globalData.sessionid,
        id: this.data.id,
        content: e.detail.value.content
      },
      success: res => {
        wx.hideLoading();
        wx.showToast({
          title: '修改成功',
          icon: 'success',
          duration: 2000
        });

        setTimeout(() => {
          wx.navigateBack({
            delta: 1
          })
        }, 2000);
      }
    })
  },
})