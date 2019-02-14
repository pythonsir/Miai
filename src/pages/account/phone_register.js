import Taro, { Component } from "@tarojs/taro";
import { View,Image } from "@tarojs/components"
import api from "../../config/api";
import { AtInput, AtButton } from 'taro-ui'
import './phone_register.less'

class PhoneRegister extends Component{

    config = {
        navigationStyle: 'default',
        navigationBarTitleText: '手机号绑定'
    }

    state={
        userinfo:{},
        value:'',
        value2:'',
        codeinfo:'发送验证码',
        smsid:'',
        codebtn:false
    }

    componentDidMount(){

        Taro.getStorage({ key: 'userinfo' })
            .then(res => {
                this.state.userinfo = res.data
            })
    }

    handleChange(e){

        this.setState({
            value: e
        })

    

        

        
    }
    handleChange2(e){
        this.setState({
            value2:e
        })
    }

    sendSMS(){

       

        let that = this;

        let i = 60;

        let phone = this.state.value

        let regex = /^[1][3,4,5,7,8][0-9]{9}$/;

        if (regex.test(phone)){

            this.setState({
                codebtn: true
            })

            Taro.request({
                url: api.sendSms,
                data: {
                    session3rd: Taro.getStorageSync("session3rd"),
                    phone: this.state.value
                },
                method: "POST",
                header: {
                    "content-type": "application/x-www-form-urlencoded" // 默认值
                },
                success: function (res) {

                   if(res.data.ret == 200 && res.data.data != false ){

                        that.setState({
                            smsid:res.data.data
                        })

                       Taro.showToast({
                           title:'发送成功',
                           icon:'none'
                       })

                       let t = setInterval(() => {
                           this.setState({
                               codeinfo: --i + 's'
                           })
                       }, 1000);

                       setInterval(() => {

                           this.setState({
                               codeinfo: '发送验证码',
                               codebtn:false
                           })
                           clearInterval(t)

                       }, 60000);


                   }else{
                      Taro.showToast({
                          title:'系统错误',
                          icon:'none'
                      })
                      that.setState({
                          codebtn:false
                      })
                   }
                },
                fail: function (err) {
                    console.log(err);
                    that.setState({
                        codebtn: false
                    })
                }
            })


        }else{

            Taro.showToast({
                title:'请输入正确的手机号！',
                icon:'none'
            })
           
        }

    }

    // 绑定手机号
    submit(){

        if(this.state.value == ''){
            
            Taro.showToast({
                title:'手机号不能为空',
                icon:'none'
            })

            return
        }

        if(this.state.value2 == ''){

            Taro.showToast({
                title:'验证码不能为空',
                icon:'none'
            })

            return
        }

        Taro.showLoading({
            title:'正在绑定手机号',
            mask:true
        })

        Taro.request({
            url: api.bindPhone,
            data: {
                session3rd: Taro.getStorageSync("session3rd"),
                id: this.state.smsid,
                phone: this.state.value,
                smscode:this.state.value2
            },
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded" // 默认值
            }
        }).then(res => {

          if(res.data.data == true){
              Taro.showToast({'title':'绑定成功'})
          }else{
              Taro.showToast({
                  title:'绑定失败，请重试',
                  icon:'none'
              })
          }

        }).catch(err => {

            Taro.showToast({
                title:'系统异常',
                icon:'noe'
            })
        })

    }

    render(){
        return (    

            <View className='container'>
                <View className='header'>
                    <open-data type="userAvatarUrl"></open-data>
                </View>
                <View className='body'>
                    <View className='phone'>
                        <AtInput
                            name='value'
                            type='phone'
                            maxlength='11'
                            placeholder='请输入手机号'
                            value={this.state.value}
                            onChange={this.handleChange.bind(this)}
                        />
                    </View>
                    <View className='code'>
                        <AtInput
                            name='value2'
                            type='number'
                            placeholder='请输入验证码'
                            value={this.state.value2}
                            onChange={this.handleChange2.bind(this)}
                        />
                        <AtButton className='btn' disabled={this.state.codebtn} onClick={this.sendSMS} circle={true}>{this.state.codeinfo}</AtButton>
                    </View>
                    <View className='submit'>

                        <AtButton className='btn' onClick={this.submit} circle={true} >绑定手机号</AtButton>

                    </View>

                </View>
        

            </View>


        )
    }

}

export default PhoneRegister