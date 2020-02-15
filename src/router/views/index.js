import Layout from '@/page/index/'
export default [{
	path: '/wel',
	component: Layout,
	redirect: '/wel/index',
	children: [{
		path: 'index',
		name: '首页',
		component: () =>
			import( /* webpackChunkName: "views" */ '@/page/wel')
	}]
}, {
	path: '/info',
	component: Layout,
	redirect: '/info/index',
	children: [{
		path: 'index',
		name: '个人信息',
		component: () =>
			import( /* webpackChunkName: "page" */ '@/views/admin/user/info')
	}]
}, {
	path: '/permission',
	component: Layout,
	redirect: '/permission/index',
	children: [{
		path: 'index',
		name: '业务权限管理',
		component: () =>
			import( /* webpackChunkName: "page" */ '@/views/link/business/access-logic/permissions/index')
	}]
}, {
	path: '/interfaceLogic',
	component: Layout,
	redirect: '/interfaceLogic/index',
	children: [{
		path: 'index',
		name: '接口逻辑管理',
		component: () =>
			import( /* webpackChunkName: "page" */ '@/views/link/business/service-inter/logic/index')
	}]
}, {
	path: '/paramCompare',
	component: Layout,
	redirect: '/paramCompare/index',
	children: [{
		path: 'index',
		name: '参数对照',
		component: () =>
			import( /* webpackChunkName: "page" */ '@/views/link/business/param-compare/index')
	}]

}]
