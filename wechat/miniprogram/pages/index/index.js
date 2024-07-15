// index.js
Page({
  data: {
    imgUrls: [
      'https://img1.baidu.com/it/u=3951541277,2998781898&fm=253&fmt=auto&app=138&f=JPEG?w=750&h=500',
      'https://img0.baidu.com/it/u=2486038705,2609000544&fm=253&fmt=auto&app=138&f=JPEG?w=667&h=500',
      'https://img0.baidu.com/it/u=1340735908,2609494167&fm=253&fmt=auto&app=120&f=JPEG?w=1280&h=800',
      'https://q1.itc.cn/images01/20240228/2df08e448e7f4ae5a94e6aff829bdee8.jpeg',
      'https://p3.itc.cn/images01/20200608/93c0fd8f12e64297a05f2e0cf64b0b7f.jpeg',
      'https://img2.baidu.com/it/u=3247274349,2457905931&fm=253&fmt=auto&app=138&f=JPEG?w=755&h=500',
      'https://dimg03.c-ctrip.com/images/fd/tg/g3/M00/FD/14/CggYGVadoQmAVqLeAClF0dfMPTo760.jpg',
      'https://t10.baidu.com/it/u=3887315688,208146255&fm=30&app=106&f=JPEG?w=640&h=427&s=80E045A296CB6EEE741CF9B403005091',
      'https://www.credaward.com/wp-content/uploads/2022/01/23_Fei_Yi_Yuan_Luo-2000x1335.jpg',
      'https://p6.toutiaoimg.com/origin/pgc-image/f7e4cb9ba2ea4e93bc068e9c6e42c459?from=pc',
      'https://youimg1.c-ctrip.com/target/100p1f000001gpe1w8DDF.jpg',
      'https://img1.baidu.com/it/u=3731620391,2650646520&fm=253&fmt=auto&app=138&f=JPEG?w=768&h=481',
      'https://img.mp.sohu.com/upload/20170715/b5a76b33b4a94b3fba51a3829fe4ceab_th.png',
      'https://img1.baidu.com/it/u=1916395953,3819250293&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=493',
      'https://i0.wp.com/hisour.com/wp-content/uploads/2018/06/Rococo-architecture-in-Portugal.jpg?fit=960,640&ssl=1',
      'https://img1.baidu.com/it/u=2554255080,301812753&fm=253&fmt=auto&app=138&f=JPEG?w=774&h=500',
      'https://q3.itc.cn/images01/20240116/565b1a8a2d62481184b2dd1ee984d95f.jpeg',
      'https://img0.baidu.com/it/u=3393033178,3657255163&fm=253&fmt=auto&app=120&f=JPEG?w=608&h=413'
    ],
    currentCategory: 'chinese',
    isLoggedIn: false,
    userAvatar: '/assets/icon/用户.png',
    userNickname: '请登录',
    userId: '',
    buildingDetails: [{
        description: '川西民居是中国四川省的传统民居建筑，以木结构和灰瓦屋顶为主，外墙通常为白色，内部多有天井。',
        image: '/assets/front/川西民居.png'
      },
      {
        description: '徽派建筑是中国安徽省的传统建筑风格，以白墙、黑瓦、马头墙和木雕为主要特点，形成了独特的徽州文化。',
        image: '/assets/front/徽派建筑.png'
      },
      {
        description: '晋派建筑是中国山西省的传统民居建筑，常见于平遥、祁县等地，以砖木结构、精美雕刻和大院落布局闻名。',
        image: '/assets/front/晋派建筑.png'
      },
      {
        description: '岭南建筑是中国广东、广西等地区的传统建筑风格，以通风、采光和防潮为设计重点，常见于庭院和骑楼。',
        image: '/assets/front/岭南建筑.png'
      },
      {
        description: '闽南建筑是中国福建省南部的传统建筑，以红砖、燕尾脊和石雕为特色，具有浓厚的地方风格和海洋文化。',
        image: '/assets/front/闽南建筑.png'
      },
      {
        description: '四合院是中国北方传统民居建筑的典型代表，以一个四面房屋围合的庭院为中心，象征着家族的团结和繁荣。',
        image: '/assets/front/北方四合院.png'
      },
      {
        description: '苏州园林是中国江苏省苏州市的传统园林建筑，以精巧的布局、精致的建筑和自然的景观相结合，被誉为“园林之母”。',
        image: '/assets/front/苏州园林.png'
      },
      {
        description: '巴洛克建筑起源于17世纪的意大利，以其豪华、复杂和动感的设计风格著称，常见于教堂和宫殿建筑。',
        image: '/assets/front/巴洛克建筑.png'
      },
      {
        description: '拜占庭建筑起源于东罗马帝国，以其宏伟的圆顶、丰富的马赛克装饰和复杂的空间布局闻名，常见于教堂。',
        image: '/assets/front/拜占庭建筑.png'
      },
      {
        description: '哥特式建筑起源于12世纪的法国，以尖塔、高耸的拱顶和大面积的彩色玻璃窗为特色，常见于教堂和大教堂。',
        image: '/assets/front/哥特式建筑.png'
      },
      {
        description: '古希腊建筑以其简洁、对称和柱式结构闻名，著名的代表有帕特农神庙，以多立克、爱奥尼和科林斯三种柱式为特色。',
        image: '/assets/front/古希腊建筑.png'
      },
      {
        description: '罗曼式建筑起源于中世纪欧洲，以厚重的墙壁、半圆形拱顶和小窗户为特点，常见于教堂和修道院。',
        image: '/assets/front/罗曼式建筑.png'
      },
      {
        description: '洛可可建筑起源于18世纪的法国，以其轻盈、优雅和繁复的装饰风格著称，常见于宫殿和室内装饰。',
        image: '/assets/front/洛可可建筑.png'
      },
      {
        description: '维多利亚建筑起源于19世纪的英国，以其多样化的风格和装饰繁复的立面为特点，常见于住宅和公共建筑。',
        image: '/assets/front/维多利亚建筑.png'
      },
      {
        description: '装饰艺术建筑起源于20世纪初的法国，以其几何形状、对称设计和富丽堂皇的装饰为特点，常见于高层建筑和剧院。',
        image: '/assets/front/装饰艺术建筑.png'
      },
      {
        description: '古埃及建筑以其宏伟的金字塔、神庙和陵墓为代表，古埃及的建筑风格以大规模石砌结构和象形文字装饰为特色。',
        image: '/assets/front/古埃及建筑.png'
      },
      {
        description: '伊斯兰建筑以其华丽的圆顶、尖拱和丰富的几何装饰为特点，著名的代表有清真寺和宫殿，如阿拉伯半岛上的众多建筑。',
        image: '/assets/front/伊斯兰建筑.png'
      },
      {
        description: '印度建筑以其精美的石雕、拱门和穹顶为特色，著名的代表有泰姬陵和印度教寺庙，体现出浓厚的宗教和文化色彩。',
        image: '/assets/front/印度建筑.png'
      }
    ]
  },
  onLoad: function () {
    const app = getApp();
    this.setData({
      isLoggedIn: app.globalData.isLoggedIn,
      userAvatar: app.globalData.userAvatar,
      userNickname: app.globalData.userNickname,
      userId: app.globalData.userId
    });
  },
  switchCategory: function (e) {
    const category = e.currentTarget.dataset.category;
    wx.navigateTo({
      url: `/pages/introduction/introduction?category=${category}`
    });
  },
  goToLogin: function () {
    wx.navigateTo({
      url: '/pages/my/my'
    });
  },
  /*handlePhotoRecognition: function() {
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
              success() {
                this.chooseMedia();
              },
              fail() {
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
  uploadPhoto: function(filePath) {
    const that = this;
    const app = getApp();
    wx.uploadFile({
      url: 'http://192.168.1.14:5000/ancientArchitecture/recognize', // 后端接口地址
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
  
            // 更新全局数据
            app.globalData.times = data.remaining_times;
  
            // 更新页面数据
            that.setData({
              times: data.remaining_times
            });
            
            console.log(app.globalData.times)

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
  },*/
  openExternalLink: function () {
    wx.navigateTo({
      url: '/pages/webview/webview?url=' + encodeURIComponent('https://www.imu.edu.cn/') // 跳转的外部网站
    });
  }
});