import { observable } from "mobx";

const formStore = observable({
  gender: "male",
  province: "",
  city: "",
  county:"",
  year: '',
  month: '',
  day: '',
  height:''
});

formStore.setGender = function(v1){
  this.gender = v1
}

formStore.setPCO = function (province,city,county){
  this.province = province
  this.city = city
  this.county = county
}
formStore.setyear = function (v) {
  this.year = v
}

formStore.setmonth = function (v) {
  this.month = v
}

formStore.setday = function (v) {
  this.day = v
}

formStore.setHeight = function(h){
  this.height = h
}

export default formStore;