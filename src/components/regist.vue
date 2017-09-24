<template>
	<div>
		<h-header></h-header>
		<div id="login" class="container">
      <h2 class="text-center">注册</h2>
		  <div class="form-group">
		    <label for="exampleInputEmail1">用户名</label>
		    <input v-model="user" type="text" class="form-control" id="exampleInputEmail1" placeholder="请输入用户名，建议为汉字真是姓名等">
		  </div>
		  <div class="form-group">
		    <label for="exampleInputPassword1">密码</label>
		    <input v-model="pwd" type="password" class="form-control" id="exampleInputPassword1" placeholder="密码">
		  </div>
      <p class="text-center">
        <a @click="regist" class="btn btn-default">注册</a>
      </p>
		</div>
	</div>
</template>

<script>
	import header from "./public/header.vue"
	export default{
		data(){
			return{
        user:"",
        pwd:"",
			}
		},
    methods:{
		  //注册接口
      regist(){
        //验证后续在写
        if(this.user&&this.pwd){
          this.$http.post(`${this.$store.state.getUrl}/api/regist`,
            {
              name:this.user,
              password:this.pwd
            }).then((result)=>{
              if(result.data==-2){
                layer.msg("用户名已存在，请更换用户名！");
              }else if(result.data==-1){
                layer.msg("网络异常，请稍后再试！");
              }else if(result.data==1){
                layer.msg("注册成功，即将跳转之登录页面！");
                setTimeout(()=>{
                  this.$router.push({path:"/login"})
                },2000)
              }
          })
        }else{
          layer.msg('用户名密码不能为空！')
        }
      }
    },
		components: {
			"h-header": header
		},
	}
</script>

<style scoped="scoped">
	#login{
		margin-top:150px;
	}
</style>
