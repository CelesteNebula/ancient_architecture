Page({
  data: {
    results: [],
    imageUrl: ''
  },
  onLoad: function(options) {
    if (options.result && options.imageUrl) {
      const result = JSON.parse(decodeURIComponent(options.result));
      const imageUrl = decodeURIComponent(options.imageUrl);
      this.setData({ results: result, imageUrl: imageUrl });
    }
  }
});
