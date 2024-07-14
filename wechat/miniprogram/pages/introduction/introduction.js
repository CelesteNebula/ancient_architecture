Page({
  data: {
    categories: ['chinese', 'western', 'other'],
    currentCategory: 'chinese',
    details: {
      chinese: [
        { 
          name: '川西民居', 
          description: '川西民居是中国四川省的传统民居建筑，以木结构和灰瓦屋顶为主，外墙通常为白色，内部多有天井。',
          image: '/assets/image/川西民居.jpg' // 添加图片路径
        },
        { 
          name: '徽派', 
          description: '徽派建筑是中国安徽省的传统建筑风格，以白墙、黑瓦、马头墙和木雕为主要特点，形成了独特的徽州文化。',
          image: '/assets/image/徽派.jpg' // 添加图片路径
        },
        { 
          name: '晋派', 
          description: '晋派建筑是中国山西省的传统民居建筑，常见于平遥、祁县等地，以砖木结构、精美雕刻和大院落布局闻名。',
          image: '/assets/image/晋派.jpg' // 添加图片路径
        },
        { 
          name: '岭南', 
          description: '岭南建筑是中国广东、广西等地区的传统建筑风格，以通风、采光和防潮为设计重点，常见于庭院和骑楼。',
          image: '/assets/image/岭南建筑.jpeg' // 添加图片路径
        },
        { 
          name: '闽南', 
          description: '闽南建筑是中国福建省南部的传统建筑，以红砖、燕尾脊和石雕为特色，具有浓厚的地方风格和海洋文化。',
          image: '/assets/image/闽南.jpeg' // 添加图片路径
        },
        { 
          name: '四合院', 
          description: '四合院是中国北方传统民居建筑的典型代表，以一个四面房屋围合的庭院为中心，象征着家族的团结和繁荣。',
          image: '/assets/image/北方四合院.jpeg' // 添加图片路径
        },
        { 
          name: '苏州园林', 
          description: '苏州园林是中国江苏省苏州市的传统园林建筑，以精巧的布局、精致的建筑和自然的景观相结合，被誉为“园林之母”。',
          image: '/assets/image/苏州园林.jpeg' // 添加图片路径
        }
        // 其他中式建筑
      ],
      western: [
        { 
          name: '巴洛克', 
          description: '巴洛克建筑起源于17世纪的意大利，以其豪华、复杂和动感的设计风格著称，常见于教堂和宫殿建筑。',
          image: '/assets/image/巴洛克.jpg' // 添加图片路径
        },
        { 
          name: '拜占庭', 
          description: '拜占庭建筑起源于东罗马帝国，以其宏伟的圆顶、丰富的马赛克装饰和复杂的空间布局闻名，常见于教堂。',
          image: '/assets/image/拜占庭.jpg' // 添加图片路径
        },
        { 
          name: '哥特式', 
          description: '哥特式建筑起源于12世纪的法国，以尖塔、高耸的拱顶和大面积的彩色玻璃窗为特色，常见于教堂和大教堂。',
          image: '/assets/image/哥特.jpg' // 添加图片路径
        },
        { 
          name: '古希腊', 
          description: '古希腊建筑以其简洁、对称和柱式结构闻名，著名的代表有帕特农神庙，以多立克、爱奥尼和科林斯三种柱式为特色。',
          image: '/assets/image/古希腊.jpeg' // 添加图片路径
        },
        { 
          name: '罗曼式', 
          description: '罗曼式建筑起源于中世纪欧洲，以厚重的墙壁、半圆形拱顶和小窗户为特点，常见于教堂和修道院。',
          image: '/assets/image/罗曼式.jpg' // 添加图片路径
        },
        { 
          name: '洛可可', 
          description: '洛可可建筑起源于18世纪的法国，以其轻盈、优雅和繁复的装饰风格著称，常见于宫殿和室内装饰。',
          image: '/assets/image/洛可可.jpg' // 添加图片路径
        },
        { 
          name: '维多利亚', 
          description: '维多利亚建筑起源于19世纪的英国，以其多样化的风格和装饰繁复的立面为特点，常见于住宅和公共建筑。',
          image: '/assets/image/维多利亚.jpeg' // 添加图片路径
        },
        { 
          name: '装饰艺术', 
          description: '装饰艺术建筑起源于20世纪初的法国，以其几何形状、对称设计和富丽堂皇的装饰为特点，常见于高层建筑和剧院。',
          image: '/assets/image/装饰艺术.jpeg' // 添加图片路径
        }
        // 其他西式建筑
      ],
      other: [
        { 
          name: '埃及', 
          description: '埃及建筑以其宏伟的金字塔、神庙和陵墓为代表，古埃及的建筑风格以大规模石砌结构和象形文字装饰为特色。',
          image: '/assets/image/埃及.jpeg' // 添加图片路径
        },
        { 
          name: '伊斯兰', 
          description: '伊斯兰建筑以其华丽的圆顶、尖拱和丰富的几何装饰为特点，著名的代表有清真寺和宫殿，如阿拉伯半岛上的众多建筑。',
          image: '/assets/image/伊斯兰.jpg' // 添加图片路径
        },
        { 
          name: '印度', 
          description: '印度建筑以其精美的石雕、拱门和穹顶为特色，著名的代表有泰姬陵和印度教寺庙，体现出浓厚的宗教和文化色彩。',
          image: '/assets/image/印度.jpeg' // 添加图片路径
        }
        // 其他其他建筑
      ]
    },
    expanded: null
  },
  onLoad: function(options) {
    if (options.category) {
      this.setData({
        currentCategory: options.category
      });
    }
  },
  switchCategory: function(e) {
    this.setData({
      currentCategory: e.currentTarget.dataset.category,
      expanded: null // 切换类别时收起所有展开项
    });
  },
  toggleDetail: function(e) {
    const index = e.currentTarget.dataset.index;
    this.setData({
      expanded: this.data.expanded === index ? null : index
    });
  }
});
