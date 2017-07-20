# GDUT-GPA-Calculator-WeixinAPP
微信小程序：GDUT绩点计算器
## 微信小程序编译说明
### 无自己的备案域名
微信小程序非得用已备案的域名，不能用IP地址和未备案的域名。所以我采用了下面的方案：
使用weixin.hotapp.weixin提供的转发服务，需要先在上面注册账号，然后拿到hotappkey，填到hotapp-conf.js里面即可。
`hotapp.request`里的url按实际修改。
### 有自己的备案域名
把`hotapp.request`改为`wx.request`，url按实际修改。如果不需要用到hotapp的统计功能，可以删掉hotapp的js和引用代码，
## 服务器端部署说明
代码在Python3.5下测试通过。直接运行即可。可以修改端口号，需要在小程序源码上的url做对应修改。
