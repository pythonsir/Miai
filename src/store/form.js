import { observable } from "mobx";

const formStore = observable({
  gender: "male",
  province: "",
  city: "",
  county:""
});

formStore.setGender = function(v1){
  this.gender = v1
}

formStore.setPCO = function (province,city,county){
  this.province = province
  this.city = city
  this.county = county
}

export default formStore;