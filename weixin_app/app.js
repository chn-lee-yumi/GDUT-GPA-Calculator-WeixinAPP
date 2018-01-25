/*!
 * GDUT绩点计算器 v1.0.4 (https://github.com/chn-lee-yumi/GDUT-GPA-Calculator-WeixinAPP)
 * Copyright chn-lee-yumi
 * Licensed under the GPLv3 license
 */
//app.js
var hotapp = require('utils/hotapp.js');
hotapp.wxlogin(function (openID) {})
App({
  onLaunch: function() {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },

  getUserInfo: function(cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.getUserInfo({
        withCredentials: false,
        success: function(res) {
          that.globalData.userInfo = res.userInfo
          typeof cb == "function" && cb(that.globalData.userInfo)
        }
      })
    }
  },

  globalData: {
    userInfo: null
  }
})
