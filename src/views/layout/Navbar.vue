<template>
	<el-menu class="navbar" mode="horizontal">
		<hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
		<levelbar></levelbar>
		<tabs-view></tabs-view>
		<error-log v-if="log.length>0" class="errLog-container" :logsList="log"></error-log>
    <el-submenu class="errLog-container" index="1" v-if="username !== ''">
      <template slot="title">
        {{username}}
        <div class="avatar-container">
          <div class="avatar-wrapper">
            <img class="user-avatar" :src="avatar+'?imageView2/1/w/80/h/80'" v-if="avatar">
            <icon style="border:  2px ridge #b2b8b2;" class="user-avatar" name="user" v-else></icon>
          </div>
        </div>
      </template>
      <el-menu-item index="1-1">Settings</el-menu-item>
      <el-menu-item index="1-2"><span @click="logout" style="display:block;">Log out</span></el-menu-item>
    </el-submenu>
    <router-link to="/login" v-else>
      <el-button type="primary" size="small" class="login-button">Login / Register</el-button>
    </router-link>
	</el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import Levelbar from './Levelbar'
import TabsView from './TabsView'
import Hamburger from 'components/Hamburger'
import ErrorLog from 'components/ErrLog'
import errLogStore from 'store/errLog'

export default {
  components: {
    Levelbar,
    TabsView,
    Hamburger,
    ErrorLog
  },
  data() {
    return {
      log: errLogStore.state.errLog,
      defaultAvatar: ''
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'username',
      'avatar'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    logout() {
      this.$store.dispatch('LogOut')
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  .hideSidebar .el-menu-item .el-submenu__icon-arrow, .hideSidebar .el-submenu .el-submenu__title .el-submenu__icon-arrow {
    display: block;
  }

  .el-menu--horizontal .el-submenu .el-submenu__title{
    height: 50px;
    line-height: 50px;
  }

  .el-submenu .el-menu-item {
    min-width: 96px !important;
    text-align: center;
  }

  .el-menu--horizontal .el-submenu .el-menu-item {
    background-color: #eef6ee;
  }

  .el-menu--horizontal .el-submenu .el-menu-item:hover {
    background-color: #dce8db;
  }

  .el-menu--horizontal .el-submenu .el-menu-item:active {
    background-color: #86a583;
  }
</style>
<style rel="stylesheet/scss" lang="scss" scoped>
	.navbar {
			height: 50px;
			line-height: 50px;
			border-radius: 0px !important;
			.hamburger-container {
					line-height: 58px;
					height: 50px;
					float: left;
					padding: 0 10px;
			}
			.errLog-container {
					display: inline-block;
					position: absolute;
					right: 150px;
			}
      .username-container {
        height: 50px;
        display: inline-block;
        position: absolute;
        right: 22px;
      }
			.avatar-container {
					height: 50px;
					display: inline-block;
					position: absolute;
          right: 75px;
          top: -4px;
					.avatar-wrapper {
							cursor: pointer;
							margin-top: 5px;
							position: relative;
							.user-avatar {
									width: 40px;
									height: 40px;
									border-radius: 10px;
							}
							.el-icon-caret-bottom {
									position: absolute;
									right: -20px;
									top: 25px;
									font-size: 12px;
							}
					}
			}
      .login-button {
        position: absolute;
        right: 15px;
        top: 10px;
      }
	}
</style>



