<template>
  <div class="hello">
    <h-header></h-header>
    <div class="jumbotron">
      <div class="container authorPic">
        <img class="authorPic" src="http://127.0.0.1:3000/author/moren.jpg" alt="">
        <p>蒋重阳</p>
      </div>
    </div>
    <div class="container" >
      <div class="article">
        <p>我的文章</p>
        <div class="list-group">
          <a href="#" class="list-group-item active">
            Cras justo odio
          </a>
          <a href="#" class="list-group-item">Dapibus ac facilisis in</a>
          <a href="#" class="list-group-item">Morbi leo risus</a>
          <a href="#" class="list-group-item">Porta ac consectetur ac</a>
          <a href="#" class="list-group-item">Vestibulum at eros</a>
        </div>
      </div>
      <div class="picture">
        <p>我的照片</p>
        <div class="media">
          <div class="media-left">
            <a href="#">
              <img class="media-object" src="http://127.0.0.1:3000/author/moren.jpg" alt="...">
            </a>
          </div>
          <div class="media-body">
            <h4 class="media-heading">Media heading</h4>
            <p class="media-middle">
              Media heading
            </p>
          </div>
        </div>
      </div>

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
  .authorPic{
    text-align: center;
  }
  .authorPic img{
    border-radius: 50%;
    margin-bottom: 10px;
    cursor: pointer;
  }
</style>
