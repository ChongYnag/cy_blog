<template>
	<div>
		<h-header></h-header>
    <div class="jumbotron">
      <div class="container">
        <h1>Welcome to my forum!</h1>
        <p>
          就是一种尝试...
        </p>
        <p class="text-right"><a class="btn btn-primary btn-lg" @click="toEdit" role="button">分享文章</a></p>
      </div>
    </div>
    <div class="container">
      <div class="media" v-for="item in article">
        <div class="media-left">
          <a href="#">
                <img class="media-object" :src="item.userInfo.authorPic" alt="...">
          </a>
          <span class="name">{{item.userInfo.username}}</span>
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
    <p v-if="isMore" class="text-center">
      下拉加载更多
    </p>
    <p v-if="!isMore" class="text-center">
      已经到底了，别扯了
    </p>
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
        isMore:true,
        isGone:true,//还可以请求数据
			}
		},
    beforeRouteEnter(to,from,next){
      next(vm=>{
        vm.getList();
      });

    },
    methods:{
      getList(){
        this.$http.get(`/api/articles?page=${this.page}`).then((result)=>{
          if(result.data.length){
          	this.article =this.article.concat(result.data);
            for(let i = 0;i<this.article.length;i++){
              this.article[i].content = this.marked(this.article[i].content);
              console.log(this.article[i].content);
            }
            
          }else {
            this.isGone = false;
            this.isMore = false;
          }
        })
      },
      toEdit(){
        console.log(this.$store.state.isLogin);
        if(this.$store.state.isLogin){
          this.$router.push({path:"edit"});
        }else{
          layer.msg("您还没有登录，请先去登录");
          setTimeout(()=>{
            this.$router.push({path:"login"});
          },1000)
        }
      }
    },
    mounted(){
      let	ExhibitionAll = ()=>{
        console.log($(document).scrollTop()); // 可视区域高度
        console.log( $(document).height()); // 滚动高度
        console.log($(window).height()); // 文档高度
        if(this.isGone){
          if($(document).scrollTop()!=0){
            if ($(document).scrollTop() >= $(document).height() - $(window).height()) {
              this.page++;
              this.getList();
            }
          }
        }
      };
      this.$store.state.scrollWin(ExhibitionAll,this);
    },
		components: {
			"h-header": header
		},
    filters:{

    }
	}
</script>

<style scoped="scoped">
  .media{
    background: #f0f0f0;
    border-radius: 8px;
    padding: 10px;
    margin-bottom: 15px;

  }
  .media img{
    border-radius: 50%;
    overflow: hidden;
    width: 60px;
    height: 60px;
  }
  .name{
    width:60px;
    margin-top: 5px;
    display:inline-block;
    text-align:center;
    overflow:hidden;
  }
</style>
