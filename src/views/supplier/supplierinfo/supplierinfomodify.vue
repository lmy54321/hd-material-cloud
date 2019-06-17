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
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :before-upload="beforeAvatarUpload"
                :multiple="true"
                :auto-upload="false"
                :limit=10>
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible" size="tiny">
                <img width="100%" :src="dialogImageUrl" alt="">
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
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :before-upload="beforeAvatarUpload"
                :multiple="true"
                :auto-upload="false"
                :limit=10>
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible" size="tiny">
                <img width="100%" :src="dialogImageUrl" alt="">
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
    name: 'supplierinfomodify'
  }
</script>

<style scoped lang="scss">
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
  }
</style>
