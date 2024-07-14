Page({
  data: {
    isLoggedIn: false,
    userAvatar: '/assets/icon/用户.png',
    userNickname: '请登录',
    identity: '',
    times: 0,
    records: [],
    showIdentityModal: false,
    showQuotaModal: false,
    showUsageModal: false,
    showAboutModal: false,
    identityText: ''
  },
  onLoad: function () {
    const app = getApp();
    this.setData({
      isLoggedIn: app.globalData.isLoggedIn,
      userAvatar: app.globalData.userAvatar,
      userNickname: app.globalData.userNickname,
      identity: app.globalData.identity,
      times: app.globalData.times, // 确保这里读取到的是全局的最新识别次数
      records: app.globalData.records,
      quota: app.globalData.quota,
      identityText: app.globalData.identity === 'vip' ? '会员' : '普通用户'
    });
  },
  wechatLogin: function () {
    const that = this;
    const app = getApp();
    wx.login({
      success(res) {
        if (res.code) {
          console.log(res.code)
          // 发起网络请求，用于获取微信用户信息
          wx.getUserInfo({
            success: function (userRes) {
              // 将用户ID发送到后端
              wx.request({
                url: 'http://192.168.1.14:5000/user/login', // 后端接口地址
                method: 'POST',
                data: {
                  userId: res.code,
                  avatarUrl: userRes.userInfo.avatarUrl,
                  nickName: userRes.userInfo.nickName
                },
                success(response) {
                  console.log('用户ID已发送到后端', response);
                  if (response.data.code === 0) {
                    app.globalData.isLoggedIn = true;
                    app.globalData.userAvatar = userRes.userInfo.avatarUrl;
                    app.globalData.userNickname = userRes.userInfo.nickName;
                    app.globalData.identity = response.data.data.identity;
                    app.globalData.times = response.data.data.times;
                    app.globalData.userId = res.code;

                    that.setData({
                      isLoggedIn: app.globalData.isLoggedIn,
                      userAvatar: app.globalData.userAvatar,
                      userNickname: app.globalData.userNickname,
                      identity: app.globalData.identity,
                      times: app.globalData.times,
                      identityText: app.globalData.identity === 'vip' ? '会员' : '普通用户'
                    });

                    wx.showToast({
                      title: '登录成功',
                      icon: 'success',
                      duration: 2000
                    });
                  }
                },
                fail(error) {
                  console.error('发送用户ID失败', error);
                }
              });
            }
          });
        } else {
          console.log('登录失败！' + res.errMsg);
        }
      }
    });
  },
  showIdentity: function () {
    if (this.data.isLoggedIn) {
      this.setData({
        showIdentityModal: true
      });
    } else {
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      });
    }
  },
  showQuota: function () {
    if (this.data.isLoggedIn) {
      const app = getApp();
      this.setData({
        times: app.globalData.times
      });
      this.setData({
        showQuotaModal: true
      });
    } else {
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      });
    }
  },
  showUsage: function () {
    this.setData({
      showUsageModal: true
    });
  },
  showAbout: function () {
    this.setData({
      showAboutModal: true
    });
  },
  closeModal: function () {
    this.setData({
      showIdentityModal: false,
      showQuotaModal: false,
      showUsageModal: false,
      showAboutModal: false
    });
  },
  preventClose: function () {
    // 阻止点击事件冒泡
  }
});