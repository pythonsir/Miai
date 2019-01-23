import { observable } from 'mobx'

const birthdayStore = observable({
    year: '',
    month:'',
    day:''
})

birthdayStore.setyear = function (v) {
    this.year = v
}

birthdayStore.setmonth = function (v) {
    this.month = v
}

birthdayStore.setday = function (v) {
   this.day = v
}

export default birthdayStore