<template>
  <div class="sidebar">
    <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#324157"
             text-color="#bfcbd9" active-text-color="#20a0ff" :unique-opened="unique" :router="router">
      <template v-for="item in items">
        <template v-if="item.subs">
          <el-submenu :index="item.index" :key="item.index">
            <template slot="title">
              <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
            </template>
            <template v-for="subItem in item.subs">
              <el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index">
                <template slot="title">{{ subItem.title }}</template>
                <el-menu-item v-for="(threeItem,i) in subItem.subs" :key="i" :index="threeItem.index">
                  {{ threeItem.title }}
                </el-menu-item>
              </el-submenu>
              <el-menu-item v-else :index="subItem.index" :key="subItem.index">
                {{ subItem.title }}
              </el-menu-item>
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.index" :key="item.index">
            <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
import ObVue from '../common/ob_vue'
export default {
  data () {
    return {
      collapse: false, // 是否水平折叠收起菜单
      unique: true, // 是否只保持一个子菜单的展开
      router: true, // 是否使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转
      items: this.$store.state.data // 获取存在store中的左侧菜单数据
    }
  },
  computed: {
    // 当前激活菜单的 index
    onRoutes () {
      return this.$route.path.replace('/', '')
    }
  },
  created () {
    // 通过 ObVue 进行组件间通信，来折叠侧边栏
    ObVue.$on('collapse', msg => {
      this.collapse = msg
    })
  }
}
</script>

<style lang="scss">
  .sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 60px;
    bottom: 0;
    overflow-y: scroll;
    &::-webkit-scrollbar {
      width: 0;
    }
    & > ul {
      height: 100%;
    }
  }
  .sidebar-el-menu {
    &:not(.el-menu--collapse) {
      width: 250px;
    }
  }
  .icon-jingpaicaigoushang {
    font-size: 20px;
    color: #fff;
    margin-right: 5px;
  }
  .icon-jinpaigongyings {
    font-size: 20px;
    color: #fff;
    margin-right: 5px;
  }

</style>
