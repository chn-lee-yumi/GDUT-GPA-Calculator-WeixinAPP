import json
import threading
import time

import requests
from flask import *

global_cookies = {}  # 用来储存cookies

app = Flask(__name__)
app.secret_key = '.DUTr98j/GDUT3yX R~XHHnia_sbA0ZH!jmN]gdutLWX/,?RT(*&h.dut^%$_W'


def startweb():
    app.run(host='0.0.0.0', port=443, ssl_context=('server.crt', 'server.key'))


@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        # 获取微信id
        wxid = request.form['wxid']
        # 获取验证码
        tmp0 = requests.get("http://222.200.98.147/")
        global_cookies[wxid] = tmp0.cookies
        tmp1 = requests.get("http://222.200.98.147/yzm?d=" + str(int(time.time)), cookies=global_cookies[wxid])
        file_object = open("static/" + wxid + '.jpg', 'wb')
        try:
            file_object.write(tmp1.content)
        finally:
            file_object.close()
        return url_for('static', filename=wxid + '.jpg')  # 返回验证码的地址
    else:  # 微信APP使用post时不知道为什么识别出错，所以采用get方法处理
        # 获取微信id
        wxid = request.args.get('wxid')
        if wxid is None: wxid = 'test_id'  # 微信审核的人好像没有wxid，就会造成写入验证码图片出错
        # 获取验证码
        tmp0 = requests.get("http://222.200.98.147/")
        global_cookies[wxid] = tmp0.cookies
        tmp1 = requests.get("http://222.200.98.147/yzm", cookies=global_cookies[wxid])
        file_object = open("static/" + wxid + '.jpg', 'wb')
        try:
            file_object.write(tmp1.content)
        finally:
            file_object.close()
        return url_for('static', filename=wxid + '.jpg')  # 返回验证码的地址


@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        # 获取微信id、学号、密码、验证码
        wxid = request.form['wxid']
        account = request.form['account']
        pwd = request.form['pwd']
        verifycode = request.form['yzm']
        # 登录教务系统
        datas = {
            "account": account,
            "pwd": pwd,
            "verifycode": verifycode
        }
        tmp0 = requests.post("http://222.200.98.147/login!doLogin.action", cookies=global_cookies[wxid], data=datas)
        if json.loads(tmp0.text)["status"] == "y":
            return "登录成功"
        else:
            return "密码或验证码错误"
    else:
        # 获取微信id、学号、密码、验证码
        wxid = request.args.get('wxid')
        if wxid is None: wxid = 'test_id'
        account = request.args.get('account')
        pwd = request.args.get('pwd')
        verifycode = request.args.get('yzm')
        # 登录教务系统
        datas = {
            "account": account,
            "pwd": pwd,
            "verifycode": verifycode
        }
        tmp0 = requests.post("http://222.200.98.147/new/login", cookies=global_cookies[wxid], data=datas)
        print(tmp0.text)
        if json.loads(tmp0.text)["code"] == "0":
            return "登录成功"
        else:
            return json.loads(tmp0.text)["message"]


@app.route('/calc', methods=['GET', 'POST'])
def calc():
    # if request.method == 'POST':
    #    # 获取微信id、学期
    #    wxid = request.form['wxid']
    #    xueqi = request.form['xueqi']
    # else:
    # 获取微信id、学期 目前程序在用get
    wxid = request.args.get('wxid')
    if wxid is None: wxid = 'test_id'
    xueqi = request.args.get('xueqi')
    xuenian = request.args.get('xuenian')
    xnxqdm = xuenian + xueqi
    if xueqi == '00':
        (xuefenjidian_sum, xuefen_sum) = get_mark(xuenian + '01', wxid)
        (xuefenjidian_sum2, xuefen_sum2) = get_mark(xuenian + '02', wxid)
        xuefenjidian_avg = (xuefenjidian_sum + xuefenjidian_sum2) / (xuefen_sum + xuefen_sum2)
    else:
        (xuefenjidian_sum, xuefen_sum) = get_mark(xnxqdm, wxid)
        xuefenjidian_avg = xuefenjidian_sum / xuefen_sum
    return ("%.5f" % xuefenjidian_avg)


@app.route('/logout', methods=['GET', 'POST'])
def logout():
    if request.method == 'POST':
        return "0"
    else:
        # 获取微信id
        wxid = request.args.get('wxid')
        if wxid is None: wxid = 'test_id'
        global_cookies.pop(wxid)
        return "注销成功！"


def get_mark(xnxqdm, wxid):
    # 登录教务系统
    datas = {
        "xnxqdm": xnxqdm
    }
    tmp0 = requests.post("http://222.200.98.147/xskccjxx!getDataList.action", cookies=global_cookies[wxid],
                         data=datas)
    json_score = json.loads(tmp0.text)
    jidian_sum = 0
    xuefen_sum = 0
    xuefenjidian_sum = 0
    for tmp0 in json_score["rows"]:
        jidian_sum += float(tmp0["cjjd"])
        xuefen_sum += float(tmp0["xf"])
        xuefenjidian_sum += float(tmp0["cjjd"]) * float(tmp0["xf"])
    return (xuefenjidian_sum, xuefen_sum)


if __name__ == '__main__':
    threading.Thread(target=startweb, name="线程_flask").start()
    while (1):
        time.sleep(99999)
