<!--author:李茂源-->
<!--time：2019-6-14-->
<!--description：职位信息管理界面-->
<template>
  <div style="width: 100%">
    <el-row type="flex">
      <el-col :span="7" style="margin-top: 15px;display: flex">
        <span style="width:380px">职位信息查询：</span>
        <el-input placeholder="请输职位名称" v-model="QueryJob" >
        </el-input>
        <el-input placeholder="请输部门名称" v-model="Querypart" style="margin-left: 5px">
        </el-input>
        <el-button type="primary" icon="el-icon-search" @click="jobQuery()" style="margin-left: 5px"></el-button>
      </el-col>
    </el-row >
    <el-row class="header-bg" type="flex" algin="middle" >
      <el-col >
        <el-button type="primary" @click="NewDialogVisible = true" >新增职位<i class="el-icon-edit el-icon--right"></i></el-button>
      </el-col>
    </el-row >
    <!--职位列表-->
    <el-row class="table-style">
      <el-col>
        <el-table
          :data="tableDatas"
          height="600"
          border
          style="width: 100%">
          <el-table-column
            type="index">
          </el-table-column>
          <el-table-column
            prop="jobName"
            label="职位名称">
          </el-table-column>
          <el-table-column
            prop="jobIntroduce"
            label="职位描述">
          </el-table-column>
          <el-table-column
            prop="departName"
            label="所属部门">
          </el-table-column>
          <el-table-column
            prop="jobRemark"
            label="备注信息">
          </el-table-column>
          <el-table-column
            prop="creatorName"
            label="创建者">
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="创建时间">
          </el-table-column>
          <el-table-column
            label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="danger"
                @click="JobDelete(scope.$index, scope.row)">删除<i class="el-icon-delete el-icon--right"></i></el-button>
              <el-button
                size="mini"
                type="info"
                @click="JobModify(scope.$index, scope.row)">修改 / 查看<i class="el-icon-edit el-icon--right"></i></el-button>
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
          :total=jobTotal>
        </el-pagination>
      </el-col>
    </el-row>
    <!--新增职位-->
    <el-dialog title="选择部门" :visible.sync="NewDialogVisible"  width="30%" @open="newDialogOpen">
      <el-dialog
        width="30%"
        title="新建职位"
        :visible.sync="innerVisible"
        :close-on-click-modal="clickClose"
        append-to-body @close="innerDialogClose('NewBuiltForm')" >
        <el-form :model="NewBuiltForm" :rules="rules" ref="NewBuiltForm">
          <el-form-item label="所属部门：" :label-width="formLabelWidth">
            <span>{{departName}}</span>
          </el-form-item>
          <el-form-item label="职位名称：" :label-width="formLabelWidth" prop="jobName">
            <el-input v-model="NewBuiltForm.jobName" autocomplete="off" maxlength="20" show-word-limit></el-input>
          </el-form-item>
          <el-form-item label="职位介绍：" :label-width="formLabelWidth" prop="jobIntroduce">
            <el-input type="textarea" v-model="NewBuiltForm.jobIntroduce" autocomplete="off" :autosize="{ minRows: 3, maxRows:14}"
                      maxlength="50" show-word-limit>
            </el-input>
          </el-form-item>
          <el-form-item label="职位备注：" :label-width="formLabelWidth" prop="jobRemark">
            <el-input v-model="NewBuiltForm.jobRemark" autocomplete="off" maxlength="50" show-word-limit></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="innerVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitForm('NewBuiltForm')">确 定</el-button>
        </div>
      </el-dialog>
      <el-tree :data="DepartDatas" :props="defaultProps" @node-click="handleNodeClick" ></el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="NewDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="chooseDepart()">确 定</el-button>
      </div>
    </el-dialog>
    <!--修改职位-->
    <el-dialog
      title="修改职位"
      :visible.sync="dialogModify"
      :close-on-click-modal="clickClose"
      width="30%">
      <el-form :model="ModifyBuiltForm" :rules="rules" ref="ModifyBuiltForm">
        <el-form-item label="所属部门：" :label-width="formLabelWidth" >
         <span>{{departName}}</span>
        </el-form-item>
        <el-form-item label="职位名称：" :label-width="formLabelWidth" prop="jobName">
          <el-input v-model="ModifyBuiltForm.jobName" autocomplete="off" maxlength="20" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="职位介绍：" :label-width="formLabelWidth" prop="jobIntroduce">
          <el-input type="textarea" v-model="ModifyBuiltForm.jobIntroduce " autocomplete="off" :autosize="{ minRows: 3, maxRows:14}"
                    maxlength="50" show-word-limit>
          </el-input>
        </el-form-item>
        <el-form-item label="职位备注：" :label-width="formLabelWidth" prop="jobRemark">
          <el-input v-model="ModifyBuiltForm.jobRemark " autocomplete="off" maxlength="50" show-word-limit></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
      <el-button @click="dialogModify = false">取 消</el-button>
      <el-button type="primary" @click="ModifyForm('ModifyBuiltForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>

</template>

<script>
  import ObVue from '../../../components/common/ob_vue'
  export default {
    name: 'roleinfo',
    data: function () {
      return {
        NewDialogVisible: false,
        innerVisible: false,
        dialogModify: false,
        clickClose: false, // 点击modal时 不关闭对话框
        currentPage: 1,
        pageSize: 10,
        jobTotal: 0, // 职位总数
        QueryJob: '', // 条件查询 按职位名称查询
        Querypart: '', // 条件查询 按部门名称查询
        departName: '',
        departId: '',
        jobId: '',
        NewBuiltForm: {
          jobName: '',
          jobIntroduce: '',
          jobRemark: ''
        },
        ModifyBuiltForm: {
          jobName: '',
          jobIntroduce: '',
          jobRemark: ''
        },
        formLabelWidth: '120px',
        // 校验规则
        rules: {
          jobName: [
            {required: true, message: '请输入职位名称', trigger: 'change'},
            {min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur'}
          ]
        },
        tableDatas: [],
        DepartDatas: [],
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
        value1: '',
        value2: '',
        defaultProps: {
          children: 'children',
          label: 'departName'
        }
      }
    },
    methods: {
      // 提交新增职位表单
      submitForm (NewBuiltForm) {
        this.$refs[NewBuiltForm].validate((valid) => {
          if (valid) {
            this.NewDialogVisible = false
            this.NewBuiltForm.departId = this.departId
            this.$store.dispatch('ajaxPost', {url: '/supplierUrl/v1/supplier/job',
              submitData: this.NewBuiltForm,
              success: res => {
                if (res.status === 'OK') {
                  this.$message({
                    message: '添加成功！',
                    type: 'success'
                  })
                  this.innerVisible = false
                  // 重新加载列表数据
                  this.getListData(this.currentPage, this.pageSize)
                } else {
                  this.$message.error('添加失败')
                }
              }})
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      // 点击tree事件
      handleNodeClick (data) {
        this.departId = data.departId
        this.departName = data.departName
        console.log(this.departId)
      },
      // 每页显示多少数据
      handleSizeChange (val) {
        this.pageSize = val
        console.log(`每页 ${val} 条`)
      },
      // 点击第几页
      handleCurrentChange (val) {
        this.currentPage = val
        console.log(`当前页: ${val}`)
      },
      // 取消新增职位，清空数据
      innerDialogClose (NewBuiltForm) {
        this.$refs[NewBuiltForm].resetFields()
        this.departId = ''
        this.departName = ''
      },
      // 删除职位
      JobDelete (index, row) {
        this.$confirm('确认删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          console.log(row)
          let params = {}
          let param = {}
          params.jobId = row.jobId
          param.params = params
          this.$store.dispatch('ajaxDelete', {url: '/supplierUrl/v1/supplier/job',
            submitData: param,
            success: res => {
              if (res.status === 'OK') {
                this.$message({
                  message: '删除成功！',
                  type: 'success'
                })
                // 重新加载列表数据
                this.getListData(this.currentPage, this.pageSize)
              } else {
                this.$message.error('删除失败')
              }
            }})
        }).catch(() => {

        })
      },
      // 修改职位
      JobModify (index, row) {
        this.dialogModify = true
        this.jobId = row.jobId
        this.departName = row.departName
        this.ModifyBuiltForm.jobName = row.jobName
        this.ModifyBuiltForm.jobIntroduce = row.jobIntroduce
        this.ModifyBuiltForm.jobRemark = row.jobRemark
      },
      // 确认修改职位
      ModifyForm (ModifyBuiltForm) {
        this.$refs[ModifyBuiltForm].validate((valid) => {
          if (valid) {
            this.ModifyBuiltForm.jobId = this.jobId
            console.log(JSON.stringify(this.ModifyBuiltForm))
            this.$store.dispatch('ajaxPatch', {url: '/supplierUrl/v1/supplier/job',
              submitData: this.ModifyBuiltForm,
              success: res => {
                console.log(res)
                if (res.status === 'OK') {
                  this.$message({
                    message: '修改成功！',
                    type: 'success'
                  })
                  this.dialogModify = false
                  // 重新加载列表数据
                  this.getListData(this.currentPage, this.pageSize)
                } else {
                  this.$message.error(res.message)
                }
              }})
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      // 选择部门
      chooseDepart () {
        if (this.departId === null || this.departId === '') {
          ObVue.$message({
            showClose: true,
            message: '请选择一个部门！',
            type: 'warning'
          })
        } else {
          this.innerVisible = true
        }
      },
      // 获取职位列表数据
      getListData: function (currentPage, pageSize) {
        let params = {}
        let param = {}
        params.currentPage = currentPage
        params.pageSize = pageSize
        param.params = params
        this.$store.dispatch('ajaxGet', {url: '/supplierUrl/v1/supplier/job',
          submitData: param,
          success: res => {
            if (res.status === 'OK') {
              this.tableDatas = res.data.data
               this.jobTotal = res.data.total
              console.log(this.tableDatas)
            } else {
              this.$message({
                showClose: true,
                message: res.message,
                type: 'warning'
              })
            }
          }
        })
      },
      // 获取部门数据
      getDepartData: function () {
        this.$store.dispatch('ajaxGet', {url: '/supplierUrl/v1/supplier/department',
          success: res => {
            if (res.status === 'OK') {
              this.DepartDatas = res.data
              console.log(this.DepartDatas)
            } else {
              this.$message({
                showClose: true,
                message: res.message,
                type: 'warning'
              })
            }
          }
        })
      },
      newDialogOpen () {
        this.getDepartData()
      },
      // 条件查询
      jobQuery () {
        // this.QueryJob
        // this.Querypart
        let params = {}
        let param = {}
        params.currentPage = this.currentPage
        params.pageSize = this.pageSize
        params.jobName = this.QueryJob
        params.departName = this.Querypart
        param.params = params
        this.$store.dispatch('ajaxGet', {url: '/supplierUrl/v1/supplier/job',
          submitData: param,
          success: res => {
            if (res.status === 'OK') {
              this.tableDatas = res.data.data
              this.jobTotal = res.data.total
              console.log(this.tableDatas)
            } else {
              this.$message({
                showClose: true,
                message: res.message,
                type: 'warning'
              })
            }
          }
        })
      }
    },
    created () {
      this.getListData(this.currentPage, this.pageSize)
    }
  }
</script>

<style scoped lang="scss">
  .header-bg {
    height: auto;
    width: 100%;
    padding: 5px 0px 5px 5px;
    margin-top: 15px;
    background-color: #fff;
  }
  .table-style {
    margin-top: 20px;
  }
  .el-tree {
    overflow-y: scroll;
    height: 200px;
    border-top: 1px solid #EBEEF5;
    border-left: 1px solid #EBEEF5;
    border-bottom: 1px solid #EBEEF5;
  }
</style>
