import wx from 'weixin-js-sdk'			//微信sdk依赖
import { httpClient } from '@/utils/httpClient'
import { projectConfig } from '@/utils/projectConfig'
const jsApiList = ['onMenuShareAppMessage', 'onMenuShareTimeline', 'onMenuShareQQ', 'onMenuShareWeibo']

function getJSSDK(callback) {
  //获取随机串
  let createNonceStr = Math.random().toString(36).substr(2, 15);
  // timestamp
  let createTimeStamp = parseInt(new Date().getTime() / 1000) + '';
  let url = location.href.split('#')[0];
  let data ={
    url:encodeURIComponent(url), 
    timestamp: createTimeStamp,
    nonceStr: createNonceStr
  }
  httpClient.request(projectConfig.SHARE_GETSIGNATURE , data, 'post').then(res => {
    if(!res) return;
    let datas = res.returnObject;
    wx.config({
      debug: false, // 开启调试模式
      appId: 'wx8cfe1143c89bbd9f', // 必填，公众号的唯一标识
      timestamp: datas.timestamp, // 必填，生成签名的时间戳
      nonceStr: datas.nonceStr, // 必填，生成签名的随机串
      signature: datas.signature, // 必填，签名
      jsApiList: jsApiList // 必填，需要使用的JS接口列表
    })
    wx.ready(function () {
      if (callback) {
        callback()
      }
    })
    wx.error(function (res) {
      // alert("微信验证失败");
    });
  })
}

function shareMenu(opstion) {
  // 2.1分享给朋友
  wx.onMenuShareAppMessage({
    title: opstion.title,
    desc: opstion.desc,
    link: opstion.linkurl,
    imgUrl: opstion.img,
    trigger: function trigger(res) { },
    success: function success(res) {
      opstion.success()
    },
    cancel: function cancel(res) {
    },
    fail: function fail(res) {
    }
  });
  // 2.2 监听“分享到朋友圈”按钮点击、自定义分享内容及分享结果接口
  wx.onMenuShareTimeline({
    title: opstion.title,
    link: opstion.linkurl,
    imgUrl: opstion.img,
    trigger: function trigger(res) {
    },
    success: function success(res) {
      opstion.success()
    },
    cancel: function cancel(res) {
    },
    fail: function fail(res) {
      opstion.error('分享错误')
    }
  });
  // 2.3 监听“分享到QQ”按钮点击、自定义分享内容及分享结果接口
  wx.onMenuShareQQ({
    title: opstion.title,
    desc: opstion.desc,
    link: opstion.linkurl,
    imgUrl: opstion.img,
    trigger: function trigger(res) {
    },
    complete: function complete(res) {
    },
    success: function success(res) {
    },
    cancel: function cancel(res) {
    },
    fail: function fail(res) {
    }
  });
  // 2.4 监听“分享到微博”按钮点击、自定义分享内容及分享结果接口
  wx.onMenuShareWeibo({
    title: opstion.title,
    desc: opstion.desc,
    link: opstion.linkurl,
    imgUrl: opstion.img,
    trigger: function trigger(res) {
    },
    complete: function complete(res) {
    },
    success: function success(res) {
    },
    cancel: function cancel(res) {
    },
    fail: function fail(res) {
    }
  });
}

export default {
  getJSSDK: getJSSDK,
  shareMenu: shareMenu
}
