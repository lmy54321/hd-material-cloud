<!--author:李茂源-->
<!--time：2019-6-14-->
<!--description：人员信息管理界面-->
<template>
  <div style="width: 100%">
    <el-row type="flex">
      <el-col :span="7" style="margin-top: 15px;display: flex;align-items: center">
        <span style="width:400px">人员信息查询：</span>
        <el-input placeholder="请输入姓名" v-model="queryUserName">
        </el-input>
        <el-input placeholder="请输入账号" v-model="queryAccountName" style="margin-left: 5px"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="userQuery()" style="margin-left: 5px"></el-button>
      </el-col>
    </el-row >
    <el-row class="header-bg" type="flex" algin="middle" >
      <el-col >
        <el-button type="primary" @click="NewDialogVisible = true" >新增人员信息<i class="el-icon-edit el-icon--right"></i></el-button>
        <!--<el-button type="danger" v-on:click="Delete(selectAmount)">批量删除<i class="el-icon-delete el-icon&#45;&#45;right"></i></el-button>-->
      </el-col>
    </el-row >
    <!--人员列表-->
    <el-row class="table-style">
      <el-col>
        <el-table
          :data="tableData"
          height="600"
          border
          style="width: 100%">
          <el-table-column
            prop="userName"
            label="姓名">
          </el-table-column>
          <el-table-column
            prop="accountName"
            label="账号">
          </el-table-column>
          <el-table-column
            prop="nickName"
            label="昵称">
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
            prop="createTime"
            label="创建时间"
            width="150">
          </el-table-column>
          <el-table-column
            label="操作"
            width="400">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除<i class="el-icon-delete el-icon--right"></i></el-button>
              <el-button
              size="mini"
              type="info"
              @click="handleModify(scope.$index, scope.row)">账号密码修改<i class="el-icon-edit el-icon--right"></i></el-button>
              <el-button
                size="mini"
                type="info"
                @click="detailInfo(scope.$index, scope.row)">查看 / 修改<i class="el-icon-info el-icon--right"></i></el-button>
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
    <el-dialog title="新建操作人员" :visible.sync="NewDialogVisible"  width="40%" @close="newDialogClose('NewBuiltForm')"
               :close-on-click-modal="clickClose">
      <div class="dialog-bag">
        <!--分配角色-->
        <el-dialog
          width="50%"
          title="分配角色"
          :visible.sync="addRoleDialog"
          @close="newRoleDialogClose()"
          append-to-body>
          <div class="dialog-bag">
          <el-table
            :data="roleListData"
            height="500"
            border
            @select-all="roleselectAll"
            @select="roleSelectionChange"
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
                width="130">
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
              layout="total, sizes, prev, pager, next, jumper"
              :total=jobTotal>
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
          <el-input v-model="NewBuiltForm.accountPwd" show-password autocomplete="off" maxlength="10" show-word-limit></el-input>
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
        <el-form-item label="分配角色：" :label-width="formLabelWidth" prop="roleIds">
          <el-tag
            :key="roletag" v-for="roletag in roleNames" closable :disable-transitions="false" @close="roleClose(roletag)">
            {{roletag}}
          </el-tag>
          <el-button type="primary" @click="roleAdd()" size="mini">添加<i class="el-icon-plus el-icon--right"></i></el-button>
        </el-form-item>
        <el-form-item label="分配职位：" :label-width="formLabelWidth" prop="jobId">
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
    <el-dialog title="修改账号密码" :visible.sync="ModifyDialogVisible"  :close-on-click-modal="clickClose" width="30%">
      <el-form :model="ModifyForm" :rules="rules" ref="ModifyForm">
        <el-form-item label="原密码" :label-width="formLabelWidth" prop="oldAccountPwd">
          <el-input v-model="ModifyForm.oldAccountPwd " show-password autocomplete="off" maxlength="10" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="新密码" :label-width="formLabelWidth" prop="accountPwd">
        <el-input v-model="ModifyForm.accountPwd " show-password autocomplete="off" maxlength="10" show-word-limit></el-input>
      </el-form-item>
      <el-form-item label="确认密码" :label-width="formLabelWidth" prop="surePwd">
        <el-input v-model="surePwd " type="password" autocomplete="off" maxlength="10" show-word-limit></el-input>
      </el-form-item>

    </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="ModifyDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="ModifySubmit('ModifyForm')">确 定</el-button>
      </div>
    </el-dialog>

    <!--修改用户详情-->
    <el-dialog title="修改用户详情" :visible.sync="ModifyDialogUser"  :close-on-click-modal="clickClose" width="50%"  @close="modifyDialogClose()">
      <div class="dialog-bag">
        <!--修改用户信息填写表单-->
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
        <el-form-item label="分配角色：" :label-width="formLabelWidth" >
          <el-tag
            :key="roletag" v-for="roletag in roleModifyNames" closable :disable-transitions="false" @close="roleModifyClose(roletag)">
            {{roletag}}
          </el-tag>
          <el-button type="primary" @click="roleModifyAdd()" size="mini">添加<i class="el-icon-plus el-icon--right"></i></el-button>
        </el-form-item>
        <el-form-item label="分配职位：" :label-width="formLabelWidth" >
          <el-tag
            :key="jobtag" v-for="jobtag in jobModifyName" closable :disable-transitions="false" @close="jobModifyClose(jobtag)">
            {{jobtag}}
          </el-tag>
          <el-button type="primary"  @click="jobModifyAdd()" size="mini">添加<i class="el-icon-plus el-icon--right"></i></el-button>
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
        <!--修改用户详情---分配角色-->
        <el-dialog
          width="50%"
          title="分配角色"
          :visible.sync="addModifyRoleDialog"
          append-to-body>
          <div class="dialog-bag">
            <el-table
              :data="roleModifyListData"
              height="500"
              border
              @select-all="roleModifyselectAll"
              @select="roleModifySelectionChange"
              ref="multiplerModifyRoleTable"
              style="width: 100%">
              <el-table-column
                type="selection"
                :selectable="checkboxModifyInit"
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
              @size-change="roleModifySizeChange"
              @current-change="roleModifyCurrentChange"
              :current-page.sync="roleModifycurrentPage"
              :page-sizes="[10, 15, 20]"
              :page-size="roleModifypageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total=roleModifyTotal>
            </el-pagination>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button @click="addModifyRoleDialog = false">取 消</el-button>
            <el-button type="primary" @click="roleModifySubmit()">确 定</el-button>
          </div>
        </el-dialog>
        <!--修改用户详情---分配职位-->
        <el-dialog
          width="50%"
          title="分配职位"
          :visible.sync="addModifyJobDialog"
          append-to-body>
          <div class="dialog-bag">
            <el-table
              :data="jobModifyListData"
              height="500"
              border
              ref="multiplerJobModifyTable"
              highlight-current-row
              @current-change="jobModifySelect"
              style="width: 100%">
              <el-table-column
                prop="jobName"
                label="职位名称"
                width="130">
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
              @size-change="jobModifySizeChange"
              @current-change="jobModifyCurrentChange"
              :current-page.sync="jobModifycurrentPage"
              :page-sizes="[10, 15, 20]"
              :page-size="jobModifypageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total=jobModifyTotal>
            </el-pagination>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button @click="addModifyJobDialog = false">取 消</el-button>
            <el-button type="primary" @click="jobModifSubmit()">确 定</el-button>
          </div>
        </el-dialog>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="ModifyDialogUser = false">取 消</el-button>
        <el-button type="primary" @click="ModifyUserInfo('ModifyUserForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import ObVue from '../../../components/common/ob_vue'
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
        addModifyRoleDialog: false, // 修改用户详情---分配角色
        addModifyJobDialog: false, // 修改用户详情--分配职位
        clickClose: false, // 点击modal时 不关闭对话框
        jobcurrentPage: 1,
        jobpageSize: 10,
        jobTotal: 0, // 总职位数
        currentPage: 1,
        pageSize: 10,
        peopleTotal: 0, // 总人员数
        rolecurrentPage: 1,
        rolepageSize: 10,
        roleTotal: 0, // 角色总数量
        roleModifycurrentPage: 1, // 修改用户详情--角色页码
        roleModifypageSize: 10, // 修改用户详情--角色页数
        roleModifyTotal: 0, // 修改用户详情--总角色数
        jobModifycurrentPage: 1, // 修改用户详情---职位页码
        jobModifypageSize: 10, // 修改用户详情---职位页数
        jobModifyTotal: 0, // 修改用户详情---总职位数
        queryUserName: '', // 按人员名称查询
        queryAccountName: '', // 按人员账号查询
        surePwd: '',
        dialogImageUrl: '',
        tagroleId: '',
        roleNames: [], // 分配的角色名称数组
        jobName: [], // 分配的职位名称
        selectAmount: '',
        roleModifyNames: [], // 修改人员信息分配的角色数组
        jobModifyName: [], // 修改用户详情 分配的职位数组
        userId: '', // 修改用户详情 传给后台的uerid
        NewBuiltForm: {
          accountName: '',
          accountPwd: '',
          phoneNumber: '',
          nickName: '',
          userName: '',
          userSex: 'MAN',
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
          mailbox: '',
          jobId: '', // 分配的职位id
          roleIds: [] // 分配的角色数组
        },
        roleSelectAmount: [], // 勾选的角色
        roleListTemp: [], // 新建人员信息----勾选的角色数据缓存
        roleListData: [], // 新建人员信息---角色列表数据
        jobListData: [], // 新建人员信息---职位列表数据
        roleModifySelectAmount: [], // 修改用户详情----勾选的角色
        roleModifyListTemp: [], // 修改用户详情----勾选的角色数据缓存
        jobModifyListData: [], // 修改用户详情---职位列表数据
        roleModifyListData: [], // 修改用户详情---角色列表数据
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
            {required: true, message: '手机号不能为空', trigger: 'change'},
            {validator: checkPhone, trigger: 'blur'}
          ],
          roleIds: [
            {required: true, message: '至少分配一个角色', trigger: 'change'}
          ],
          jobId: [
            {required: true, message: '至少分配一个职位', trigger: 'change'}
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
              if (this.NewBuiltForm.roleIds.length === 0) {
                this.$message({
                  message: '请至少分配一个角色！',
                  type: 'error'
                })
              } else if (this.NewBuiltForm.roleIds.jobId === '') {
                this.$message({
                  message: '请至少分配一个职位！',
                  type: 'error'
                })
              } else {
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
              }
            } else {
              console.log('error submit!!')
              return false
            }
          })
      },
      // 清空新增人员表单
      newDialogClose (NewBuiltForm) {
        this.$refs[NewBuiltForm].resetFields()
        this.roleNames = []
        this.jobName = []
        this.NewBuiltForm.jobId = ''
        this.NewBuiltForm.roleIds = []
        this.roleListTemp = []
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
      // 账号密码修改
      handleModify (index, row) {
        this.ModifyDialogVisible = true
        this.userId = row.userId
      },
      // 修改用户详情---查询已填写的角色信息
      queryModifyRole (row) {
        let params = {}
        let param = {}
        params.userId = row.userId
        param.params = params
        this.$store.dispatch('ajaxGet', {url: '/resourceUrl/v1/resource/user/role/edit',
          submitData: param,
          success: res => {
            if (res.status === 'OK') {
              for (let value of res.data) {
                this.roleModifyNames.push(value.roleName)
                this.ModifyUserForm.roleIds.push(value.roleId)
              }
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
              this.ModifyForm.userId = this.userId
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
                    this.$message.error(res.message)
                  }
                }})
            }
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      // 修改用户详情---删除角色
      roleModifyClose (tag) {
        let index = 0
        for (let i in this.roleModifyListTemp) {
          if (this.roleModifyListTemp[i].roleName === tag) {
            this.tagroleId = this.roleModifyListTemp[i].roleId
            index = i
            break
          }
        }
        this.roleModifyListTemp.splice(index, 1)
        this.ModifyUserForm.roleIds.splice(this.ModifyUserForm.roleIds.indexOf(this.tagroleId), 1)
        this.roleModifyNames.splice(this.roleModifyNames.indexOf(tag), 1)
      },
      // 修改用户详情---添加角色
      roleModifyAdd () {
        this.getModifyRoleList(this.roleModifycurrentPage, this.roleModifypageSize)
      },
      // 修改用户详情---获取角色列表
      getModifyRoleList (rolecurrentPage, rolepageSize) {
        this.addModifyRoleDialog = true
        let params = {}
        let param = {}
        params.currentPage = rolecurrentPage
        params.pageSize = rolepageSize
        param.params = params
        this.$store.dispatch('ajaxGet', {url: '/resourceUrl/v1/resource/role',
          submitData: param,
          success: res => {
            if (res.status === 'OK') {
              this.roleModifyListData = res.data.data
              for (let i = 0; i < this.roleModifyListData.length; i++) {
                if (this.roleModifyListTemp.length !== 0) {
                  for (let value of this.roleModifyListTemp) {
                    if (this.roleModifyListData[i].roleId === value.roleId) {
                      this.roleModifyListData[i].isSelect = true
                    }
                  }
                }
                if (this.roleModifyNames.length !== 0) {
                  for (let value of this.roleModifyNames) {
                    if (this.roleModifyListData[i].roleName === value) {
                      this.roleModifyListData[i].isSelect = true
                    }
                  }
                }
              }
              this.roleModifyTotal = res.data.total
            } else {
              this.$message({
                message: res.message,
                type: 'error'
              })
            }
          }
        })
      },
      // 修改用户详情--- 角色全选
      roleModifyselectAll (val) {
        this.roleModifySelectAmount = val
      },
      // 修改用户详情--- checkbox是否可勾选
      checkboxModifyInit (row, index) {
        if (row.isSelect) {
          return false
        } else {
          return true
        }
      },
      // 修改用户详情---添加角色  每页显示多少数据
      roleModifySizeChange (val) {
        this.roleModifypageSize = val
        this.getModifyRoleList(this.roleModifycurrentPage, this.roleModifypageSize)
        console.log(`每页 ${val} 条`)
      },
      // 修改用户详情---添加角色 当前第几页
      roleModifyCurrentChange (val) {
        this.roleModifycurrentPage = val
        this.getModifyRoleList(this.roleModifycurrentPage, this.roleModifypageSize)
        console.log(`当前页: ${val}`)
      },
      // 修改用户详情--- 角色勾选
      roleModifySelectionChange (val) {
        this.roleModifySelectAmount = val
      },
      // 修改用户详情---确认勾选的角色
      roleModifySubmit () {
        this.roleModifyListTemp = []
        console.log('添加角色后6666' + JSON.stringify(this.roleModifySelectAmount))
        for (let value of this.roleModifySelectAmount) {
          this.roleModifyListTemp.push(value)
        }
        console.log('添加角色后' + JSON.stringify(this.roleModifyListTemp))
        if (this.roleModifySelectAmount.length === 0) {
          this.$message({
            message: '请至少选择一个角色！',
            type: 'info'
          })
        } else {
          for (let i = 0; i < this.roleModifyListData.length; i++) {
            for (let value of this.roleModifyListTemp) {
              if (this.roleModifyListData[i].roleId === value.roleId) {
                this.ModifyUserForm.roleIds.push(value.roleId)
                this.roleModifyNames.push(value.roleName)
                this.roleModifyListData[i].isSelect = true
              }
            }
          }
          this.addModifyRoleDialog = false
          this.roleModifySelectAmount = []
            this.$refs.multiplerModifyRoleTable.clearSelection() // 清空之前的选中状态
        }
      },
      // 修改用户详情--- 添加职位
      jobModifyAdd () {
        this.getModifyJobList(this.jobModifycurrentPage, this.jobModifypageSize)
      },
      // 修改用户详情---确认添加职位
      jobModifSubmit () {
        this.addModifyJobDialog = false
        this.$refs.multiplerJobModifyTable.clearSelection() // 清空之前的选中状态
      },
      // 修改用户详情--- 获取职位列表数据
      getModifyJobList (currentPage, pageSize) {
        if (this.jobModifyName.length === 1) {
          this.$message({
            message: '当前已添加一个职位，不能再次添加！',
            type: 'error'
          })
        } else {
          this.addModifyJobDialog = true
          let params = {}
          let param = {}
          params.currentPage = currentPage
          params.pageSize = pageSize
          param.params = params
          this.$store.dispatch('ajaxGet', {url: '/supplierUrl/v1/supplier/job',
            submitData: param,
            success: res => {
              if (res.status === 'OK') {
                this.jobModifyListData = res.data.data
                this.jobModifyTotal = res.data.total
                this.ModifyUserForm.jobId = res.data.data.jobId
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
      // 修改用户详情---选择的职位
      jobModifySelect (val) {
        this.ModifyUserForm.jobId = val.jobId
        this.jobModifyName.push(val.jobName)
      },
      // 修改用户详情---删除职位
      jobModifyClose (tag) {
        this.ModifyUserForm.jobId = ''
        this.jobModifyName.splice(this.jobModifyName.indexOf(tag), 1)
      },
      // 修改用户详情---每页多少条数据
      jobModifySizeChange (val) {
        this.jobModifypageSize = val
        this.getModifyJobList(this.jobModifycurrentPage, this.jobModifypageSize)
      },
      // 修改用户详情---职位页数
      jobModifyCurrentChange (val) {
        this.jobModifycurrentPage = val
        this.getModifyJobList(this.jobModifycurrentPage, this.jobModifypageSize)
      },
      // 修改用户详情
      detailInfo (index, row) {
        this.userId = row.userId
        this.queryModifyRole(row)
        this.ModifyDialogUser = true
        // console.log(row.userSex)
        let params = {}
        let param = {}
        params.userId = row.userId
        param.params = params
        this.$store.dispatch('ajaxGet', {url: '/LoginUrl/v1/user/info/edit',
          submitData: param,
          success: res => {
            if (res.status === 'OK') {
                this.ModifyUserForm.userSex = res.data.userSex
                this.ModifyUserForm.nickName = res.data.nickName
                this.ModifyUserForm.userName = res.data.userName
                this.ModifyUserForm.userCardNo = res.data.userCardNo
                this.ModifyUserForm.phoneNumber = res.data.phoneNumber
                this.ModifyUserForm.mailbox = res.data.mailbox
               this.ModifyUserForm.jobId = (res.data.jobId)
                this.jobModifyName.push(res.data.jobName)
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
      // 确认修改用户详情
      ModifyUserInfo (ModifyUserForm) {
        this.$refs[ModifyUserForm].validate((valid) => {
          if (valid) {
              this.ModifyUserForm.userId = this.userId
              this.$store.dispatch('ajaxPatch', {url: '/supplierUrl/v1/supplier/user',
                submitData: this.ModifyUserForm,
                success: res => {
                  if (res.status === 'OK') {
                    this.$message({
                      message: '修改成功！',
                      type: 'success'
                    })
                    this.ModifyDialogUser = false
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
      //  修改用户详情---清空角色和职位数组
      modifyDialogClose () {
        this.ModifyUserForm.jobId = ''
        this.ModifyUserForm.roleIds = []
        this.roleModifyListTemp = []
        this.roleModifyNames = []
        this.jobModifyName = []
      },
      // 添加角色
      roleAdd () {
        console.log('添加角色前' + JSON.stringify(this.roleListTemp))
        this.getRoleList(this.rolecurrentPage, this.rolepageSize)
      },
      roleselectAll: function (val) {
        this.roleSelectAmount = val
        console.log(this.roleSelectAmount)
      },
      // 角色选择
      roleSelectionChange (val) {
        console.log(val)
        this.roleSelectAmount = val
      },
      // CheckBox 是否可以勾选
      checkboxInit (row, index) {
        if (row.isSelect) {
          return false
        } else {
          return true
        }
      },
      // 添加角色  每页显示多少数据
      roleSizeChange (val) {
        this.rolepageSize = val
        this.getRoleList(this.rolecurrentPage, this.rolepageSize)
        console.log(`每页 ${val} 条`)
      },
      // 添加角色 当前第几页
      roleCurrentChange (val) {
        this.rolecurrentPage = val
        this.getRoleList(this.rolecurrentPage, this.rolepageSize)
        console.log(`当前页: ${val}`)
      },
      // 确认勾选的角色
      roleSubmit () {
        console.log('添加角色后' + JSON.stringify(this.roleListTemp))
        if (this.roleSelectAmount.length === 0) {
          this.$message({
            message: '请至少选择一个角色！',
            type: 'info'
          })
        } else {
          this.NewBuiltForm.roleIds = []
          this.roleNames = []
          for (let value of this.roleSelectAmount) {
            this.roleListTemp.push(value)
          }
          for (let i = 0; i < this.roleListData.length; i++) {
              for (let value of this.roleListTemp) {
                if (this.roleListData[i].roleId === value.roleId) {
                  this.NewBuiltForm.roleIds.push(value.roleId)
                  this.roleNames.push(value.roleName)
                  this.roleListData[i].isSelect = true
                }
              }
          }
          this.addRoleDialog = false
          this.$refs.multiplerRoleTable.clearSelection() // 清空之前的选中状态
          this.roleSelectAmount = []
        }
      },
      // 删除角色
      roleClose (tag) {
        let index = 0
        for (let i in this.roleListTemp) {
          if (this.roleListTemp[i].roleName === tag) {
            this.tagroleId = this.roleListTemp[i].roleId
            index = i
            break
          }
        }
        this.roleListTemp.splice(index, 1)
        this.NewBuiltForm.roleIds.splice(this.NewBuiltForm.roleIds.indexOf(this.tagroleId), 1)
        this.roleNames.splice(this.roleNames.indexOf(tag), 1)
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
      // 每页多少条数据
      handleSizeChange (val) {
        this.pageSize = val
        this.getListData(this.currentPage, this.pageSize)
        console.log(`每页 ${val} 条`)
      },
      // 当前第几页
      handleCurrentChange (val) {
        this.currentPage = val
        this.getListData(this.currentPage, this.pageSize)
        console.log(`当前页: ${val}`)
      },
      jobSizeChange (val) {
        this.jobpageSize = val
        this.getJobList(this.jobcurrentPage, this.jobpageSize)
        console.log(`每页 ${val} 条`)
      },
      jobCurrentChange (val) {
        this.getJobList(this.jobcurrentPage, this.jobpageSize)
        this.jobcurrentPage = val
        console.log(`当前页: ${val}`)
      },
      // 获取角色列表数据
      getRoleList (rolecurrentPage, rolepageSize) {
        this.addRoleDialog = true
        let params = {}
        let param = {}
        params.currentPage = rolecurrentPage
        params.pageSize = rolepageSize
        param.params = params
          this.$store.dispatch('ajaxGet', {url: '/resourceUrl/v1/resource/role',
            submitData: param,
            success: res => {
              if (res.status === 'OK') {
                this.roleListData = res.data.data
                for (let i = 0; i < this.roleListData.length; i++) {
                  if (this.roleListTemp.length !== 0) {
                    for (let value of this.roleListTemp) {
                      if (this.roleListData[i].roleId === value.roleId) {
                        this.roleListData[i].isSelect = true
                      }
                    }
                  }
                }
                this.roleTotal = res.data.total
              } else {
                this.$message({
                  message: res.message,
                  type: 'error'
                })
              }
            }
          })
      },
      // 添加职位
      jobAdd () {
        this.getJobList(this.jobcurrentPage, this.jobpageSize)
      },
      // 获取职位列表数据
      getJobList (jobcurrentPage, jobpageSize) {
        if (this.jobName.length === 1) {
          this.$message({
            message: '当前已添加一个职位，不能再次添加！',
            type: 'error'
          })
        } else {
          this.addJobDialog = true
          let params = {}
          let param = {}
          params.currentPage = jobcurrentPage
          params.pageSize = jobpageSize
          param.params = params
          this.$store.dispatch('ajaxGet', {url: '/supplierUrl/v1/supplier/job',
            submitData: param,
            success: res => {
              if (res.status === 'OK') {
                this.jobListData = res.data.data
                this.jobTotal = res.data.total
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
      // 条件查询
      userQuery () {
        let params = {}
        let param = {}
        params.currentPage = this.currentPage
        params.pageSize = this.pageSize
        params.accountName = this.queryAccountName
        params.userName = this.queryUserName
        param.params = params
        this.$store.dispatch('ajaxGet', {url: '/supplierUrl/v1/supplier/user',
          submitData: param,
          success: res => {
            if (res.status === 'OK') {
              this.peopleTotal = res.data.total
              this.tableData = res.data.data
              for (let value of this.tableData) {
                if (value.userSex === 'MAN') {
                  value.userSex = '男'
                } else if (value.userSex === 'WOMAN') {
                  value.userSex = '女'
                }
              }
            } else {
              this.$message({
                message: res.message,
                type: 'error'
              })
            }
          }
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
              for (let value of this.tableData) {
                if (value.userSex === 'MAN') {
                  value.userSex = '男'
                } else if (value.userSex === 'WOMAN') {
                  value.userSex = '女'
                }
              }
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
