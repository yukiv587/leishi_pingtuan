// pages/activity/list.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isScroll: true,
    orderList: true,
    groupList: []

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getGroups();
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
    this.getGroups();
    setTimeout(() => {
      wx.stopPullDownRefresh(); //停止下拉刷新
    }, 1000);
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
   * 排序列表切换
   */
  toggleOrderList: function () {
    var that = this;
    this.setData({
      orderList: !that.data.orderList,
    })
  },

  /**
   * 选择排序
   */
  radioChange: function (e) {
    this.getGroups(e.detail.value);
  }, 

  /**
   * 关键词搜索
   */
  keywordSearch: function(e) {
    if (e.detail.value.keywords == '') return false;
    this.getGroups('',e.detail.value.keywords);
  }, 

  /**
   * 获取拼团列表
   */
  getGroups: function (orderby, keyword, page, pagesize) {
    var data = {};
    data.orderby = orderby || '';
    data.keyword = keyword || '';
    data.page = page || 1;
    data.pagesize = pagesize || 99;
    console.log(data);
    app.showLoading();
    wx.request({
      url: getApp().globalData.apiUrl + 'groups',
      method: 'GET',
      header: {
        'Accept': '*/*'
      },
      data: data,
      success: res => {
        console.log(res);
        setTimeout(() => { wx.hideLoading() }, 500);
        this.setData({
          groupList: res.data.data,
        })
      }
    })
  },


  refesh : function(){
    this.getGroups();
  },

  activeFishied : function(){
    getApp().msgModal('活动已结束！');
  },
})
