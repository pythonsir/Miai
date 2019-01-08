import { observable } from "mobx";

const formStore = observable({
  gender:'male'
});

formStore.setGender = function(v1){
  this.gender = v1
}

export default formStore;