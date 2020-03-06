import Vue from 'vue';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import VueI18n from 'vue-i18n';
import App from './App.vue';
import router from './router';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';


Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(VueI18n);

const messages = {
  en: {
    message: {
      hello: 'hello world',
    },
  },
  zh: {
    message: {
      hello: '你好世界',
    },
  },
};
const i18n = new VueI18n({
  locale: 'en', // set locale
  messages, // set locale messages
});

new Vue({
  router,
  i18n,
  render: (h) => h(App),
}).$mount('#app');
