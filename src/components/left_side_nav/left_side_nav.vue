<template>
  <div class="sidebar">
    <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#324157"
             text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
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
      collapse: false,
      items: [
        {
          icon: 'el-icon-menu',
          // index对应于router中路径
          index: 'dashboard',
          title: '系统首页'
        },
        {
          icon: 'iconfont icon-jinpaigongyings',
          index: '2',
          title: '供应商',
          subs: [
            {
              index: 's_message',
              title: '我的投标'
            },
            {
              index: '2-2',
              title: '保证金缴纳凭证上传',
              subs: [
                {
                  index: 'bid_bond_payment_certificate',
                  title: '投标保证金缴纳上传'
                },
                {
                  index: 'performance_bond_payment_certificate',
                  title: '履约保证金缴纳上传'
                }
              ]
            }
          ]
        },
        {
          icon: 'iconfont icon-jingpaicaigoushang',
          index: '3',
          title: '采购商',
          subs: [
            {
              index: 'qualified_supplier_settings',
              title: '合格供应设置'
            },
            {
              index: 'qualified_suppliers_list',
              title: '合格供应商预设列表'
            }
          ]
        }
      ]
    }
  },
  computed: {
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

<style scoped>
  .sidebar{
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom:0;
    overflow-y: scroll;
  }
  .sidebar::-webkit-scrollbar{
    width: 0;
  }
  .sidebar-el-menu:not(.el-menu--collapse){
    width: 250px;
  }
  .sidebar > ul {
    height:100%;
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
