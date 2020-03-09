// 获取应用实例
const app = getApp()
var gio = require("../../utils/index.js").default;

$global.GioPage({
  data: {
    remind: '加载中',
    help_status: false,
    userid_focus: false,
    passwd_focus: false,
    userid: '',
    passwd: '',
    angle: 0
  },
  onLoad() {
    var _this = this
    setTimeout(function(){
      _this.setData({
        remind: ''
      });
      gio('track', 'props_add');
    }, 1000);  
    

  },
  bindViewTap() {
    my.navigateTo({
      url: '../movies/movies',
    });
    
  },
});
