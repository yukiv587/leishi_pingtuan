// pages/activity/pay-success.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: {},
    order: {},
    currLevel: [],
    next: 0,
    list: [{
      sum: 5000,
      sum_str: '5000',
      jm: [
        '180元么么侠定制帽子1顶',
        '么么侠定制亲子套装1套',
        '雷氏讲师汇种子班学习名额 1名',
      ],
      jx: [
        '180元么么侠定制帽子1顶',
      ]
    },
    {
      sum: 12000,
      sum_str: '1.2万',
      jm: [
        '6800元 小儿推拿学习6天班 1名',
        '么么侠定制亲子套装 1套',
        '4800元么么侠小儿推拿拓客班名额 1名',
        '雷氏讲师汇种子班学习名额 1名',
      ],
      jx: [
        '6800元 小儿推拿学习6天班 1名',
        '么么侠定制帽子1顶',
      ]
    },
    {
      sum: 20000,
      sum_str: '2万',
      jm: [
        '么么侠定制帽子2顶',
        '么么侠定制亲子套装 1套',
        '9800元 徒手骨盆学习名额 1名',
        '4800元么么侠小儿推拿拓客班名额 1名',
        '雷氏讲师汇种子班学习名额 1名 ',
      ],
      jx: [
        '6800元 小儿推拿学习6天班 1名',
        '698元么么侠定制生日大礼包',
      ]
    },
    {
      sum: 40000,
      sum_str: '4万',
      jm: [
        '么么侠定制亲子套装 1套',
        '么么侠定制帽子2顶',
        '9800元 徒手骨盆学习名额 1名',
        '乳此多娇乳腺增生研修班学习名额 1名',
        '雷氏讲师汇种子班学习名额 1名',
        '4800元么么侠小儿推拿拓客班名额 1名',
      ],
      jx: [
        '9800元 徒手骨盆学习名额 1名',
        '么么侠定制亲子套装 1套',
        '雷氏讲师汇种子班学习名额 1名',
      ]
    },
    {
      sum: 60000,
      sum_str: '6万',
      jm: [
        '前5名直享产品2.6折',
        '旺财店务系统3年使用期+ 知名平板电脑1台',
        '紧盆密骨徒手骨盆学习名额1名',
        '180元么么侠定制帽子6顶',
        '雷氏讲师汇种子班学习名额 1名',
        '4800元么么侠小儿推拿拓客班名额 1名',
      ],
      jx: [
        '前5名直享产品2.6折',
        '1680元催乳实战指南10本',
        '小儿推拿6天班学习名额2名',
      ]
    },
    {
      sum: 100000,
      sum_str: '10万',
      jm: [
        '前5名直享产品2.5折',
        '19800元限量款么么侠千足金宝石/钻石项链1条',
        '698元么么侠2周岁生日大礼包',
        '19600元紧盆密骨徒手骨盆学习名额 2名',
        '小儿推拿6天班学习名额 1名 ',
        '乳此多娇乳腺增生研修班学习名额 1名',
        '4800元么么侠小儿推拿拓客班名额 1名',
        '雷氏讲师汇种子班学习名额 1名',
      ],
      jx: [
        '前5名直享产品2.5折',
        '180元么么侠定制帽子1顶',
        '19800元限量款么么侠千足金宝石/钻石项链1条',
        '小儿推拿6天班学习名额 2名',
        '雷氏讲师汇种子班学习名额 1名',
      ]
    }
    ],

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
    this.getRecords();
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
 * 回调显示
 */
  isPass() {
    let _this = this;
    wx.request({
      url: getApp().globalData.apiUrl + 'set_ordersend',
      method: 'POST',
      header: {
        'Accept': '*/*'
      },
      data: {
        sessionid: app.globalData.sessionId,
        orderid: _this.data.order.id
      },
      success: res => { }
    })
  },

  /**
 * 返回首页
 */
  gobackHome() {
    wx.switchTab({
      url: '/pages/index/index',
    })
  },

  /**
   * 获取信息
   */
  getRecords: function () {
    app.showLoading();
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
        let order = res.data.data.orders.find(n => n.send == 1 && n.state == 2);
        console.log('order', res.data.data);

        let totalamount = ((res.data.data.totalamount) * 1);
        console.log('totalamount', totalamount);
        let list = this.data.list;
        let currLevel = [];
        let next = 0;
        for (let i = 0; i < list.length; i++) {

          if (list[i].sum * 1 > totalamount && i == 0) {
            next = this.Subtr(totalamount, list[i].sum);
            break;
          }

          if (i + 1 == list.length && list[i].sum * 1 < totalamount) {
            currLevel = list[i];
            break;
          }

          if (list[i].sum * 1 <= totalamount && list[i + 1].sum * 1 >= totalamount) {
            currLevel = list[i];
            next = this.Subtr(list[i + 1].sum, totalamount);
          }
        }
        console.log('currLevel', currLevel);
        console.log('next', next);
        console.log('totalamount', totalamount);
        this.setData({
          info: res.data.data,
          order,
          currLevel,
          next,
        })

        //回调显示
        this.isPass();
      }
    })
  },


  //减法 
  Subtr(arg1, arg2) {
    var r1, r2, m, n;
    try {
      r1 = arg1.toString().split(".")[1].length
    } catch (e) {
      r1 = 0
    }
    try {
      r2 = arg2.toString().split(".")[1].length
    } catch (e) {
      r2 = 0
    }
    m = Math.pow(10, Math.max(r1, r2));
    n = (r1 >= r2) ? r1 : r2;
    return ((arg1 * m - arg2 * m) / m).toFixed(n);
  }

})