
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

### 获取所有角色
```
GET iportal/manager/security/roles.rjson?token=xx..
```