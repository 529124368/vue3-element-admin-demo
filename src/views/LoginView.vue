
<template>
<el-image style="width: 100px; height: 100px;margin-bottom:29px" :src="url" :fit="fit"></el-image>
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
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
        <el-link type="success" class="register" @click="this.$router.push('/register')">注册账号</el-link>
      </el-form-item>
    </el-form>
</template>

<style scoped>
.register {margin-left: 34px;}
</style>
<script>
import { ElMessage } from 'element-plus'
import { h } from 'vue'
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
  export default {
    data() {
      return {
        fits: ['fill', 'contain', 'cover', 'none', 'scale-down'],
        url: 'https://avatars.githubusercontent.com/u/22612129?v=4',
        ruleForm: {
          pass: '',
          account: '',
        },
        rules: {
          pass: [{ validator: validatePass, trigger: 'blur' }],
          account: [{ validator: checkAccount, trigger: 'blur' }],
        },
      }
    },
    methods: {
      submitForm(formName) {
        console.log(this.ruleForm.pass)
        this.$refs[formName].validate((valid) => {
          if (valid) {
            //请求数据做成
            let data = new FormData();
            data.append('account',this.ruleForm.account);
            data.append('password',this.ruleForm.pass);
            this.axios.post(`http://127.0.0.1:8081/checkAccount`,data)
                .then(response => {
                  if(response.data['state']=="ok") {
                      //画面跳转
                      this.$router.push('/about') 
                  }else {
                    ElMessage({
                      message: h('p', null, [
                        h('span', null, '错误信息 '),
                        h('i', { style: 'color: teal' }, '账号密码不正确'),
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
    },
  }
</script>

<style>

</style>
