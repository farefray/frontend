<template>
  <el-menu class="navbar" mode="horizontal">
    <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>

    <breadcrumb class="breadcrumb-container"></breadcrumb>

    <div class="right-menu">
      <error-log class="errLog-container right-menu-item"></error-log>

      <lang-select class="international right-menu-item"></lang-select>

      <el-dropdown class="avatar-container right-menu-item" trigger="click" v-if="token">
        <div class="avatar-wrapper">
          <span class="img-shadow" v-if="avatar">
            <img class="media-object thumb" :src="avatar">
          </span>
          <img class="media-object thumb" src="/static/misc/avatar.svg" v-else/>
          <i class="el-icon-caret-bottom"></i>
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/stats/dashboard">
            <el-dropdown-item>
              {{$t('navbar.dashboard')}}
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item divided>
            <span @click="logout" style="display:block;">{{$t('navbar.logOut')}}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <div class="right-menu-item" v-else>
        <router-link to="login">
          <el-button type="warning" style="margin-right: 15px;">
          Login
          </el-button>
        </router-link>
      </div>
    </div>
  </el-menu>
</template>

<script>
import { mapGetters } from "vuex";
import Breadcrumb from "@/components/Breadcrumb";
import Hamburger from "@/components/Hamburger";
import ErrorLog from "@/components/ErrorLog";
import LangSelect from "@/components/LangSelect";

export default {
  components: {
    Breadcrumb,
    Hamburger,
    ErrorLog,
    LangSelect
  },
  computed: {
    ...mapGetters(["sidebar", "token", "avatar"])
  },
  data() {
    return {
      avatar_dropdown: [
        {
          title: "基础篇",
          href: "https://segmentfault.com/a/1190000009275424"
        },
        {
          title: "登录权限篇",
          href: "https://segmentfault.com/a/1190000009506097"
        },
        {
          title: "实战篇",
          href: "https://segmentfault.com/a/1190000009762198"
        },
        {
          title: "vueAdmin-template 篇",
          href: "https://segmentfault.com/a/1190000010043013"
        },
        {
          title: "自行封装 component",
          href: "https://segmentfault.com/a/1190000009090836"
        },
        {
          title: "优雅的使用 icon",
          href:
            "https://segmentfault.com/a/https://segmentfault.com/a/1190000012213278"
        }
      ]
    };
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch("toggleSideBar");
    },
    logout() {
      this.$store.dispatch("LogOut").then(() => {
        location.reload(); // In order to re-instantiate the vue-router object to avoid bugs
      });
    }
  }
};
</script>

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
  .breadcrumb-container {
    float: left;
  }
  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }
  .right-menu {
    float: right;
    height: 100%;
    &:focus {
      outline: none;
    }
    .right-menu-item {
      display: inline-block;
      margin: 0 8px;
    }
    .international {
      vertical-align: top;
    }
    .theme-switch {
      vertical-align: 15px;
    }
    .avatar-container {
      height: 50px;
      margin-right: 30px;
      .avatar-wrapper {
        cursor: pointer;
        margin-top: 5px;
        position: relative;
        .thumb {
          width: 35px;
          height: 35px;
        }
        .el-icon-caret-bottom {
          position: absolute;
          right: -5px;
          top: 26px;
          font-size: 11px;
        }
      }
    }
  }
}
</style>
