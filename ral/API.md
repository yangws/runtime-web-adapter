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



### 性能

#### ral.triggerGC()

#### Performance ral.getPerformance()

#### number Performance.now()

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

#### InnerAudioContext 

##### 属性说明

| 属性        | 键值类型 | 说明                                                         |
| :---------- | :------- | :----------------------------------------------------------- |
| src         | string   | 音频资源的地址，用于直接播放                                 |
| startTime   | number   | 开始播放的位置（单位 s），默认为 0                           |
| autoplay    | boolean  | 是否自动开始播放，默认为 false                               |
| loop        | boolean  | 是否循环播放，默认为 false                                   |
| volume      | number   | 音量。范围 0~1。默认为 1                                     |
| duration    | number   | 当前音频的长度（单位 s），只读属性。只有在当前有合法的 src 时返回 |
| currentTime | number   | 当前音频的播放位置（单位 s）,只读属性。只有在当前有合法的 src 时返回，时间保留小数点后 6 位 |
| paused      | boolean  | 当前是是否暂停或停止状态，只读属性                           |
| buffered    | number   | 音频缓冲的时间点，只读属性。仅保证当前播放时间点到此时间点内容已缓冲 |

##### 方法

##### InnerAudioContext.play()

##### InnerAudioContext.pause()

##### InnerAudioContext.stop()

##### InnerAudioContext.seek(number position)

##### InnerAudioContext.destroy()

##### InnerAudioContext.onCanplay(function callback)

##### InnerAudioContext.offCanplay(function callback)

##### InnerAudioContext.onPlay(function callback)

##### InnerAudioContext.offPlay(function callback)

##### InnerAudioContext.onPause(function callback)

##### InnerAudioContext.offPause(function callback)

##### InnerAudioContext.onStop(function callback)

##### InnerAudioContext.offStop(function callback)

##### InnerAudioContext.onEnded(function callback)

##### InnerAudioContext.offEnded(function callback)

##### InnerAudioContext.onTimeUpdate(function callback)

##### InnerAudioContext.offTimeUpdate(function callback)

##### InnerAudioContext.onError(function callback)

##### InnerAudioContext.offError(function callback)

##### InnerAudioContext.onWaiting(function callback)

##### InnerAudioContext.offWaiting(function callback)

##### InnerAudioContext.onSeeking(function callback)

##### InnerAudioContext.offSeeking(function callback)

##### InnerAudioContext.onSeeked(function callback)

##### InnerAudioContext.offSeeked(function callback)



##### 关于 RAL 中 InnerAudioContext 的补充说明

**1. 关于 startTime 属性与 seek 方法**

首先，这里定义 “ InnerAudioContext  实例 的 Prepared 状态” 为 InnerAudioContext 在成功设置 src 之后，第一次调用 play 方法之前 、或者播放/暂停状态下调用 stop 方法之后、或者播放至音频时长而结束后进入的状态。

1. InnerAudioContext 支持 Prepared 状态下，通过 seek 方法 或 startTime 属性设置音频的开始播放位置。
2. 若设置的 startTime 值大于当前 innerAudioContext 实例的 duration 值，在 Prepared 状态下使用 play 方法，音频将会从 0 的位置开始播放。
3. 在 Prepared 状态下，若用户使用了 seek 方法，音频会从 seek 设置的位置开始播放（即便 seek 之后又设置了 startTime 属性），否则音频会从 startTime 的位置开始播放。



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

### 功能特性

不同的 runtime 运行环境对 RAL 中的一些功能特性的支持情况可能不同， 故设计此功能来解决一些需要在运行时才能处理的兼容性问题。

#### string|undefined ral.getFeatureProperty(featureName, propertyName)

##### 描述

以 <featureName, propertyName> 作为 key 值来获取当前 Runtime 运行环境中，某个特性的属性值。

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

#### int ral.getFeaturePropertyInt(featureName)

##### 描述

本接口用于获取Runtime的功能特性。

##### 参数

- featureName: 代表功能的名称, 合法值详见 feature name 列表

##### feature name 列表

| name                                              | 含意                                                         |
| :------------------------------------------------ | :----------------------------------------------------------- |
| ral.CANVAS_CONTEXT2D_TEXTBASELINE_ALPHABETIC.name | 代表 canvas context2d textBaseline 支持 `alphabetic` 属性的功能特性 |
| ral.CANVAS_CONTEXT2D_TEXTBASELINE_DEFAULT.name    | 代表 canvas context2d textBaseline 设置为 `alphabetic` 时当成 bottom 来处理的功能特性 |

##### 返回值

- =-1[ral.FEATURE_UNSUPPORT]: 代表此功能不支持
- => 0: 具体值详见 API: `boolean ral.setFeaturePropertyInt(featureName, featureValue)` 的 feature value 列表

##### 示例代码

```javascript
let keyTblAlphabetic = ral.CANVAS_CONTEXT2D_TEXTBASELINE_ALPHABETIC.name;
let alphabeticEnable = ral.CANVAS_CONTEXT2D_TEXTBASELINE_ALPHABETIC.enable;
if (ral.getFeaturePropertyInt(keyTblAlphabetic) === alphabeticEnable) {
    console.log("canvas context2d textBaseline is alphabetic");
}
```

#### boolean ral.setFeaturePropertyInt(featureName, featureValue)

##### 描述

本接口用于调整runtime的功能特性。


##### 参数

- featureName: 代表功能的名称, 合法值详见 feature name 列表
- featureValue: 此参数的合法值根据 feature 的不同会有差异, 详见 feature value 列表


##### feature value 列表

- ral.CANVAS_CONTEXT2D_TEXTBASELINE_ALPHABETIC

  | value                                                | 含意       |
  | :--------------------------------------------------- | :--------- |
  | ral.CANVAS_CONTEXT2D_TEXTBASELINE_ALPHABETIC.disable | 功能未启用 |
  | ral.CANVAS_CONTEXT2D_TEXTBASELINE_ALPHABETIC.enable  | 功能启用   |

- ral.CANVAS_CONTEXT2D_TEXTBASELINE_DEFAULT

  | value                                                | 含意                                                         |
  | :--------------------------------------------------- | :----------------------------------------------------------- |
  | ral.CANVAS_CONTEXT2D_TEXTBASELINE_DEFAULT.bottom     | 当canvas context2d textBaseline 设置为 `alphabetic` 时当成 bottom 来处理的功能特性 |
  | ral.CANVAS_CONTEXT2D_TEXTBASELINE_DEFAULT.alphabetic | 当canvas context2d textBaseline 设置为 `alphabetic` 时当成 alphabetic 来处理的功能特性。注：由于早期版本可能不支持alphabetic属性，因此要成功地调整为此功能特性前，需要确保alphabetic已启用。 |

##### 返回值

- false: 表示调整runtime的功能特性失败
- true: 表示调整runtime的功能特性成功

##### 示例代码

```javascript
let keyTblAlp = ral.CANVAS_CONTEXT2D_TEXTBASELINE_ALPHABETIC.name;
let alpEnable = ral.CANVAS_CONTEXT2D_TEXTBASELINE_ALPHABETIC.enable

if (ral.getFeaturePropertyInt(keyTblAlp) === alpEnable) {
    let keyTblDef = ral.CANVAS_CONTEXT2D_TEXTBASELINE_DEFAULT.name
    let defBottom = ral.CANVAS_CONTEXT2D_TEXTBASELINE_DEFAULT.bottom;

    if (ral.setFeaturePropertyInt(keyTblDef, defBottom) === true) {
        if (ral.getFeaturePropertyInt(keyTblDef) === defBottom) {
            console.log("textBaseline is also bottom if it set to alphabetic);
        }
    }
}
```

