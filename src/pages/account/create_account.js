import Taro, { Component } from "@tarojs/taro";
import Util from "../../util/util";
import api from "../../config/api";
import { observer, inject } from "@tarojs/mobx";
import Navbar from "../../components/navbar/navbar";
import Banner from "../../components/banner/banner";
import { AtButton } from 'taro-ui'
import './create_account.less'

@inject("formStore")
@observer
class CreateAccount extends Component{


    config={
        navigationStyle:'default',
        navigationBarTitleText:'创建账号'
    }

    getnum(e){

        let that = this;

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
                if(res.data.data == true ){
                    that.saveUserinfo()
                }else{
                    Taro.showToast({
                        title:'操作失败,请重试',
                        icon:'none'
                    })
                }
            },
            fail:function(err){
                Taro.showToast({
                    title:'系统错误，请重试',
                    icon:'none'
                })
                console.log(err)
            }
        })

    }


    /**
     * 保存formstore用户信息
     */
    saveUserinfo() {

        const {
            formStore: {
                gender,
                province,
                city,
                county,
                year,
                month,
                day,
                height,
                education,
                marriage,
                income
            }
        } = this.props;

        let data = {
            gender: gender,
            province: province,
            city: city,
            county: county,
            year: year,
            month: month,
            day: day,
            height: height,
            education: education,
            marriage: marriage,
            income: income,
            session3rd: Taro.getStorageSync("session3rd"),
        }

        /**
        * 保存formStore到数据库
        */
        Taro.request({
            url: api.saveFormStore,
            method: "POST",
            data: data,
            header: {
                "content-type": "application/x-www-form-urlencoded" // 默认值
            },
            success: function (res) {
                if(res.data.data == true){
                    Taro.redirectTo({
                        url:'/pages/comprehensive/comprehensive'
                    })
                }else{
                    Taro.showToast({
                        title:'系统错误，请重试',
                        icon:'none'
                    })
                }
            },
            fail: function (e) {
                //TODO 此处可以将发生错误的数据，存储到数据库
                console.log(e)
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