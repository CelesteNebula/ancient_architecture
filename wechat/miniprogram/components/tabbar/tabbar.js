// components/tabbar/tabbar.js
Component({
  methods: {
    onTabItemTap(e) {
      const page = e.currentTarget.dataset.page;
      if (page === "index") {
        wx.switchTab({ url: '/pages/index/index' });
      } else if (page === "my") {
        wx.switchTab({ url: '/pages/my/my' });
      }
    },
    handlePhotoRecognition() {
      const app = getApp();
      if (!app.globalData.isLoggedIn) {
        wx.showToast({
          title: '请先登录',
          icon: 'none',
          duration: 2000
        });
      } else {
        wx.getSetting({
          success: (res) => {
            if (!res.authSetting['scope.camera']) {
              wx.authorize({
                scope: 'scope.camera',
                success: () => {
                  this.chooseMedia();
                },
                fail: () => {
                  wx.showModal({
                    title: '相机权限',
                    content: '需要使用相机权限，请前往设置中开启',
                    success: (res) => {
                      if (res.confirm) {
                        wx.openSetting();
                      }
                    }
                  });
                }
              });
            } else {
              this.chooseMedia();
            }
          }
        });
      }
    },
    chooseMedia: function() {
      wx.chooseMedia({
        count: 1,
        mediaType: ['image'],
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'], // 允许用户从相册选择或使用相机拍摄
        camera: 'back',
        success: (res) => {
          const tempFilePath = res.tempFiles[0].tempFilePath;
          this.uploadPhoto(tempFilePath);
        }
      });
    },
    uploadPhoto(filePath) {
      const that = this;
      const app = getApp();
      wx.uploadFile({
        url: 'http://192.168.10.32:5000/ancientArchitecture/recognize',
        filePath: filePath,
        name: 'image',
        formData: {
          userId: app.globalData.userId
        },
        success(res) {
          const data = JSON.parse(res.data);
          if (data.error) {
            wx.showToast({
              title: '识别失败，请重试',
              icon: 'none'
            });
          } else {
            const topResult = data.result[0];
            if (topResult.probability < 50) {
              wx.showToast({
                title: '请正确上传需识别的古建筑图片',
                icon: 'none'
              });
            } else {
              wx.showToast({
                title: '识别成功',
                icon: 'success'
              });
              app.globalData.times = data.remaining_times;
              that.setData({
                times: data.remaining_times
              });
              wx.navigateTo({
                url: '/pages/result/result?result=' + encodeURIComponent(JSON.stringify(data.result)) + '&imageUrl=' + encodeURIComponent(filePath)
              });
            }
          }
        },
        fail(error) {
          console.error('上传图片失败', error);
          wx.showToast({
            title: '上传失败，请重试',
            icon: 'none'
          });
        }
      });
    }
  }
});
