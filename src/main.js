import Vue from 'vue'
import './pollyfills'
import VueRouter from 'vue-router'
import VueNotify from 'vue-notifyjs'
import VeeValidate, { Validator } from 'vee-validate'
import VueResource from 'vue-resource'
import VueClipboard from 'vue-clipboard2';
import VueAnalytics from 'vue-analytics';
import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'
import store from './store';
// import mixins from './mixins';

// fontawesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCubes, faWallet, faStickyNote, faFolderPlus, faAddressCard, faUniversity, faQuestionCircle, faThLarge,
  faTrophy, faAngleLeft, faAngleRight, faBars, faCopy, faRandom, faPlusSquare, faSignOutAlt, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
library.add(faCubes, faWallet, faStickyNote, faFolderPlus, faAddressCard, faUniversity, faQuestionCircle, faThLarge,
  faTrophy, faAngleLeft, faAngleRight, faBars, faCopy, faRandom, faPlusSquare, faSignOutAlt, faSignInAlt );
Vue.component('font-awesome-icon', FontAwesomeIcon);

import App from './App.vue';

// Plugins
import GlobalComponents from './globalComponents'
import GlobalDirectives from './globalDirectives'
import SideBar from './components/UIComponents/SidebarPlugin'
import initProgress from './progressbar';

// router setup
import routes from './routes/routes';

// library imports
import './assets/sass/paper-dashboard.scss';
import './assets/sass/element_variables.scss';
import './assets/sass/demo.scss';

import sidebarLinks from './sidebarLinks';
// plugin setup
Vue.use(VueRouter);
Vue.use(GlobalDirectives);
Vue.use(GlobalComponents);
Vue.use(VueNotify);
Vue.use(SideBar, { sidebarLinks });

// VeeValidate
import validationRules from './validationRules';

Vue.use(VeeValidate, {
  events: 'paste|input|blur|change',
});
validationRules.forEach((item) => {
  Validator.extend(item.name, {
    getMessage: item.getMessage,
    validate: item.validate,
  });
});


Vue.use(VueClipboard);
locale.use(lang);

Vue.use(VueResource);
Vue.http.options.root = process.env.VUE_APP_BASE_URL;

// table
import { Table, TableColumn } from 'element-ui';
Vue.use(Table);
Vue.use(TableColumn);

// configure router
const router = new VueRouter({
  mode: 'history',
  routes, // short for routes: routes
  linkActiveClass: 'active',
});

// google analytics
Vue.use(VueAnalytics, {
  id: 'UA-128745434-1',
  router,
});

initProgress(router);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  store,
  router,
});
