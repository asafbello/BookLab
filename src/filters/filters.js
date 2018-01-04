import Vue from 'vue'
import moment from "moment"


Vue.filter('toDate', val => {
    if (!val) return
    return moment().to(val);
});




