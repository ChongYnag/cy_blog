<template>
  <div>
    <b-header></b-header>
    <div class="container">
      <h2>文章</h2>
      <ul class="nav nav-pills">
        <li role="presentation" @click="toggle()"  ref="item" :class="{active:!active}"><a href="javascript:">原文</a></li>
        <li role="presentation" @click="toggle()"  ref="item" :class="{active:active}"><a href="javascript:">预览</a></li>
      </ul>
      <div id="box" class="row">
        <div v-if="!isMarked" class="col-lg-12 col-sm-12 col-md-12">
          <div id="html" v-html="htmlContent" class="well"></div>
        </div>
        <div v-if="isMarked" class="col-sm-12 col-lg-12 col-md-12">
          <textarea v-model="content" id="md" class="form-control" placeholder="请输入Markdown代码,已经您的技术文章！"></textarea>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import header from '../public/backHeader.vue'

  export default {
    data(){
      return{
        active:false,
        isMarked:true,
        content:"",
        htmlContent:"",
      }
    },
    methods:{
      toggle(){
        this.active = !this.active;
        this.isMarked = !this.isMarked;
      },
      //获取marked编辑器内容 渲染
      markedinit(content){
        console.log(this.marked(content));
        return this.marked(content);
      }
    },
    components: {
      "b-header": header
    },
    updated(){
      this.htmlContent=this.markedinit(this.content);
    }
  }
</script>

<style scoped>
  #html,#md{
    min-height:300px;
  }
  #md{
    resize: none;
  }
  #html{
    border: solid 1px darkgrey;
    border-radius: 5px;
  }
  #box{
    margin-top: 5px;
  }
</style>
