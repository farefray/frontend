<template>
    <el-menu mode="vertical" theme="dark" unique-opened :default-active="$route.path" :collapse="isCollapse">
      <div id="logoholder">
        <img :src="logo" id="logo" alt="Logo" width="126px" style="margin: 0 auto;">
      </div>
      <sidebar-item :routes='permission_routers'></sidebar-item>
    </el-menu>
</template>


<script>
import logo from '@/assets/logo.svg'
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
export default {
  components: { SidebarItem },
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

  #logo {
    transition: all .28s ease-in-out;
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
