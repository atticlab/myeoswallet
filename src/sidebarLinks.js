export default [
  {
    name: 'Dashboard',
    icon: 'nc-icon nc-bank',
    path: '/dashboard'
  },
  {
    name: 'Create Account',
    icon: 'nc-icon nc-bank',
    path: '/createacc'
  },
  {
    name: 'Transfer',
    icon: 'nc-icon nc-bank',
    path: '/transfer'
  },
  {
    name: 'Voting',
    icon: 'nc-icon nc-book-bookmark',
    children: [
      {
        name: 'Vote',
        path: '/vote'
      },
      {
        name: 'Set Proxy',
        path: '/setproxy'
      },
      {
        name: 'UnsetProxy',
        path: '/unsetproxy'
      },
      {
        name: 'Assign Proxy',
        path: '/assignproxy'
      },
      {
        name: 'Unassign Proxy',
        path: '/unassignproxy'
      }
    ]
  },
  {
    name: 'Manage',
    icon: 'nc-icon nc-layout-11',
    children: [{
      name: 'Advanced Permissions',
      path: '/advancedpermission'
    },
    {
      name: 'LinkAuth',
      path: '/linkauth'
    },
    {
      name: 'Permissions',
      path: '/permission'
    },
    {
      name: 'Stake',
      path: '/stake'
    },
    {
      name: 'Ram',
      path: '/ram'
    },
    {
      name: 'Refund',
      path: '/refund'
    },
    {
      name: 'Name Auction',
      path: '/nameauction'
    }]
  },
  {
    name: 'Producer',
    icon: 'nc-icon nc-ruler-pencil',
    children: [{
      name: 'Claim Rewards',
      path: '/claimrewards'
    },
    {
      name: 'Register Producer',
      path: '/registerproducer'
    },
    {
      name: 'Unregister Producer',
      path: '/unregisterproducer'
    }
    ]
  },
  {
    name: 'Airgrab Tokens',
    icon: 'nc-icon nc-box',
    path: '/airgrabtokens'
  },
  {
    name: 'Faq',
    icon: 'nc-icon nc-chart-bar-32',
    path: '/faq'
  },
  {
    name: 'Constitution',
    icon: 'nc-icon nc-calendar-60',
    path: '/constitution'
  },
]
