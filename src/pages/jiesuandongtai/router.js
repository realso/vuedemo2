export default {
    path: '/jiesuandongtai',
    name: 'jiesuandongtai',
    component: r => require.ensure([], () => r(require('@/pages/jiesuandongtai/main/index')), "jiesuandongtai" /*按需加载，名称一样打包在一个文件*/ ),
    redirect: '/jiesuandongtai/main/jiesuandongtai',
    children: [ 
        {
            path: '/jiesuandongtai/main/jiesuandongtai',
            name: "/jiesuandongtai/main/jiesuandongtai",
            component: r => require.ensure([], () => r(require('@/pages/jiesuandongtai/main/views/jiesuandongtai')), "jiesuandongtai"),
            props: { TITLE: '结算动态表' },
            meta: {
                keepAlive: true
            }
        }, {
            path: '/jiesuandongtai/main/snodesel',
            name: "/jiesuandongtai/main/snodesel",
            component: r => require.ensure([], () => r(require('@/pages/com/views/snode_sel')), "jiesuandongtai"),
            props: { TITLE: '选择经营门店', refStore: { mutation: "jiesuandongtai/setSnode", path: "QRYADV" } },
            meta: {
                keepAlive: true
            }
        },{
            path: '/jiesuandongtai/main/detail',
            name: "/jiesuandongtai/main/detail",
            component: r => require.ensure([], () => r(require('@/pages/jiesuandongtai/main/views/detail')), "jiesuandongtai"),
            props: { TITLE: '明细' },
            meta: {
                keepAlive: true
            }
        }
    ]
}