export default {
    path: '/jiesuan',
    name: 'jiesuan',
    component: r => require.ensure([], () => r(require('@/pages/jiesuan/add/index')), "jiesuan" /*按需加载，名称一样打包在一个文件*/ ),
    redirect: '/jiesuan/add/index',
    children: [
        {
            path: '/jiesuan/add/index',
            name: "/jiesuan/add/index",
            component: r => require.ensure([], () => r(require('@/pages/jiesuan/add/views/index')), "jiesuan"),
            props: { TITLE: '结算' },
            meta: {
              keepAlive: true
            }
        },
        {
            path: '/jiesuan/add/szxm',
            name: "jiesuan/add/szxm",
            component: r => require.ensure([], () => r(require('@/pages/jiesuan/add/views/szxm')), "jiesuan"),
            props: { TITLE: '设置项目' },
            meta: {
              keepAlive: true
            }
        }
    ]
}