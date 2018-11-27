export default {
    path: '/jiesuan',
    name: 'jiesuan',
    component: r => require.ensure([], () => r(require('@/pages/jiesuan/add/index')), "jiesuan" /*按需加载，名称一样打包在一个文件*/ ),
    redirect: '/jiesuan/add/main',
    children: [
        {
            path: '/jiesuan/add/main',
            name: "/jiesuan/add/main",
            component: r => require.ensure([], () => r(require('@/pages/jiesuan/add/views/main')), "jiesuan"),
            props: { TITLE: '日结算' },
            meta: {
              keepAlive: true
            }
        },
        {
            path: '/jiesuan/add/set',
            name: "jiesuan/add/set",
            component: r => require.ensure([], () => r(require('@/pages/jiesuan/add/views/set')), "jiesuan"),
            props: { TITLE: '设置项目' },
            meta: {
              keepAlive: true
            }
        }, {
            path: '/jiesuan/add/empsel',
            name: "/jiesuan/add/empsel",
            component: r => require.ensure([], () => r(require('@/pages/com/views/emp_sel')), "jiesuan"),
            props: { TITLE: '选择店长', refStore: { mutation: "jiesuan/setEmp", path: "MAIN" } },
            meta: {
                keepAlive: true
            }
        }, {
            path: '/jiesuan/add/snodesel',
            name: "/jiesuan/add/snodesel",
            component: r => require.ensure([], () => r(require('@/pages/com/views/snode_sel')), "jiesuan"),
            props: { TITLE: '选择经营门店', refStore: { action: "jiesuan/setSnode", path: "MAIN" } },
            meta: {
                keepAlive: true
            }
        }
    ]
}