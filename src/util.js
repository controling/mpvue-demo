// 工具函数库
import config from './config'
// 封装get请求
export function get(url){
    return new Promise((resolve, reject) => {
        wx.request({
            url: config.host + url,
            success: function(res){
                if(res.data.code == 0){
                    resolve(res.data.data)
                }else{
                    reject(res.data)
                }
            }
        })
    })
}

export function showSuccess(text){
    wx.showToast({
        title: text,
        icon: 'success'
    })
}

export function showFail(text){
    wx.showToast({
        title: text,
        icon: 'none'
    })
}