export default {
    path: '/jiesuanribao',
    name: 'jiesuanribao',
    component: r => require.ensure([], () => r(require('@/pages/jiesuanribao/main/index')), "jiesuanribao" /*按需加载，名称一样打包在一个文件*/ ),
    redirect: '/jiesuanribao/main/jiesuanribao',
    children: [ 
        {
            path: '/jiesuanribao/main/jiesuanribao',
            name: "/jiesuanribao/main/jiesuanribao",
            component: r => require.ensure([], () => r(require('@/pages/jiesuanribao/main/views/jiesuanribao')), "jiesuanribao"),
            props: { TITLE: '结算日报' },
            meta: {
                keepAlive: true
            }
        }, {
            path: '/jiesuanribao/main/snodesel',
            name: "/jiesuanribao/main/snodesel",
            component: r => require.ensure([], () => r(require('@/pages/com/views/snode_sel')), "jiesuanribao"),
            props: { TITLE: '选择经营门店', refStore: { mutation: "jiesuanribao/setSnode", path: "QRYADV" } },
            meta: {
                keepAlive: true
            }
        },{
            path: '/jiesuanribao/main/detail',
            name: "/jiesuanribao/main/detail",
            component: r => require.ensure([], () => r(require('@/pages/jiesuanribao/main/views/detail')), "jiesuanribao"),
            props: { TITLE: '明细' },
            meta: {
                keepAlive: true
            }
        }
    ]
}