<template>
<div class="wrapper">
  <div style="margin: 100px auto;background-color: #fff;width: 350px;height: 300px;padding: 20px;border-radius: 10px">
    <div style="margin: 20px 0;text-align: center;font-size: 24px">
      <b>登 录</b>
      <el-form :model="user" :rules="rules" ref="userForm">
        <el-form-item prop="username">
          <el-input placeholder="请输入用户名" size="medium"  style="margin: 10px 0" prefix-icon="el-icon-user" v-model="user.username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input size="medium" placeholder="请输入密码"  style="margin: 10px 0" prefix-icon="el-icon-lock" show-password v-model="user.password"></el-input>
        </el-form-item>
      </el-form>
      <div style="margin: 10px 0;text-align: right">

        <el-button type="primary" size="small" autocomplete="off" @click="login">登录</el-button>
        <el-button type="warning" size="small" autocomplete="off" @click="$router.push('/register')">注册</el-button>
      </div>
    </div>
  </div>
</div>
</template>

<script>

import user from "@/views/User";
export default {
  name: "Login",
  data(){
    return {
      user:{},
      rules:
          {
            username:[
              {required: true, message: '请输入用户名', trigger: 'blur'},
              {min: 5, max: 12, message: '长度在 5 到 12 个字符', trigger: 'blur'}
            ],
            password:[
              {required: true, message: '请输入密码', trigger: 'blur'},
              {min: 5, max: 12, message: '长度在 5 到 12 个字符', trigger: 'blur'}
            ]
          },
    }
  },
  methods:{
    login(){
       this.$refs['userForm'].validate((valid) =>{
          if(valid) {
            this.request.post('/user/login',this.user).then(res =>{
               if(res.code==='200') {
                 this.$router.push('/')
                 localStorage.setItem("user",JSON.stringify(res.data))
                 this.$message.success("登录成功")
               } else {
                  this.$message.error(res.msg)
               }
            })
          }
       })
    }
  }
}
</script>

<style scoped>
.wrapper{
    height: 100vh;
    background-image: linear-gradient(to bottom right ,#FC4668,#3F5EFB);
    overflow: hidden;
}
</style>