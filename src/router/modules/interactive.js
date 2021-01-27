export default [{
	path: '/interactive/index',
	component: () => import('@/views/interactive/index.vue'),
	name: 'interactive',
	meta: {
		title: '创建活动'
	}
},
{
    path: '/interactive/games/gamesList',
	component: () => import('@/views/interactive/games/gamesList.vue'),
	name: 'gamesList',
	meta: {
		title: '创建活动'
	}
},
{
    path: '/interactive/games/gameDetail',
	component: () => import('@/views/interactive/games/gameDetail.vue'),
	name: 'gameDetail',
	meta: {
		title: '创建活动'
	}
},
{
    path: '/interactive/cart/index',
	component: () => import('@/views/interactive/cart/index.vue'),
	name: 'cart',
	meta: {
		title: '创建活动'
	}
},
{
    path: '/interactive/setting/moneyAndBull/index',
	component: () => import('@/views/interactive/setting/moneyAndBull/index.vue'),
	name: 'moneyAndBull',
	meta: {
		title: '创建活动'
	}
},
{
    path: '/interactive/setting/moneyAndBull/roundList',
	component: () => import('@/views/interactive/setting/moneyAndBull/roundList.vue'),
	name: 'roundList',
	meta: {
		title: '创建活动'
	}
},
{
    path: '/interactive/setting/moneyAndBull/addPrize',
	component: () => import('@/views/interactive/setting/moneyAndBull/addPrize.vue'),
	name: 'addPrize',
	meta: {
		title: '创建活动'
	}
},
{
    path: '/interactive/order/submit',
	component: () => import('@/views/interactive/order/submit.vue'),
	name: 'submit',
	meta: {
		title: '创建活动'
	}
}]