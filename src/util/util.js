
import Taro from "@tarojs/taro";


export default {
     
    getNavInfo:() =>{

        return new Promise((resolve,reject) => {

            Taro.getSystemInfo().then(res => {

                const jn = wx.getMenuButtonBoundingClientRect()
                const height = jn.top + jn.height + (jn.top - res.statusBarHeight)
                resolve({ statusBarHeight: res.statusBarHeight, height: height })
            }).catch(err => {
                reject(err)
            })

        })
        
        


    }

}