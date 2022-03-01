
<template>
<div style="margin-bottom:30px">管理系统demo</div>
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="账号" prop="account">
        <el-input v-model.number="ruleForm.account"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
          <el-input
            type="password"
            v-model="ruleForm.pass"
            autocomplete="off"
          ></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="idenCode">
        <el-input v-model.number="ruleForm.idenCode"></el-input>
      </el-form-item>
      <el-form-item>
      <el-image :src="yanzhengma"></el-image>
       </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
        <el-link type="success" class="register" @click="topage()">注册账号</el-link>
      </el-form-item>
    </el-form>
</template>

<style scoped>
.register {margin-left: 34px;}
</style>
<script>
import { ElMessage } from 'element-plus'
import { h } from 'vue'
  export default {
    data() {
      var checkAccount = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('账号不能为空'))
        }
        if (String(value).length>10) {
            return callback(new Error('账号长度不能超过10'))
          }
          callback()
      }
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        }
        callback()
      }
      var validateCode = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入验证码'))
        }
        callback()
      }
      return {
        yanzhengma:'http://www.zimuge.tk/api/code',
        appUrl:'http://www.zimuge.tk/api',
        ruleForm: {
          pass: '',
          account: '',
          idenCode:'',
        },
        rules: {
          pass: [{ validator: validatePass, trigger: 'blur' }],
          account: [{ validator: checkAccount, trigger: 'blur' }],
          idenCode:[{ validator: validateCode, trigger: 'blur' }],
        },
      }
    },
    mounted(){
      //检验是否已经登录
     this.axios.post(this.appUrl+`/checkislogined`)
        .then(response => {
          if(response.data['state']=="ok") {
              //画面跳转
              this.$router.push('/about') 
          }
        })
        .catch(function (error) { // 请求失败处理
          console.log(error);
        });
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            //请求数据做成
            let data = new FormData();
            data.append('account',this.ruleForm.account);
            data.append('password',this.ruleForm.pass);
            this.axios.post(this.appUrl+`/checkAccount`,data)
                .then(response => {
                  if(response.data['state']=="ok") {
                      //画面跳转
                      sessionStorage.setItem("userName",response.data['data'].name)
                      this.$router.push('/about') 
                  }else {
                    ElMessage({
                      message: h('p', null, [
                        h('span', null, '错误信息 '),
                        h('i', { style: 'color: teal' }, response.data['message']),
                      ]),})
                  } 
                })
                .catch(function (error) { // 请求失败处理
                  console.log(error);
                });
          } else {
            return false
          }
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
      },
      topage(){
        this.$notify.success({
              title: 'Info',
              message: '页面即将跳转',
              showClose: false,
        })
        setTimeout(() => {
          //需要定时执行的代码
          this.$router.push('/register')
          }, 3000)
      },
    },
  }
</script>

<style>

</style>
