<!--author:李茂源-->
<!--time：2019-6-19-->
<!--description：邀请函列表界面-->
<template>
  <div style="width: 100%">
    <el-row type="flex">
      <el-col :span="4" style="margin-top: 15px;display: flex;align-items: center">
        <el-input placeholder="请输入邀请函名称" v-model="Queryinvitation">
        </el-input>
        <el-button type="primary" icon="el-icon-search" @click="queryInvitation()"></el-button>
      </el-col>
    </el-row >

    <el-row class="table-style" >
      <el-col>
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
            label="邀请函名">
          </el-table-column>
          <el-table-column
            prop="companyName"
            label="招标公司">
          </el-table-column>
          <el-table-column
            prop="isVoteBond"
            label="是否需要投标保证金"
            width="130">
          </el-table-column>
          <el-table-column
            prop="isPromise"
            label="是否需要履约保证金"
            width="130">
          </el-table-column>
          <el-table-column
            prop="tenderContents"
            label="招标内容">
          </el-table-column>
          <el-table-column
            prop="isConfirm"
            label="状态"
            width="130">
          </el-table-column>
          <el-table-column
            prop="voteStartTime"
            label="投标开始时间"
            width="140">
          </el-table-column>
          <el-table-column
            prop="voteEndTime"
            label="投标结束时间"
            width="140">
          </el-table-column>
          <el-table-column
            label="操作"
            width="130">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="danger"
                @click="invitationInfo(scope.$index, scope.row)">查看详情<i class="el-icon-info el-icon--right"></i></el-button>
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
          layout="total, sizes, prev, pager, next, jumper"
          :total=invitationTotal>
        </el-pagination>
      </el-col>
    </el-row>
    <!--邀请函详情-->
    <el-dialog title="邀请函详情" :visible.sync="detailDialogVisible"  width="65%" >
      <div class="detailInfo">
        <div class="detail-title">
          <span>{{detailInfo.tenderTitle}}</span>
        </div>
        <div class="detail-content">
          <table class="table-detail"  cellspacing=0 cellpadding=0 >
            <tr>
              <td class="td-style"><span >招标方：{{detailInfo.companyName}}</span></td>
              <td class="td-style"><span >招标开始时间：{{detailInfo.tenderStartTime}}</span></td>
              <td class="td-style"><span >招标结束时间：{{detailInfo.tenderEndTime}}</span></td>
            </tr>
            <tr>
              <td class="td-style"><span >是否需要投标保证金：{{detailInfo.isBondMoney}}</span></td>
              <td class="td-style"><span >投标保证金缴纳方式：{{detailInfo.bondType}}</span></td>
              <td class="td-style"><span >投标保证金金额：{{detailInfo.bondMoney}}</span></td>
            </tr>
            <tr>
              <td class="td-style"><span>是否需要履约保证金：{{detailInfo.isPerformanceMoney}}</span></td>
              <td class="td-style"><span>履约保证金缴纳方式：{{detailInfo.performanceType}}</span></td>
              <td class="td-style"><span>履约保证金金额：{{detailInfo.performanceMoney}}</span></td>
            </tr>
            <tr>
              <td class="td-style"> <span >投标保证金缴纳开始时间：{{detailInfo.bondPayStartTime}}</span></td>
              <td class="td-style" colspan="2"><span >投标保证金缴纳结束时间：{{detailInfo.bondPayEndTime}}</span></td>
            </tr>
            <tr>
              <td class="td-style"> <span >履约保证金缴纳开始时间：{{detailInfo.performanceStartTime}}</span></td>
              <td class="td-style" colspan="2"><span >履约保证金缴纳结束时间：{{detailInfo.performanceEndTime}}</span></td>
            </tr>
          </table>
          <!--投标轮次-->
          <div class="list-header">
            <span class="list-header">投标轮次列表</span>
          </div>
          <el-table
            :data="detailInfo.tendingTimes"
            border
            height="150"
            style="width: 100%">
            <el-table-column
              type="index">
            </el-table-column>
            <el-table-column
              prop="voteTimes"
              label="轮次">
            </el-table-column>
            <el-table-column
              prop="startTime"
              label="开始时间">
            </el-table-column>
            <el-table-column
              prop="endTime"
              label="结束时间">
            </el-table-column>
            <el-table-column
              prop="activation"
              label="状态">
            </el-table-column>
          </el-table>
          <div class="list-header">
            <span class="list-header">物资列表</span>
          </div>
          <el-table
            :data="detailInfo.materials"
            border
            height="150"
            style="width: 100%">
            <el-table-column
              type="index">
            </el-table-column>
            <el-table-column
              prop="materialName"
              label="物资名称">
            </el-table-column>
            <el-table-column
              prop="materialModel"
              label="物资型号">
            </el-table-column>
            <el-table-column
              prop="quantity"
              label="购买数量">
            </el-table-column>
            <el-table-column
              prop="typeName"
              label="类型名称">
            </el-table-column>
          </el-table>
          <!--附件列表-->
          <div class="list-header">
            <span >附件列表</span>
          </div>
          <el-table
            :data="detailInfo.annexs"
            border
            height="150"
            style="width: 100%">
            <el-table-column
              type="index">
            </el-table-column>
            <el-table-column
              prop="annexName"
              label="附件名称">
            </el-table-column>
            <el-table-column
              prop="annexSize"
              label="附件大小（KB）">
            </el-table-column>
            <el-table-column
              prop="annexIntroduce"
              label="附件介绍">
            </el-table-column>
            <el-table-column
              prop="annexUrl"
              label="操作">
              <template slot-scope="scope">
                <!--<a href={{ scope.row.annexUrl }}></a>-->
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="detailDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="acceptInvitation()">接受该邀请函</el-button>
        <el-button type="primary" @click="refuseInvitation()">退回该邀请函</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'invitation',
    data: function () {
      return {
        Queryinvitation: '', // 按邀请函名称查询
        detailDialogVisible: false,
        currentPage: 1, // 当前页
        pageSize: 10, // 页面展示数量
        invitationTotal: 0, // 总页数
        detailInfo: { }, // 邀请函详情数据
        selectAmount: [],
        tableData: [], // 邀请函列表数据
        invitationId: '' // 邀请函id
      }
    },
    methods: {
      // 查看详情
      invitationInfo (index, row) {
        this.detailDialogVisible = true
        this.invitationId = row.invitationId // 保存邀请函id
        console.log(this.invitationId)
        let params = {}
        let param = {}
        params.voteId = row.voteId
        param.params = params
        this.$store.dispatch('ajaxGet', {url: '/tenderingUrl/v1/tendering/release/supplier',
          submitData: param,
          success: res => {
              // 是否需要投标保证金
              if (res.data.isBondMoney === false) {
                res.data.isBondMoney = '否'
              } else {
                res.data.isBondMoney = '是'
              }
            // 是否需要履约保证金
              if (res.data.isPerformanceMoney === false) {
                res.data.isPerformanceMoney = '否'
              } else {
                res.data.isPerformanceMoney = '是'
              }
            // 投标保证金缴纳方式
              if (res.data.bondType === 'CASH') {
                res.data.bondType = '现金'
              } else if (res.data.bondType === 'GUARANTEELETTER') {
                res.data.bondType = '保函'
              }
            // 履约保证金缴纳方式
              if (res.data.performanceType === 'CASH') {
                res.data.performanceType = '现金'
              } else if (res.data.performanceType === 'GUARANTEELETTER') {
                res.data.performanceType = '保函'
              }
              for (let value of res.data.tendingTimes) {
                console.log(value.activation)
                  if (value.activation === 'WAIT') {
                     value.activation = '等待中'
                  } else if (value.activation === 'ACTIVITY') {
                    value.activation = '已激活'
                  } else if (value.activation === 'ACTIVITYED') {
                    value.activation = '已结束'
                  }
              }
            this.detailInfo = res.data
            console.log(this.detailInfo)
          }})
      },
      // 处理邀请函
      handleInvitation (status) {
        this.$store.dispatch('ajaxPatch', {url: '/supplierUrl/v1/supplier/invitation',
          submitData: { 'invitationId': this.invitationId, 'confirm': status },
          success: res => {
            if (res.status === 'OK') {
              if (status) {
                this.$message({
                  message: '接受成功！',
                  type: 'success'
                })
              } else {
                this.$message({
                  message: '拒绝成功！',
                  type: 'success'
                })
              }
              this.detailDialogVisible = false
            } else {
                this.$message.error(res.message)
            }
          }
        })
      },
      // 接受邀请函
      acceptInvitation () {
        this.handleInvitation(true)
        // let params = {}
        // let param = {}
        // params.invitationId = this.invitationId
        // params.confirm = true
        // param.params = params
        // console.log(param)
        // this.$store.dispatch('ajaxPatch', {url: '/supplierUrl/v1/supplier/invitation',
        //   submitData: { 'invitationId': this.invitationId, 'confirm': true },
        //   success: res => {
        //     if (res.status === 'OK') {
        //       this.$message({
        //         message: '接受成功！',
        //         type: 'success'
        //       })
        //       this.detailDialogVisible = false
        //     } else {
        //       this.$message.error('接受失败')
        //     }
        //   }
        // })
      },
      // 退回邀请函
      refuseInvitation () {
        this.handleInvitation(false)
        // let params = {}
        // let param = {}
        // params.invitationId = this.invitationId
        // params.confirm = false
        // param.params = params
        // console.log(param)
        // this.$store.dispatch('ajaxPatch', {url: '/supplierUrl/v1/supplier/invitation',
        //   submitData: { 'invitationId': this.invitationId, 'confirm': true },
        //   success: res => {
        //     if (res.status === 'OK') {
        //       this.$message({
        //         message: '拒绝成功！',
        //         type: 'success'
        //       })
        //       this.detailDialogVisible = false
        //     } else {
        //       this.$message.error('拒绝失败')
        //     }
        //   }
        // })
      },
      // 每页显示多少条数据
      handleSizeChange (val) {
        this.pageSize = val
        this.getListData(this.currentPage, this.pageSize)
        console.log(`每页 ${val} 条`)
      },
      // 当前在第几页
      handleCurrentChange (val) {
        this.currentPage = val
        this.getListData(this.currentPage, this.pageSize)
        console.log(`当前页: ${val}`)
      },
      // 请求列表数据
      getListData: function (currentPage, pageSize) {
        let params = {}
        let param = {}
        params.currentPage = currentPage
        params.pageSize = pageSize
        param.params = params
        this.$store.dispatch('ajaxGet', {url: '/supplierUrl/v1/supplier/invitation',
          submitData: param,
          success: res => {
            if (res.status === 'OK') {
              for (let value of res.data.data) {
                if (value.isVoteBond === false) {
                  value.isVoteBond = '否'
                } else {
                  value.isVoteBond = '是'
                }
                if (value.isPromise === false) {
                  value.isPromise = '否'
                } else {
                  value.isPromise = '是'
                }
                if (value.isConfirm === null) {
                  value.isConfirm = '待处理'
                } else if (value.isConfirm === false) {
                  value.isConfirm = '已拒绝'
                } else {
                  value.isConfirm = '已接受'
                }
              }
              this.tableData = res.data.data
              this.invitationTotal = res.data.total
            } else {
              this.$message({
                message: res.message,
                type: 'error'
              })
            }
          }
        })
      },
      // 条件查询
      queryInvitation () {

      }
    },
    // 页面创建时请求列表数据
    created () {
      this.getListData(this.currentPage, this.pageSize)
    }
  }
</script>

<style  lang="scss">
  .table-style {
    margin-top: 20px;
  }
  .el-dialog {
    margin-top: 5vh !important;
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
  .detailInfo {
    height: auto;
    background-color: #f0f0f0;
    .detail-title {
      display: flex;
      justify-content: center;
       span{
        font-size: 15px;
        font-weight: 500;
         padding: 10px;
      }
    }
    .detail-content {
      .tenderContents-div{
        display: flex;
        justify-content: center;
      }
      .table-detail {
        background-color: white;
        border-left: 1px solid #6f7180;
        border-bottom: 1px solid #6f7180;
        width: 100%;
        .td-style {
          padding: 5px;
          border-right: 1px solid #6f7180;
          border-top: 1px solid #6f7180;
          text-align: center;
        }
      }
      .list-header {
        margin-top: 10px;
      }
    }
  }
</style>
