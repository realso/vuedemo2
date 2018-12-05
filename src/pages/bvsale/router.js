export default [{
    path: '/bvsale',
    name: 'bvsale',
    component: r => require.ensure([], () => r(require('@/pages/bvsale/add/index')), "bvsale"),
    redirect: '/bvsale/add/main',
    children: [{
        path: '/bvsale/add/main',
        name: "/bvsale/add/main",
        component: r => require.ensure([], () => r(require('@/pages/bvsale/add/views/main')), "bvsale"),
        props: { TITLE: '销货单' }
    }, {
        path: '/bvsale/add/mat',
        name: "/bvsale/add/mat",
        component: r => require.ensure([], () => r(require('@/pages/bvsale/add/views/mat')), "bvsale"),
        props: { TITLE: '商品编辑' }
    }, {
        path: '/bvsale/add/jsnodesel',
        name: "/bvsale/add/jsnodesel",
        component: r => require.ensure([], () => r(require('@/pages/com/views/jsnode_sel')), "bvsale"),
        props: { TITLE: '选择经营网点', refStore: { action: "bvsale/setSnode", path: "MAIN" } }
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
        props: { TITLE: '销货单' }
    }, {
        path: '/bvsale/list/jsnodesel',
        name: "/bvsale/list/jsnodesel",
        component: r => require.ensure([], () => r(require('@/pages/com/views/jsnode_sel')), "bvsale"),
        props: { TITLE: '选择经营网点' }
    }]
}]