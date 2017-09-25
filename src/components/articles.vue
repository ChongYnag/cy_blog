<template>
	<div>
		<h-header></h-header>
    <div class="jumbotron">
      <div class="container">
        <h1>Welcome to my forum!</h1>
        <p>
          就是一种尝试...
        </p>
        <p class="text-right"><a class="btn btn-primary btn-lg" href="/blog" role="button">分享文章</a></p>
      </div>
    </div>
    <div class="container">
      <div class="media" v-for="item in article">
        <div class="media-left">
          <a href="#">
            <img class="media-object" src="../../static/images/moren.jpg" alt="...">
          </a>
        </div>
        <div class="media-body">
          <h2 class="content_h2">{{item.title}}</h2>
          <p class="content_p2" v-html="item.content"></p>
          <p class="content_p1">
            <span class="glyphicon glyphicon-time" aria-hidden="true"></span>
            {{item.date}}
            <span style="margin-left: 5PX;" class="glyphicon glyphicon-edit" aria-hidden="true"></span>
            {{item.comment_n}}
            <!--<span style="margin-left: 5PX;" class="glyphicon glyphicon-thumbs-up" aria-hidden="true"></span>-->
            <!--10-->
          </p>
          <p class="text-right"><a  class="btn btn-default" href="#" role="button">了解更多 &raquo;</a></p>
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
  .media{
    background: #f0f0f0;
    border-radius: 8px;
    padding: 10px;

  }
  .media img{
    border-radius: 50%;
    overflow: hidden;
    width: 60px;
    height: 60px;
  }
</style>
