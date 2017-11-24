<template>
  <div>
    <h-header></h-header>
    <!--<div class="jumbotron">-->
      <!--<div class="container">-->
        <!--<h1>Welcome to my forum!</h1>-->
        <!--<p>-->
          <!--就是一种尝试...-->
        <!--</p>-->
        <!--<p class="text-right">-->
          <!--<router-link  class="btn btn-primary btn-lg" to="uploadImg">-->
            <!--上传照片-->
          <!--</router-link>-->
        <!--</p>-->
        <!--&lt;!&ndash;<input id="inputImage" type="file" hidden>&ndash;&gt;-->
      <!--</div>-->
    <!--</div>-->
    <div class="container">

      <div class="page-header">
        <h3>照片上传</h3>
        <form>
          <div class="form-group" id="uploadForm" enctype='multipart/form-data'>
            <div class="h4">照片预览</div>
            <div class="fileinput fileinput-new" data-provides="fileinput"  id="exampleInputUpload">
              <div class="fileinput-new thumbnail" style="width: 200px;height: auto;max-height:150px;">
                <img id='picImg' style="width: 100%;height: auto;max-height: 140px;" src="../../static/images/noimage.png" alt="" />
              </div>
              <div class="fileinput-preview fileinput-exists thumbnail" style="max-width: 200px; max-height: 150px;"></div>
              <div>
                        <span class="btn btn-primary btn-file">
                            <span class="fileinput-new">选择文件</span>
                            <span class="fileinput-exists">换一张</span>
                            <input type="file" ref="uploadSubmit" name="pic1" id="picID" accept="image/gif,image/jpeg,image/x-png"/>
                        </span>
                <a href="javascript:;" class="btn btn-warning fileinput-exists" data-dismiss="fileinput">移除</a>
              </div>
            </div>
          </div>
          <button @click="upload"  type="button" class="btn btn-info">提交</button>
        </form>
      </div>
    </div>
  </div>

</template>

<script>
  import "../../static/css/bootstrap-fileinput.css"
  import '../../static/js/bootstrap-fileinput.js'
	import header from "./public/header.vue"
	export default{
		data(){
			return{

			}
		},
    methods:{
      upload(){
        let input = this.$refs.uploadSubmit;
        let data = new FormData();
        data.append('file', input.files[0]);
        if(input.files[0]){
          this.$http.post(`/api/upload`,data,{headers: {'Content-Type':data.type}}).then((result)=>{
            console.log(result)
            if(result.data=="-9"){
              layer.msg("您还没有登录，请先去登录");
              setTimeout(()=>{
                this.$router.push({path:"login"});
              },1000)
            }else if(result.data="1"){
              layer.msg("上传成功");
              setTimeout(()=>{
                this.$router.push({path:"picture"});
              },1000)

            }else{
              layer.msg("网络繁忙，请稍后重新上传");
            }
          })
        }else{
          layer.msg("请先选择一张照片！")
        }

      }
    },
		components: {
			"h-header": header
		},
	}
</script>

<style scoped="scoped">

</style>
