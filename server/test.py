import requests

a = requests.post("http://localhost:8081/", data={"wxid": "666666"})
print(a.text)
account = input()
pwd = input()
yzm = input()
a = requests.post("http://localhost:8081/login",
                  data={"wxid": "666666", "account": account, "pwd": pwd, "yzm": yzm})
print(a.text)
a = requests.post("http://localhost:8081/calc", data={"wxid": "666666", "xueqi": "201601"})
print(a.text)
