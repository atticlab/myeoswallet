import DashboardLayout from '../components/Dashboard/Layout/DashboardLayout.vue'
// GeneralViews
import NotFound from '../components/GeneralViews/NotFoundPage.vue'

// Actions (general)
const Action = () => import(/* webpackChunkName: "action" */ 'src/components/Wallet/Action.vue')
const Dashboard = () => import(/* webpackChunkName: "dashboard" */ 'src/components/Wallet/Dashboard.vue')
const Transfer = () => import(/* webpackChunkName: "transfer" */ 'src/components/Wallet/Actions/Transfer.vue')
const CreateAccount = () => import(/* webpackChunkName: "createacc" */ 'src/components/Wallet/Actions/CreateAccount.vue')

// proxy
const SetProxy = () => import(/* webpackChunkName: "setproxy" */ 'src/components/Wallet/Actions/proxy/SetProxy.vue')
const AssignProxy = () => import(/* webpackChunkName: "assignProxy" */ 'src/components/Wallet/Actions/proxy/AssignProxy.vue')
const UnAssignProxy = () => import(/* webpackChunkName: "unassignProxy" */ 'src/components/Wallet/Actions/proxy/UnAssignProxy.vue')
const UnsetProxy = () => import(/* webpackChunkName: "unsetProxy" */ 'src/components/Wallet/Actions/proxy/UnsetProxy.vue')
const Vote = () => import(/* webpackChunkName: "vote" */ 'src/components/Wallet/Actions/proxy/Vote')

// account
const AdvancedPermissions = () => import(/* webpackChunkName: "advancedpermissions" */ 'src/components/Wallet/Actions/account/AdvancedPermissions.vue')
const LinkAuth = () => import(/* webpackChunkName: "LinkAuth" */ 'src/components/Wallet/Actions/account/LinkAuth.vue')
const Permissions = () => import(/* webpackChunkName: "Permissions" */ 'src/components/Wallet/Actions/account/Permissions.vue')
const Ram = () => import(/* webpackChunkName: "Ram" */ 'src/components/Wallet/Actions/account/Ram.vue')
const Refund = () => import(/* webpackChunkName: "Refund" */ 'src/components/Wallet/Actions/account/Refund.vue')
const Stake = () => import(/* webpackChunkName: "Stake" */ 'src/components/Wallet/Actions/account/Stake.vue')
const NameAuction = () => import(/* webpackChunkName: "vote" */ 'src/components/Wallet/Actions/account/NameAuction.vue')

// block producer
const ClaimRewards = () => import(/* webpackChunkName: "claimrewards" */ 'src/components/Wallet/Actions/blockProducer/ClaimRewards.vue')
const RegisterProducer = () => import(/* webpackChunkName: "registerproducer" */ 'src/components/Wallet/Actions/blockProducer/RegisterProducer.vue')
const UnregisterProducer = () => import(/* webpackChunkName: "unregisterproducer" */ 'src/components/Wallet/Actions/blockProducer/UnregisterProducer.vue')

// other
const AirgrabTokens = () => import(/* webpackChunkName: "airgrabtokens" */ 'src/components/Wallet/Actions/AirgrabTokens.vue')
const Faq = () => import(/* webpackChunkName: "faq" */ 'src/components/Wallet/Faq.vue')
const Constitution = () => import(/* webpackChunkName: "constitution" */ 'src/components/Wallet/Constitution.vue')

const routes = [
  {
    path: '/',
    name: 'Root',
    component: DashboardLayout,
    children: [
      {
        path: '',
        redirect: { name: 'Dashboard' },
      },
      {
        path: 'action',
        name: 'Action',
        component: Action,
        children: [
          {
            path: '/dashboard',
            name: 'Dashboard',
            component: Dashboard,
          },
          {
            path: '/transfer',
            name: 'Transfer',
            component: Transfer,
          },
          {
            path: '/createacc',
            name: 'CreateAccount',
            component: CreateAccount,
          },
          {
            path: '/vote',
            name: 'Vote',
            component: Vote,
          },
          {
            path: '/setproxy',
            name: 'SetProxy',
            component: SetProxy,
          },
          {
            path: '/assignproxy',
            name: 'AssignProxy',
            component: AssignProxy,
          },
          {
            path: '/unassignproxy',
            name: 'UnAssignProxy',
            component: UnAssignProxy,
          },
          {
            path: '/unsetproxy',
            name: 'UnsetProxy',
            component: UnsetProxy,
          },
          {
            path: '/advancedpermission',
            name: 'AdvancedPermissions',
            component: AdvancedPermissions,
          },
          {
            path: '/linkauth',
            name: 'LinkAuth',
            component: LinkAuth,
          },
          {
            path: '/permission',
            name: 'Permissions',
            component: Permissions,
          },
          {
            path: '/ram',
            name: 'Ram',
            component: Ram,
          },
          {
            path: '/refund',
            name: 'Refund',
            component: Refund,
          },
          {
            path: '/stake',
            name: 'Stake',
            component: Stake,
          },
          {
            path: '/nameauction',
            name: 'NameAuction',
            component: NameAuction,
          },
          {
            path: '/claimrewards',
            name: 'ClaimRewards',
            component: ClaimRewards,
          },
          {
            path: '/registerproducer',
            name: 'RegisterProducer',
            component: RegisterProducer,
          },
          {
            path: '/unregisterproducer',
            name: 'UnregisterProducer',
            component: UnregisterProducer,
          },
          {
            path: '/airgrabtokens',
            name: 'AirgrabTokens',
            component: AirgrabTokens,
          },
        ],
      },
      {
        path: '/faq',
        name: 'Faq',
        component: Faq,
      },
      {
        path: '/constitution',
        name: 'Constitution',
        component: Constitution,
      }],
  },
  { path: '*', component: NotFound },
];


export default routes;
