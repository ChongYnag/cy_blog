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
            <span class="navbar-brand">欢迎您回来,boss</span>
        </div>
        <div id="navbar" class="navbar-collapse collapse">
            <ul class="nav navbar-nav navbar-right">
                <li><a href="/">文章</a></li>
                <li><a href="javascript:">搜索</a></li>
                <li><a @click="goContactMe" href="javascript:">草稿</a></li>
                <li><a href="javascript:">个人信息</a></li>
              <li><a href="javascript:">退出</a></li>
            </ul>
        </div>
    </div>
</nav>
	</div>
</template>

<script>
	export default{
		methods:{
			//联系重阳
			goContactMe(){
				this.$router.push({path:"contactMe"});
			}
		}
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
