import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import Vuelidate from 'vuelidate'
import router from './router'
import store from './store'
import './registerServiceWorker'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import '@/theme/bootstrap-imports.scss'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(Vuelidate)

Vue.config.productionTip = false

Vue.prototype.$api = process.env.NODE_ENV === 'development'  ? 'https://localhost:5001'  : 'https://api.pagcare.com.br';

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
