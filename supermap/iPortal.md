
### 获取 token
```
POST iportal/services/security/tokens.rjson
body
{
    "username":"runto",
    "password":"Runto1604",
    "clientType": "RequestIP",
    "expiration": 60
}
```

### 获取当前账号信息
```
GET iportal/web/mycontent/account.rjson?token=xxx
```