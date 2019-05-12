var WxSearch = require('../../wxSearchView/wxSearchView.js');

// pages/wxml/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    time: (new Date()).toString(),
    ObjectArray: [
      { id: 5, unique: 'unique5'},
      { id: 4, unique: 'unique4'},
      { id: 3, unique: 'unique3' },
      { id: 2, unique: 'unique2' },
      { id: 1, unique: 'unique1' },
      { id: 0, unique: 'unique0' },
    ],
    numberArray: [1, 2, 3, 4],
    item: {
      index: 0,
      msg: 'this is a template',
      time: '2016-06-18'
    }
  },
  search (){
    wx.navigateTo({
      url: '/pages/searchbar/searchbar',
    })
  },

  switch: function(){
    const length = this.data.ObjectArray.length
    for(let i = 0; i < length; ++i) {
      const x = Math.floor(Math.random() * length);
      const y = Math.floor(Math.random() * length);
      //console.log(x, y)
      const temp = this.data.ObjectArray[x];
      this.data.ObjectArray[x] = this.data.ObjectArray[y];
      this.data.ObjectArray[y] = temp;
    }
    this.setData({
      ObjectArray: this.data.ObjectArray
    })
    //console.log(this.data.ObjectArray)
  },

  addToFront: function() {
    const len = this.data.ObjectArray.length;
    //this.data.ObjectArray = [{id: len, unique: 'unique' + len}].concat(this.data.ObjectArray);
    this.data.ObjectArray = this.data.ObjectArray.concat([{ id: len, unique: 'unique' + len }]);
    this.setData({
      ObjectArray: this.data.ObjectArray
    })
  },

  addNumToFront: function() {
    this.data.numberArray = [this.data.numberArray.length + 1].concat(this.data.numberArray);
    //this.data.numberArray = this.data.numberArray.concat([this.data.numberArray.length + 1]);
    this.setData({
      numberArray: this.data.numberArray
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    WxSearch.init(
      that,  // 本页面一个引用
      [], // 热点搜索推荐，[]表示不使用
      [],// 搜索匹配，[]表示不使用
      that.mySearchFunction, // 提供一个搜索回调函数
      that.myGobackFunction //提供一个返回回调函数
    );
  },

  wxSearchInput: WxSearch.wxSearchInput,  // 输入变化时的操作
  wxSearchKeyTap: WxSearch.wxSearchKeyTap,  // 点击提示或者关键字、历史记录时的操作
  wxSearchDeleteAll: WxSearch.wxSearchDeleteAll, // 删除所有的历史记录
  wxSearchConfirm: WxSearch.wxSearchConfirm,  // 搜索函数
  wxSearchClear: WxSearch.wxSearchClear,  // 清空函数

  mySearchFunction: function (value) {
    // do your job here
    // 示例：跳转
    wx.navigateTo({
      url: '/pages/logs/logs'
    })
  },

  // 5 返回回调函数
  myGobackFunction: function () {
    // do your job here
    // 示例：返回
    wx.navigateBack()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: 'didi',
      path: 'pages/wxml'
    }
  }
})