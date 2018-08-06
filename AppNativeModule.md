## 分享模块

### module name: share

### 分享参数

shareInfo: JsonString
``` shareInfo   // 分享参数
{
    "type" : 31,                    // 分享类型31（选品推荐分享）
    "goodsId" : this.goodsId,       // 分享商品Id   -- 用于获取分享数据及数据统计
    "goodsName" : this.goodsName,   // 分享商品名称  -- 用于数据统计
}
```

### 无回调


### js function:

1、分享方法，兼容3.1.0

```js
share(shareInfo);
```

``` 示例代码 share
const share = weex.requireModule("share");
let shareObj = {
                    "type" : 31,
                    "goodsId" : this.goodsId,
                    "goodsName" : this.goodsName,
                };
if (share) {
    share.share(JSON.stringify(shareObj));
}
```


2、新分享方法

```js
share2(String type, String info);
```

``` 示例代码 share2
const share = weex.requireModule("share");
let newShareObj = {
                    "goodsId" : this.goodsId,
                    "goodsName" : this.goodsName,
                };
if (share) {
    share.share2("31",JSON.stringify(newShareObj));
}
```

### Obj-C

1、分享方法，兼容3.1.0

```Objective-C
- (void)share:(id)shareInfo;
```

2、新分享方法

```Objective-C
- (void)share2:(NSString *)type info:(id)shareInfo;
```

### Java

1、分享方法，兼容3.1.0

```Java
void share(Map shareInfo);
```

2、新分享方法

```Java
void share2(String type, Map params);
```


---


## 路由模块

### module name: YTRouter

### 参数

url: String // 路由地址

### 无回调


### js function:

```js
pushUrl(url);
```

### Obj-C

```Obj-C
- (void)pushUrl:(NSString *)url;
```

### Java

```Java
void pushUrl(String url);
```

---

## 用户信息模块

### module name: JXSGApp

### 参数


### js function:

1、兼容旧版，异步方法，只返回用户ID和sessionId

```js
//callback
//{
//    "appH5UserId" : 用户ID,
//    "appH5AccessToken" : token
//}
getParams(callback);
```

2、获取用户信息，同步方法，返回userId，sessionId和apiHost

```js
// 返回值是个对象包含三个属性
// appH5UserId 用户id
// appH5AccessToken sessionId
// apiHost 
getUserInfo()
```

```js 示例代码
// 这是一个同步方法
// test环境:"http://app-interface.jxsg.test/"     正式环境："https://app-interface.jxsg.com/"
const appInfo = weex.requireModule("JXSGApp");

let info = appInfo.getUserInfo();
let userInd= info.appH5UserId;
let accessToken = info.appH5AccessToken;
let host = info.apiHost;
```


3、打开微信

```js 无参数
appInfo.openWechat();
```

```js 示例代码
const appInfo = weex.requireModule("JXSGApp");
appInfo.openWechat();
```

4、打电话

```js
dialWithPhoneNumber(String phoneNum);
```

```js 示例代码
const appInfo = weex.requireModule("JXSGApp");
appInfo.dialWithPhoneNumber('110');
```



### Obj-C

1、兼容旧版，异步方法，只返回用户ID和sessionId

```Obj-c
- (void)getParams:(WXModuleKeepAliveCallback)callback;
```

2、获取用户信息，同步方法，返回userId，sessionId和apiHost

```Obj-C
WX_EXPORT_METHOD_SYNC(@selector(getUserInfo))

- (NSDictionary *)getUserInfo {
    NSDictionary *dic = @{@"appH5UserId":UserInstance.userId ?: @"", @"appH5AccessToken": [[NSUserDefaults standardUserDefaults] objectForKey:kSessionId]?:@"", @"apiHost": [NSString stringWithFormat:@"%@/", kBaseUrlStr]};
    return dic;
}
```

3、打开微信

```Obj-c
- (void)openWechat;
```

4、打电话

```Obj-c
- (void)dialWithPhoneNumber:(NSString *)phoneNum;
```


### Java

1、兼容旧版，异步方法，只返回用户ID和sessionId

```Java
void getParams(JSCallback callback);
```

2、获取用户信息，同步方法，返回userId，sessionId和apiHost

```Java
Map getUserInfo() {
    return {
        "appH5UserId": "用户ID",
        "appH5AccessToken": "access token",
        "apiHost": "当前环境host" //test环境:"http://app-interface.jxsg.test/"     正式环境："https://app-interface.jxsg.com/"
    }
}
```

3、打开微信

```Java
void openWechat();
```

4、打电话

```Java
void dialWithPhoneNumber(String phoneNum);
```


---
## 图片选择及上传模块

### module name: YTImagePicker

### 参数

#### 图片上传成功
```
success
{
    "imageUrl" : "图片路径",    // 相对路径，需要自己拼装图片的绝对路径  test环境："http://images.jxsg.test"   生产环境: "http://images.jxsg.com"
}

failure
{
    "msg": "msg"    // 失败原因
}

```

### js function:
```js
// success 成功回调
// failure 失败回调
imagePicker(success, failure);
```

``` js 调用示例
const picker = weex.requireModule("YTImagePicker");
picker.imagePicker((success){
    let imgPath = success.imageUrl;
}, (error) {
    let errorMsg = error.msg;
});
```


### Obj-c

``` Obj-C
// success 成功回调
// failure 失败回调
- (void)imagePicker:(WXModuleKeepAliveCallback)success failure:(WXModuleKeepAliveCallback)failure;
```


### Java

```Java
// 异步方法
Void imagePicker(success, failure);
```

---

## 系统信息模块（iOS only）

### module name: systemInfo



### js function:

1、同步方法，判断是否是iPhone X，返回bool值

```js
function isIphoneX();
```

```js 示例代码
const systemInfo = weex.requireModule('systemInfo');
let isX = systemInfo.isIphoneX();
```



2、修改状态栏颜色

```js
// style:"black":黑色       "white":白色
function modifyStatusBarStyle(String style);
```

```js 示例代码
const systemInfo = weex.requireModule('requireModule');
systemInfo.modifyStatusBarStyle('white');   // 把状态栏修改成白色
```


### Obj-C

1、同步方法，判断是否是iPhone X，返回bool值

```Obj-C
- (BOOL)isIphoneX;
```


2、修改状态栏颜色

```Obj-C
- (void)modifyStatusBarStyle:(NSString *)style;
```












