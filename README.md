# GDUT-GPA-Calculator-WeixinAPP
微信小程序：GDUT绩点计算器
## 微信小程序编译说明
### 无自己的备案域名
微信小程序非得用已备案的域名，不能用IP地址和未备案的域名。如果你没有备案域名，可以采用下面的方案：
使用weixin.hotapp.weixin提供的转发服务，需要先在上面注册账号，然后拿到hotappkey，填到hotapp-conf.js里面即可。
把`wx.request`改为`hotapp.request`，url按实际修改。
### 有自己的备案域名
url按实际修改。
## 服务器端部署说明
代码在Python3.5下测试通过。直接运行即可。
