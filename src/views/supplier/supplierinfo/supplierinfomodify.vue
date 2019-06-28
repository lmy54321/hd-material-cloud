<template>
  <div>
    <el-container>
      <el-header>供应商信息修改</el-header>
      <el-main>
        <el-row type="flex" justify="center" >
          <el-col :span="2" >
            <span >供应商介绍：</span>
          </el-col>
          <el-col :span="12">
            <el-input
              type="textarea"
              :rows="3"
              placeholder="请输入介绍内容"
              v-model="textarea">
            </el-input>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="2">
            <span >供应商产品介绍：</span>
          </el-col>
          <el-col :span="12">
            <el-input
              type="textarea"
              :rows="3"
              placeholder="请输入介绍内容"
              v-model="textarea">
            </el-input>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="2">
            <span >供应商官网地址：</span>
          </el-col>
          <el-col :span="12">
            <el-input
              placeholder="请输入官网地址"
              v-model="textarea">
              <template slot="prepend">Http://</template>
            </el-input>
          </el-col>
        </el-row>        <el-row type="flex" justify="center">
        <el-col :span="2">
          <span >上市股票名称：</span>
        </el-col>
        <el-col :span="12">
          <el-input
            placeholder="请输入股票名称"
            v-model="textarea">
          </el-input>
        </el-col>
      </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="2">
            <span >上市股票代码：</span>
          </el-col>
          <el-col :span="12">
            <el-input
              placeholder="请输入股票代码"
              v-model="textarea">
            </el-input>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="2">
            <span >上传logo图片：</span>
          </el-col>
          <el-col :span="12">
            <div class="update-div">
              <el-upload
                ref="upload"
                action="https://jsonplaceholder.typicode.com/posts/"
                list-type="picture-card"
                :on-preview="logoPictureCardPreview"
                :on-remove="logoRemove"
                :before-upload="beforelogoUpload"
                :multiple="true"
                :auto-upload="false"
                :limit=10>
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="logoVisible" size="tiny">
                <img width="100%" :src="logoImageUrl" alt="">
              </el-dialog>
            </div>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="2">
            <span >上传轮播图片：</span>
          </el-col>
          <el-col :span="12">
            <div class="update-div">
              <el-upload
                ref="upload"
                action="https://jsonplaceholder.typicode.com/posts/"
                list-type="picture-card"
                :on-preview="carouselPictureCardPreview"
                :on-remove="carouselRemove"
                :before-upload="beforecarouselUpload"
                :multiple="true"
                :auto-upload="false"
                :limit=10>
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="carouselVisible" size="tiny">
                <img width="100%" :src="carouselImageUrl" alt="">
              </el-dialog>
            </div>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  export default {
    name: 'supplierinfomodify',
     data () {
      return {
        logoVisible: false,
        logoImageUrl: '',
        carouselVisible: false,
        carouselImageUrl: ''
      }
    },
    methods: {
      // logo图片处理carousel
      logoRemove (file, fileList) {
        console.log(file, fileList)
      },
      logoPictureCardPreview (file) {
        this.logoImageUrl = file.url
        this.logoVisible = true
      },
      // 判断图片是否大于2M
      beforelogoUpload (file) {
        // const isJPG = file.type === 'image/jpeg'
        const isLt2M = file.size / 1024 / 1024 < 2
        // if (!isJPG) {
        //   this.$message.error('上传头像图片只能是 JPG 格式!')
        // }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!')
        }
        return isLt2M
        // return isJPG && isLt2M
      },
      // carousel图片处理
      carouselRemove (file, fileList) {
        console.log(file, fileList)
      },
      carouselPictureCardPreview (file) {
        this.carouselImageUrl = file.url
        this.carouselVisible = true
      },
      // 判断图片是否大于2M
      beforecarouselUpload (file) {
        // const isJPG = file.type === 'image/jpeg'
        const isLt2M = file.size / 1024 / 1024 < 2
        // if (!isJPG) {
        //   this.$message.error('上传头像图片只能是 JPG 格式!')
        // }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!')
        }
        return isLt2M
        // return isJPG && isLt2M
      }
    }
  }
</script>

<style  lang="scss">
  .el-header{
    color: #333;
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    line-height: 60px;
  }
  .el-row {
    margin-top: 5px;
  }
  .update-div {
    background-color: white;
    padding: 10px;
    .el-upload--picture-card {
      width: 70px;
      height: 70px;
      line-height: 80px;
    }
    .el-upload-list--picture-card .el-upload-list__item {
      width: 70px;
      height: 70px;
    }
  }
</style>
