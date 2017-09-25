<template>
	<div>
		<nav class="navbar navbar-inverse navbar-fixed-top">
    <div class="container">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="/">JCY</a>
          <a v-if="isLogin" class="navbar-brand"  style="color: #ffffff;font-size: 16px">您好，欢迎{{user}}</a>
        </div>
        <div id="navbar" class="navbar-collapse collapse">
            <ul class="nav navbar-nav">

                <li>
                  <router-link to="/">首页</router-link>
                </li>
                <li>
                  <router-link to="/articles">文章</router-link>
                </li>
                <li><a href="javascript:">照片墙</a></li>
                <li><a @click="goContactMe" href="javascript:">联系站长</a></li>
                <li><a href="javascript:">关于站长</a></li>
                <li  v-if="isLogin" ><a href="javascript:">个人中心</a></li>
            </ul>
            <div class="navbar-form navbar-right">
		          <div class="form-group has-feedback">
		            <label class="sr-only" for="kw">搜索:</label>
		            <input type="text" class="form-control" id="kw" placeholder="搜索"/>
		            <span class="glyphicon glyphicon-search form-control-feedback"></span>
		          </div>
              <span v-if="!isLogin" class="">
                <router-link id="login" to="/login">登录</router-link>
                <router-link id="regist" to="/regist">注册</router-link>
              </span>
              <span v-if="isLogin" class="" style="margin-left: 20px;">
                <a id="regist" @click="logout" href="javascript:">退出</a>
              </span>

		    </div>
        </div>
    </div>
</nav>
	</div>
</template>

<script>
	export default{
	  data(){
	    return{
        isLogin:false,
        user:""
      }
    },
		methods:{
			//联系重阳
			goContactMe(){
				this.$router.push({path:"contactMe"});
			},
      //获取登录信息
      getSession(){
			  this.$http.get(`${this.$store.state.getUrl}/session`).then((result)=>{
          console.log(result);
          if(result.data=="noLogin"){
            this.isLogin=false;
          }else{
            this.user=result.data;
            this.isLogin=true;
          }
        }).catch((err)=>{

			  })
      },
      //退出接口
      logout(){
        this.$http.get(`${this.$store.state.getUrl}/logout`).then((result)=>{
          if(result.data=="ok"){
            window.location.href="/";
          }
        });
      }
		},
    mounted(){
      this.getSession();
    },
	}
</script>

<style scoped="scoped">
	#login{
		color: #9d9d9d;
		text-decoration: none;
	}
	#login:hover{
		color: #fff;
	}
</style>
