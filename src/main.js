import Vue from 'vue'
import App from './App.vue'

//CSS
import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';
import './assets/style.scss'
//LIB
import VueOnsen from 'vue-onsenui'; 
//import Router from './routes/routes'

Vue.use(VueOnsen);

Vue.config.productionTip = false

var app = 
new Vue({
  render: h => h(App)
}).$mount('#app')

app.$ons.disableAutoStyling()