<template>
  <scroll-bar>
    <div id="logoholder">
      <img :src="logo" id="logo" alt="Logo" width="126px" style="margin: 0 auto;">
    </div>
    <el-menu mode="vertical" :default-active="$route.path" :collapse="isCollapse">
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
    background: url('../../../../assets/img/background/body-bg-02-50.jpg') repeat scroll 0 0 #373b3e;
    width: 100%;
    text-align: center;
    border-bottom: 2px solid white;
  }
</style>