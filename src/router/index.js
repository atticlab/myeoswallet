import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/components/Login';
import Wallet from '@/components/Wallet';
import Dashboard from '@/components/wallet/Dashboard';

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
      ],
    },
  ],
});
