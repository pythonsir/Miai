import { observable } from "mobx";

const formStore = observable({
  gender: "male",
  province: "",
  city: "",
  county:"",
  year: '',
  month: '',
  day: '',
  height:'',
  education:0,
  marriage:0,
  income:0
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

formStore.setEducation = function(e){
  this.education = e
}

formStore.setMarriage = function(m){
  this.marriage = m
}

formStore.setIncome = function(i){
  this.income = i
}

export default formStore;