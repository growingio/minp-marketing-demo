import Taro, { Component } from '@tarojs/taro'
import Index from './pages/index'
import gio from './utils/gio-minp/index'

import './app.scss'

gio('init', '9c76fe4756c3404d', 'wx0686f7c349efef47', {
  version: '1.0.0',
  taro: Taro
});

class App extends Component {

  config = {
    pages: [
      'pages/index/index',
      'pages/wxParse/wxParse',
      'pages/echarts/echarts',
      'pages/native/native'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    },
  }

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentCatchError () {}

  render () {
    return (
        <Index />
    )
  }
}

Taro.render(
    <App />
, document.getElementById('app'))
