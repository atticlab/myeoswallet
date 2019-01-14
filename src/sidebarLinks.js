export default [
  {
    name: 'Dashboard',
    icon: 'nc-icon nc-album-2',
    path: '/dashboard',
  },
  {
    name: 'Create Account',
    icon: 'nc-icon nc-simple-add',
    path: '/createacc',
  },
  {
    name: 'Transfer',
    icon: 'nc-icon nc-send',
    path: '/transfer',
  },
  {
    name: 'Voting',
    icon: 'nc-icon nc-book-bookmark',
    children: [
      {
        name: 'Vote',
        path: '/vote',
      },
      {
        name: 'Referendums',
        path: '/referendums',
      },
      {
        name: 'Set Proxy',
        path: '/setproxy',
      },
      {
        name: 'Unset Proxy',
        path: '/unsetproxy',
      },
      {
        name: 'Assign Proxy',
        path: '/assignproxy',
      },
      {
        name: 'Unassign Proxy',
        path: '/unassignproxy',
      },
    ],
  },
  {
    name: 'Manage',
    icon: 'nc-icon nc-circle-10',
    children: [{
      name: 'Advanced Permissions',
      path: '/advancedpermission',
    },
    {
      name: 'Link Auth',
      path: '/linkauth',
    },
    {
      name: 'Permissions',
      path: '/permission',
    },
    {
      name: 'Stake',
      path: '/stake',
    },
    {
      name: 'Ram',
      path: '/ram',
    },
    {
      name: 'Refund',
      path: '/refund',
    },
    {
      name: 'Name Auction',
      path: '/nameauction',
    }],
  },
  {
    name: 'Producer',
    icon: 'nc-icon nc-trophy',
    children: [{
      name: 'Claim Rewards',
      path: '/claimrewards',
    },
    {
      name: 'Register Producer',
      path: '/registerproducer',
    },
    {
      name: 'Unregister Producer',
      path: '/unregisterproducer',
    },
    ],
  },
  {
    name: 'Airgrab Tokens',
    icon: 'nc-icon nc-briefcase-24',
    path: '/airgrabtokens',
  },
  {
    name: 'Faq',
    icon: 'nc-icon nc-alert-circle-i',
    path: '/faq',
  },
  {
    name: 'Constitution',
    icon: 'nc-icon nc-hat-3',
    path: '/constitution',
  },
  // {
  //   name: 'Vote offline',
  //   icon: 'nc-icon nc-favourite-28',
  //   path: '/voteatticlab',
  // },
];
