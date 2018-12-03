export default {
        path: '/zhishiku',
        name: 'zhishiku',
        component: r => require.ensure([], () => r(require('@/pages/zhishiku/index')), "zhishiku")
    }