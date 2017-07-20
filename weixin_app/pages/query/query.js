// pages/query/query.js
var hotapp = require('../../utils/hotapp.js');
var openid = hotapp.getOpenID();

const years = []
const terms = ['01', '02']
for (let i = 2010; i <= 2020; i++) {
  years.push(i)
}
var xueqi='201601'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    years: years,
    terms: terms,
    value: [6, 0],
    text: '本学期平均学分绩点：'
  },


  /**
  * 获取平均学分绩点
  */
  formSubmit: function (e) {
    var that = this;
    console.log(xueqi);
    that.setData({
      text: '本学期平均学分绩点：正在查询……'
    })
    hotapp.request({
      useProxy: true,
      url: 'http://139.129.20.107:8081/calc',
      data: {
        wxid: openid,
        xueqi: xueqi
      },
      header: {
        'content-type': 'application/json'
      },
      complete: function (res) {
        console.log(res.data)
        if (res.statusCode == '200') {
          that.setData({
              text: '本学期平均学分绩点：' + res.data
          })
        }else{
          that.setData({
            text: '本学期平均学分绩点：没有该学期成绩' 
          })
        }
      }
    })
  },

  bindChange: function (e) {
    xueqi = e.detail.value[0] + 2010 + '0' + (e.detail.value[1] + 1)
  },

  //注销
  logout:function(){
    hotapp.request({
      useProxy: true,
      url: 'http://139.129.20.107:8081/logout',
      data: {
        wxid: openid
      },
      header: {
        'content-type': 'application/json'
      },
      complete: function (res) {
        console.log(res.data)
      }
    })
    wx.reLaunch({
      url: '../index/index'
    })
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

  }
})