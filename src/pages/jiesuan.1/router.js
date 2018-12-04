export default {
    path: '/jiesuan1',
    name: 'jiesuan1',
    component: r => require.ensure([], () => r(require('@/pages/jiesuan.1/add/index')), "jiesuan" /*按需加载，名称一样打包在一个文件*/ ),
    meta: {
        keepAlive: true
    },
    redirect: '/jiesuan1/add/main',
    children: [{
        path: '/jiesuan1/add/main',
        name: "/jiesuan1/add/main",
        component: r => require.ensure([], () => r(require('@/pages/jiesuan.1/add/views/main')), "jiesuan"),
        props: { TITLE: '日结算' },
        meta: {
            keepAlive: true
        }
    }, {
        path: '/jiesuan1/add/set',
        name: "/jiesuan1/add/set",
        component: r => require.ensure([], () => r(require('@/pages/jiesuan.1/add/views/set')), "jiesuan"),
        props: { TITLE: '设置项目' },
        meta: {
            keepAlive: true
        }
    }, {
        path: '/jiesuan1/add/empsel',
        name: "/jiesuan1/add/empsel",
        component: r => require.ensure([], () => r(require('@/pages/com/views/emp_sel')), "jiesuan"),
        props: { TITLE: '选择店长', refStore: { mutation: "jiesuan1/setEmp", path: "MAIN" } },
        meta: {
            keepAlive: true
        }
    }, {
        path: '/jiesuan1/add/snodesel',
        name: "/jiesuan1/add/snodesel",
        component: r => require.ensure([], () => r(require('@/pages/com/views/snode_sel')), "jiesuan"),
        props: { TITLE: '选择经营门店', refStore: { action: "jiesuan1/setSnode", path: "MAIN" } },
        meta: {
            keepAlive: true
        }
    },{
        path: '/jiesuan1/detail/jiesuanribao',
        name: "/jiesuan1/detail/jiesuanribao",
        component: r => require.ensure([], () => r(require('@/pages/jiesuan.1/detail/views/jiesuanribao')), "jiesuan"),
        props: { TITLE: '结算日报' },
        meta: {
            keepAlive: true
        }
    },{
        path: '/jiesuan1/detail/main',
        name: "/jiesuan1/detail/main",
        component: r => require.ensure([], () => r(require('@/pages/jiesuan.1/detail/views/main')), "jiesuan"),
        props: { TITLE: '明细' },
        meta: {
            keepAlive: true
        }
    }]
}