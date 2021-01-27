const Home = () => import('@/views/home/index.vue')
const My = () => import('@/views/my/index.vue')
const test = () => import('@/views/test.vue')

const routes = [{
  path: '/',
  redirect: '/home'
},
{
  path: '/home',
  name: 'home',
  component: Home,
  meta: {
    title: '首页',
    navIndex: 0
  }
},
{
  path: '/my',
  name: 'my',
  component: My,
  meta: {
    title: '我的',
    navIndex: 0
  }
},
{
  path: '/test',
  name: 'test',
  component: test,
  meta: {
    title: '测试',
  }
}]

export default routes