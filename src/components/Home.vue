<template>
  <div class="hello">
    <h-header></h-header>
    <div class="jumbotron">
      <div class="container">
        <h1>Welcome to my forum!</h1>
        <p>
          就是一种尝试...
        </p>
        <!--<p><a class="btn btn-primary btn-lg" href="/blog" role="button">博客</a></p>-->
      </div>
    </div>
    <div class="container" >
      <div class="alert alert-info text-center" role="alert">最新分享</div>
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
      <br>
      <p class="text-center">
        <router-link class="btn btn-primary btn-lg" to="/articles">查看更多</router-link>
      </p>
      <hr>

      <footer>
        <p>&copy; 2016 Company, Inc.</p>
      </footer>
    </div>
  </div>
</template>

<script>
  import header from './public/header.vue'
  export default {
//		name: 'hello',
    data() {
      return {
        article:[],
      }
    },
    components: {
      "h-header": header
    },
    methods: {

    },
    mounted() {

    },
    beforeRouteEnter (to, from, next) {
      next(vm=>{
        vm.$http.post(`${vm.$store.state.getUrl}/api/home`).then((result)=>{
          vm.article =result.data;
          for(var i = 0;i<vm.article.length;i++){
            vm.article[i].content= vm.marked(vm.article[i].content);
          }
          console.log(result);
        }).catch((err)=>{

        })
      })
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
  .name{
    width:60px;
    margin-top: 5px;
    display:inline-block;
    text-align:center;
    overflow:hidden;
  }
</style>
