const routes = {
  path: '/tables',
  name: 'Tables',
  component: {template: '<router-view></router-view>',},
  meta: {hasMulSub: true, hidden: false, icon: 'mdi-folder',},
  children: [
    { path: 'table-inline-edit', name: 'TableInlineEdit',
      component: () => import('@/views/Home.vue'),
      meta: {},
    },
    { path: 'table-drag-sort', name: 'TableDragSort',
      component: () => import('@/views/Home.vue'),
      meta: {},
    },
  ],
};

export default routes;
