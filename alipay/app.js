var gio = require("./utils/index.js").default;
gio('init', '9c76fe4756c3404d', '2018071560686136', { version: '9.9'});

//var gioConfig = require("./utils/gioConfig.js").default;
//gio('setConfig', gioConfig);
App($global.trackApp({
    globalData:{
        g_isPlayingMusic:false,
        g_currentMusicPostId:null,
        doubanBase: "https://douban.uieee.com",
    }
}))