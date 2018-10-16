// pages/activity/recharge.js

const app = getApp();
var addUploadNum = 2;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isWeChatPay: false,
    uploadNum: 1,
    uploadArray: ['upload1'],
    uploadArrays: { 'img1': '' },
    amount: 0,
    groupsn: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.groupsn = options.sn;
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
   * 付款方式切换
   */
  paymentChange: function (e) {
    var that = this;
    that.setData({
      isWeChatPay: e.detail.value == 'wechat' ? true : false
    })
  },

  /**
   * 获取金额
   */
  getAmount: function (e) {
    console.log(e.detail);
    this.data.amount = e.detail.value;
    if (this.data.amount < 2000) {
      app.msgModal('单笔不能低于2000元');
    }
  },

  /**
    * 微信支付
    */
  weChatPayment: function (e) {
    var that = this;
    if (this.data.amount < 2000) {
      app.msgModal('单笔不能低于2000元');
      return false;
    }

    app.showLoading();
    wx.request({
      url: getApp().globalData.apiUrl + 'pay',
      method: 'POST',
      header: {
        'Accept': '*/*'
      },
      data: {
        sessionid: app.globalData.sessionId,
        groupsn: this.data.groupsn,
        paytype: 0,
        amount: this.data.amount
      },
      success: res => {
        wx.hideLoading();
        console.log(res);

        var appId = res.data.data.appid;
        var timeStamp = (Date.parse(new Date()) / 1000).toString();
        var pkg = 'prepay_id=' + res.data.data.prepay_id;
        var nonceStr = res.data.data.nonce_str;
        var MD5 = require('../../utils/md5.js');
        var key = 'jiaruleishi2017leishi1219puai126';

        var paySign = MD5.MD5('appId=' + appId + '&nonceStr=' + nonceStr + '&package=' + pkg + '&signType=MD5&timeStamp=' + timeStamp + "&key=" + key).toUpperCase();

        wx.requestPayment({
          'timeStamp': timeStamp,
          'nonceStr': nonceStr,
          'package': pkg,
          'signType': 'MD5',
          'paySign': paySign,
          'success': function (res) {
            console.log(res);
            if (res.errMsg == 'requestPayment:ok'){
              wx.showToast({
                title: '支付成功',
                icon: 'success',
                mask: true,
                duration: 2000
              });

              setTimeout(() => {
                that.goTo();
              }, 2000);
            }
          },
          'fail': function (res) {
            console.log(res);
          }
        });
      }
    })
  },

  /**
  * 线下付款
  */
  personPayment: function (e) {
    if (this.data.amount < 2000) {
      app.msgModal('单笔不能低于2000元');
      return false;
    }
    var imgpaths = [];
    for (var key in this.data.uploadArrays) {
      console.log(key, this.data.uploadArrays[key]);
      imgpaths.push(this.data.uploadArrays[key]);
    }
    console.log(imgpaths);
    console.log(this.data.uploadArrays);
    var path = imgpaths.join('|');
    console.log(path);

    if (!path) {
      app.msgModal('请上传支付凭证！');
      return false;
    }

    app.showLoading();

    wx.request({
      url: getApp().globalData.apiUrl + 'pay',
      method: 'POST',
      header: {
        'Accept': '*/*'
      },
      data: {
        sessionid: app.globalData.sessionId,
        groupsn: this.data.groupsn,
        paytype: 1,
        amount: this.data.amount,
        billimages: path,
      },
      success: res => {
        wx.hideLoading();
        console.log(res);
        if (res.data.status) {
          wx.showToast({
            title: '提交成功',
            icon: 'success',
            mask: true,
            duration: 2000
          });

          setTimeout(() => {
            wx.redirectTo({
              url: '/pages/activity/voucher?sn=' + this.data.groupsn
            })
          }, 2000);

        }
      }
    })

  },

  /**
  * 图片上传
  */
  uploadImg: function (e) {
    wx.chooseImage({
      count: 1,
      sizeType: 'compressed',
      success: res => {
        console.log(res);
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        console.log(tempFilePaths);
        app.showLoading('上传中');
        wx.uploadFile({
          url: getApp().globalData.uploadUrl,
          filePath: tempFilePaths[0],
          name: 'img',
          success: res => {
            wx.hideLoading();
            var data = res.data;
            console.log(data);
            data = JSON.parse(data);
            if (data.paths) {
              console.log(data.paths);
              this.data.uploadArrays[e.currentTarget.dataset.id] = data.paths;
              this.setData({
                uploadArrays: this.data.uploadArrays
              });
            }

          },
          fail: function (res) {
            wx.hideToast()
            getApp().msgModal('网络错误图片上传失败，请重试！');
          }
        })
      }
    })
  },

  /**
  * 添加上传选项
  */
  addUpload: function (e) {
    console.log(this.data.uploadArrays);
    //this.data.uploadArrays.push({[n]:''});
    this.data.uploadArrays['img' + addUploadNum] = '';
    this.setData({
      uploadArrays: this.data.uploadArrays
    });
    addUploadNum++;
  },


  /**
 * 移除上传选项
 */
  removeUpload: function (e) {
    delete this.data.uploadArrays[e.currentTarget.dataset.id]; //删除对应保存图片
    this.setData({
      uploadArrays: this.data.uploadArrays
    });
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
        url: '/pages/activity/detail?id=' + this.data.groupsn
      })
    }
  }

});




