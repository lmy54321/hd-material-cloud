<template>
  <div class="forget-wrap">
    <div class="ms-forget">
      <div class="ms-title">忘记密码</div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="ms-content">
        <!--账号-->
        <el-form-item prop="UserName"  >
          <el-input v-model="ruleForm.username" placeholder="输入账号"></el-input>
        </el-form-item>
        <!--验证码-->
        <el-form-item prop="VerificationCode">
          <el-row type="flex" justify="space-between">
            <el-input type="password" placeholder="输入验证码" v-model="ruleForm.VerificationCode" style="width: 55%"></el-input>
            <el-button type="primary"  style="width: 35%">发送验证码</el-button>
          </el-row>

        </el-form-item>
        <el-form-item>
          <el-row type="flex" class="row-bg" justify="space-between">
            <el-button type="primary" style="width:100%" @click="submitForm('ruleForm')">确认修改</el-button>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-row type="flex" justify="center">
          <div id="back">
            <a href="">返回登录页面</a>
          </div>
          </el-row>
        </el-form-item>
      </el-form>

    </div>
  </div>
</template>

<script>
export default {
  name: 'forget_password',
  data: function () {
      return {
        ruleForm: {
          UserName: '',
          VerificationCode: ''
        },
        rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ]
        }
      }
  }
}
</script>

<style scoped lang="scss">
  .forget-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url(../assets/images/bg.jpg);
    background-size: 100%;
  }
  .ms-forget {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 350px;
    margin: -190px 0 0 -175px;
    border-radius: 5px;
    background: rgba(255,255,255, 0.3);
    overflow: hidden;
  }
  .ms-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: #fff;
    border-bottom: 1px solid #ddd;
  }
  .ms-content {
    padding: 30px 30px;
  }
  #back {
    a {
      color: white;
    }
  }
</style>
