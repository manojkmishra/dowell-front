const routes = {
  path: '/charts',
  name: 'Compo',
  component: { template: '<router-view></router-view>', },
  meta: { hasMulSub: true, hidden: false, icon: 'mdi-folder', },
  children: [
    {  path: 'line',  name: 'LineCharts', component: () =>import('@/views/Home.vue'),  meta: {},
    },
    { path: 'bar', name: 'BarCharts', component: () => import('@/views/Home.vue'),
      meta: {},
    },
    {  path: 'else',  name: 'ElseCharts',  component: () =>import('@/views/Home.vue'),
      meta: {},
    },
  ],
};

export default routes;
