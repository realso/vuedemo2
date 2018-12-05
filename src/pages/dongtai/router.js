export default {
    path: '/dongtai',
    name: 'dongtai',
    component: r => require.ensure([], () => r(require('@/pages/dongtai/detail/index')), "dongtai" /*按需加载，名称一样打包在一个文件*/ ),
    meta: {
        keepAlive: true
    },
    redirect: '/dongtai/detail/main',
    children: [{
        path: '/dongtai/detail/main',
        name: "/dongtai/detail/main",
        component: r => require.ensure([], () => r(require('@/pages/dongtai/detail/views/main')), "dongtai"),
        props: { TITLE: '结算动态表' },
        meta: {
            keepAlive: true
        }
    },{
        path: '/dongtai/detail/snodesel',
        name: "/dongtai/detail/snodesel",
        component: r => require.ensure([], () => r(require('@/pages/com/views/snode_sel')), "dongtai"),
        props: { TITLE: '选择经营门店', refStore: { action: "dongtai/setSnode", path: "MAIN" } },
        meta: {
            keepAlive: true
        }
    },{
        path: '/dongtai/detail/detail',
        name: "/dongtai/detail/detail",
        component: r => require.ensure([], () => r(require('@/pages/dongtai/detail/views/detail')), "dongtai"),
        props: { TITLE: '明细' },
        meta: {
            keepAlive: true
        }
    }]
}