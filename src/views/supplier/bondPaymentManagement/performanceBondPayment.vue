<template>
  <div style="width: 100%">
    <el-row type="flex">
      <el-col :span="7" style="margin-top: 15px;display: flex;align-items: center">
        <span style="width:200px">投标保证金缴纳查询：</span>
        <el-date-picker
          v-model="queryData"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions">
        </el-date-picker>
      </el-col>
      <el-col :span="3" style="margin-top: 15px;display: flex;align-items: center">
        <template>
          <el-select v-model="checkValue" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </template>
      </el-col>
      <el-col :span="4" style="margin-top: 15px;display: flex;align-items: center">
        <el-input placeholder="按标书名查询" v-model="QueryRole">
        </el-input>
        <el-button type="primary" icon="el-icon-search"></el-button>
      </el-col>
    </el-row >
    <!--履约保证金缴纳列表-->
    <el-row class="table-style">
      <el-col>
        <el-table
          :data="tableDatas"
          height="600"
          border
          highlight-current-row
          @select-all="selectAll"
          @selection-change="handleSelectionChange"
          row-key="departId"
          style="width: 100%">
          <el-table-column
            type="index">
          </el-table-column>
          <el-table-column
            prop="invitationTitle"
            label="标书名">
          </el-table-column>
          <el-table-column
            prop="invitationTitle"
            label="采购商">
          </el-table-column>
          <el-table-column
            prop="creatorName"
            label="投标保证金"
            width="100">
          </el-table-column>
          <el-table-column
            prop="departName"
            label="缴纳截至时间"
            width="150">
          </el-table-column>
          <el-table-column
            prop="departIntroduce"
            label="已缴纳金额"
            width="100">
          </el-table-column>
          <el-table-column
            prop="departIntroduce"
            label="审核中金额"
            width="100">
          </el-table-column>
          <el-table-column
            prop="departIntroduce"
            label="缴纳中金额"
            width="100">
          </el-table-column>
          <el-table-column
            prop="departIntroduce"
            label="状态"
            width="100">
          </el-table-column>
          <el-table-column
            label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="danger"
                @click="payment(scope.$index, scope.row)">缴纳<i class="el-icon-delete el-icon--right"></i></el-button>
              <el-button
                size="mini"
                type="info"
                @click="bidBondInfo(scope.$index, scope.row)">查看详情<i class="el-icon-edit el-icon--right"></i></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <!--分页-->
    <el-row type="flex" justify="center">
      <el-col :span="8">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-sizes="[10, 15, 20]"
          :page-size="pageSize"
          layout="sizes, prev, pager, next"
          :total="1000">
        </el-pagination>
      </el-col>
    </el-row>
    <!--缴纳保证金-->
    <el-dialog
      title="履约保证金缴纳"
      :visible.sync="dialogPayment"
      width="50%">
      <div class="dialog-bag">
        <el-row type="flex" justify="center" class="row-style">
          <el-col>
            <span>标书名：<span>青城山招标</span></span>
          </el-col>
          <el-col>
            <span>招标方：<span>华东电气</span></span>
          </el-col>
          <el-col>
            <span>截止缴纳时间：<span>2015-10-15</span></span>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center" class="row-style" align="center">
          <el-col>
            <div style="display: flex;align-items: center;height: 32px">
              <span>剩余未缴纳金额：<span>52626.00</span></span>
            </div>
          </el-col>
          <el-col>
            <div style="display: flex;align-items: center;height: 32px">
              <span>已缴纳金额：<span>13451.1</span></span>
            </div>
          </el-col>
          <el-col>
            <div style="display: flex;align-items: center">
              <span>本次缴纳：</span>
              <el-input v-model="input" label="本次缴纳" placeholder="请输入金额"></el-input>
            </div>
          </el-col>
        </el-row>
        <!--上传凭证-->
        <span style="color: red">上传凭证照片</span>
        <div class="pic_upload">
          <el-row>
            <el-col :span="24">
              <el-upload
                ref="upload"
                action="https://jsonplaceholder.typicode.com/posts/"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :before-upload="beforeAvatarUpload"
                :multiple="true"
                :auto-upload="false"
                :limit=1
                :on-exceed="outLimit">
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible" size="tiny">
                <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog>
            </el-col>
          </el-row>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
      <el-button @click="dialogPayment = false">取 消</el-button>
      <el-button type="primary" @click="ModifyForm('ModifyBuiltForm')">确 定</el-button>
      </span>
    </el-dialog>
    <!--缴纳详情-->
    <el-dialog
      title="缴纳详情"
      :visible.sync="dialogDetail"
      width="50%">
      <div class="dialog-bag">
        <el-table
          :data="tableData"
          height="600"
          border
          style="width: 100%">
          <el-table-column
            type="index">
          </el-table-column>
          <el-table-column
            prop="invitationTitle"
            label="缴纳金额">
          </el-table-column>
          <el-table-column
            prop="invitationTitle"
            label="缴纳时间">
          </el-table-column>
          <el-table-column
            prop="invitationTitle"
            label="联系人">
          </el-table-column>
          <el-table-column
            prop="invitationTitle"
            label="联系电话">
          </el-table-column>
          <el-table-column
            label="凭证">
            <template slot-scope="scope">
              <div class="voucher-div">
                <viewer :images="imgUrls">
                  <img :src=item  v-for="item in imgUrls" :key="item" class="voucher-img">
                </viewer>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="voteEndTime"
            label="状态">
          </el-table-column>
        </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
      <el-button @click="dialogDetail = false">取 消</el-button>
      <el-button type="primary" @click="ModifyForm('ModifyBuiltForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'performanceBondPayment',
    data () {
      return {
        currentPage: 1, // 当前页
        pageSize: 10, // 页面展示数量
        dialogPayment: false, // 保证金缴纳弹窗
        dialogDetail: false, // 缴纳详情弹窗
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近一个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近三个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }]
        },
        tableData: [{'invitationTitle': 66666666}],
        tableDatas: [{'invitationTitle': 66666666}],
        queryData: '',
        options: [{
          value: '选项1',
          label: '代缴纳'
        }, {
          value: '选项2',
          label: '已缴纳'
        }, {
          value: '选项3',
          label: '缴纳中'
        }],
        checkValue: '',
        imgUrls: ['https://p0.meituan.net/750.0.0/dnaimgdark/a332ce5096c91663031d97188fef67211453781.jpg']
      }
    },
    methods: {
      // 缴纳保证金
      payment (index, row) {
        this.dialogPayment = true
      },
      // 查看详情
      bidBondInfo (index, row) {
        this.dialogDetail = true
      },
      // 图片处理
      handleRemove (file, fileList) {
        console.log(file, fileList)
      },
      handlePictureCardPreview (file) {
        this.dialogImageUrl = file.url
        this.dialogVisible = true
      },
      // 判断图片是否大于2M
      beforeAvatarUpload (file) {
        // const isJPG = file.type === 'image/jpeg'
        const isLt2M = file.size / 1024 / 1024 < 2
        // if (!isJPG) {
        //   this.$message.error('上传头像图片只能是 JPG 格式!')
        // }
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 2MB!')
        }
        return isLt2M
        // return isJPG && isLt2M
      },
      outLimit (r) {
        this.$message({
          message: '一次只能上传一张凭证！',
          type: 'error'
        })
      }
    }
  }
</script>

<style lang="scss">
  .table-style {
    margin-top: 20px;
  }
  .el-dialog {
    margin-top: 7vh !important;
  }
  .el-dialog__header {
    padding: 12px 20px 2px;
  }
  .el-dialog__body {
    padding: 10px 20px;
    color: #606266;
    font-size: 14px;
    word-break: break-all;
  }
  .dialog-bag {
    height: auto;
    background-color: #f0f0f0;
    padding: 10px 0px;
    .row-style {
      padding: 10px 5px;
    }
    .el-input {
      width: 50%;
    }
  }
  .pic_upload {
    background-color: white;
    width: 90%;
    height: auto;
    padding: 10px 10px;
    margin: 5px auto;
    border-radius: 5px;
    .el-upload--picture-card {
      width: 80px;
      height: 80px;
      line-height: 90px;
    }
    .el-upload-list--picture-card .el-upload-list__item {
      width: 80px;
      height: 80px;
    }
  }
  .voucher-div {
    display: -webkit-flex;
    display: flex;
    .voucher-img {
      width: 50px;
      height: 30px;
    }
  }
</style>
