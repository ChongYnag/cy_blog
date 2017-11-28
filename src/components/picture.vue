<template>
	<div>
		<h-header></h-header>
    <div class="jumbotron">
      <div class="container">
        <h1>一个帮助开发者成长的社区</h1>
        <p>
			这里是所有的开发者服务的社区，我们相信通过分享和学习可以帮助那些渴望不断提高自己的开发者。
			Become a Better Developer by Sharing and Learning
        </p>
        <p class="text-right">
          <router-link  class="btn btn-primary btn-lg" to="uploadImg">
            上传照片
          </router-link>
        </p>
        <!--<input id="inputImage" type="file" hidden>-->
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-lg-4" v-for="item in pictures">
          <div class="size">
            <img  :src="item.userInfo.authorPic" alt="">
          </div>
          <p class="info">
            <span class="left">上传者：{{item.userInfo.username}}</span>
            <span class="right">{{item.date}}</span>
          </p>
        </div>
      </div>
    </div>
    <p v-if="isMore" class="text-center">
      下拉加载更多
    </p>
    <p v-if="!isMore" class="text-center">
      已经到底了，别扯了
    </p>
    <!--//做分页-->
    </div>

</template>

<script>
	import header from "./public/header.vue"
	export default{
		data(){
			return{
        page:0,
        pictures:[],
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
        this.$http.get(`/api/pictures?size=9&page=${this.page}`).then((result)=>{
          if(result.data.length){
            this.pictures = this.pictures.concat(result.data);
          }else {
            this.isGone = false;
            this.isMore = false;
          }

        })
      },
      //上传图片
      uploadImg(){
        document.getElementById('inputImage').click();
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
  .col-lg-4{
    margin-bottom: 20px;
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
    background: #f2f2f2;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    padding: 0 20px;
    margin: 0;
  }
  .info span.left{
    float: left;
  }
  .info span.right{
    float: right;
  }
  .text-center{
    color: #ccc;
  }
</style>
