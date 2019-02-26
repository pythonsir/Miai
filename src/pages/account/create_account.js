import Taro, { Component } from "@tarojs/taro";
import Util from "../../util/util";
import api from "../../config/api";
import { observer, inject } from "@tarojs/mobx";
import Navbar from "../../components/navbar/navbar";
import Banner from "../../components/banner/banner";
import { AtButton } from 'taro-ui'
import './create_account.less'


class CreateAccount extends Component{


    config={
        navigationStyle:'default',
        navigationBarTitleText:'创建账号'
    }

    getnum(e){
        Taro.request({
            url:api.getPhone,
            data: {
                session3rd: Taro.getStorageSync("session3rd"),
                encryptedData: e.detail.encryptedData,
                iv: e.detail.iv
            },
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded" // 默认值
            },
            success:function(res){
                console.log(res)
            },
            fail:function(err){
                console.log(err)
            }
        })
    }

    gotoRegister(){

        Taro.navigateTo({
            url:'/pages/account/phone_register'
        })

    }

    render(){
        return <View className="container">
            <View className="content">
                <AtButton className="bindPhone" open-type="getPhoneNumber" onGetPhoneNumber={this.getnum} >微信绑定手机号注册</AtButton>
            </View>
            <View onClick={this.gotoRegister} className='register'>填写手机号注册 ></View>
        </View>
    }
}

export default CreateAccount