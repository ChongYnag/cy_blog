<template>
	<div>
		<h-header></h-header>
		<div class="container">
		<h1 class="text-center">请联系我</h1>
		<form class="form-horizontal">
			<div class="form-group">
				<label for="inputEmail3" class="col-sm-2 control-label">您的邮箱:</label>
				<div class="col-sm-10">
					<input v-model="email" type="email" class="form-control" id="inputEmail3" placeholder="您的邮箱">
				</div>
			</div>
			<div class="form-group">
				<label for="inputPassword3" class="col-sm-2 control-label">邮件主题:</label>
				<div class="col-sm-10">
					<input v-model="title" type="text" class="form-control" id="inputPassword3" placeholder="邮件主题">
				</div>
			</div>
			<div class="form-group">
				<label for="textarea" class="col-sm-2 control-label">您要对我说的话：</label>
				<div class="col-sm-10">
					<textarea v-model="content" placeholder="来跟我好好唠叨唠叨..." id="textarea" class="form-control" rows="3"></textarea>
				</div>
			</div>
      <p class="text-center">
        <a @click="sendMial" class="btn btn-default">发送邮件</a>
      </p>
		</form>
	</div>
	</div>
</template>

<script>
	import header from './public/header.vue'
	export default {
		data() {
			return{
				email:"",
				title:"",
				content:"",
				emailReg:/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/,
			}
		},
		mounted(){
			console.log(this.$store.state.getUrl);
		},
		methods:{
			//发送邮件
			sendMial(){
				//非空判断
				if(this.email&&this.title&&this.content){
					if(this.emailReg.test(this.email)){
						//验证通过可以发送请求了
						this.$http.post(`${this.$store.state.getUrl}/api/email`,
							{email:this.email,
								title:this.title,
									content:this.content,
							})
						.then((res)=>{
							console.log(res);
							if(res.data==1){
								this.email="";
								this.title="";
								this.content="";
								alert("您的留言已经发送到重阳的邮箱，请耐心等待回邮~")
							}
						}).catch((err)=>{

						});
					}else{
						alert("您的邮箱格式不正确！");
					}
				}else{
					alert("您输入的信息不完整，请补充完整！");
				}
			}
		},
		components: {
			"h-header": header
		},
	}
</script>

<style scoped>

</style>
