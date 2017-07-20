// pages/login/login.js
//思路：打开窗口时用微信id请求验证码，然后显示验证码。
//     用户点击登录后再将微信id、学号、密码、验证码发送到服务器，读取返回值
//     如果返回登录成功，则跳到查询绩点的页面，否则提示登录失败。
var hotapp = require('../../utils/hotapp.js');
var openid = hotapp.getOpenID();
var yzm_t = Date.parse(new Date());
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgsrc:''
  },

  /**
   * 提交登录信息
   */
  formSubmit: function (e) {
    var that = this;
    console.log(e.detail.value["account"], e.detail.value["pwd"]);
    hotapp.request({
      useProxy: true,
      url: 'http://139.129.20.107:8081/login', // 需要代理请求的网址
      data: {
        wxid: openid,
        account: e.detail.value["account"],
        pwd: e.detail.value["pwd"],
        yzm: e.detail.value["yzm"]
      },
      header: {
        'content-type': 'application/json'
      },
      complete: function (res) {
        console.log(res.data)
        if (res.data =='登录成功') {
          //转到绩点页面
          wx.navigateTo({
            url: '../query/query'
          })
        }else{
          wx.showModal({
            title: '提示',
            content: res.data,
            showCancel: false,
            success: function (res) {
              //刷新验证码
              hotapp.request({
                useProxy: true,
                url: 'http://139.129.20.107:8081/',
                data: {
                  wxid: openid
                },
                header: {
                  'content-type': 'application/json'
                },
                complete: function (res) {
                  console.log(res.data);
                  that.setData({ imgsrc: 'http://139.129.20.107:8081' + res.data +'?t='+yzm_t})
                  yzm_t++
                }
              })
            }
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    //获取验证码
    console.log(openid)
    hotapp.request({
      useProxy: true,
      url: 'http://139.129.20.107:8081/',
      data: {
        wxid: openid
      },
      header: {
        'content-type': 'application/json'
      },
      complete: function (res) {
        console.log(res.data);
        that.setData({ imgsrc: 'http://139.129.20.107:8081' + res.data + '?t=' + yzm_t })
        yzm_t++
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    /*
    wx.navigateTo({
      url: '../query/query'
    })//*/
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