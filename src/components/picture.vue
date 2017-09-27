<template>
	<div>
		<h-header></h-header>
    <div class="jumbotron">
      <div class="container">
        <h1>Welcome to my forum!</h1>
        <p>
          就是一种尝试...
        </p>
        <p class="text-right"><a class="btn btn-primary btn-lg" href="/blog" role="button">上传照片</a></p>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-lg-4">
          <div class="size">
            <img  src="http://127.0.0.1:3000/author/jiafeimao.jpg" alt="">
          </div>
          <p class="info">
            <span class="left">上传者：重阳</span>
            <span class="right">2017 09-27 17:51</span>
          </p>
        </div>
        <div class="col-lg-4">
          <div class="size">
            <img  src="http://127.0.0.1:3000/author/timg.jpg" alt="">
          </div>
          <p class="text-right">上传人：重阳</p>
        </div>
        <div class="col-lg-4">
          <div class="size">
            <img src="http://127.0.0.1:3000/author/jiafeimao.jpg" alt="">
          </div>
          <p class="text-right">上传人：重阳</p>
        </div>
      </div>
    </div>
    <!--//做分页-->
    </div>

</template>

<script>
	import header from "./public/header.vue"
	export default{
		data(){
			return{
        page:0,
        article:[],
        More:false,
        scroll:0,
			}
		},
    beforeRouteEnter(to,from,next){
      next(vm=>{
        vm.getList();
      });

    },
    methods:{
      getList(){
        this.$http.get(`${this.$store.state.getUrl}/api/articles?page=${this.page}`).then((result)=>{
//          console.log(result);
          this.article =result.data;
          for(let i = 0;i<this.article.length;i++){
            this.article[i].content= this.marked(this.article[i].content);
          }
        })
      },
    },
		components: {
			"h-header": header
		},
	}
</script>

<style scoped="scoped">
  /*.col-lg-4{*/
    /*width: 400px;*/
    /*height:300px;*/
  /*}*/
  .size{
    height:200px;
    text-align: center;
    background: rgba(0,0,0,0.7);
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    padding: 10px;
  }
  .col-lg-4 img{
    /*object-fit:;*/
    width: 240px;
    height:180px;
    object-fit: contain;
  }
  .info{
    height: 40px;
    line-height: 40px;
    overflow: hidden;
    margin: 0;
  }
  .info span.left{
    float: left;
  }
  .info span.right{
    float: right;
  }
</style>
