<template>
  <scroll-bar>
    <div id="logoholder">
      <img :src="logo" id="logo" alt="Logo" width="126px" style="margin: 0 auto;">
    </div>
    <el-menu mode="vertical" :default-active="$route.path" :collapse="isCollapse" background-color="#eef6ee" 
      text-color="#2d2f33" active-text-color="#476b3b">
      <sidebar-item :routes="permission_routers"></sidebar-item>
    </el-menu>
  </scroll-bar>
</template>

<script>
import logo from '@/assets/logo.svg'
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import ScrollBar from '@/components/ScrollBar'

export default {
  components: { SidebarItem, ScrollBar },
  data() {
    return {
      logo: logo
    }
  },
  computed: {
    ...mapGetters([
      'permission_routers',
      'sidebar'
    ]),
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  .hideSidebar {
    #logo {
      width: 28px;
      padding-top: 5px;
    }
  }
  #logoholder {
    width: 100%;
    text-align: center;
    border-bottom: 2px solid white;
  }
  .el-menu-item.is-active {
    color: #9c9c9c;
  }
</style>