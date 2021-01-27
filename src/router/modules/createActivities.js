export default [{
	path: '/activity/firstStep',
	component: () => import('@/views/activity/firstStep.vue'),
	name: 'firstStep',
	meta: {
		title: '创建活动'
	}
},
{
	path: '/activity/secondStep',
	component: () => import('@/views/activity/secondStep.vue'),
	name: 'secondStep',
	meta: {
		title: '报名设置'
	}
},
{
	path: '/activity/secondStep/add',
	component: () => import('@/views/activity/secondType/add.vue'),
	name: 'add',
	meta: {
		title: '报名设置'
	}
},
{
	path: '/activity/secondStep/custom',
	component: () => import('@/views/activity/secondType/custom.vue'),
	name: 'custom',
	meta: {
		title: '报名设置'
	}
}, {
	path: '/activity/thirdStep',
	component: () => import('@/views/activity/thirdStep.vue'),
	name: 'thirdStep',
	meta: {
		title: '创建活动'
	}
}, {
	path: '/activity/preview',
	component: () => import('@/views/activity/preview.vue'),
	name: 'preview',
	meta: {
		title: '活动预览'
	}
},{
	path: '/activity/secondStep/sort',
	component: () => import('@/views/activity/secondType/sort.vue'),
	name: 'sort',
	meta: {
		title: '排序'
	}
},{
	path: '/activity/secondStep/addInfo',
	component: () => import('@/views/activity/secondType/addInfo.vue'),
	name: 'addInfo',
	meta: {
		title: '排序'
	}
}]