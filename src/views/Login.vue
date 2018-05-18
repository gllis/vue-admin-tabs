<template>
  <el-container>
    <el-form :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left" label-width="0px" class="login-container">
      <h3 class="title">vue-admin-tabs</h3>
      <el-form-item prop="account" class="form-item">
        <el-input type="text" v-model="loginForm.account" auto-complete="off" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item prop="checkPass" class="form-item">
        <el-input
          type="password"
          v-model="loginForm.checkPass"
          auto-complete="off"
          placeholder="密码"
          @keyup.enter.native="handleSubmit">
        </el-input>
      </el-form-item>
      <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
      <el-form-item style="width:100%;">
        <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit" :loading="logining">登录</el-button>
      </el-form-item>
    </el-form>
    <el-footer>
      Copyright © 2018. All rights reserved.
    </el-footer>
  </el-container>
</template>


<script>
  import api from '../api'
  export default {
    data() {
      return {
        logining: false,
        loginForm: {
          account: 'admin',
          checkPass: '123456'
        },
        loginRules: {
          account: [
            { required: true, message: '请输入账号', trigger: 'blur' },
          ],
          checkPass: [
            { required: true, message: '请输入密码', trigger: 'blur' },
          ]
        },
        checked: true
      };
    },
    methods: {

      // 重置
      handleReset() {
        this.$refs.loginForm.resetFields();
      },

      // 提交登录
      handleSubmit(ev) {
        this.$refs.loginForm.validate((valid) => {
          if (valid) {
            this.logining = true;
            var params = {
                username: this.loginForm.account,
                password: this.loginForm.checkPass,
            };
            api.login(params).then( resp => {
                let { msg, errcode, user } = resp.data;
                if (errcode !== 0) {
                    this.$message({
                        message: msg,
                        type: 'error',
                    });
                    this.logining = false;
                } else {
                    sessionStorage.setItem('user', JSON.stringify(user));
                    this.$router.push({ path: 'index' });
                }
               
            });
          } else {
            return false;
          }
        });
      }
    }
  }

</script>

<style lang="scss" scoped>
  .login-container {
    margin: 180px auto;
    width: 350px;
    -webkit-border-radius: 5px;
      border-radius: 5px;
      -moz-border-radius: 5px;
      background-clip: padding-box;
      padding: 35px 35px 15px 35px;
      background: #fff;
      border: 1px solid #eaeaea;
      box-shadow: 0 0 25px #cac6c6;
   
    .title {
      margin: 0px auto 40px auto;
      text-align: center;
      color: #505458;
    }
    .remember {
      margin: 0px 0px 15px 0px;
    }
    .form-item {
      margin-bottom: 20px;
    }
  }
  
  .el-header, .el-footer {
    color: #333;
    text-align: center;
  }
</style>
