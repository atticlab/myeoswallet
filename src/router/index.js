import Vue from 'vue';
import Router from 'vue-router';
// import Login from '@/components/Login';
import MobileDevice from '@/components/MobileDevice';
import Wallet from '@/components/Wallet';
import Dashboard from '@/components/wallet/Dashboard';
import Faq from '@/components/wallet/Faq';
import Constitution from '@/components/wallet/Constitution';
import Transfer from '@/components/wallet/actions/Transfer';
import CreateAccount from '@/components/wallet/actions/CreateAccount';
import SetProxy from '@/components/wallet/actions/proxy/SetProxy';
import AssignProxy from '@/components/wallet/actions/proxy/AssignProxy';
import UnsetProxy from '@/components/wallet/actions/proxy/UnsetProxy';
import Vote from '@/components/wallet/actions/proxy/Vote';
import { AdvancedPermissions, LinkAuth, Permissions, Ram, Refund, Stake, NameAuction } from '@/components/wallet/actions/account';
import ClaimRewards from '@/components/wallet/actions/blockProducer/ClaimRewards';
import RegisterProducer from '@/components/wallet/actions/blockProducer/RegisterProducer';
import AirgrabTokens from '@/components/wallet/actions/AirgrabTokens';
import UnregisterProducer from '@/components/wallet/actions/blockProducer/UnregisterProducer';
import Action from '@/components/wallet/Action';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      // name: 'Login',
      // component: Login,
      redirect: { name: 'Dashboard' },
    },
    {
      path: '/wallet',
      name: 'Wallet',
      component: Wallet,
      children: [
        {
          path: '',
          redirect: { name: 'Dashboard' },
        },
        {
          path: '/wallet/action',
          name: 'Action',
          component: Action,
          children: [
            {
              path: 'dashboard',
              name: 'Dashboard',
              component: Dashboard,
            },
            {
              path: 'transfer',
              name: 'Transfer',
              component: Transfer,
            },
            {
              path: 'createacc',
              name: 'CreateAccount',
              component: CreateAccount,
            },
            {
              path: 'vote',
              name: 'Vote',
              component: Vote,
            },
            {
              path: 'setproxy',
              name: 'SetProxy',
              component: SetProxy,
            },
            {
              path: 'assignproxy',
              name: 'AssignProxy',
              component: AssignProxy,
            },
            {
              path: 'unsetproxy',
              name: 'UnsetProxy',
              component: UnsetProxy,
            },
            {
              path: 'advancedpermission',
              name: 'AdvancedPermissions',
              component: AdvancedPermissions,
            },
            {
              path: 'linkauth',
              name: 'LinkAuth',
              component: LinkAuth,
            },
            {
              path: 'permission',
              name: 'Permissions',
              component: Permissions,
            },
            {
              path: 'ram',
              name: 'Ram',
              component: Ram,
            },
            {
              path: 'refund',
              name: 'Refund',
              component: Refund,
            },
            {
              path: 'stake',
              name: 'Stake',
              component: Stake,
            },
            {
              path: 'nameauction',
              name: 'NameAuction',
              component: NameAuction,
            },
            {
              path: 'claimrewards',
              name: 'ClaimRewards',
              component: ClaimRewards,
            },
            {
              path: 'registerproducer',
              name: 'RegisterProducer',
              component: RegisterProducer,
            },
            {
              path: 'unregisterproducer',
              name: 'UnregisterProducer',
              component: UnregisterProducer,
            },
            {
              path: 'airgrabtokens',
              name: 'AirgrabTokens',
              component: AirgrabTokens,
            },
          ],
        },
        {
          path: 'faq',
          name: 'Faq',
          component: Faq,
        },
        {
          path: 'constitution',
          name: 'Constitution',
          component: Constitution,
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
      name: 'VoteAttic',
      beforeEnter() {
        window.location = 'https://atticlab.net/vote/';
      },
    },
  ],
});
