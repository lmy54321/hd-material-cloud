<!--author:李茂源-->
<!--time：2019-6-14-->
<!--description：组织机构管理界面-->
<template>
  <div style="width: 100%">
  <el-row type="flex">
    <el-col :span="7" style="margin-top: 15px;display: flex;align-items: center">
      <span style="width:85px">机构查询：</span>
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
      <el-input placeholder="请输入机构名称" v-model="input3">
      </el-input>
      <el-button type="primary" icon="el-icon-search"></el-button>
    </el-col>
  </el-row >
  <el-row class="header-bg" type="flex" algin="middle" >
    <el-col >
      <el-button type="primary" @click="NewDialogVisible = true" >新增机构<i class="el-icon-edit el-icon--right"></i></el-button>
      <el-button type="danger" v-on:click="Delete(selectAmount)">批量删除<i class="el-icon-delete el-icon--right"></i></el-button>
    </el-col>
  </el-row >
    <el-row class="table-style">
      <el-col>
        <el-table
          :data="tableData"
          height="400"
          border
          @select-all="selectAll"
          @selection-change="handleSelectionChange"
          style="width: 100%">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            prop="date"
            label="创建时间">
          </el-table-column>
          <el-table-column
            prop="address"
            label="创建者">
          </el-table-column>
          <el-table-column
            prop="date"
            label="部门名称">
          </el-table-column>
          <el-table-column
            prop="address"
            label="部门状态">
          </el-table-column>
          <el-table-column
            prop="address"
            label="部门介绍">
          </el-table-column>
          <el-table-column
            prop="address"
            label="操作">
            <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除<i class="el-icon-delete el-icon--right"></i></el-button>
              <el-button
                size="mini"
                type="info"
                @click="handleDelete(scope.$index, scope.row)">修改<i class="el-icon-edit el-icon--right"></i></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-dialog title="选择父级部门" :visible.sync="NewDialogVisible"  width="30%">
      <el-dialog
        width="30%"
        title="新建机构"
        :visible.sync="innerVisible"
        append-to-body>
        <el-form :model="NewBuiltForm" :rules="rules" ref="NewBuiltForm">
          <el-form-item label="部门名称" :label-width="formLabelWidth" prop="depart_name">
            <el-input v-model="NewBuiltForm.depart_name " autocomplete="off" maxlength="10" show-word-limit></el-input>
          </el-form-item>
          <el-form-item label="部门状态" :label-width="formLabelWidth" prop="depart_status" >
            <el-select v-model="NewBuiltForm.depart_status" placeholder="请选择部门状态">
              <el-option label="启用" value="shanghai"></el-option>
              <el-option label="停用" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="部门编码" :label-width="formLabelWidth" prop="depart_code">
            <el-input v-model="NewBuiltForm.depart_code" autocomplete="off" maxlength="10" show-word-limit></el-input>
          </el-form-item>
          <el-form-item label="部门介绍" :label-width="formLabelWidth" prop="depart_introduce">
            <el-input type="textarea" v-model="NewBuiltForm.depart_introduce " autocomplete="off" :autosize="{ minRows: 3, maxRows:14}"
                      maxlength="50" show-word-limit>
            </el-input>
          </el-form-item>
          <el-form-item label="部门备注" :label-width="formLabelWidth" prop="depart_remark">
            <el-input v-model="NewBuiltForm.depart_remark " autocomplete="off" maxlength="10" show-word-limit></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="innerVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitForm('NewBuiltForm')">确 定</el-button>
        </div>
      </el-dialog>
      <el-tree
        :props="props"
        :load="loadNode"
        lazy
        show-checkbox
        @check-change="handleCheckChange">
      </el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="NewDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="chooseDepart()">确 定</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
  import ObVue from '../../../components/common/ob_vue'
  export default {
    name: 'institution',
    data: function () {
      return {
        NewDialogVisible: false,
        innerVisible: false,
        NewBuiltForm: {
          depart_name: '',
          depart_status: '',
          depart_code: '',
          depart_introduce: '',
          depart_remark: ''
        },
        selectAmount: [],
        formLabelWidth: '120px',
        // 校验规则
        rules: {
          depart_name: [
            {required: true, message: '请输入部门名称', trigger: 'change'}
          ],
          depart_status: [
            {required: true, message: '请选择部门状态', trigger: 'change'}
          ],
          depart_code: [
            {required: true, message: '请输入部门编码', trigger: 'change'}
          ],
          depart_introduce: [
            {required: true, message: '请输入部门介绍', trigger: 'change'}
          ],
          depart_remark: [
            {required: true, message: '请输入部门备注', trigger: 'change'}
          ]
        },
        tableData: [{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
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
        props: {
          label: 'name',
          children: 'zones'
        },
        count: 1
      }
    },
    methods: {
      chooseDepart () {
          this.innerVisible = true
      },
      handleCheckChange (data, checked, indeterminate) {
        console.log(data, checked, indeterminate)
      },
      handleNodeClick (data) {
        console.log(data)
      },
      loadNode (node, resolve) {
        if (node.level === 0) {
          return resolve([{ name: 'region1' }, { name: 'region2' }])
        }
        if (node.level > 3) return resolve([])

        var hasChild
        if (node.data.name === 'region1') {
          hasChild = true
        } else if (node.data.name === 'region2') {
          hasChild = false
        } else {
          hasChild = Math.random() > 0.5
        }

        setTimeout(() => {
          var data
          if (hasChild) {
            data = [{
              name: 'zone' + this.count++
            }, {
              name: 'zone' + this.count++
            }]
          } else {
            data = []
          }

          resolve(data)
        }, 500)
      },
      submitForm (NewBuiltForm) {
        this.$refs[NewBuiltForm].validate((valid) => {
            if (valid) {
              this.NewDialogVisible = false
              this.$store.dispatch('ajax', {url: '/supplierUrl/v1/supplier/info',
                submitData: this.ruleForm,
                success: function (res) {
                  if (res.status === 'OK') {
                    this.$message({
                      message: '删除成功！',
                      type: 'success'
                    })
                  } else {
                    ObVue.$message.error('删除失败')
                  }
                }})
            } else {
              console.log('error submit!!')
              return false
            }
        })
      },
      selectAll: function (val) {
        this.selectAmount = val
      },
      handleSelectionChange (val) {
        this.selectAmount = val
      },
      Delete: function (amount) {
        if (amount.length === 0) {
          ObVue.$message.error('请至少选择一条数据')
        } else {
          console.log(amount)
        }
      }
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
</style>
