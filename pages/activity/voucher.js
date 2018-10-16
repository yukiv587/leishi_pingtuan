// pages/activity/voucher.js
var timer;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    time: 3,
    sn: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.sn = options.sn;
    timer = setInterval(() => {
      if (this.data.time > 0) {
        this.data.time--;
        if (this.data.time == 0) {
          this.goTo();
        }
        this.setData({
          time: this.data.time
        })
      }
    }, 1000);
  },

  /**
   * 返回详细页
   */
  gobackDetail: function () {
    clearInterval(timer);
    this.goTo();
  },

  /**
   * 计算返回页数
   */
  goTo: function () {
    var routes = getCurrentPages();
    var hasDetail = routes.findIndex(function (value, index, arr) {
      console.log(value.route);
      return value.route == 'pages/activity/detail';
    });

    if (hasDetail != -1) {
      wx.navigateBack({
        delta: routes.length - hasDetail - 1
      });
    } else {
      wx.redirectTo({
        url: '/pages/activity/detail?id=' + this.data.sn
      })
    }
  }
});