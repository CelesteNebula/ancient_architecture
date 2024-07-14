App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  globalData: {
    isLoggedIn: false,
    userAvatar: '/assets/icon/用户.png',
    userNickname: '请登录',
    identity: '',
    times: 0,
    records: [],
    quota: 0,
    userId: ''
  }
})
