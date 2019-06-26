<!--author:李茂源-->
<!--time：2019-6-14-->
<!--description：组织机构管理界面-->
<template>
  <div style="width: 100%">
  <el-row class="header-bg" type="flex" algin="middle" >
    <el-col >
      <el-button type="primary" @click="NewDialogVisible = true" >新增机构<i class="el-icon-edit el-icon--right"></i></el-button>
    </el-col>
  </el-row >
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
            prop="departName"
            label="部门名称">
          </el-table-column>
          <el-table-column
            prop="departCode"
            label="部门编码">
          </el-table-column>
          <el-table-column
            prop="departIntroduce"
            label="部门介绍">
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
              @click="departDelete(scope.$index, scope.row)">删除<i class="el-icon-delete el-icon--right"></i></el-button>
              <el-button
                size="mini"
                type="info"
                @click="departModify(scope.$index, scope.row)">修改 / 查看<i class="el-icon-edit el-icon--right"></i></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <!--新建机构-->
    <el-dialog title="选择父级部门" :visible.sync="NewDialogVisible"  width="30%"  top="20vh">
      <el-dialog
        width="30%"
        title="新建机构"
        :visible.sync="innerVisible"
        :close-on-click-modal="clickClose"
        append-to-body @close="innerDialogClose('NewBuiltForm')" >
        <el-form :model="NewBuiltForm" :rules="rules" ref="NewBuiltForm">
          <el-form-item label="父级部门名称：" :label-width="formLabelWidth" v-if="isShow">
            <span>{{departName}}</span>
          </el-form-item>
          <el-form-item label="部门名称：" :label-width="formLabelWidth" prop="departName">
            <el-input v-model="NewBuiltForm.departName" autocomplete="off" maxlength="50" show-word-limit></el-input>
          </el-form-item>
          <el-form-item label="部门编码：" :label-width="formLabelWidth" prop="departCode">
            <el-input v-model="NewBuiltForm.departCode" autocomplete="off" maxlength="20" show-word-limit></el-input>
          </el-form-item>
          <el-form-item label="部门介绍：" :label-width="formLabelWidth" prop="departIntroduce">
            <el-input type="textarea" v-model="NewBuiltForm.departIntroduce" autocomplete="off" :autosize="{ minRows: 3, maxRows:14}"
                      maxlength="50" show-word-limit>
            </el-input>
          </el-form-item>
          <el-form-item label="部门备注：" :label-width="formLabelWidth" prop="departRemark">
            <el-input v-model="NewBuiltForm.departRemark " autocomplete="off" maxlength="50" show-word-limit></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="innerVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitForm('NewBuiltForm')">确 定</el-button>
        </div>
      </el-dialog>
        <el-tree :data="tableDatas" :props="defaultProps" @node-click="handleNodeClick" ></el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="NewDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="chooseDepart()">确 定</el-button>
      </div>
    </el-dialog>
    <!--修改机构-->
    <el-dialog
      title="修改机构"
      :visible.sync="dialogModify"
      width="30%"
      :close-on-click-modal="clickClose">
      <el-form :model="ModifyBuiltForm" :rules="rules" ref="ModifyBuiltForm">
        <el-form-item label="部门代码：" :label-width="formLabelWidth">
         <span>{{ departCode}}</span>
        </el-form-item>
        <el-form-item label="部门名称：" :label-width="formLabelWidth" prop="departName">
          <el-input v-model="ModifyBuiltForm.departName" autocomplete="off" maxlength="10" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="部门介绍：" :label-width="formLabelWidth" prop="departIntroduce">
          <el-input type="textarea" v-model="ModifyBuiltForm.departIntroduce " autocomplete="off" :autosize="{ minRows: 3, maxRows:14}"
                    maxlength="50" show-word-limit>
          </el-input>
        </el-form-item>
        <el-form-item label="部门备注：" :label-width="formLabelWidth" prop="departRemark">
          <el-input v-model="ModifyBuiltForm.departRemark " autocomplete="off" maxlength="10" show-word-limit></el-input>
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
  export default {
    name: 'institution',
    data: function () {
      return {
        NewDialogVisible: false,
        innerVisible: false,
        dialogModify: false,
        clickClose: false,
        lockScroll: false,
        parentId: '',
        pathTxt: '',
        finalpathTxt: '',
        departName: '',
        departId: '',
        departCode: '',
        isShow: false,
        NewBuiltForm: {
          departName: '',
          departIntroduce: '',
          departRemark: '',
          departCode: ''
        },
        ModifyBuiltForm: {
          departName: '',
          departIntroduce: '',
          departRemark: ''
        },
        selectAmount: [],
        formLabelWidth: '120px',
        // 校验规则
        rules: {
          departName: [
            {required: true, message: '请输入部门名称', trigger: 'change'}
          ],
          departCode: [
            {required: true, message: '请输入部门编码', trigger: 'change'}
          ]
        },
        tableDatas: [],
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
      // 删除组织机构
      departDelete (index, row) {
        console.log(row)
        let params = {}
        let param = {}
        params.departId = row.departId
        param.params = params
        if (row.children.length === 0) {
          this.$confirm('确认删除?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$store.dispatch('ajaxDelete', {url: '/supplierUrl/v1/supplier/department',
              submitData: param,
              success: res => {
                if (res.status === 'OK') {
                  this.$message({
                    message: '删除成功！',
                    type: 'success'
                  })
                  // 刷新列表
                  this.getListData()
                } else {
                  this.$message.error('删除失败')
                }
              }})
          }).catch(() => {
          })
        } else {
          this.$message({
            showClose: true,
            message: '该部门下有子部门不可直接删除！',
            type: 'warning'
          })
        }
      },
      // 修改组织机构
      departModify (index, row) {
        this.dialogModify = true
        this.departId = row.departId
        this.departCode = row.departCode
        this.ModifyBuiltForm.departName = row.departName
        this.ModifyBuiltForm.departIntroduce = row.departIntroduce
        this.ModifyBuiltForm.departRemark = row.departRemark
      },
      // 确认修改机构
      ModifyForm (ModifyBuiltForm) {
        this.$refs[ModifyBuiltForm].validate((valid) => {
          if (valid) {
            this.ModifyBuiltForm.departId = this.departId
            console.log(JSON.stringify(this.ModifyBuiltForm))
            this.$store.dispatch('ajaxPatch', {url: '/supplierUrl/v1/supplier/department',
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
                  this.getListData()
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
      chooseDepart () {
        this.innerVisible = true
      },
      // 点击tree事件
      handleNodeClick (data) {
        if (data.pathTxt === null) {
          this.finalpathTxt = data.departName
        }
        this.finalpathTxt = ',' + data.departName
        this.parentId = data.parentId
        this.departName = data.departName
        this.departId = data.departId
        this.isShow = true
      },

      // 确认新增机构
      submitForm (NewBuiltForm) {
        this.$refs[NewBuiltForm].validate((valid) => {
            if (valid) {
              this.NewDialogVisible = false
              this.NewBuiltForm.parentId = this.departId
              this.NewBuiltForm.pathTxt = this.finalpathTxt
              console.log(JSON.stringify(this.NewBuiltForm))
              this.$store.dispatch('ajaxPost', {url: '/supplierUrl/v1/supplier/department',
                submitData: this.NewBuiltForm,
                success: res => {
                  console.log(res.status)
                  if (res.status === 'OK') {
                    this.$message({
                      message: '添加成功！',
                      type: 'success'
                    })
                    this.innerVisible = false
                    this.getListData()
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
      // 清空新建组织机构数据
      innerDialogClose (NewBuiltForm) {
        this.$refs[NewBuiltForm].resetFields()
        this.departName = ''
        this.departId = ''
        this.isShow = false
      },
      selectAll: function (val) {
        this.selectAmount = val
      },
      handleSelectionChange (val) {
        this.selectAmount = val
      },
      // 请求列表数据
      getListData: function () {
        this.$store.dispatch('ajaxGet', {url: '/supplierUrl/v1/supplier/department',
          success: res => {
            if (res.status === 'OK') {
              this.tableDatas = res.data
              console.log(this.tableDatas)
            } else if (res.status !== 'OK') {
              this.$message({
                message: res.message,
                type: 'success'
              })
            }
          }
        })
  }
  },
    created () {
      this.getListData()
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
.el-table_1_column_2 {
  .IsShow {
    display: none;
  }
}
.el-dialog__body {
  height: 150px;
}
.el-tree {
  overflow-y: scroll;
  height: 200px;
  border-top: 1px solid #EBEEF5;
  border-left: 1px solid #EBEEF5;
  border-bottom: 1px solid #EBEEF5;
}
.table-style {
  margin-top: 20px;
}
</style>
