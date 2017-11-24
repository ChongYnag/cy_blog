<template>
  <div>
    <b-header></b-header>
    <div class="container">
      <h2>文章</h2>
      <ul class="nav nav-pills">
        <li role="presentation" @click="toggle()"  ref="item" :class="{active:!active}"><a href="javascript:">原文</a></li>
        <li role="presentation" @click="toggle()"  ref="item" :class="{active:active}"><a href="javascript:">预览</a></li>
        <li role="presentation" style="float:right;"><a @click="fabiao" href="javascript:" class="btn btn-default">发表</a></li>
      </ul>
      <div id="box" class="row">
        <div style="margin-bottom: 10px;" v-if="!isMarked" class="col-lg-12 col-sm-12 col-md-12">
          <input type="text" v-model="title" class="form-control"  disabled maxlength="16" minlength="1" placeholder="请输入1-16位标题">
        </div>
        <div  style="margin-bottom: 10px;"  v-if="isMarked" class="col-lg-12 col-sm-12 col-md-12">
          <input type="text" v-model="title" class="form-control"   maxlength="16" minlength="1" placeholder="请输入1-16位标题">
        </div>
        <div v-if="!isMarked" class="col-lg-12 col-sm-12 col-md-12">
          <div id="html" v-html="htmlContent" class="well"></div>
        </div>
        <div v-if="isMarked" class="col-sm-12 col-lg-12 col-md-12">
          <textarea v-model="content" id="md" class="form-control" placeholder="请输入Markdown代码,以及您的技术文章！"></textarea>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import header from '../public/header.vue'

  export default {
    data(){
      return{
        active:false,
        isMarked:true,
        content:"",
        htmlContent:"",
        title:""
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
      },
      fabiao(){
        console.log(this.content);
        if(this.content && this.title){
          this.$http.post(`/api/edit`,
            {
              title:this.title,
              content:this.content
            }
          ).then((result)=>{
            console.log(result)
            if(result.data==1){
              layer.msg("文章分享成功");
              this.content="";
              this.title="";
            }else if(result.data==-1){
              layer.msg("网络异常,请稍后再试！");
            }else if(result.data==-3){
              layer.msg("您还没有登录，请先去登录");
              setTimeout(()=>{
                this.$router.push({path:"login"});
              },1000)
            }
          }).catch((err)=>{

          })
        }else{
          layer.msg("标题或内容不能为空，请检查后分享");
        }

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
    min-height:400px;
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
