<template>
  <div>
    <el-container>
      <el-header>华东电气</el-header>
      <el-main>
        <!--banner图和基本信息-->
        <el-row>
          <el-col :span="10" :offset="2">
            <el-carousel   trigger="click" height="220px">
              <el-carousel-item v-for="item in imgUrls" :key="item">
                <img :src=item>
              </el-carousel-item>
            </el-carousel>
          </el-col>
          <el-col :span="8" :offset="2">
            <div class="left-div">
              <div class="top-div">
                <img class="logo-img" src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg">
                <span class="top-div-span">修大行者必修内外，善全身，华东电气集团以人为本，内修企业精神、锻造企业文化、拓展创新思维，外练精细品质,大行而铸就大成，打造中国电力物业第一品牌！</span>
              </div>
              <el-divider></el-divider>
              <div class="middle-div">
                <div class="rate-div">
                  <span>4.5分</span>
                </div>
                <el-col  :span="15" :offset="3">
                  <div class="base-info">
                    <span>行业：<span>建筑行业</span></span>
                    <span>总交易次数：<span>6666</span></span>
                    <span>总评论数：<span>6665</span></span>
                    <el-rate
                      v-model="value"
                      disabled
                      show-score
                      text-color="#ff9900"
                      score-template="{value}">
                    </el-rate>
                  </div>
                </el-col>
            </div>
            </div>
          </el-col>
        </el-row>
        <!--供应商详细信息-->
        <el-row>
          <el-col  :span="20" :offset="2" class="detail-info">
            <span class="detial-info-title">供应商详细信息</span>
            <div class="detail-content">
              <el-row type="flex" align="middle">
                <el-col :span="5" >
                  <span class="item-title">联系人：<span class="item-content">张三</span></span>
                </el-col>
                <el-col :span="5" >
                  <span class="item-title">联系人电话：<span class="item-content">028-165464564</span></span>
                </el-col>
              </el-row>
              <el-divider></el-divider>
              <el-row type="flex" align="middle">
                <el-col :span="5" >
                  <span class="item-title">注册日期：<span class="item-content">2019-06-25</span></span>
                </el-col>
                <el-col :span="5" >
                  <span class="item-title">详细地址：<span class="item-content">青羊工业园区1栋二单元</span></span>
                </el-col>
              </el-row>
              <el-divider></el-divider>
              <el-row type="flex" align="middle">
                <el-col :span="5" >
                  <span class="item-title">供应商征信码：<span class="item-content">61494954</span></span>
                </el-col>
                <el-col :span="5" >
                  <span class="item-title">是否全国供货：<span class="item-content">否</span></span>
                </el-col>
              </el-row>
              <el-divider></el-divider>
              <el-row type="flex" align="middle">
                <el-col :span="24" >
                  <span class="item-title">供应商产品介绍： <span class="item-content">公那就柑橘闹那个垃圾李经理你俩女拉力机</span></span>
                </el-col>
              </el-row>
              <el-divider></el-divider>
              <el-row >
                <el-col :span="24" >
                  <span class="item-title">供应商资质：</span>
                  <div class="qualifications-div">
                    <div v-for="item in imgUrls" :key="item">
                      <el-image :src=item class="qualifications-img" >
                        <div slot="error" class="image-slot">
                          <i class="el-icon-picture-outline"></i>
                        </div>
                      </el-image>
                    </div>
                  </div>
                </el-col>
              </el-row>
              <el-divider></el-divider>
            </div>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  export default {
    name: 'showinfo',
    data: function () {
      return {
        imgUrls: ['https://p0.meituan.net/750.0.0/dnaimgdark/a332ce5096c91663031d97188fef67211453781.jpg',
          'https://p0.meituan.net/750.0.0/dnaimgdark/a332ce5096c91663031d97188fef67211453781.jpg',
          'https://p0.meituan.net/750.0.0/dnaimgdark/a332ce5096c91663031d97188fef67211453781.jpg' ],
        value: 4.5
      }
    }
  }
</script>

<style scoped lang="scss">
  /*分割线*/
  .el-divider--horizontal {
    display: block;
    height: 1px;
    width: 100%;
    margin: 13px 0;
  }
  .el-header{
    color: #333;
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    line-height: 60px;
  }
  .left-div {
    height: 200px;
    width: 500px;
    background-color: white;
    padding: 10px;
    border: 1px solid #e5e5e5;
    border-radius: 10px;
    .top-div {
      display: flex;
      .logo-img {
        width: 70px;
        height: 70px;
      }
      .top-div-span {
        text-indent: 2em;
        margin-left: 5px;
        color: #666666;
        font-size: 14px;
      }
    }
    .middle-div {
      display: flex;
      .rate-div {
        width: 70px;
        height: 70px;
        display: flex;
        justify-content: center;
        align-items: center;
        border:2px dashed #ff9900 ;
        border-radius: 100%;
        color: #ff9900;
        font-weight: bold;
      }
      .base-info {
        height: 70px;
        display: -webkit-flex;
        display: inline-flex;
        flex-direction: column;
        color: #666666;
        font-size: 14px;
      }
    }

  }
  .detail-info {
    margin-top: 25px;
    .detial-info-title {
      color: #333;
      font-size: 20px;
    }
    .detail-content {
      margin-top: 10px;
      border: 1px solid #e5e5e5;
      border-radius: 10px;
      background-color: white;
      height: 400px;
      padding: 10px;
      .item-title {
        color: #222;
        font-weight: 700;
        .item-content {
          color: #666;
          font-weight: 400;
        }
      }
      .qualifications-div {
        display: -webkit-flex;
        display: flex;
        margin-top: 10px;
        .qualifications-img {
          width: 100px;
          height: 100px;
          margin-left: 10px;
        }
      }

    }
  }

</style>
