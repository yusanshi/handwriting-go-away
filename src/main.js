import Vue from 'vue';
import { BootstrapVue } from 'bootstrap-vue';
import VueI18n from 'vue-i18n';
import VueMeta from 'vue-meta';
/* eslint-disable */
import zhAbout from 'raw-loader!./locales/zh/about.md';
import enAbout from 'raw-loader!./locales/en/about.md';
/* eslint-enable */
import App from './App.vue';
import router from './router';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import en from './locales/en/main.json';
import zh from './locales/zh/main.json';
import getLang from './utils/getLang';

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(VueI18n);
Vue.use(VueMeta);

const messages = {
  en: Object.assign(en, {
    about: enAbout,
  }),
  zh: Object.assign(zh, {
    about: zhAbout,
  }),
};

const i18n = new VueI18n({
  locale: localStorage.getItem('lang') || getLang(Object.keys(messages)) || 'zh',
  messages,
});

new Vue({
  router,
  i18n,
  render: (h) => h(App),
}).$mount('#app');
