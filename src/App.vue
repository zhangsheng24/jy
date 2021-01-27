<template>
  <div id="app">
    <transition :name="transitionName">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
    </transition>
    <transition :name="transitionName">
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </transition>
     <TabBar />
  </div>
</template>

<script>
import TabBar from "@/components/Tabbar"
export default {
  name: 'App',
  components: {
    TabBar
  },
  data(){
    return{
      transitionName: "slide-right",
    }
  },
  methods:{
    goTo(){
      this.$router.push({path:'/home'})
    }
  },
  watch: {
    $route(to, from) {
      if (to.meta.touchNone && !isIos()) {
        document.documentElement.classList.add('touchNone')
      } else {
        document.documentElement.classList.remove('touchNone')
      }
      const toIndex = to.meta.navIndex
      const fromIndex = from.meta.navIndex
      this.transitionName = toIndex < fromIndex ? "slide-right" : "slide-left"
    },
  },
}
</script>

<style src="@/commons/css/reset.css"></style>
<style lang="scss" scoped>
#app {
  width: 100vw;
  font-family: PingFangSC-Regular;
  .slide-right-enter-active,
  .slide-right-leave-active,
  .slide-left-enter-active,
  .slide-left-leave-active {
    will-change: transform;
    transition: all 500ms;
  }
  .slide-left-leave-to {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
    position: absolute;
  }
  .slide-right-leave-to {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
    position: absolute;
  }
  .slide-right-enter {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }

  .slide-right-leave-active {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }

  .slide-left-enter {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }

  .slide-left-leave-active {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }
}
</style>
