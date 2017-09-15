<template>
  <div class="signup-container">
    <el-form class="card-box" autoComplete="on" :model="registerForm" :rules="registerRules" ref="registerForm" label-position="left">
      <el-form-item prop="username">
        <span class="svg-container svg-container_register">
          <icon-svg icon-class="yonghuming" />
        </span>
        <el-input name="username" type="text" v-model="registerForm.username" autoComplete="on" placeholder="Username" />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <icon-svg icon-class="mima" />
        </span>
        <el-input name="password" type="password" v-model="registerForm.password" autoComplete="on"
                  placeholder="Password" />
      </el-form-item>

      <el-button type="success" style="width:100%;margin-bottom:30px;" :loading="loading" @click.native.prevent="handleRegister">Register</el-button>
    </el-form>
  </div>
</template>

<script>
import openWindow from '@/utils/openWindow'
import { isvalidUsername, isvalidPassword } from '@/utils/validate'

export default {
  name: 'register',
  props: [],
  data() {
    return {
      loading: false,
      registerForm: {
        username: '',
        password: ''
      },
      registerRules: {
        username: [{ required: true, trigger: 'blur', validator: isvalidUsername }],
        password: [{ required: true, trigger: 'blur', validator: isvalidPassword }]
      }
    }
  },
  methods: {
    handleRegister() {
      this.loading = true
      console.log('reg me')
    },
    tencentHandleClick(thirdpart) {
      this.$store.commit('SET_AUTH_TYPE', thirdpart)
      const client_id = 'xxxxx'
      const redirect_uri = encodeURIComponent('xxx/redirect?redirect=' + window.location.origin + '/authredirect')
      const url = 'https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=' + client_id + '&redirect_uri=' + redirect_uri
      openWindow(url, thirdpart, 540, 540)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	.signup-container {
	  margin: 20px 0;
	  .sign-btn {
	    display: inline-block;
	    cursor: pointer;
	  }
	  .icon {
	    color: #fff;
	    font-size: 30px;
	    margin-top: 6px;
	  }
	  .wx-svg-container,
	  .qq-svg-container {
	    display: inline-block;
	    width: 40px;
	    height: 40px;
	    line-height: 40px;
	    text-align: center;
	    padding-top: 1px;
	    border-radius: 4px;
	    margin-bottom: 20px;
	    margin-right: 5px;
	  }
	  .wx-svg-container {
	    background-color: #8dc349;
	  }
	  .qq-svg-container {
	    background-color: #6BA2D6;
	    margin-left: 50px;
	  }
	}
</style>
