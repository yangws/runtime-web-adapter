# RAL 接口说明

该文档中列举了全部可供调用的 RAL 层接口

如未补充说明，相关 API 说明可查阅 https://developers.weixin.qq.com/minigame/dev/api/



## 基础

### 系统

#### ral.env

**env 属性的属性说明**

| 属性           | 键值类型 | 说明                                               |
| :------------- | :------- | :------------------------------------------------- |
| USER_DATA_PATH | string   | 用户文件目录路径，开发者拥有对这个目录的读写权限。 |



#### ral.getSystemInfo(Object object)

#### object ral.getSystemInfoSync()

**getSystemInfo(Sync) 返回值支持的属性说明**

| 属性                   | 键值类型 | 说明                     |
| :--------------------- | :------- | :----------------------- |
| brand                  | string   | 手机品牌                 |
| model                  | string   | 手机型号                 |
| pixelRatio             | number   | 设备像素比               |
| screenWidth            | number   | 屏幕宽度，单位px         |
| screenHeight           | number   | 屏幕高度，单位px         |
| windowWidth            | number   | 可使用窗口宽度，单位px   |
| windowHeight           | number   | 可使用窗口高度，单位px   |
| statusBarHeight        | number   | 状态栏的高度，单位px     |
| language               | string   | 系统语言                 |
| coreVersion            | string   | 客户端基础库版本         |
| system                 | string   | 操作系统版本             |
| platform               | string   | 客户端平台               |
| cameraAuthorized       | boolean  | 是否有摄像头权限         |
| locationAuthorized     | boolean  | 是否有定位权限           |
| microphoneAuthorized   | boolean  | 是否有麦克风权限         |
| notificationAuthorized | boolean  | 是否有通知权限           |
| locationEnabled        | boolean  | 地理位置系统开关是否打开 |
| wifiEnabled            | boolean  | Wi-Fi 系统开关是否打开   |
| safeArea               | Object   | 在竖屏正方向下的安全区域 |

**补充说明**

1. pixelRatio 表示物理像素 / 逻辑像素。不同平台对该属性的支持程度不同，在 RAL 层约定 pixelRatio 与 screenWidth(screenHeight) 的乘积为设备实际的分辩率(单位：物理像素)。 
2. screenWidth 表示屏幕水平方向的长度(单位:逻辑像素)， screenHeight 表示屏幕竖直方向的长度。当设备的方向发生旋转时，screenWidth 与 screenHeight 的返回值将发生变化。 
3. windowWidth 表示游戏的可使用窗口水平方向的长度(单位:逻辑像素)，windowHeight 表示竖直方向的长度。当窗口的方向发生旋转时，windowWidth 与 windowHeight 的返回值将发生变化。当游戏设置 canvas 宽高超出该值时， 会导致 canvas 显示不全。

windowWidth(windowHeight) 与 screenWidth(screenHeight) 返回值不一定相同，例如当游戏运行在刘海屏设备上，或者以悬浮窗方式（显示区域只占屏幕一部分）运行。 




### 生命周期

#### ral.onShow(function callback)

与微信小游戏不同， ral.onShow 传入的 callback 函数无输入参数

#### ral.offShow(function callback)

#### ral.onHide(function callback)

#### ral.offHide(function callback)



### 分包加载

#### LoadSubpackageTask ral.loadSubpackage(Object object)



## 界面

### 窗口

#### ral.onWindowResize(function callback)

#### ral.offWindowResize(function callback)



## 网络

#### DownloadTask ral.downloadFile(Object object)

__*success 回调函数的参数*__

- Object res: 返回下载信息

__res 的属性说明__

| 属性         | 键值类型 | 说明                                                         |
| :----------- | :------- | :----------------------------------------------------------- |
| tempFilePath | string   | 临时文件路径。没有传入 `filePath` 指定文件存储路径时会返回，下载后的文件会存储到临时目录 |
| filePath     | string   | 用户文件路径。传入 `filePath` 时会返回，跟传入的 `filePath` 一致 |
| statusCode   | number   | 服务器返回的 HTTP 状态码                                     |



## 渲染

### 画布

#### ral.createCanvas()



### 字体

#### string ral.loadFont(string path)



### 帧率

#### ral.setPreferredFramesPerSecond(number fps)



### 图片

#### ral.createImage()



## 媒体

### 音频

#### InnerAudioContext ral.createInnerAudioContext()



## 设备

### 键盘

#### ral.onKeyboardInput(function callback)

#### ral.offKeyboardInput(function callback)

#### ral.onKeyboardConfirm(function callback)

#### ral.offKeyboardConfirm(function callback)

#### ral.onKeyboardComplete(function callback)

#### ral.offKeyboardComplete(function callback)

#### ral.showKeyboard(Object object)

#### ral.hideKeyboard(Object object)

#### ral.updateKeyboard(Object object)



### 触摸

#### ral.onTouchStart(function callback)

#### ral.offTouchStart(function callback)

#### ral.onTouchMove(function callback)

#### ral.offTouchMove(function callback)

#### ral.onTouchCancel(function callback)

#### ral.offTouchCancel(function callback)

#### ral.onTouchEnd(function callback)

#### ral.offTouchEnd(function callback)





### 电量

#### ral.getBatteryInfo(Object object)

#### ral.getBatteryInfoSync()





### 重力加速计

#### ral.startAccelerometer(Object object)

#### ral.stopAccelerometer(Object object)

#### ral.onAccelerometerChange(function callback)

#### ral.stopAccelerometer(function callback)



## 文件

#### ral.getFileSystemManager()



## 其他

#### string|undefined ral.getFeatureProperty(featureName, property)

获取 RAL 指定 featureName 具有的 property 值

- 同一个 featureName 在不同的小游戏平台，或同一平台的不同版本，对应 property 的返回值可能不相同
- 在特定小游戏平台或同一平台的不同版本， 没有对应 property 的 featureName，将返回 **undefined** 



下方列出所有在特定小游戏平台，具有 property 的 featureName 除 undefined 外可能的返回值。表格下方将说明返回值的含义

| featureName                | property | return                  | platform                                              |
| :------------------------- | :------- | ----------------------- | ----------------------------------------------------- |
| "ral.createCanvas"         | "spec"   | "unsupported"           | cocos-play， 华为快游戏， oppo 小游戏， cocos-runtime |
|                            |          | "wrapper"               | cocos-play， 华为快游戏， oppo 小游戏， cocos-runtime |
|                            |          |                         |                                                       |
| "ral.createImage"          | "spec"   | "unsupported"           | cocos-play， 华为快游戏， oppo 小游戏， cocos-runtime |
|                            |          | "wrapper"               | cocos-play， 华为快游戏， oppo 小游戏， cocos-runtime |
|                            |          |                         |                                                       |
| "CanvasRenderingContext2D" | "spec"   | "vivo_platform_support" | vivo 小游戏                                           |
|                            |          |                         |                                                       |
| "HTMLCanvasElement"        | "spec"   | "vivo_platform_support" | vivo 小游戏                                           |
|                            |          |                         |                                                       |
| "HTMLImageElement"         | "spec"   | "vivo_platform_support" | vivo 小游戏                                           |
|                            |          |                         |                                                       |
| "Image"                    | "spec"   | "vivo_platform_support" | vivo 小游戏                                           |
|                            |          |                         |                                                       |
| "ral.createImage"          | "spec"   | "vivo_platform_support" | vivo 小游戏                                           |
|                            |          |                         |                                                       |

##### 返回值：

| 属性                    | 说明                                                         |
| :---------------------- | :----------------------------------------------------------- |
| undefined               | 小游戏平台已同名实现了 RAL 层约定的 API                      |
| "wrapper"               | 小游戏平台未实现 RAL 层约定的 API，由 ral 基于平台提供的其他 API 封装实现 |
| "unsupported"           | 在该平台，RAL 不支持该 API                                   |
| "vivo_platform_support" | vivo 平台提供了对该 API 的支持                               |



##### 示例代码：

```js
if(ral.getFeatureProperty("ral.createCanvas", "spec") === undefined){
    // 该方法为小游戏平台直接实现
} else if(ral.getFeatureProperty("ral.createCanvas", "spec") === "wrapper"){
    // 该方法为 RAL 层封装实现
}
```

