## 基本命令说明

## 淘宝
## npm install -g cnpm --registry=https://registry.npm.taobao.org

## weexUI 配置
## cnpm i weex-ui@latest -S
## cnpm i babel-plugin-component babel-preset-stage-0 -D


## weex相关
## cnpm install -g weexpack

### npm i 或 cnpm i
### npm start

启动开发服务器，以便在浏览器上预览您的weex页面。
您还可以使用weex操场扫描QR码，预览本机的weex页面。
-------------------------------------------------------

### npm run dev

在监视模式下打开代码编译任务。
-------------------------------------------------------

### npm run ios

（仅限Mac，需要Xcode）启动开发服务器并在iOS模拟器中加载
您的应用程序。
-------------------------------------------------------

### npm run android

（需要Android构建工具）启动开发服务器并在连接的Android
设备或仿真器上加载您的应用程序。
-------------------------------------------------------

### npm run pack:ios

（仅限Mac，需要Xcode）将ios项目打包成ipa包。
-------------------------------------------------------

### npm run pack:android

（需要Android构建工具）将android项目打包成apk包。
-------------------------------------------------------

### npm run pack:web

将html5项目打包到`release / web`文件夹中
-------------------------------------------------------

### npm run test

开始测试跑步者。
-------------------------------------------------------

### weex compile 
### weex compile src/pages dist/pages

编译单个weex文件或者整个文件夹中的weex文件
-------------------------------------------------------

### weex preview 
### weex preview src/pages/home/index.vue 

预览指定vue文件，如有问题执行如下代码
### weex xbind repair toolkit-repair
### weex repair

-------------------------------------------------------

### weex platform 
### weex platform add ios
### weex platform remove ios

添加或移除ios/android项目模板。
-------------------------------------------------------

### weex run 
### weex run ios
### weex run android
### weex run web

使用weex-toolkit来运行android/ios/web项目
-------------------------------------------------------

### weex debug 调试
### weex debug

测试包扫码，进入你需要调试的weex页面
-------------------------------------------------------

更多使用：https://weex-project.io/cn/tools/toolkit.html
官方教程：http://weex-project.io/cn/guide/


-------------------------------------------------------

目录结构

|--- .temp     (weex与vue合并后的入口和路由)  
|--- configs   (配置文件)  
|--- dist      (app打包后的js文件)  
|--- platforms (app打包后的文件)  
|--- plugins   (插件配置)  
|--- release   (h5页面)  
|--- src       (开发主目录)  
|--- web       (浏览器预览配置)  
|--- .babelrc  (babel配置)  
|--- .gitignore(git提交排除)
 
