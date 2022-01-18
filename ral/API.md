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

#### string|undefined ral.getFeatureProperty(featureName, propertyName)

以 <featureName, propertyName> 作为 key 值来获取当前 Runtime 运行环境中，某个特性的属性值。



##### 描述

不同的 runtime 运行环境对 RAL 中的一些特性的支持情况可能不同， 故设计此功能来解决一些需要在运行时才能处理的兼容性问题。

- 在不同的 Runtime 运行环境中，以同一组 <featureName, propertyName> 作为输入的返回值可能不相同

- 除了在特定的 Runtime 运行环境以指定的 <featureName, propertyName> 组合作为输入，其余情形该函数都将返回 **undefined**。

  

下方列出 RAL 层所有指定的 <featureName, propertyName> 组合， 以及对应的可能的返回值。表格下方将说明返回值的含义

| featureName                | propertyName | return                                                       |
| :------------------------- | :----------- | ------------------------------------------------------------ |
| "ral.createCanvas"         | "spec"       | undefined \|\| "unsupported" \|\|"wrapper"                   |
| "ral.createImage"          | "spec"       | undefined \|\| "unsupported" \|\| "wrapper" \|\| "vivo_platform_support" |
| "CanvasRenderingContext2D" | "spec"       | undefined \|\| "vivo_platform_support"                       |
| "HTMLCanvasElement"        | "spec"       | undefined \|\| "vivo_platform_support"                       |
| "HTMLImageElement"         | "spec"       | undefined \|\| "vivo_platform_support"                       |
| "Image"                    | "spec"       | undefined \|\| "vivo_platform_support"                       |



##### 返回值

| 属性                    | 说明                                      |
| :---------------------- | :---------------------------------------- |
| undefined               | 当前 Runtime 运行环境中已标准实现该功能   |
| "wrapper"               | 由 RAL 层封装实现该功能                   |
| "unsupported"           | 当前 Runtime 运行环境中，RAL 不支持该功能 |
| "vivo_platform_support" | vivo 平台提供了对该功能的支持             |



##### 示例代码

```js
if(ral.getFeatureProperty("ral.createCanvas", "spec") === undefined){
    // 该方法由小游戏平台标准实现
    let canvas = ral.createCanvas();
} else if(ral.getFeatureProperty("ral.createCanvas", "spec") === "wrapper"){
    // 该方法由 RAL 封装实现
}
```



#### 

#### int ral.getFeaturePropertyInt(featureName)



##### 描述

不同的 runtime 运行环境对 RAL 中的一些特性的支持情况可能不同， 故设计此功能来解决一些需要在运行时才能处理的兼容性问题。

本接口根据不同的功能特性名称进行获取runtime当前具有的功能特性能力。



##### 返回值

- 当featureName为**ral.CANVAS_CONTEXT2D_TEXTBASELINE_ALPHABETIC.name**，用于获取平台的canvas context2d textBaseline是否支持alphabetic属性。
  - 如果alphabetic属性是平台所支持并且可用的，返回  ral.CANVAS_CONTEXT2D_TEXTBASELINE_ALPHABETIC.enable
  - 如果alphabetic属性是平台所支持但不可用的，返回  ral.CANVAS_CONTEXT2D_TEXTBASELINE_ALPHABETIC.disable
  - 如果不支持alphabetic属性，返回 ral.FEATURE_UNSUPPORT
- 当featureName为**ral.CANVAS_CONTEXT2D_TEXTBASELINE_DEFAULT.name**，用于获取平台对于canvas context2d textBaseline 默认支持哪一种属性。
  - 如果alphabetic属性是平台默认支持的属性，返回  ral.CANVAS_CONTEXT2D_TEXTBASELINE_DEFAULT.alphabetic
  - 如果bottom属性是平台默认支持的属性，返回  ral.CANVAS_CONTEXT2D_TEXTBASELINE_DEFAULT.bottom
  - 如果都不支持，返回 ral.FEATURE_UNSUPPORT



##### 示例代码

```javascript
let keyTblAlphabetic = ral.CANVAS_CONTEXT2D_TEXTBASELINE_ALPHABETIC.name;
let alphabeticEnable = ral.CANVAS_CONTEXT2D_TEXTBASELINE_ALPHABETIC.enable;

if (ral.getFeaturePropertyInt(keyTblAlphabetic) === alphabeticEnable) {
    console.log("Your implements for canvas context2d textBaseline is alphabetic");
}
```





#### boolean ral.setFeaturePropertyInt(featureName, featureValue)



##### 描述

不同的 runtime 运行环境对 RAL 中的一些特性的支持情况可能不同， 故设计此功能来解决一些需要在运行时才能处理的兼容性问题。

本接口根据不同的功能特性名称进行设置或调整runtime的功能特性能力。

- 当featureName为**ral.CANVAS_CONTEXT2D_TEXTBASELINE_ALPHABETIC.name**时，不支持调整平台的canvas context2d textBaseline的alphabetic属性。即无法设置该功能属性。
- 当featureName为**ral.CANVAS_CONTEXT2D_TEXTBASELINE_DEFAULT.name**时，用于调整平台对于canvas context2d textBaseline 默认支持哪一种属性。即平台支持调整canvas context2d textBaseline默认使用平台所支持的textBaseline属性。
  - 如果alphabetic属性是平台默认支持的属性，返回  ral.CANVAS_CONTEXT2D_TEXTBASELINE_DEFAULT.alphabetic
  - 如果bottom属性是平台默认支持的属性，返回  ral.CANVAS_CONTEXT2D_TEXTBASELINE_DEFAULT.bottom，这种属性主要用于兼容Runtime旧版本的默认支持canvas context2d textBaseline是bottom属性的文字效果。
  - 如果都不支持，返回 ral.FEATURE_UNSUPPORT



##### 示例代码

```javascript
let keyTblAlphabetic = ral.CANVAS_CONTEXT2D_TEXTBASELINE_ALPHABETIC.name;
let alphabeticEnable = ral.CANVAS_CONTEXT2D_TEXTBASELINE_ALPHABETIC.enable

if (ral.getFeaturePropertyInt(keyTblAlphabetic) === alphabeticEnable) {
    let keyTblDefault = ral.CANVAS_CONTEXT2D_TEXTBASELINE_DEFAULT.name
    let defaultAlphabetic = ral.CANVAS_CONTEXT2D_TEXTBASELINE_DEFAULT.alphabetic;
    
    if (ral.setFeaturePropertyInt(keyTblDefault, defaultAlphabetic) === true) {
        if (ral.getFeaturePropertyInt(keyTblDefault) === defaultAlphabetic) {
            console.log("Your implements for canvas context2d textBaseline default is alphabetic");
        }
    }
}
```

