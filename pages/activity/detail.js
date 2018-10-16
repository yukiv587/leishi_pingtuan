// pages/activity/detail.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    groupInfo: null,
    isJoin: false,
    options: null,
    isEdit: false,
    isCreated: false,
    difference: 0 //差额
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.data.options = options;

    var timer = setInterval(() => {
      if (app.globalData.curUserInfo.id) {
        this.getGroup(options);
        clearInterval(timer);
      }
    }, 500);

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
    if (this.data.isEdit) {
      this.getGroup(this.data.options);
      this.data.isEdit = false;
    }

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
    this.getGroup(this.data.options);
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
    return {
      title: this.data.groupInfo.title,
      path: '/pages/activity/detail?id=' + this.data.groupInfo.sn,
      success: res => { }
    }
  },

  /**
    * 修改信息
    */
  eidtNotice: function () {
    this.data.isEdit = true;
    wx.navigateTo({
      url: '/pages/activity/edit?id=' + this.data.groupInfo.id + '&content=' + this.data.groupInfo.content
    })
  },

  /**
   * 查看目标奖励
   */
  goTargetReward: function () {
    wx.navigateTo({
      url: '/pages/activity/target-reward'
    })
  },

  /**
  * 获取详情
  */
  getGroup: function (sn) {
    app.showLoading();
    wx.request({
      url: getApp().globalData.apiUrl + 'group',
      method: 'GET',
      header: {
        'Accept': '*/*'
      },
      data: sn,
      success: res => {
        console.log(res.data.data);
        if (res.data.data.createdby.id == app.globalData.curUserInfo.id) {
          this.setData({
            isCreated: true
          });
        }

        //差额
        var difference;
        if (res.data.data.next_milestone) {
          var difference = res.data.data.next_milestone.amount * 100 - res.data.data.totalamount * 100;
        } else {
          difference = 0;
        }


        //判断排行榜创建者
        Array.from(res.data.data.joinusers, item => {
          if (item.id == res.data.data.createdby.id) {
            item.iscreated = true;
          }
          if (item.id == app.globalData.curUserInfo.id) {
            item.isCurr = true;
            this.setData({
              isJoin: true
            });
          }
        });
        setTimeout(() => { wx.hideLoading() }, 500);
        this.setData({
          groupInfo: res.data.data,
          difference: difference / 100
        });
      }
    })
  },


  /**
  * 加入充值
  */
  joinGroup: function () {

    //活动结束
    // app.msgModal("活动已结束！");
    // return false;
    
    if (!app.globalData.perfection) {
      app.msgModal("请先在【我的】——【个人信息】中完善个人资料！");
      return false;
    };

    app.showLoading();
    wx.request({
      url: getApp().globalData.apiUrl + 'group',
      method: 'GET',
      header: {
        'Accept': '*/*'
      },
      data: this.options,
      success: res => {
        console.log(res.data.data);
        wx.hideLoading();
        if (res.data.data.joinusers.length >= res.data.data.limit) {
          app.msgModal('该团人数已满!');
          return false;
        }
        wx.navigateTo({
          url: '/pages/activity/recharge?sn=' + this.data.groupInfo.sn
        })
      }
    })
  },

  /**
  * 充值
  */
  goinGroup: function () {

    // //活动结束
    // app.msgModal("活动已结束！");
    // return false;
    
    if (!app.globalData.perfection) {
      app.msgModal("请先在【我的】——【个人信息】中完善个人资料！");
      return false;
    }
    wx.navigateTo({
      url: '/pages/activity/recharge?sn=' + this.data.groupInfo.sn
    })
  }

})