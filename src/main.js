import Vue from 'vue';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import VueI18n from 'vue-i18n';
import VueMeta from 'vue-meta';
import App from './App.vue';
import router from './router';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import en from './locales/en.json';
import zh from './locales/zh.json';

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(VueI18n);
Vue.use(VueMeta);

const messages = {
  en,
  zh,
};

const i18n = new VueI18n({
  locale: localStorage.getItem('lang') || 'zh',
  messages,
});

new Vue({
  router,
  i18n,
  render: (h) => h(App),
}).$mount('#app');
