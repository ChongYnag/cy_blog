<template>
  <div class="hello">
    <h-header></h-header>
    <div class="jumbotron">
      <div class="container">
        <h1>一个帮助开发者成长的社区</h1>
        <p>
			这里是所有的开发者服务的社区，我们相信通过分享和学习可以帮助那些渴望不断提高自己的开发者。
			Become a Better Developer by Sharing and Learning
        </p>
        <!--<p><a class="btn btn-primary btn-lg" href="/blog" role="button">博客</a></p>-->
      </div>
    </div>
    <div class="container" >
      <div class="alert alert-info text-center" role="alert">最新文章分享</div>
      <!-- Example row of columns -->
      <div class="row">
        <div class="col-md-4" v-for="item in article">
          <div class="media">
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
              <p><a :id="item._id" class="btn btn-default" href="#" role="button">了解更多 &raquo;</a></p>
            </div>
          </div>
        </div>
      </div>
      <div class="alert alert-info text-center" role="alert">最新照片分享</div>
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
      <br>
      <!--<p class="text-center">-->
        <!--<router-link class="btn btn-primary btn-lg" to="/articles">查看更多</router-link>-->
      <!--</p>-->
      <hr>

      <footer>
        <f-footer></f-footer>
      </footer>
    </div>
  </div>
</template>

<script>
  import header from './public/header.vue'
  import footer from './public/footer.vue'
  export default {
//		name: 'hello',
    data() {
      return {
        article:[],
        pictures:[],
      }
    },
    components: {
      "h-header": header,
      "f-footer":footer
    },
    methods: {

    },
    mounted() {

    },
    beforeRouteEnter (to, from, next) {
      next(vm=> {
        vm.$http.post(`/api/home`).then((result) => {
          vm.article = result.data;
          for (var i = 0; i < vm.article.length; i++) {
            vm.article[i].content = vm.marked(vm.article[i].content);
          }
          console.log(result);
        }).catch((err) => {

        });
        vm.$http.get(`/api/pictures?page=0&size=3`).then((result)=>{
          vm.pictures = vm.pictures.concat(result.data);
        }).catch((err)=>{

        });
      });
    },
    filters:{

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1,
  h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
  .content_h2{
    height:40px;
  }
  .content_p1{
    font-size: 14px;
  }
  .content_p2{
    height: 300px;
    overflow: hidden;
    /*text-overflow: ellipsis;*/
  }
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
  .col-md-4{
    margin-bottom: 10px;
  }
  .name {
    width: 60px;
    margin-top: 5px;
    display: inline-block;
    text-align: center;
    overflow: hidden;
  }
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
  .row{
    margin-bottom: 20px;
  }
</style>
