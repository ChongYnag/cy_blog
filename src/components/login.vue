<template>
	<div>
		<h-header></h-header>
		<div id="login" class="container">
      <h2 class="text-center">登录</h2>
		  <div class="form-group">
		    <label for="exampleInputEmail1">用户名</label>
		    <input v-model="user" type="text" class="form-control" id="exampleInputEmail1" placeholder="用户名">
		  </div>
		  <div class="form-group">
		    <label for="exampleInputPassword1">密码</label>
		    <input v-model="pwd" type="password" class="form-control" id="exampleInputPassword1" placeholder="密码">
		  </div>
      <p class="text-center">
		    <a @click="login" class="btn btn-default">登录</a>
      </p>
      <br>
      <br>
      <p class="text-right">
        没有账号<router-link to="regist">去注册</router-link>
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
        from:null //用来记住路由，方便登录之后跳转到来之前的路由
			}
		},
    beforeRouteEnter (to, from, next) {
      next(vm => {
        // 通过 `vm` 访问组件实例
        vm.from = from;
      })
    },
    methods:{
		  login(){
        //验证后续在写
        if(this.user&&this.pwd){
          this.$http.post(`${this.$store.state.getUrl}/api/login`,
            {
              name:this.user,
              password:this.pwd
            }).then((result)=>{
            if(result.data==-2){
              layer.msg("用户名不存在,请重新输入！");
            }else if(result.data==-1){
              layer.msg("网络异常,请稍后再试！");
            }else if(result.data==-3){
              layer.msg("密码错误,清重新输入！");
            }else if(result.data==1){
              layer.msg("登录成功！");
              setTimeout(()=>{
                //登录之后跳转到来之前的路由
                this.$router.push({path:this.from.path})
              },1000)
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
