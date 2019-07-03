<!--author:李茂源-->
<!--time：2019-6-14-->
<!--description：角色信息管理界面-->
<template>
  <div style="width: 100%">
     <!--条件查询-->
    <el-row type="flex">
      <el-col :span="5" style="margin-top: 15px;display: flex;align-items: center">
        <span style="width:150px">角色查询：</span>
        <el-input placeholder="请输角编码" v-model="QueryCode">
        </el-input>
      </el-col>
      <el-col :span="4" style="margin-top: 15px;display: flex;align-items: center">
        <el-input placeholder="请输角色名称" v-model="QueryRoleName" style="margin-left: 5px">
        </el-input>
        <el-button type="primary" icon="el-icon-search" style="margin-left: 5px"  @click="Query()"></el-button>
      </el-col>
    </el-row >
    <el-row class="header-bg" type="flex" algin="middle" >
      <el-col >
        <el-button type="primary" @click="NewDialogVisible = true" >新增角色<i class="el-icon-edit el-icon--right"></i></el-button>
      </el-col>
    </el-row >
    <!--角色列表-->
    <el-row class="table-style" >
      <el-col>
        <el-table
          :data="tableData"
          height="600"
          border
          @selection-change="handleSelectionChange"
          style="width: 100%">
          <el-table-column
            type="index">
          </el-table-column>
          <el-table-column
            prop="roleName"
            label="角色名称"
            width="200">
          </el-table-column>
          <el-table-column
            prop="roleCode"
            label="角色编码"
            width="130">
          </el-table-column>
          <el-table-column
            prop="roleIntroduce"
            label="角色描述">
          </el-table-column>
          <el-table-column
            prop="creatorName"
            label="创建者"
            width="150">
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="创建时间"
            width="150">
          </el-table-column>
          <el-table-column
            label="操作"
            width="350">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="danger"
                @click="roleDelete(scope.$index, scope.row)">删除<i class="el-icon-delete el-icon--right"></i></el-button>
              <el-button
                size="mini"
                type="info"
                @click="roleModify(scope.$index, scope.row)">修改 / 查看<i class="el-icon-edit el-icon--right"></i></el-button>
              <el-button
                size="mini"
                type="info"
                @click="addJurisdiction(scope.$index, scope.row)">角色授权<i class="el-icon-edit el-icon--right"></i></el-button>
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
          :total=total>
        </el-pagination>
      </el-col>
    </el-row>
    <!--新增角色弹窗-->
    <el-dialog title="新增角色" :visible.sync="NewDialogVisible"  width="30%" @close="newDialogClose('NewBuiltForm')"
      :close-on-click-modal="clickClose">
      <el-form :model="NewBuiltForm" :rules="rules" ref="NewBuiltForm">
        <el-form-item label="角色名称" :label-width="formLabelWidth" prop="roleName">
          <el-input v-model="NewBuiltForm.roleName " autocomplete="off" maxlength="50" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="角色编码" :label-width="formLabelWidth" prop="roleCode">
          <el-input v-model="NewBuiltForm.roleCode" autocomplete="off" maxlength="20" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="角色介绍" :label-width="formLabelWidth" prop="roleIntroduce">
          <el-input type="textarea" v-model="NewBuiltForm.roleIntroduce " autocomplete="off" :autosize="{ minRows: 3, maxRows:14}"
                    maxlength="50" show-word-limit>
          </el-input>
        </el-form-item>
        <el-form-item label="角色备注" :label-width="formLabelWidth" prop="roleRemark">
          <el-input v-model="NewBuiltForm.roleRemark " autocomplete="off" maxlength="50" show-word-limit></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="NewDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('NewBuiltForm')">确 定</el-button>
      </div>
    </el-dialog>
    <!--修改角色弹窗-->
    <el-dialog title="修改角色" :visible.sync="ModifyDialogVisible"  width="30%" :close-on-click-modal="clickClose">
      <el-form :model="ModifyForm" :rules="rules" ref="ModifyForm">
        <el-form-item label="角色编码" :label-width="formLabelWidth" prop="roleName">
         <span>{{roleCode}}</span>
        </el-form-item>
        <el-form-item label="角色名称" :label-width="formLabelWidth" prop="roleName">
          <el-input v-model="ModifyForm.roleName " autocomplete="off" maxlength="50" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="角色介绍" :label-width="formLabelWidth" prop="roleIntroduce">
          <el-input type="textarea" v-model="ModifyForm.roleIntroduce " autocomplete="off" :autosize="{ minRows: 3, maxRows:14}"
                    maxlength="50" show-word-limit>
          </el-input>
        </el-form-item>
        <el-form-item label="角色备注" :label-width="formLabelWidth" prop="roleRemark">
          <el-input v-model="ModifyForm.roleRemark " autocomplete="off" maxlength="50" show-word-limit></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="ModifyDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="ModifySubmit('ModifyForm')">确 定</el-button>
      </div>
    </el-dialog>
    <!--权限列表弹窗-->
    <el-dialog title="权限分配" :visible.sync="JurisdictionDialogVisible"  width="30%">
      <el-tree :data="JurisdictionListData" :props="defaultProps" show-checkbox @node-click="handleNodeClick"  ref="Jurisdictiontree"
                @check="handleNodeCheck" node-key="resourceId" :default-checked-keys="defaultChecked"></el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="JurisdictionDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="JurisdictionSubmit()">确 定</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
  import axios from 'axios'
  let resIds = []
  export default {
    name: 'roleinfo',
    data: function () {
      return {
        QueryCode: '',
        QueryRoleName: '',
        NewDialogVisible: false,
        ModifyDialogVisible: false,
        JurisdictionDialogVisible: false,
        currentPage: 1,
        jurisdictionCurrentPage: 1,
        pageSize: 10,
        jurisdictionPageSize: 10,
        roleId: '',
        clickClose: false,
        roleCode: '',
        total: 0, // 角色列表总数据
        resourceId: {},
        resourceName: {},
        param: {},
        defaultChecked: [],
        NewBuiltForm: {
          roleName: '',
          roleCode: '',
          roleIntroduce: '',
          roleRemark: ''
        },
        ModifyForm: {
          roleName: '',
          roleIntroduce: '',
          roleRemark: ''
        },
        selectAmount: [],
        formLabelWidth: '120px',
        // 校验规则
        rules: {
          roleName: [
            {required: true, message: '请输入角色名称', trigger: 'change'}
          ],
          roleCode: [
            {required: true, message: '请输入角色编码', trigger: 'change'}
          ]
        },
        // 角色列表数据
        tableData: [],
        // 权限列表数据
        JurisdictionListData: [],
        // 日历插件
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
          label: 'resourceName'
        }
      }
    },
    methods: {
      // 条件查询
      Query () {
        let params = {}
        let param = {}
        params.currentPage = this.currentPage
        params.pageSize = this.pageSize
        params.roleCode = this.QueryCode
        params.roleName = this.QueryRoleName
        param.params = params
        this.$store.dispatch('ajaxGet', {url: '/resourceUrl/v1/resource/role',
          submitData: param,
          success: res => {
            if (res.status === 'OK') {
              this.tableData = res.data.data
              this.total = res.data.total
            } else {
              this.$message({
                message: res.message,
                type: 'success'
              })
            }
          }
        })
      },
      // 新增角色
      submitForm (NewBuiltForm) {
        this.$refs[NewBuiltForm].validate((valid) => {
          if (valid) {
              this.$store.dispatch('ajaxPost', {url: '/resourceUrl/v1/resource/role',
                submitData: this.NewBuiltForm,
                success: res => {
                  if (res.status === 'OK') {
                    this.$message({
                      message: '新增成功！',
                      type: 'success'
                    })
                    this.NewDialogVisible = false
                    // 重新加载列表数据
                    this.GetlistData(this.currentPage, this.pageSize)
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
      // 删除角色
      roleDelete (index, row) {
        console.log(row.roleCode)
        if (row.roleCode === 'ADMIN') {
          this.$message({
            message: '此为超级管理员不可删除！',
            type: 'waring'
          })
        } else {
          this.$confirm('确认删除?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            let params = {}
            let param = {}
            params.roleId = row.roleId
            param.params = params
            this.$store.dispatch('ajaxDelete', {url: '/resourceUrl/v1/resource/role',
              submitData: param,
              success: res => {
                if (res.status === 'OK') {
                  this.$message({
                    message: '删除成功！',
                    type: 'success'
                  })
                  // 重新加载列表数据
                  this.GetlistData(this.currentPage, this.pageSize)
                } else {
                  this.$message.error(res.message)
                }
              }})
          }).catch(() => {
          })
        }
      },
      // 修改角色
      roleModify (index, row) {
        this.ModifyDialogVisible = true
        this.roleId = row.roleId
        this.roleCode = row.roleCode
        this.ModifyForm.roleName = row.roleName
        this.ModifyForm.roleIntroduce = row.roleIntroduce
        this.ModifyForm.roleRemark = row.roleRemark
      },
      // 确认修改角色
      ModifySubmit (ModifyForm) {
        this.$confirm('确认修改?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$refs[ModifyForm].validate((valid) => {
            this.ModifyForm.roleId = this.roleId
            if (valid) {
              this.$store.dispatch('ajaxPatch', {url: '/resourceUrl/v1/resource/role',
                submitData: this.ModifyForm,
                success: res => {
                  if (res.status === 'OK') {
                    this.$message({
                      message: '修改成功！',
                      type: 'success'
                    })
                    this.ModifyDialogVisible = false
                    // 重新加载列表数据
                    this.GetlistData(this.currentPage, this.pageSize)
                  } else {
                    this.$message.error(res.message)
                  }
                }})
            } else {
              console.log('error submit!!')
              return false
            }
          })
        }).catch(() => {
        })
      },
      // 清空新建角色表单
      newDialogClose (NewBuiltForm) {
        this.$refs[NewBuiltForm].resetFields()
      },
      // 添加权限
      addJurisdiction (index, row) {
        this.roleId = row.roleId
        this.JurisdictionDialogVisible = true
        let params = {}
        let param = {}
        params.currentPage = this.jurisdictionCurrentPage
        params.pageSize = this.jurisdictionPageSize
        params.roleId = this.roleId
        param.params = params
        this.$store.dispatch('ajaxGet', {url: '/resourceUrl/v1/resource/res/tree',
          submitData: param,
          success: res => {
            if (res.status === 'OK') {
              this.JurisdictionListData = res.data.tree
              this.defaultChecked = res.data.resIds
            } else {
              this.$message.error(res.data.message)
            }
          }
        })
      },
      // 确认添加权限
      JurisdictionSubmit () {
        if (resIds.length === 0) {
          this.$message({
            message: '请至少选择一个权限！',
            type: 'warning'
          })
        } else {
          axios({
            method: 'post',
            url: '/resourceUrl/v1/resource/role/res',
            data: {roleId: this.roleId, reses: resIds},
            headers: {
              'Content-Type': 'application/json;charset=UTF-8'
            },
            // 对 data 进行任意转换处理
            transformRequest: [function (data) {
              data = JSON.stringify(data)
              return data
            }]
          }).then(res => {
            if (res.data.status === 'OK') {
              this.$message({
                message: '设置成功！',
                type: 'success'
              })
              this.JurisdictionDialogVisible = false
            } else {
              this.$message({
                message: res.data.message,
                type: 'warning'
              })
            }
          })
            .catch(function (error) {
              console.log(error)
            })
        }
      },
      // 点击tree事件
      handleNodeClick (data) {
          console.log(data)
      },
      handleNodeCheck (node1, node2) {
        let resid = []
        for (let vaule of node2.checkedNodes) {
          let paramObj = {}
          paramObj.resourceId = (vaule.resourceId)
          paramObj.resourceName = (vaule.resourceName)
          resid.push(paramObj)
        }
        resIds = resid
      },
      handleSelectionChange (val) {
        this.selectAmount = val
      },
      // 每页显示多少数据
      handleSizeChange (val) {
        this.pageSize = val
        this.GetlistData(this.currentPage, this.pageSize)
        console.log(`每页 ${val} 条`)
      },
      // 点击第几页
      handleCurrentChange (val) {
        this.currentPage = val
        this.GetlistData(this.currentPage, this.pageSize)
        console.log(`当前页: ${val}`)
      },
      // 获取角色列表数据
      GetlistData: function (currentPage, pageSize) {
        let params = {}
        let param = {}
        params.currentPage = currentPage
        params.pageSize = pageSize
        param.params = params
        this.$store.dispatch('ajaxGet', {url: '/resourceUrl/v1/resource/role',
          submitData: param,
          success: res => {
          if (res.status === 'OK') {
            this.tableData = res.data.data
            this.total = res.data.total
          } else {
            this.$message({
              message: res.message,
              type: 'error'
            })
          }
          }
        })
      }
    },
    // 请求列表数据
    created () {
      this.GetlistData(this.currentPage, this.pageSize)
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
    height: 350px;
    border-top: 1px solid #EBEEF5;
    border-left: 1px solid #EBEEF5;
    border-bottom: 1px solid #EBEEF5;
  }
</style>
