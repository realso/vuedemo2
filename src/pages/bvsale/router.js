export default [{
    path: '/bvsale',
    name: 'bvsale',
    component: r => require.ensure([], () => r(require('@/pages/bvsale/add/index')), "bvsale"),
    redirect: '/bvsale/add/main',
    meta: { level: 0 },
    children: [{
        path: '/bvsale/add/main',
        name: "/bvsale/add/main",
        component: r => require.ensure([], () => r(require('@/pages/bvsale/add/views/main')), "bvsale"),
        props: { TITLE: '订货单' },
        meta: { level: 1 }
    }, {
        path: '/bvsale/add/mat',
        name: "/bvsale/add/mat",
        component: r => require.ensure([], () => r(require('@/pages/bvsale/add/views/mat')), "bvsale"),
        props: { TITLE: '物料' },
        meta: { level: 2 }
    }, {
        path: '/bvsale/add/jsnodesel',
        name: "/bvsale/add/jsnodesel",
        component: r => require.ensure([], () => r(require('@/pages/com/views/jsnode_sel')), "bvsale"),
        props: { TITLE: '选择经营网点', refStore: { action: "bvsale/changeSnode", path: "MAIN" } },
        meta: { level: 2 }
    }]
}, {
    path: '/bvsale/list',
    name: '/bvsale/list',
    component: r => require.ensure([], () => r(require('@/pages/bvsale/list/index')), "bvsale"),
    redirect: '/bvsale/list/main',
    children: [{
        path: '/bvsale/list/main',
        name: "/bvsale/list/main",
        component: r => require.ensure([], () => r(require('@/pages/bvsale/list/views/main')), "bvsale"),
        props: { TITLE: '订货管理' }
    }, {
        path: '/bvsale/list/jsnodesel',
        name: "/bvsale/list/jsnodesel",
        component: r => require.ensure([], () => r(require('@/pages/com/views/jsnode_sel')), "bvsale"),
        props: { TITLE: '选择经营网点' }
    }]
}, {
    path: '/bvsale/list1',
    name: '/bvsale/list1',
    component: r => require.ensure([], () => r(require('@/pages/bvsale/list1/index')), "bvsale"),
    redirect: '/bvsale/list1/main',
    children: [{
        path: '/bvsale/list1/main',
        name: "/bvsale/list1/main",
        component: r => require.ensure([], () => r(require('@/pages/bvsale/list1/views/main')), "bvsale"),
        props: { TITLE: '订货状况' }
    }, {
        path: '/bvsale/list1/jsnodesel',
        name: "/bvsale/list1/jsnodesel",
        component: r => require.ensure([], () => r(require('@/pages/com/views/jsnode_sel')), "bvsale"),
        props: { TITLE: '选择经营网点' }
    }]
}]