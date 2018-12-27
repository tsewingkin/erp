// miniprogram/pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    passWd: '',
    show: false

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },


  bindPwdInput: function(e) {
    this.setData({
      passWd: e.detail.value
    })
  },
  onLoginTap: function(e) {
    var that = this;
    // 获取用户信息
    if (!this.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
    // 调用云函数
    wx.cloud.callFunction({
      name: 'checkPassWd',
      data: {
        passWd: that.data.passWd
      },
      success: res => {
        console.log('[云函数] [checkPassWd] result: ', res.result.text)
        // 密码正确，已授权
        if (res.result.code == 0) {
          wx.redirectTo({
            url: '../home/home',
          })
        }
        // 密码正确，未授权
        if (res.result.code == 1) {
          that.setData({
            show: true
          })
        }
        // 密码错误
        if (res.result.code == 2) {
          wx.redirectTo({
            url: '../fun/fun',
          })
        }
        wx.navigateTo({
          url: '../error/error',
        })
      },
      fail: err => {
        console.error('[云函数] [checkPassWd] 调用失败', err)
        wx.navigateTo({
          url: '../console/console',
        })
      }
    })

  },



})