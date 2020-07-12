/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');
import { Form, HasError, AlertError } from 'vform'
import moment from 'moment'
import VueProgressBar from 'vue-progressbar'
import swal from 'sweetalert2'
import VueRouter from 'vue-router'

window.Form=Form;

Vue.component(HasError.name, HasError)
Vue.component(AlertError.name, AlertError)


Vue.use(VueRouter)

let routes = [
    { path: '/dashboard' , component: require('./components/Dashboard.vue').default },
    { path: '/profile' , component: require('./components/Profile.vue').default },
    { path: '/users' , component: require('./components/Users.vue').default },
]

const router =  new VueRouter ({
    mode: 'history',
    routes
})

Vue.filter('upText',(text)=>{
    if(text){
        return text.charAt(0).toUpperCase() + text.slice(1)
    }
})
Vue.filter('dateTime',(dateTime)=>{
    if(dateTime){
        return moment(dateTime).format('MMMM Do YYYY, h:mm:ss a');
    }
})

const options = {
    color: 'rgb(143, 255, 199)',
    failedColor: 'red',
    height: '2px'
}
  
Vue.use(VueProgressBar, options);

const toast = swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    onOpen: (toast) => {
      toast.addEventListener('mouseenter', swal.stopTimer)
      toast.addEventListener('mouseleave', swal.resumeTimer)
    }
})
window.Fire = new Vue();
window.swal = swal;
window.toast = toast;
/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

Vue.component('example-component', require('./components/ExampleComponent.vue').default);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
    el: '#app',
    router
});
