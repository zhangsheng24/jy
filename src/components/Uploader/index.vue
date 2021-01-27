<template>
  <van-uploader
    v-model="fileList"
    :multiple="multiple"
    :before-read="beforeRead"
    :after-read="afterRead"
    :max-count='maxCount'
    :preview-image='previewImage'
    @delete='handleDelete'
    :preview-size='previewSize'
  >
    
    <div class="uploadBox" v-if="custom === 'custom'">
      <div class="icon_wrap">
        <span>+</span>
      </div>
      <div class="upload_text">立即上传</div>
    </div>
    <div v-if="custom === 'edit'" class="edit">重新上传</div>
    
  </van-uploader>
</template>
<script>
import { uploadUtil } from "@/utils/upload";
import {LgetItem} from '@/utils/storage'
import api from '@/api'
export default {
  data() {
    return {
      fileList:[]
    };
  },
  props: {
    multiple: {
      type: Boolean,
      default: false,
    },
    maxCount:{
        type:Number,
        default:1
    },
    uploadConfig:{
      type:Object,
      default:()=>{
        return {}
      }
    },
    custom:{
      type:String,
      default:''
    },
    previewImage:{
      type: Boolean,
      default: true,
    },
    activeCover:{
      type:String,
      default:''
    },
    previewSize:{
      type:String,
      default:'80px'
    },
  },
  watch:{
    activeCover(val){
      console.log(val,'val')
      this.fileList=[{url:val}]
    }
  },
  methods: {
    beforeRead(file) {
      console.log(file);
      const fileArr = Array.isArray(file) ? file : [file]
      let flag = true
      for (let i = 0; i < fileArr.length; i++) {
        if (fileArr[i].type.indexOf('image') === -1) {
          flag = false
          break;
        }
      }
      return flag
    },
    afterRead(fileObj) {
      const fileArr = Array.isArray(fileObj) ? fileObj : [fileObj]
      fileArr.map((s, i) => {
        s.status = 'uploading'
        s.message = '上传中...'
        const file = s.file
        const type = file.type.split('/')[1]
        const timeStamp = Date.now()
        const aliOssParams = uploadUtil.aliOssParams(
          this.uploadConfig.accessKeyId,
          this.uploadConfig.accessKeySecret
        );
        const key=`${LgetItem('userId')}${i}${timeStamp}fileName${file.name}`
        if (this.uploadConfig.domain) {
          const uploadData = new window.FormData()
          uploadData.append('policy', aliOssParams.policy)
          uploadData.append('signature', aliOssParams.signature)
          uploadData.append('OSSAccessKeyId', this.uploadConfig.accessKeyId)
          uploadData.append('success_action_status', '200')
          uploadData.append("x-oss-security-token", this.uploadConfig.securityToken);
          uploadData.append('key', key)
          // formData.append('callback', this.ossInfo.callback)
          uploadData.append('file', file)
          const fileUrl = `https://${this.uploadConfig.bucket}.${this.uploadConfig.endpoint}`;
          api(this.uploadConfig.domain, uploadData,{
            cache: 'no-cache',
            method: 'post',
            withCredentials: false,
            requestMessage:false,
            headers: {
              noHeader: true,
            }}).then(res => {
            s.status = 'done'
            s.message = '上传成功'
            s.url = `${fileUrl}/${key}`
            console.log(this.fileList)
            this.$emit('doneUpload',this.fileList)
          }).catch(err => {
            console.log(err)
            s.status = 'failed'
            s.message = '上传失败'
          })
        } else {
          this.$notify({ type: 'danger', message: '获取上传信息失败' })
          this.upConfig()
          s.status = 'failed'
          s.message = '上传失败'
        }
        return s
      })
      
      
    },
    handleDelete(){
      console.log(this.fileList,'delete')
      this.$emit('handleDelete')
    }
  },
};
</script>
<style lang="scss" scoped>
.uploadBox{
  width: 240px;
  height: 112px;
  background: #F2F2F2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .icon_wrap{
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background-color: #E5E5E5;
    display: flex;
    justify-content: center;
    align-items: center;
    span{
      color: #fff;
      font-size: 30px;
      display: inline-block;
      height: 48px;
      line-height: 48px;
    }
  }
  .upload_text{
    margin-top: 10px;
    font-size: 13px;
    color: #4070FF;
  }
}
.edit{
  color: $themeColor;
}
::v-deep .van-uploader__preview-image{
  height: auto!important;
}
</style>