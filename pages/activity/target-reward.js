// pages/activity/target-reward.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    milestones : null,
    chineseIndex : {
      0 :"一",
      1: "二",
      2: "三",
      3: "四",
      4: "五",
      5: "六",
      6: "七"
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.milestones();
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
   * 返回
   */
  goback: function () {
    wx.navigateBack({
      delta: 1
    })
  },

  /**
  * 获取目标奖励
  */
  milestones: function () {
    app.showLoading();
    wx.request({
      url: getApp().globalData.apiUrl + 'milestones',
      method: 'GET',
      header: {
        'Accept': '*/*'
      },
      data: {},
      success: res => {
        // console.log(res);
        wx.hideLoading();
        this.setData({
          milestones: res.data.data,
        })
      }
    })
  }
})