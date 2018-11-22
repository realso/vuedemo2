export default {
    path: '/jiesuan',
    name: 'jiesuan',
    component: r => require.ensure([], () => r(require('@/pages/jiesuan.1/add/index')), "jiesuan" /*按需加载，名称一样打包在一个文件*/ ),
    redirect: '/jiesuan/add/index',
    children: [{
        path: '/jiesuan/add/index',
        name: "/jiesuan/add/index",
        component: r => require.ensure([], () => r(require('@/pages/jiesuan.1/add/views/main')), "jiesuan"),
        props: { TITLE: '结算' },
        meta: {
            keepAlive: true
        }
    }]
}