export default {
        path: '/404',
        name: '404',
        component: r => require.ensure([], () => r(require('@/pages/T404/index')), "T404")
    }