// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueMaterial from 'vue-material';
import VueResource from 'vue-resource';
import VueClipboard from 'vue-clipboard2';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCubes, faWallet, faStickyNote, faFolderPlus, faAddressCard, faUniversity, faQuestionCircle, faThLarge, faTrophy, faAngleLeft, faAngleRight, faBars, faCopy, faRandom, faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
// import * as Eos from 'eosjs';
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/black-green-dark.css';
import VueAnalytics from 'vue-analytics';
import App from './App';
import router from './router';
import store from './store';
import BottomBar from './components/BottomBar';
import TextActionAgree from './components/helpers/TextActionAgree';
import './assets/theme.scss';

library.add(faCubes, faWallet, faStickyNote, faFolderPlus, faAddressCard, faUniversity, faQuestionCircle, faThLarge, faTrophy, faAngleLeft, faAngleRight, faBars, faCopy, faRandom, faPlusSquare);

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.use(VueMaterial);
Vue.use(VueResource);
Vue.use(VueClipboard);

Vue.use(VueAnalytics, {
  id: 'UA-98871974-2',
  router,
});

Vue.http.options.root = process.env.BASE_URL;

Vue.component('BottomBar', BottomBar);
Vue.component('TextActionAgree', TextActionAgree);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
});
