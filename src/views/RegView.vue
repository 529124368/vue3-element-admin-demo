<template>
<div style="margin-bottom:30px">注册页面</div>
 
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
  <el-form-item label="昵称" prop="name">
    <el-input v-model="ruleForm.name"></el-input>
  </el-form-item>
  <el-form-item label="密码" prop="pass">
    <el-input
      type="password"
      v-model="ruleForm.pass"
      autocomplete="off"
    ></el-input>
  </el-form-item>
  <el-form-item label="确认密码" prop="checkPass">
    <el-input
      type="password"
      v-model="ruleForm.checkPass"
      autocomplete="off"
    ></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
    <el-button @click="this.$router.push('/')">返回</el-button>
  </el-form-item>
</el-form>
</template>

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
  } else {
    if (this.ruleForm.checkPass !== '') {
      this.$refs.ruleForm.validateField('checkPass')
    }
    callback()
  }
}
var validatePass2 = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请再次输入密码'))
  } else if (value !== this.ruleForm.pass) {
    callback(new Error('两次输入密码不一致!'))
  } else {
    callback()
  }
}
var checkName = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('昵称不能为空'))
        }
        if (String(value).length>15) {
          return callback(new Error('昵称长度不能超过15'))
        }
        callback()
      }
      return {
        ruleForm: {
          pass: '',
          checkPass: '',
          account: '',
          name:'',
        },
        rules: {
          pass: [{ validator: validatePass, trigger: 'blur' }],
          checkPass: [{ validator: validatePass2, trigger: 'blur' }],
          account: [{ validator: checkAccount, trigger: 'blur' }],
          name: [{ validator: checkName, trigger: 'blur' }],
        },
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            //请求数据做成
            let data = new FormData();
            data.append('account',this.ruleForm.account);
            data.append('password',this.ruleForm.pass);
            data.append('name',this.ruleForm.name);
            this.axios.post(`http://127.0.0.1:8081/register`,data)
                .then(response => {
                  if(response.data['state']=="ok") {
                      //画面跳转
                      this.$notify.success({
                            title: 'Info',
                            message: '页面即将跳转',
                            showClose: false,
                      })
                      setTimeout(() => {
                        //需要定时执行的代码
                        this.$router.push('/')
                        }, 3000)
                  }else {
                    ElMessage({
                      message: h('p', null, [
                        h('span', null, '错误信息 '),
                        h('i', { style: 'color: teal' }, '注册失败'),
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
