<template>
  <div class="login-container">
    <el-form class="card-box login-form" autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left">
      <div class="title"><img :src="logo" alt="Logo" width="225px"></div>
      <div class="well well-nice form-dark">
        <div class="tab-content overflow">
          <div class="tab-pane fade in active">
          <h3 class="no-margin-top"><svg-icon icon-class="peoples" class-name="card-panel-icon" /> Authorization</h3>
          <el-form-item>
            <el-input name="username" type="text" v-model="loginForm.username" autoComplete="on" placeholder="Username" />
            <el-input name="password" type="password" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on"
              placeholder="Password" />
          </el-form-item>

          <el-row :gutter="10">
            <el-col :span="14" :offset="5">
              <el-button type="submit" class="btn btn-envato btn-block btn-large" :loading="loading" @click.native.prevent="handleLogin">SIGN IN</el-button>
            </el-col>
          </el-row>
          <hr class="margin-xm">
          <el-row>
            <el-col :offset="18" :span="6">
              <a href="/dashboard" class="link pull-right" data-toggle="tab">Return</a>
            </el-col>
          </el-row>
          </div>
        </div>
      </div>
      
      <br/>
      <a href="#register" class="btn btn-block btn-yellow btn-large f12" @click='showRegistrationForm=true'>No account yet? Register now for free!</a>
      
      <el-row :gutter="25">
        <el-col :span="6" :offset="18">
          
        </el-col>
      </el-row>
      <el-row>
        <!--el-col :span="12">
        <el-button type="primary" @click='showDialog=true' disabled>Thirdparty login</el-button>
        </el-col-->
      </el-row>
    </el-form>

    <el-dialog width="30%" title="Registration" :visible.sync="showRegistrationForm" class="modal hide fade in">
      <register @registered="registered"></register>
    </el-dialog>

    <!--el-dialog title="Third party auth" :visible.sync="showDialog">
      Disabled for a while
      <social-sign />
    </el-dialog-->

  </div>
</template>

<script>
import { validateUsername, validatePassword } from '@/utils/validate'
import socialSign from './socialsignin'
import register from './register'
import logo from '@/assets/logo.svg'
import ElCol from 'element-ui/packages/col/src/col'
import ElButtonGroup from "../../../node_modules/element-ui/packages/button/src/button-group.vue";

export default {
  components: {
    ElButtonGroup,
    ElCol,
    register, socialSign },
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
      logo: logo
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
            /* _this.$message({
              message: 'Welcome!',
              type: 'success',
              duration: 5 * 1000
            }); */

            _this.$router.go({
              path: "/"
            })
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
  @import "src/styles/mixin.scss";
  $dark_gray:#889aa4;
  $light_gray:#eee;

  .login-container {
    @include relative;
    height: 100vh;
    input:-webkit-autofill {
      box-shadow: inset 0 0 0 5px #1e314d;
      -webkit-text-fill-color: #476b3b;
    }
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
    }
    .el-input {
      display: inline-block;
      height: 47px;
      width: 100%;
    }
    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;
    }
    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
      &_login {
        font-size: 20px;
      }
    }
    .title {
      font-size: 26px;
      font-weight: 400;
      color: $light_gray;
      margin: 0px auto 10px auto;
      text-align: center;
      font-weight: bold;
    }
    .login-form {
      position: absolute;
      left: 0;
      right: 0;
      width: 400px;
      padding: 35px 35px 15px 35px;
      margin: 45px auto 120px auto;
    }
    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 5px;
      color: #454545;
    }
  }

  .el-dialog__title {
    color: #dbba13 !important;
  }
</style>
