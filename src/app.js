import Vue from 'vue';

Vue.component('liker', require('./components/main.vue'));

const app = new Vue({
  render (createElement) {
    return createElement('liker');
  },

}).$mount('#app');