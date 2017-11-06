<template>
  <div class="login-container" style="height: auto;">
    <el-form class="card-box" autoComplete="on" :model="registerForm" :rules="registerRules" ref="registerForm" label-position="left">
      <el-form-item prop="username">
        <el-input name="username" type="text" v-model="registerForm.username" autoComplete="on" placeholder="Username" />
      </el-form-item>

      <el-form-item prop="email">
        <el-input name="email" type="text" v-model="registerForm.email" autoComplete="on" placeholder="Email" />
      </el-form-item>

      <el-form-item prop="password">
        <el-input name="password" type="password" v-model="registerForm.password" autoComplete="off"
                  placeholder="Password" />
      </el-form-item>

      <el-form-item prop="passwordRepeat">
        <el-input name="passwordRepeat" type="password" v-model="registerForm.passwordRepeat" autoComplete="off"
                  placeholder="Repeat password" />
      </el-form-item>

      <el-row :gutter="10">
        <el-col :span="10" :offset="7">
          <el-button type="success" style="width:100%;" :loading="loading" @click.native.prevent="handleRegister">Register</el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { validateUsername, validatePassword, validateEmail } from '@/utils/validate'

export default {
  name: 'register',
  props: [],
  data() {
    const passwordRepeated = (rule, value, callback) => {
      if (this.registerForm.password.length && this.registerForm.password === this.registerForm.passwordRepeat) {
        callback()
      } else {
        callback(new Error('Please repeat your password'))
      }
    }

    return {
      loading: false,
      registerForm: {
        username: '',
        email: '',
        password: '',
        passwordRepeat: ''
      },
      registerRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }],
        email: [{ required: true, trigger: 'blur', validator: validateEmail }],
        passwordRepeat: [{ required: true, trigger: 'blur', validator: passwordRepeated }]
      }
    }
  },
  methods: {
    handleRegister() {
      this.$refs.registerForm.validate(valid => {
        if (valid) {
          this.loading = true

          const username = this.registerForm.username
          this.$store.dispatch('RegisterUser', this.registerForm).then(() => {
            this.loading = false
            this.$emit('registered', username);
          }).catch(() => {
            this.loading = false
          })
        }

        return false
      })
    }
  }
}
</script>

<style lang="scss">
  .login-container {
    .el-dialog__body {
      background: #223756;
    }

    .el-dialog__header {
      background: #223756;
    }

    .el-dialog__title {
      color: #db7f31;

    }
  }
 </style>
