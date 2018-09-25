import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/components/Login';
import MobileDevice from '@/components/MobileDevice';
import Wallet from '@/components/Wallet';
import Dashboard from '@/components/wallet/Dashboard';
import Faq from '@/components/wallet/Faq';
import Transfer from '@/components/wallet/actions/Transfer';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login,
    },
    {
      path: '/wallet',
      name: 'Wallet',
      component: Wallet,
      children: [
        {
          path: '',
          component: Dashboard,
        },
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard,
        },
        {
          path: 'faq',
          name: 'FAQ',
          component: Faq,
        },
        {
          path: 'transfer',
          name: 'Transfer',
          component: Transfer,
        },
      ],
    },
    {
      path: '/mobile',
      name: 'MobileDevice',
      component: MobileDevice,
    },
    {
      path: '/vote',
      name: 'Vote',
      beforeEnter() {
        window.location = 'https://atticlab.net/vote/';
      },
    },
  ],
});
