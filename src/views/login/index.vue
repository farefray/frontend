<template>
  <section class="hero is-success is-fullheight">
    <div class="hero-body">
      <div class="container has-text-centered">
        <div class="column is-4 is-offset-4">
          <div class="box">
            <figure class="avatar">
              <img :src="logo" width="128px">
            </figure>
            <form autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm">
              <div class="field">
                <div class="control">
                  <input class="input is-large" name="username" type="text" v-model="loginForm.username" placeholder="Username" autofocus="">
                </div>
              </div>

              <div class="field">
                <div class="control">
                  <input class="input is-large" name="password" type="password" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on"
          placeholder="Password">
                </div>
              </div>
              <div class="field">
                <label class="checkbox">
                  <input type="checkbox">
                  Remember me
                </label>
              </div>
              <a href="#" class="button is-block is-info is-large" :loading="loading" @click.native.prevent="handleLogin">Login</a>
            </form>
          </div>
          <p class="has-text-grey">
            <a href="" @click.native.prevent='showRegistrationForm=true'>Sign Up</a> &nbsp;·&nbsp;
            <a href="/dashboard">Return</a>
          </p>
        </div>
      </div>
    </div>
    <!--el-col :span="12">
        <el-button type="primary" @click='showDialog=true' disabled>Thirdparty login</el-button>
        </el-col-->

    <!--<el-dialog width="30%" title="Registration" :visible.sync="showRegistrationForm">
      <register @registered="registered"></register>
    </el-dialog>-->

    <!--el-dialog title="Third party auth" :visible.sync="showDialog">
      Disabled for a while
      <social-sign />
    </el-dialog-->
  </section> 
</template>

<script>
import { validateUsername, validatePassword } from '@/utils/validate'
import socialSign from './socialsignin'
import register from './register'
import logo from '@/assets/logo.svg'

export default {
  components: {
    register, 
    socialSign 
  },
  name: 'login',
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      loading: false,
      showDialog: false,
      showRegistrationForm: false,
      logo: 'https://placehold.it/128x128' // Todo logo
    }
  },
  methods: {
    registered(username) {
      this.showRegistrationForm = false
      this.$message({
        message: 'You have successfully registered on StatMyBets. Now you can login.',
        type: 'success',
        duration: 5 * 1000
      })

      this.loginForm.username = username
      this.loginForm.password = ''
    },
    handleLogin() {
      this.showRegistrationForm = false
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          const _this = this
          this.$store.dispatch('LoginByUsername', this.loginForm).then((response) => {
            console.log(response);
            console.log('back from login store to views login')
            _this.loading = false;
            _this.$message({
              message: 'Welcome!',
              type: 'success',
              duration: 5 * 1000
            });

            _this.$router.push('/')
          }).catch((err) => {
              console.log(err);
              _this.loading = false;
              _this.$message({
                  message: 'Error! Check your username or password once again.',
                  type: 'error',
                  duration: 5 * 1000
              })
          });
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  },
  created() {
        // window.addEventListener('hashchange', this.afterQRScan)
  },
  destroyed() {
        // window.removeEventListener('hashchange', this.afterQRScan)
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  
</style>
