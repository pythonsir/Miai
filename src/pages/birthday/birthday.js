import Taro, { Component } from "@tarojs/taro";
import Util from "../../util/util";
import api from "../../config/api";
import { observer, inject } from "@tarojs/mobx";
import Navbar from "../../components/navbar/navbar";
import Banner from "../../components/banner/banner";
import { View, ScrollView  } from "@tarojs/components";
import Year from '../../components/year/year'
import Month from '../../components/month/month'
import Day from '../../components/day/day'
import './birthday.less'



@inject("formStore")
@observer
class Birthday extends Component{


    state = {
        height: 0,
        statusBarHeight: 0,
        svHeight:0,
        index:0,
        select:'y'
       
    };

    componentWillMount() {

        Util.getNavInfo().then(res => {
            this.setState({
                height: res.height,
                statusBarHeight: res.statusBarHeight
            });
        });

    }

    componentDidMount(){
        this.getScrollViewHeight()

    }

    getScrollViewHeight() { // 设置ScrollView的高度

        Taro.getSystemInfo().then(res => {

            const query = Taro.createSelectorQuery()

            query.select('#content').boundingClientRect()

            query.exec((res) => {
                const c = res[0].height
                this.setState({
                    svHeight: c
                })
            })

        })
    }

    handleSelectYear(newstate) { // 获取子组件传回来的state

        const { formStore } = this.props

        let that = this

        if (newstate != formStore.year){
            formStore.day = ''
            formStore.month = ''
        }

        formStore.setyear(newstate)


        setTimeout(() => {
            
            that.setState({
                select: 'm'
            })

        }, 300);
        
    }

    selectYMD(flag){

        const { formStore: { year, month, day } } = this.props

        if( year == '' && (flag == 'm' || flag == 'd')){

            Taro.showToast({
                title:'请先选择年',
                icon:'none'
            })
            return
        }else if(month == '' && flag == 'd'){
            
            Taro.showToast({
                title:'请选择月',
                icon:'none'
            })
            return;
        }

        this.setState({
            select:flag,
        })


    }

    handleSelectMonth(newstate){

        let that = this

        const { formStore } = this.props

        if(newstate != formStore.month){
            formStore.day = ''
        }

        formStore.setmonth(newstate)

        setTimeout(() => {
            
            that.setState({
                select: 'd'
            })

        }, 300);

    }

    handleSelectDay(newstate){
     
        const { formStore } = this.props

        formStore.setday(newstate)

        Taro.navigateTo({
            url:'/pages/height/height'
        })

    }

    render (){


        const {formStore : {year,month,day}} = this.props

        let html = null

        if (this.state.select == 'y'){

            html = <View><Year number={40} year={19} year_value={year}  onChoose={this.handleSelectYear}></Year>
                <Year number={50} year={19} year_value={year} onChoose={this.handleSelectYear}></Year>
                <Year number={60} year={19} year_value={year} onChoose={this.handleSelectYear}></Year>
                <Year number={70} year={19} year_value={year} onChoose={this.handleSelectYear}></Year>
                <Year number={80} year={19} year_value={year} onChoose={this.handleSelectYear}></Year>
                <Year number={90} year={19} year_value={year} onChoose={this.handleSelectYear}></Year></View>

        } else if (this.state.select == 'm' ){
            html = <Month value={month} onSelect={this.handleSelectMonth}></Month>
        }else if(this.state.select == 'd'){
            html = <Day dyear={year} dmonth={month} value={day}  onSelect={this.handleSelectDay} ></Day>
        }

        return <View className="container" style={{ paddingTop: this.state.height + "px" }}>
            <Navbar height={this.state.height} statusBarHeight={this.state.statusBarHeight} size="28" color="#ffffff" icon="chevron-left" title="完善资料" />
            <Banner title="您的生日是哪天" style="width:100%" />
            <View className='ymd'>
                <View onClick={this.selectYMD.bind(this,'y')} className={this.state.select == 'y' ? 'choose':'' }>{year}年</View>
                <View onClick={this.selectYMD.bind(this,'m')} className={this.state.select == 'm' ? 'choose' : ''}>{month}月</View>
                <View onClick={this.selectYMD.bind(this,'d')}  className={this.state.select == 'd' ? 'choose' : ''}>{day}日</View>
            </View>
            <View className="content" id="content">
                <ScrollView scrollY={true}  style={'height:'+this.state.svHeight+'px'} >
                    {html}
              </ScrollView>
            
            </View>
            
          </View>

    }



}
export default Birthday