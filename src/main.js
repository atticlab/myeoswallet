// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueMaterial from 'vue-material';
// import * as Eos from 'eosjs';
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default.css';
import VueAnalytics from 'vue-analytics';
// import ActionType from './store/constants';
import App from './App';
import router from './router';
import store from './store';
import BottomBar from './components/BottomBar';
import './assets/theme.scss';

Vue.use(VueMaterial);

Vue.use(VueAnalytics, {
  id: 'UA-XXX-X',
});

Vue.component('BottomBar', BottomBar);

Vue.config.productionTip = false;

// document.addEventListener('scatterLoaded', () => {
//   window.scatter.requireVersion(3.0);
//   store.dispatch(ActionType.SET_SCATTER, window.scatter);
//   store.dispatch(ActionType.SET_IDENTITY, window.scatter.identity);
//   window.scatter = null;
// });

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
});
