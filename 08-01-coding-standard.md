### 微信小程序开发规范文档

目录规范

#### 1.目录概述

##### 组件文件

所有组件相关文件统一放在components目录下。

##### 图片文件

项目图片文件放置于根目录的images文件夹下，组件独有的图片放在当前组件images目录下

##### 模型文件

模型文件主要用于编写各类业务模型。项目模型文件放置于根目录的models文件夹下，组件相关模型放置于components目录下的models文件夹中。

##### 行为文件

行为文件放在所引用的组件目录下。



### WXML规范

#### 1. WXML规范

wxml标签可以单独出现的情况，尽量单独出现，如```<input />```。

控制每行HTML的代码数量在50个字符以内，方便阅读浏览，多余的代码进行换行处理，标签所带属性每个属性间进行换行。

```xaml
<v-music

  wx:if="{{classic.type===200}}"

  img="{{classic.img}}"

  content="{{classic.content}}"

\>

</v-music>
```

合理展现分离内容，不要使用内联样式。

```xaml
//推荐使用

<image class="tag"></image>
```



#### 2. 注释规范

除组件外的其他块级元素，均需注释出其功能，并在其上下空出一行与其他代码进行区分。

```xaml
<view>...</view>



//导航栏

<view>...</view>



<view>...</view>
```



### CSS规范

#### 1. CSS规范 

在开发过程中rpx和px均可能用到，如通常情况下间距使用rpx，字体大小和边框等使用px，开发者根据实际情况而定。

```css
width: 100rpx;

font-size: 14px;
```

CSS代码需有明显的代码缩进。每一个样式类之间空出一行。

```css
.v-tag{

  width: 100%;

}



.v-container{

  width: 100%;

}
```



尽量使用简写属性，并且同一属性放置在一起，避免散乱。

```css
/**使用简写属性**/

.v-image{

  margin: 0 auto;

}



/**同一属性放在一块**/

.v-tag{

  margin-left: 10rpx;

  margin-right: 10rpx

}
```



采用flex进行布局，禁止使用float以及vertical-align。

```css
.container{

  disaplay: flex;

  flex-dirextion: row

}
```



#### 2. 注释规范

成组的wxss规则之间用块状注释。请勿在代码后面直接注释。

```css
/** 修改button默认的点击态样式类**/



.button-hover {

  background-color: red;

}
```



### JS规范

#### 1. JS规范

##### 命名规范

变量名以及函数名统一采用驼峰命名法，正常情况下函数名前缀需加上清晰的动词表示函数功能，私有函数或者属性以下划线开头表明。常量需用const 声明。

类的命名首字母需大写。

采用ES6 关键字let定义变量，尽量不使用var

```js
//定义常量

const a = 1



//定义变量

let imageContent =  res.data



//函数命名

getInfo:function(){

  return '';

}



//私有函数

_getInfo:function(){

  return '';

}
```



##### 回调函数规范

回调函数统一使用Promise函数的方式进行编写，回调成功的参数统一为res，错误参数为err。

```js
// promise 处理回调

let back = new Promise((resolve, reject) => {

  if (/* 异步操作成功 */){

     resolve(value);

  } else {

     reject(error);

  }

});



back.then((res) => {

     console.log('成功回调！', res);

}).catch((err) => {

     console.log('失败回调！', error);

});


```



私有函数以及回调函数统一放置在生命周期函数后。



删除js文件中未用到的生命周期函数，保持代码的整洁。

```js
Pages({

  data:{

      

  },

  

  onLoad:function(event){

     

  },

  

  _self:function(){

     

  }

})
```



每个函数之间用一个空行分离结构。

##### 数据绑定变量定义规范

所有涉及到数据绑定的变量均需在data中初始化。禁止在不定义的情况下直接

```js
setData。

Pages({

  data:{

      id : null

  },

  

  onLoad:function(event){

     let id = event.target.dataset.id

     this.data.id = id

  }

})
```

点击事件规范

点击事件函数命名方式为 on + 事件名 或者业务名。

```js
onLike: function(event){

  

}
```



### 组件规范

#### 组件名命名规范

组件在使用时命名以 “v-”为开头的组件名，若组件名称为多个单词名拼接而成，采用 ' - ' 连接。组件标签在page页面使用时推荐使用单闭合标签（此条约束对于包含有slot的组件无效）

> **v 来源于法语** **单词** **‘vent’**  **

```
<v-movies />
```



#### 触发事件规范

组件点击触发事件建议用冒号分隔开

```xaml
<v-component-tag-name bind:myevent="onMyEvent" />
```



#### externalClasses命名规范

命名格式采用如下形式：v-class-{name}，name可自行定义

> v-class-icon

#### 组件样式规范

```css
.v-container{

  disaplay: flex;

  flex-dirextion: row

}
```



### 标点规范

JS语句无需以分号结束，统一省略分号

JS中一致使用反引号 ``或单引号' ' , 不使用双引号。

WXML、CSS、JSON中均应使用双引号。

CSS属性中冒号中后面用一个空格分隔开。

执行一致的缩进（4个空格）

执行一致的换行样式（'unix'）
