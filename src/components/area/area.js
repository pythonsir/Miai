import Taro, { Component } from "@tarojs/taro";
import api from "../../config/api";
import { View, PickerView, PickerViewColumn } from "@tarojs/components";
import "./area.less";


export default class Area extends Component {
  state = {
    area: [],
    province_: [],
    city_: [],
    county_: [],
    pindex:0,
    cindex:0,
    coindex:0,
    select_province:'选择省',
    select_city:'选择市',
    select_county:'选择县区'
  };

  componentWillMount() {
    // Taro.showLoading({
    //   title: "数据加载中..."
    // });
  }

  componentDidMount() {

    let that = this;

    Taro.request({
      url: api.getArea,
      method: "POST",
      header: {
        "content-type": "application/x-www-form-urlencoded" // 默认值
      }
    }).then(res => {

        const area = res.data.data.area

        this.setState({
          area:area
        })

        this.setProvince(null,area).then(res => {
          const code = res.code
          this.setCity(code,area).then(res => {

            const city_code = res[this.state.cindex].code
            this.setCounty(city_code,area).catch(err => {
              console.log(err)
            })

          }).catch(err => {
            console.log(err)
          })

        }).catch(err => {
          console.log(err)
        })

        

    }).catch(err => {
      console.log(err)
    })

  


  }

  componentWillUnmout() {}

  componentWillReceiveProps() {}


  setProvince = (code,data)=>{

    return new Promise((resolve,reject) => {

      const result = this.getList('province', code, data)

      if(result.length <=0){
        reject(false)
      }

      this.setState({
        province_: result
      })

      resolve(result[this.state.pindex])

    })

  }

  setCity = (code, data) => {
      
     return new Promise((resolve,reject) => {

       const result = this.getList("city", code.slice(0, 2), data);

       if (result.length <= 0) {
         reject(false)
       }

       this.setState({
         city_:result
       })

       resolve(result)


     })


    }

  setCounty = (code, data) => {

    return new Promise((resolve, reject) => {

      const result = this.getList("county", code.slice(0, 4), data);

      if (result.length <= 0) {
        reject(false)
      }

      this.setState({
        county_: result
      })

      resolve(result);


    })

  }

  getConfig = (type,area) => {
   
      return (area && area[`${type}_list`]) || {};
  };

  getList=(type,code,area) => {

      let result = [];
      if (type !== 'province' && !code) {
          return result;
      }

      const list = this.getConfig(type,area);

      result = Object.keys(list).map(code => ({
          code,
          name: list[code]
      }));

      if (code) {
          // oversea code
          if (code[0] === '9' && type === 'city') {
              code = '9';
          }

          result = result.filter(item => item.code.indexOf(code) === 0);
      }

      return result;

  }

  onChange = e => {
    const val = e.detail.value
    const area = this.state.area
    if(this.state.pindex != val[0]){
        const pr = this.state.province_[val[0]]
        this.setState({
          pindex:val[0],
          select_province:this.state.province_[val[0]].name,
        })
        this.setCity(pr['code'].slice(0, 2),area).then(res => {
          if(res.length == 1){
            this.setState({
              select_city:res[this.state.cindex].name
            })
          }else{
            this.setState({
              select_city:'请选择市'
            })
          }
          const city_code = res[this.state.cindex].code
          this.setCounty(city_code, area).then(res => {
            if(res.length == 1){
              this.setState({
                select_county:res[this.state.coindex].name
              })
            }else{
              this.setState({
                select_county:'请选择区县'
              })
            }
          }) .catch(err => {
            console.log(err)
          })
        }).catch(err => {
          console.log(err)
        })
        
    }

    if(this.state.cindex != val[1]){

      const cr = this.state.city_[val[1]];

      this.setState({
        cindex:val[1],
        select_city:this.state.city_[val[1]].name,
        select_county:'请选择区县'
      })

      this.setCounty(cr["code"].slice(0, 4), area).catch(err => {
        console.log(err);
      });

    }

    if(this.state.coindex != val[2]){
      this.setState({
        coindex:val[2],
        select_county:this.state.county_[val[2]].name
      })
    }

    this.props.onChange({
      province: this.state.select_province == '选择省' ?'': this.state.select_province,
      city: this.state.select_city == '请选择市'?'':this.state.select_city,
      county: this.state.select_county == '选择县区'?'':this.state.select_county
    })

  };


  render() {
    return <View className="content">
        <View className="select">
          <View className="province">{this.state.select_province}</View>
          <View className="city">{this.state.select_city}</View>
          <View className="county">{this.state.select_county}</View>
        </View>
        <PickerView indicatorStyle="height: 50px;" style="width: 100%;height:200px;" onChange={this.onChange}>
          <PickerViewColumn className="pvc">
            {this.state.province_.map(item => {
              return <View>{item["name"]}</View>;
            })}
          </PickerViewColumn>
          <PickerViewColumn className="pvc">
            {this.state.city_.map(item => {
              return <View>{item["name"]}</View>;
            })}
          </PickerViewColumn>
          <PickerViewColumn className="pvc">
            {this.state.county_.map(item => {
              return <View>{item["name"]}</View>;
            })}
          </PickerViewColumn>
        </PickerView>
      </View>;
  }
}