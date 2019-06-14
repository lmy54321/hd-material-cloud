<template>
  <div class="login-wrap">
    <div class="ms-login">
      <div class="ms-title">物资云平台</div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="ms-content">
        <!--用户名-->
        <el-form-item prop="account" >
          <el-input v-model="ruleForm.account" placeholder="输入账号">
            <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
          </el-input>
        </el-form-item>
        <!--密码-->
        <el-form-item prop="password">
          <el-input type="password" placeholder="输入密码" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')">
            <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
          </el-input>
        </el-form-item>
        <div class="login-other">
          <router-link to='/supplier_apply'>供应商申请</router-link>
          <router-link to='/forget_password'>忘记密码？</router-link>
        </div>
        <div class="login-btn">
          <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
 // import ObVue from '../components/common/ob_vue'
export default {
  data: function () {
    return {
      ruleForm: {
        account: '12345678',
        password: '12345678'
      },
      rules: {
        account: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          localStorage.setItem('ms_username', this.ruleForm.account)
          // this.$store.dispatch('ajax', {url: 'LoginUrl/v1/user/login',
          //   submitData: this.ruleForm,
          //   success: function (res) {
          //     if (res.status === 'OK') {
          //       this.$router.push('/')
          //     } else {
          //       ObVue.$message.error('请输入正确的账号名或密码')
          //     }
          //   }})
          this.$router.push('/')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url(../assets/images/bg.jpg);
    background-size: 100%;
  }
  .ms-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: #fff;
    border-bottom: 1px solid #ddd;
  }
  .ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 350px;
    margin: -190px 0 0 -175px;
    border-radius: 5px;
    background: rgba(255,255,255, 0.3);
    overflow: hidden;
  }
  .ms-content {
    padding: 30px 30px;
  }
  .login-other {
     a {
      color: #fff;
      font-size: 13px;
       &:last-child {
         float: right;
       }
    }
  }
  .login-btn {
    text-align: center;
    margin-top: 5px;
    button {
      width: 100%;
      height: 36px;
      margin-bottom: 10px;
    }
  }

</style>
