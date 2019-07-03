<template>
  <div class="sidebar">
    <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#324157"
             text-color="#bfcbd9" active-text-color="#20a0ff" :unique-opened="unique" :router="router">
      <template v-for="item in items">
        <template v-if="item.children.length > 0">
          <el-submenu :index="item.resourceRouteName" :key="item.resourceRouteName">
            <template slot="title">
              <i :class="item.resourceIcoCls"></i><span slot="title">{{ item.resourceTitle }}</span>
            </template>
            <template v-for="subItem in item.children">
              <el-submenu v-if="subItem.children.length > 0" :index="subItem.resourceRouteName" :key="subItem.resourceRouteName">
                <template slot="title">{{ subItem.resourceTitle }}</template>
                <el-menu-item v-for="(threeItem,i) in subItem.children" :key="i" :index="threeItem.resourceRouteName">
                  {{ threeItem.resourceTitle }}
                </el-menu-item>
              </el-submenu>
              <el-menu-item v-else :index="subItem.resourceRouteName" :key="subItem.resourceRouteName">
                {{ subItem.resourceTitle }}
              </el-menu-item>
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.resourceRouteName" :key="item.resourceRouteName">
            <i :class="item.resourceIcoCls"></i><span slot="title">{{ item.resourceTitle }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
export default {
  data () {
    return {
      collapse: false, // 是否水平折叠收起菜单
      unique: true, // 是否只保持一个子菜单的展开
      router: true, // 是否使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转
      items: []
    }
  },
  computed: {
    // 当前激活菜单的 index
    onRoutes () {
      return this.$route.path.replace('/', '')
    }
  },
  created () {
    console.log(55555555555)
    this.$store.dispatch('ajaxGet', {url: 'resourceUrl/v1/resource/res/visit',
      submitData: {'resourceType': 'MEM '},
      success: res => {
        this.items = res.data.items
        if (res.status === 'OK') {
          console.log(res.data.items)
        }
      }})
  },
  destroyed () {
    this.items = []
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
