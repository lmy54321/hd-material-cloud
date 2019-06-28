<!--author:李茂源-->
<!--time：2019-6-14-->
<!--description：人员信息管理界面-->
<template>
  <div style="width: 100%">
    <el-row type="flex">
      <el-col :span="7" style="margin-top: 15px;display: flex;align-items: center">
        <span style="width:135px">人员信息查询：</span>
        <el-date-picker
          v-model="value2"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions">
        </el-date-picker>
      </el-col>
      <el-col :span="4" style="margin-top: 15px;display: flex;align-items: center">
        <el-input placeholder="请输入人员名称" v-model="Queryuser">
        </el-input>
        <el-button type="primary" icon="el-icon-search"></el-button>
      </el-col>
    </el-row >
    <el-row class="header-bg" type="flex" algin="middle" >
      <el-col >
        <el-button type="primary" @click="NewDialogVisible = true" >新增人员信息<i class="el-icon-edit el-icon--right"></i></el-button>
        <el-button type="danger" v-on:click="Delete(selectAmount)">批量删除<i class="el-icon-delete el-icon--right"></i></el-button>
      </el-col>
    </el-row >
    <!--人员列表-->
    <el-row class="table-style">
      <el-col>
        <el-table
          :data="tableData"
          height="600"
          border
          style="width: 100%"
          @selection-change="handleSelectionChange">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="创建时间">
          </el-table-column>
          <el-table-column
            prop="nickName"
            label="昵称">
          </el-table-column>
          <el-table-column
            prop="accountName"
            label="账号">
          </el-table-column>
          <el-table-column
            prop="userSex"
            label="性别"
            width="100">
          </el-table-column>
          <el-table-column
            prop="jobName"
            label="职位"
            width="150">
          </el-table-column>
          <el-table-column
            label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除<i class="el-icon-delete el-icon--right"></i></el-button>
              <el-button
              size="mini"
              type="info"
              @click="handleModify(scope.$index, scope.row)">账号密码修改<i class="el-icon-edit el-icon--right"></i></el-button>
              <a class="el-icon-info"  @click="detailInfo(scope.$index, scope.row)" href="javascript:void(0);">详情修改</a>
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
          :total=peopleTotal>
        </el-pagination>
      </el-col>
    </el-row>
    <!--新建操作人员-->
    <el-dialog title="新建操作人员" :visible.sync="NewDialogVisible"  width="40%" @close="newDialogClose('NewBuiltForm')">
      <div class="dialog-bag">
        <!--分配角色-->
        <el-dialog
          width="50%"
          title="分配角色"
          :visible.sync="addRoleDialog"
          append-to-body>
          <div class="dialog-bag">
          <el-table
            :data="roleListData"
            height="500"
            border
            @select-all="roleselectAll"
            @selection-change="roleSelectionChange"
            ref="multiplerRoleTable"
            style="width: 100%">
            <el-table-column
              type="selection"
              :selectable="checkboxInit"
              width="55">
            </el-table-column>
            <el-table-column
              type="index">
            </el-table-column>
            <el-table-column
              prop="roleName"
              label="角色名称"
              width="120">
            </el-table-column>
            <el-table-column
              prop="createTime"
              label="创建时间"
              width="150">
            </el-table-column>
            <el-table-column
              prop="creatorName"
              label="创建者"
              width="100">
            </el-table-column>
            <el-table-column
              prop="roleIntroduce"
              label="角色描述">
            </el-table-column>
            <el-table-column
              prop="roleRemark"
              label="角色备注">
            </el-table-column>
          </el-table>
          <el-pagination
            @size-change="roleSizeChange"
            @current-change="roleCurrentChange"
            :current-page.sync="rolecurrentPage"
            :page-sizes="[10, 15, 20]"
            :page-size="rolepageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total=roleTotal>
          </el-pagination>
        </div>
          <div slot="footer" class="dialog-footer">
            <el-button @click="addRoleDialog = false">取 消</el-button>
            <el-button type="primary" @click="roleSubmit()">确 定</el-button>
          </div>
        </el-dialog>
        <!--分配职位-->
        <el-dialog
          width="50%"
          title="分配职位"
          :visible.sync="addJobDialog"
          append-to-body>
          <div class="dialog-bag">
            <el-table
              :data="jobListData"
              height="500"
              border
              ref="multiplerJobTable"
              highlight-current-row
              @current-change="jobSelect"
              style="width: 100%">
              <el-table-column
                prop="jobName"
                label="职位名称"
                width="100">
              </el-table-column>
              <el-table-column
                prop="createTime"
                label="创建时间">
              </el-table-column>
              <el-table-column
                prop="creatorName"
                label="创建者"
                width="100">
              </el-table-column>
              <el-table-column
                prop="departName"
                label="所属部门"
                width="100">
              </el-table-column>
              <el-table-column
                prop="jobIntroduce"
                label="职位描述">
              </el-table-column>
              <el-table-column
                prop="jobRemark"
                label="备注信息">
              </el-table-column>
            </el-table>
            <el-pagination
              @size-change="jobSizeChange"
              @current-change="jobCurrentChange"
              :current-page.sync="jobcurrentPage"
              :page-sizes="[10, 15, 20]"
              :page-size="jobpageSize"
              layout="sizes, prev, pager, next"
              :total="1000">
            </el-pagination>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button @click="addJobDialog = false">取 消</el-button>
            <el-button type="primary" @click="jobSubmit()">确 定</el-button>
          </div>
        </el-dialog>
        <!--新建操作人员填写表单-->
      <el-form :model="NewBuiltForm" :rules="rules" ref="NewBuiltForm">
        <el-form-item label="账号" :label-width="formLabelWidth" prop="accountName">
          <el-input v-model="NewBuiltForm.accountName" autocomplete="off" maxlength="10" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth" prop="accountPwd">
          <el-input v-model="NewBuiltForm.accountPwd" autocomplete="off" maxlength="10" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="手机号码" :label-width="formLabelWidth" prop="phoneNumber">
          <el-input v-model="NewBuiltForm.phoneNumber" autocomplete="off" maxlength="11" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="昵称：" :label-width="formLabelWidth" prop="nickName">
          <el-input v-model="NewBuiltForm.nickName " autocomplete="off" maxlength="10" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="姓名：" :label-width="formLabelWidth" prop="userName">
          <el-input v-model="NewBuiltForm.userName " autocomplete="off" maxlength="10" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="性别：" :label-width="formLabelWidth" prop="userSex">
          <el-radio v-model="NewBuiltForm.userSex" label="MAN">男</el-radio>
          <el-radio v-model="NewBuiltForm.userSex" label="WOMAN">女</el-radio>
        </el-form-item>
        <el-form-item label="身份证号码：" :label-width="formLabelWidth" prop="userCardNo">
          <el-input v-model="NewBuiltForm.userCardNo" autocomplete="off" maxlength="18" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="邮箱：" :label-width="formLabelWidth" prop="mailbox">
          <el-input v-model="NewBuiltForm.mailbox" autocomplete="off" maxlength="30" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="分配角色：" :label-width="formLabelWidth" prop="mailbox">
          <el-tag
            :key="roletag" v-for="roletag in roleNames" closable :disable-transitions="false" @close="roleClose(roletag)">
            {{roletag}}
          </el-tag>
          <el-button type="primary" @click="roleAdd()" size="mini">添加<i class="el-icon-plus el-icon--right"></i></el-button>
        </el-form-item>
        <el-form-item label="分配职位：" :label-width="formLabelWidth" prop="mailbox">
          <el-tag
            :key="jobtag" v-for="jobtag in jobName" closable :disable-transitions="false" @close="jobClose(jobtag)">
            {{jobtag}}
          </el-tag>
          <el-button type="primary"  @click="jobAdd()" size="mini">添加<i class="el-icon-plus el-icon--right"></i></el-button>
        </el-form-item>
        <el-form-item label="头像上传：" :label-width="formLabelWidth">
          <div class="pic_upload">
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
          </div>
        </el-form-item>
      </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="NewDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('NewBuiltForm')">确 定</el-button>
      </div>
    </el-dialog>
    <!--修改账号密码-->
    <el-dialog title="修改账号密码" :visible.sync="ModifyDialogVisible"  width="30%">
      <el-form :model="ModifyForm" :rules="rules" ref="ModifyForm">
        <el-form-item label="原密码" :label-width="formLabelWidth" prop="oldAccountPwd">
          <el-input v-model="ModifyForm.oldAccountPwd " autocomplete="off" maxlength="10" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="新密码" :label-width="formLabelWidth" prop="accountPwd">
        <el-input v-model="ModifyForm.accountPwd " autocomplete="off" maxlength="10" show-word-limit></el-input>
      </el-form-item>
      <el-form-item label="确认密码" :label-width="formLabelWidth" prop="surePwd">
        <el-input v-model="surePwd " autocomplete="off" maxlength="10" show-word-limit></el-input>
      </el-form-item>

    </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="ModifyDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="ModifySubmit('ModifyForm')">确 定</el-button>
      </div>
    </el-dialog>

    <!--修改用户信息-->
    <el-dialog title="修改用户信息" :visible.sync="ModifyDialogUser"  width="50%">
      <div class="dialog-bag">
      <el-form :model="ModifyUserForm" :rules="rules" ref="ModifyUserForm">
        <el-form-item label="昵称：" :label-width="formLabelWidth" prop="nickName">
          <el-input v-model="ModifyUserForm.nickName " autocomplete="off" maxlength="10" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="姓名：" :label-width="formLabelWidth" prop="userName">
          <el-input v-model="ModifyUserForm.userName " autocomplete="off" maxlength="10" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="性别：" :label-width="formLabelWidth" prop="userSex">
          <el-radio v-model="ModifyUserForm.userSex" label="MAN">男</el-radio>
          <el-radio v-model="ModifyUserForm.userSex" label="WOMAN">女</el-radio>
        </el-form-item>
        <el-form-item label="身份证号码：" :label-width="formLabelWidth" prop="userCardNo">
          <el-input v-model="ModifyUserForm.userCardNo" autocomplete="off" maxlength="18" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="手机号码：" :label-width="formLabelWidth" prop="phoneNumber">
          <el-input v-model="ModifyUserForm.phoneNumber" autocomplete="off" maxlength="11" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="邮箱：" :label-width="formLabelWidth" prop="mailbox">
          <el-input v-model="ModifyUserForm.mailbox" autocomplete="off" maxlength="30" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="头像修改：" :label-width="formLabelWidth">
          <div class="pic_upload">
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
          </div>
        </el-form-item>
      </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="ModifyDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="ModifyUserInfo('ModifyUserForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import ObVue from '../../../components/common/ob_vue'
   let roleselect = true
  export default {
    name: 'PeopleManagement',
    data: function () {
      let checkPhone = (rule, value, callback) => {
        console.log(value)
        if (!value) {
          return callback(new Error('手机号不能为空'))
        } else {
          const reg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/
          console.log(reg.test(value))
          if (reg.test(value)) {
            callback()
          } else {
            return callback(new Error('请输入正确的手机号'))
          }
        }
      }
      return {
        NewDialogVisible: false,
        ModifyDialogVisible: false,
        ModifyDialogUser: false,
        dialogVisible: false,
        addJobDialog: false,
        addRoleDialog: false,
        currentPage: 1,
        jobcurrentPage: 1,
        jobpageSize: 10,
        peopleTotal: 0, // 总人员数
        pageSize: 10,
        rolecurrentPage: 1,
        rolepageSize: 10,
        roleTotal: 0, // 角色总数量
        Queryuser: '',
        surePwd: '',
        dialogImageUrl: '',
        tagroleId: '',
        roleNames: [], // 分配的角色名称数组
        jobName: [], // 分配的职位名称
        selectAmount: '',
        NewBuiltForm: {
          accountName: '',
          accountPwd: '',
          phoneNumber: '',
          nickName: '',
          userName: '',
          userSex: '',
          userCardNo: '',
          mailbox: '',
          jobId: '', // 分配的职位id
          roleIds: [] // 分配的角色数组
        },
        ModifyForm: {
          oldAccountPwd: '',
          accountPwd: ''
        },
        ModifyUserForm: {
          nickName: '',
          userName: '',
          userSex: '',
          userCardNo: '',
          phoneNumber: '',
          mailbox: ''
        },
        roleSelectAmount: [], // 角色勾选的数组
        roleListData: [],
        jobListData: [],
        formLabelWidth: '120px',
        // 校验规则
        rules: {
          accountName: [
            {required: true, message: '请输入账号', trigger: 'change'},
            {min: 8, max: 18, message: '长度在 8 到 18 个字符', trigger: 'blur'}
          ],
          accountPwd: [
            {required: true, message: '请输入密码', trigger: 'change'},
            {min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur'}
          ],
          oldAccountPwd: [
            {required: true, message: '请输入密码', trigger: 'change'},
            {min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur'}
          ],
          phoneNumber: [
            {validator: checkPhone, trigger: 'blur'}
          ]
        },
        tableData: [],
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
        value2: ''
      }
    },
    methods: {
      // 新增人员
      submitForm (NewBuiltForm) {
        this.$refs[NewBuiltForm].validate((valid) => {
          if (valid) {
            this.$store.dispatch('ajaxPost', {url: '/supplierUrl/v1/supplier/user',
              submitData: this.NewBuiltForm,
              success: res => {
                if (res.status === 'OK') {
                  this.$message({
                    message: '添加成功！',
                    type: 'success'
                  })
                  // 隐藏当前Dialog
                  this.NewDialogVisible = false
                  // 刷新列表
                  this.getListData(this.currentPage, this.pageSize)
                } else {
                  ObVue.$message.error(res.message)
                }
              }})
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      // 清空新增人员表单
      newDialogClose (NewBuiltForm) {
        this.$refs[NewBuiltForm].resetFields()
      },
      // 删除人员
      handleDelete (index, row) {
        this.$confirm('确认删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          console.log(row)
          let params = {}
          let param = {}
          params.userId = row.userId
          param.params = params
          this.$store.dispatch('ajaxDelete', {url: '/supplierUrl/v1/supplier/user',
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
      // 修改人员
      handleModify (index, row) {
        this.ModifyDialogUser = true
      },
      // 确认修改账号密码
      ModifySubmit (ModifyForm) {
        this.$refs[ModifyForm].validate((valid) => {
          if (valid) {
            if (this.surePwd !== this.ModifyForm.accountPwd) {
              this.$message({
                message: '两次密码不一致！',
                type: 'info'
              })
            } else {
              this.$store.dispatch('ajaxPatch', {url: '/supplierUrl/v1/supplier/user/pwd',
                submitData: this.ModifyForm,
                success: res => {
                  if (res.status === 'OK') {
                    this.$message({
                      message: '修改成功！',
                      type: 'success'
                    })
                    this.ModifyDialogVisible = false
                    // 重新加载列表数据
                    this.getListData(this.currentPage, this.pageSize)
                  } else {
                    this.$message.error('修改失败')
                  }
                }})
            }
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      // 修改用户详情
      detailInfo () {
        this.ModifyDialogUser = true
        // this.$store.dispatch('ajaxGet', {url: '/LoginUrl/v1/user/info',
        //   success: res => {
        //   console.log(res.data)
        //     // this.ModifyUserForm.nickName = res.data.nickName
        //     // this.ModifyUserForm.userName = res.data.userName
        //     // this.ModifyUserForm.userSex = res.data.userSex
        //     // this.ModifyUserForm.userCardNo = res.data.userCardNo
        //     // this.ModifyUserForm.phoneNumber = res.data.phoneNumber
        //     // this.ModifyUserForm.mailbox = res.data.mailbox
        //   }
        // })
      },
      // 确认修改用户详情
      ModifyUserInfo (ModifyUserForm) {
        this.$refs[ModifyUserForm].validate((valid) => {
          if (valid) {
              this.$store.dispatch('ajaxPatch', {url: '/supplierUrl/v1/supplier/user',
                submitData: this.ModifyUserForm,
                success: res => {
                  if (res.status === 'OK') {
                    this.$message({
                      message: '修改成功！',
                      type: 'success'
                    })
                    this.ModifyDialogVisible = false
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
      roleselectAll: function (val) {
        this.roleSelectAmount = val
        console.log(this.roleSelectAmount)
      },
      // 角色选择
      roleSelectionChange (val) {
        this.roleSelectAmount = val
        console.log(this.roleSelectAmount)
      },
      // CheckBox 是否可以勾选
      checkboxInit (row, index) {
        if (row.isSelect) {
          return false
        } else {
          return true
        }
      },
      // 确认勾选的角色
      roleSubmit () {
        if (this.roleSelectAmount.length === 0) {
          this.$message({
            message: '请至少选择一个角色！',
            type: 'info'
          })
        } else {
          for (let i = 0; i < this.roleListData.length; i++) {
            console.log(this.roleListData[i])
              for (let value of this.roleSelectAmount) {
                if (this.roleListData[i].roleId === value.roleId) {
                  this.NewBuiltForm.roleIds.push(value.roleId)
                  this.roleNames.push(value.roleName)
                  this.roleListData[i].isSelect = true
                }
              }
          }
          this.addRoleDialog = false
          this.$refs.multiplerRoleTable.clearSelection() // 清空之前的选中状态
        }
      },
      // 删除角色
      roleClose (tag) {
        for (let value of this.roleListData) {
          if (value.roleName === tag) {
            value.isSelect = false
            this.tagroleId = value.roleId
          }
        }
        this.NewBuiltForm.roleIds.splice(this.NewBuiltForm.roleIds.indexOf(this.tagroleId), 1)
        this.roleNames.splice(this.roleNames.indexOf(tag), 1)
        console.log(this.NewBuiltForm.roleIds)
        console.log(this.roleNames)
      },
      // 确认勾选的职位
      jobSubmit () {
          this.addJobDialog = false
          this.$refs.multiplerJobTable.clearSelection() // 清空之前的选中状态
      },
      // 选择的职位
      jobSelect (val) {
        console.log(val)
        this.NewBuiltForm.jobId = val.jobId
        this.jobName.push(val.jobName)
      },
      // 删除职位
      jobClose (tag) {
        this.NewBuiltForm.jobId = ''
        this.jobName.splice(this.jobName.indexOf(tag), 1)
      },
      handleSizeChange (val) {
        this.pageSize = val
        console.log(`每页 ${val} 条`)
      },
      handleCurrentChange (val) {
        this.currentPage = val
        console.log(`当前页: ${val}`)
      },
      // 添加角色  每页显示多少数据
      roleSizeChange (val) {
        this.rolepageSize = val
        roleselect = true
        this.getRoleList(this.rolecurrentPage, this.rolepageSize)
        for (let i = 0; i < this.roleListData.length; i++) {
          console.log(this.roleListData[i])
          for (let value of this.roleSelectAmount) {
            if (this.roleListData[i].roleId === value.roleId) {
              // this.NewBuiltForm.roleIds.push(value.roleId)
              // this.roleNames.push(value.roleName)
              this.roleListData[i].isSelect = true
            }
          }
        }
        console.log(`每页 ${val} 条`)
      },
      // 添加角色 当前第几页
      roleCurrentChange (val) {
        this.rolecurrentPage = val
        roleselect = true
        this.getRoleList(this.rolecurrentPage, this.rolepageSize)
        console.log(`当前页: ${val}`)
      },
      jobSizeChange (val) {
        this.jobpageSize = val
        console.log(`每页 ${val} 条`)
      },
      jobCurrentChange (val) {
        this.jobcurrentPage = val
        console.log(`当前页: ${val}`)
      },
      handleSelectionChange (val) {
          this.selectAmount = val
      },
      Delete: function (amount) {
        console.log(amount)
        // if (amount.length === 0) {
        //   ObVue.$message.error('请至少选择一条数据')
        // } else {
        //
        // }
      },
      // 获取角色列表数据
      getRoleList (rolecurrentPage, rolepageSize) {
        this.addRoleDialog = true
        let params = {}
        let param = {}
        params.currentPage = rolecurrentPage
        params.pageSize = rolepageSize
        param.params = params
          // this.$store.dispatch('ajaxGet', {url: '/resourceUrl/v1/resource/role',
          //   submitData: param,
          //   success: res => {
          //     if (res.status === 'OK') {
          //       this.roleListData = res.data.data
          //       this.roleTotal = res.data.total
          //     }
          //   }
          // })
        if (roleselect) {
          this.$store.dispatch('ajaxGet', {url: '/resourceUrl/v1/resource/role',
            submitData: param,
            success: res => {
              if (res.status === 'OK') {
                this.roleListData = res.data.data
                this.roleTotal = res.data.total
              }
            }
          })
          roleselect = false
        }
      },
      // 添加角色
      roleAdd () {
        this.getRoleList(this.rolecurrentPage, this.rolepageSize)
      },
      // 添加职位
      jobAdd () {
        if (this.jobName.length === 1) {
          this.$message({
            message: '当前已添加一个职位，不能再次添加！',
            type: 'error'
          })
        } else {
          this.addJobDialog = true
          let params = {}
          let param = {}
          params.currentPage = this.jobcurrentPage
          params.pageSize = this.jobpageSize
          param.params = params
          this.$store.dispatch('ajaxGet', {url: '/supplierUrl/v1/supplier/job',
            submitData: param,
            success: res => {
              this.jobListData = res.data
            }
          })
        }
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
          message: '一次只能上传一张照片！',
          type: 'error'
        })
      },
      // 获取列表数据
      getListData: function (currentPage, pageSize) {
        let params = {}
        let param = {}
        params.currentPage = currentPage
        params.pageSize = pageSize
        param.params = params
        this.$store.dispatch('ajaxGet', {url: '/supplierUrl/v1/supplier/user',
          submitData: param,
          success: res => {
            if (res.status === 'OK') {
              this.peopleTotal = res.data.total
              this.tableData = res.data.data
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
    created () {
      this.getListData(this.currentPage, this.pageSize)
    }
  }
</script>

<style  lang="scss">
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
  .span-style {
    color: red;
    margin-left: 8px;
  }
  .dialog-bag {
    height: auto;
    background-color: #f0f0f0;
    padding: 10px 10px;
  }
  .pic_upload {
    background-color: white;
    width: 98%;
    height: auto;
    padding: 10px 0px 10px 10px;
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
</style>
