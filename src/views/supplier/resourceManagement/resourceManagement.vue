<template>
  <div style="width: 100%">
    <!--条件查询-->
    <el-row type="flex">
      <el-col :span="3" style="margin-top: 15px">
        <el-input placeholder="请输入资源编码" v-model="queryResourceCode">
        </el-input>
      </el-col>
      <el-col :span="3" style="margin-top: 15px;margin-left: 5px">
        <el-input placeholder="请输入资源名称" v-model="queryResourceName">
        </el-input>
      </el-col>
      <el-col :span="3" style="margin-top: 15px;margin-left: 5px">
        <el-input placeholder="请输入资源标题" v-model="queryResourceTitle">
        </el-input>
      </el-col>
      <el-col :span="3" style="margin-top: 15px;margin-left: 5px">
        <template>
          <el-select v-model="queryResourceTypeValue" placeholder="资源类型">
            <el-option
              v-for="item in queryResourceTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </template>
      </el-col>
      <el-col :span="4" style="margin-top: 15px;margin-left: 5px">
        <template>
          <el-select v-model="queryResourceForValue" placeholder="资源归属">
            <el-option
              v-for="item in queryResourceForOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </template>
        <el-button type="primary" icon="el-icon-search" @click="queryResource()" style="margin-left: 5px"></el-button>
      </el-col>
    </el-row >
    <el-row class="header-bg" type="flex" algin="middle" >
      <el-col >
        <el-button type="primary" @click="NewDialogVisible = true" >新增资源<i class="el-icon-edit el-icon--right"></i></el-button>
      </el-col>
    </el-row >
    <!--资源列表-->
    <el-row class="table-style">
      <el-col>
        <el-table
          :data="tableDatas"
          height="600"
          border
          highlight-current-row
          @select-all="selectAll"
          style="width: 100%">
          <el-table-column
            prop="resourceName"
            label="资源名称"
             >
          </el-table-column>
          <el-table-column
            prop="resourceRouteName"
            label="资源路由名称">
          </el-table-column>
          <el-table-column
            prop="resourceCode"
            label="资源编码">
          </el-table-column>
          <el-table-column
            prop="resourceTitle"
            label="资源标题">
          </el-table-column>
          <el-table-column
            prop="resourceUrl"
            label="资源地址">
          </el-table-column>
          <el-table-column
            prop="resourceType"
            label="资源类型"
            width="100">
          </el-table-column>
          <el-table-column
            prop="resourceOrder"
            label="序列"
            width="50">
          </el-table-column>
          <el-table-column
            prop="resourceFor"
            label="资源归属"
            width="100">
          </el-table-column>
          <el-table-column
            prop="parentName"
            label="资源父节点">
          </el-table-column>
          <el-table-column
            label="操作"
            width="250">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="danger"
                @click="resourceDelete(scope.$index, scope.row)">删除<i class="el-icon-delete el-icon--right"></i></el-button>
              <el-button
                size="mini"
                type="info"
                @click="resourceModify(scope.$index, scope.row)">修改 / 查看<i class="el-icon-edit el-icon--right"></i></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <!--分页-->
    <el-row type="flex" justify="center">
      <el-col :span="8">
        <el-pagination
          @size-change="resourceSizeChange"
          @current-change="resourceCurrentChange"
          :current-page.sync="resourceCurrentPage"
          :page-sizes="[10, 15, 20]"
          :page-size="resourcePageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total=resourceTotal>
        </el-pagination>
      </el-col>
    </el-row>
    <!--新增资源弹窗-->
    <el-dialog title="新增资源" :visible.sync="NewDialogVisible"  width="40%"
               @close="newDialogClose('NewBuiltForm')" :close-on-click-modal="clickClose" top="7vh">
      <div class="dialog-bag">
        <!--分配父节点id-->
        <el-dialog
          width="40%"
          title="分配父节点"
          :visible.sync="parentIdDialog"
          append-to-body>
          <el-tree :data="treeDatas" :props="defaultProps" @node-click="handleNodeClick" ></el-tree>
          <div slot="footer" class="dialog-footer">
            <el-button @click="parentIdDialog = false">取 消</el-button>
            <el-button type="primary" @click="parentIdSubmit()">确 定</el-button>
          </div>
        </el-dialog>
        <!--新建资源表单-->
      <el-form :model="NewBuiltForm" :rules="rules" ref="NewBuiltForm">
        <el-form-item label="资源名称：" :label-width="formLabelWidth" prop="resourceName">
          <el-input v-model="NewBuiltForm.resourceName " autocomplete="off" maxlength="20" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="父结点：" :label-width="formLabelWidth" prop="parentId">
          <el-tag
            :key="resourceNametag" v-for="resourceNametag in resourceName" closable :disable-transitions="false" @close="resourceTitleClose(resourceNametag)">
            {{resourceNametag}}
          </el-tag>
          <el-button type="primary" @click="parentIdAdd()" size="mini">选择<i class="el-icon-plus el-icon--right"></i></el-button>
        </el-form-item>
        <el-form-item label="资源编码：" :label-width="formLabelWidth" prop="resourceCode">
          <el-input v-model="NewBuiltForm.resourceCode" placeholder="由数字,字母,_ ,-构成"  autocomplete="off" maxlength="20"  show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="资源路由名称：" :label-width="formLabelWidth" prop="resourceRouteName">
          <el-input v-model="NewBuiltForm.resourceRouteName" autocomplete="off" maxlength="50" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="资源标题：" :label-width="formLabelWidth" prop="resourceTitle">
          <el-input v-model="NewBuiltForm.resourceTitle" autocomplete="off" maxlength="30" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="资源地址：" :label-width="formLabelWidth" prop="resourceUrl">
          <el-input v-model="NewBuiltForm.resourceUrl" autocomplete="off" maxlength="100" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="资源排序：" :label-width="formLabelWidth" prop="resourceOrder">
          <el-input v-model="NewBuiltForm.resourceOrder" autocomplete="off" placeholder="由数字构成"  maxlength="10" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="图标类名" :label-width="formLabelWidth" prop="resourceIcoCls">
          <el-input v-model="NewBuiltForm.resourceIcoCls" autocomplete="off" maxlength="100" show-word-limit></el-input>
        </el-form-item>
        <el-row type="flex">
          <el-col :span="12">
            <el-form-item label="资源类型：" :label-width="formLabelWidth" prop="resourceType">
              <template>
                <el-select v-model="NewBuiltForm.resourceType" placeholder="资源类型" :disabled='resourceTypeDisabled'>
                  <el-option
                    v-for="item in resourceTypeOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </template>
            </el-form-item>
          </el-col>
          <el-col  :span="12">
            <el-form-item label="资源归属：" :label-width="formLabelWidth" prop="resourceFor">
              <template>
                <el-select v-model="NewBuiltForm.resourceFor" placeholder="资源归属" :disabled="resourceForDisabled">
                  <el-option
                    v-for="item in resourceForOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </template>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="资源备注：" :label-width="formLabelWidth" prop="remarkTxt">
          <el-input type="textarea" v-model="NewBuiltForm.remarkTxt" autocomplete="off" :autosize="{ minRows: 3, maxRows:14}"
                    maxlength="256" show-word-limit>
          </el-input>
        </el-form-item>
      </el-form>
      <el-row type="flex">
        <el-col :span="4">
          <span >上传资源的图标：</span>
        </el-col>
        <el-col :span="20">
          <div class="update-div">
            <el-upload
              ref="upload"
              action="https://jsonplaceholder.typicode.com/posts/"
              list-type="picture-card"
              :on-preview="newPictureCardPreview"
              :on-remove="newRemove"
              :before-upload="beforeNewUpload"
              :multiple="true"
              :auto-upload="false"
              :limit=10>
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="newVisible" size="tiny">
              <img width="100%" :src="newImageUrl" alt="">
            </el-dialog>
          </div>
        </el-col>
      </el-row>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="NewDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('NewBuiltForm')">确 定</el-button>
      </div>
    </el-dialog>
    <!--修改资源弹窗-->
    <el-dialog title="修改资源" :visible.sync="ModifyDialogVisible"  width="40%" :close-on-click-modal="clickClose"  @close="modifyDialogClose()">
      <div class="dialog-bag">
        <!--分配父节点id-->
        <el-dialog
          width="40%"
          title="分配父节点"
          :visible.sync="modifyParentIdDialog"
          append-to-body>
          <el-tree :data="modifyTreeDatas" :props="defaultProps" @node-click="modifyNodeClick" ></el-tree>
          <div slot="footer" class="dialog-footer">
            <el-button @click="modifyParentIdDialog = false">取 消</el-button>
            <el-button type="primary" @click="modifyParentIdSubmit()">确 定</el-button>
          </div>
        </el-dialog>
        <el-form :model="ModifyForm" :rules="rules" ref="ModifyForm">
          <el-form-item label="资源名称：" :label-width="formLabelWidth" prop="resourceName">
            <el-input v-model="ModifyForm.resourceName " autocomplete="off" maxlength="20" show-word-limit></el-input>
          </el-form-item>
          <el-form-item label="父结点：" :label-width="formLabelWidth" >
            <el-tag
              :key="resourceTitletag" v-for="resourceTitletag in modifyResourceParentNode" closable :disable-transitions="false" @close="modifyResourceTitleClose(resourceTitletag)">
              {{resourceTitletag}}
            </el-tag>
            <el-button type="primary" @click="modifyParentIdAdd()" size="mini" >选择<i class="el-icon-plus el-icon--right"></i></el-button>
          </el-form-item>
          <el-form-item label="资源编码：" :label-width="formLabelWidth" prop="resourceCode">
            <el-input v-model="ModifyForm.resourceCode" autocomplete="off" maxlength="20" disabled show-word-limit></el-input>
          </el-form-item>
          <el-form-item label="资源路由名称：" :label-width="formLabelWidth" prop="resourceRouteName">
            <el-input v-model="ModifyForm.resourceRouteName" autocomplete="off" maxlength="50" show-word-limit></el-input>
          </el-form-item>
          <el-form-item label="资源标题：" :label-width="formLabelWidth" prop="resourceTitle">
            <el-input v-model="ModifyForm.resourceTitle " autocomplete="off" maxlength="30" show-word-limit></el-input>
          </el-form-item>
          <el-form-item label="资源地址：" :label-width="formLabelWidth" prop="resourceUrl">
            <el-input v-model="ModifyForm.resourceUrl" autocomplete="off" maxlength="100" show-word-limit></el-input>
          </el-form-item>
          <el-form-item label="资源排序：" :label-width="formLabelWidth" prop="resourceOrder">
            <el-input v-model="ModifyForm.resourceOrder" autocomplete="off" placeholder="由数字构成"  maxlength="10" show-word-limit></el-input>
          </el-form-item>
          <el-row type="flex">
            <el-col :span="12">
              <el-form-item label="资源类型：" :label-width="formLabelWidth" prop="resourceType">
                <template>
                  <el-select v-model="ModifyForm.resourceType" placeholder="资源类型" >
                    <el-option
                      v-for="item in resourceTypeOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </template>
              </el-form-item>
            </el-col>
            <el-col  :span="12">
              <el-form-item label="资源归属：" :label-width="formLabelWidth" prop="resourceFor">
                <template>
                  <el-select v-model="ModifyForm.resourceFor" placeholder="资源归属" >
                    <el-option
                      v-for="item in resourceForOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </template>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="资源备注：" :label-width="formLabelWidth" prop="remarkTxt">
            <el-input type="textarea" v-model="ModifyForm.remarkTxt" autocomplete="off" :autosize="{ minRows: 3, maxRows:14}"
                      maxlength="256" show-word-limit>
            </el-input>
          </el-form-item>
          <el-form-item label="图标类名" :label-width="formLabelWidth" prop="resourceIcoCls">
            <el-input v-model="ModifyForm.resourceIcoCls" autocomplete="off" maxlength="100" show-word-limit></el-input>
          </el-form-item>
        </el-form>
        <el-row type="flex">
          <el-col :span="4">
            <span >上传资源的图标：</span>
          </el-col>
          <el-col :span="20">
            <div class="update-div">
              <el-upload
                ref="upload"
                action="https://jsonplaceholder.typicode.com/posts/"
                list-type="picture-card"
                :on-preview="modifyPictureCardPreview"
                :on-remove="modifyRemove"
                :before-upload="beforeModifyUpload"
                :multiple="true"
                :auto-upload="false"
                :limit=10>
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="modifyVisible" size="tiny">
                <img width="100%" :src="modifyImageUrl" alt="">
              </el-dialog>
            </div>
          </el-col>
        </el-row>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="ModifyDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="modifySubmit('ModifyForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'resourceManagement',
    data () {
      return {
        queryResourceCode: '',
        queryResourceName: '',
        queryResourceTitle: '',
        queryResourceTypeValue: '',
        queryResourceForValue: '',
        resourceCurrentPage: 1,
        resourcePageSize: 10,
        resourceTotal: 0, // 资源总数
        NewDialogVisible: false, // 新增资源弹窗
        ModifyDialogVisible: false, // 修改资源弹窗
        parentIdDialog: false, // 父节点id弹窗
        modifyParentIdDialog: false,
        clickClose: false, // 点击modal时 不关闭对话框
        resourceName: [], // 分配的资源名称
        modifyResourceParentNode: [],
        parentId: '', // 新增资源时传给后台的父节点id
        modifyParentId: '', // 修改资源时传给后台的父节点id
        parentNodeName: '', // 分配的父节点名
        modifyParentNodeTitle: '',
        parentNodeResourceType: '', // 分配的父节点所属资源类型
        parentNodeResourceFor: '', // 分配的父节点所属平台
        modifyParentNodeResourceType: '', // 修改资源时分配的父节点所属资源类型
        modifyParentNodeResourceFor: '', // 修改资源分配的父节点所属平台
        modifyResourceID: '', // 修改资源时 需提交到后台的资源id
        resourceTypeDisabled: false,
        resourceForDisabled: false,
        modifyVisible: false,
        newVisible: false,
        modifyImageUrl: '',
        newImageUrl: '',
        NewBuiltForm: {
          resourceName: '',
          resourceCode: '',
          resourceRouteName: '',
          resourceTitle: '',
          resourceOrder: '',
          resourceUrl: '',
          resourceType: 'MEM',
          resourceFor: 'PLATFORM',
          remarkTxt: '',
          resourceIcoCls: ''
        },
        ModifyForm: {
          resourceName: '',
          resourceCode: '',
          resourceRouteName: '',
          resourceTitle: '',
          resourceOrder: '',
          resourceUrl: '',
          resourceType: '',
          resourceFor: '',
          remarkTxt: ''
        },
        resourceTypeOptions: [
          {
          value: 'MEM',
          label: '菜单'
        }, {
          value: 'BUTTON',
          label: '按钮'
        }, {
          value: 'ACTION',
          label: 'Action'
        }],
        queryResourceTypeOptions: [
          {
            value: ' ',
            label: '所有'
          },
          {
            value: 'MEM',
            label: '菜单'
          }, {
            value: 'BUTTON',
            label: '按钮'
          }, {
            value: 'ACTION',
            label: 'Action'
          }],
        resourceForOptions: [
          {
          value: 'PLATFORM',
          label: '平台资源'
        }, {
          value: 'SUPPLIER',
          label: '供应商'
        }],
        queryResourceForOptions: [
          {
            value: ' ',
            label: '所有'
          },
          {
            value: 'PLATFORM',
            label: '平台资源'
          }, {
            value: 'SUPPLIER',
            label: '供应商'
          }],
        // 校验规则
        rules: {
          resourceName: [
            {required: true, message: '请输入资源名称', trigger: 'change'}
          ],
          resourceCode: [
            {required: true, message: '请输入资源编码', trigger: 'change'}
          ],
          resourceRouteName: [
            {required: true, message: '请输入路由名称', trigger: 'change'}
          ],
          resourceTitle: [
            {required: true, message: '请输入资源标题', trigger: 'change'}
          ],
          resourceOrder: [
            {required: true, message: '请输入资源排序', trigger: 'change'}
          ]
        },
        tableDatas: [],
        treeDatas: [],
        modifyTreeDatas: [],
        formLabelWidth: '120px',
        defaultProps: {
          children: 'children',
          label: 'resourceName'
        }
      }
    },
    methods: {
    // 获取资源列表数据
      getListData (CurrentPage, PageSize) {
        let params = {}
        let param = {}
        params.currentPage = CurrentPage
        params.pageSize = PageSize
        param.params = params
        this.$store.dispatch('ajaxGet', {url: '/resourceUrl/v1/resource/res/list',
          submitData: param,
          success: res => {
            if (res.status === 'OK') {
              for (let value of res.data.data) {
                if (value.resourceType === 'MEM') {
                    value.resourceType = '菜单'
                }
                if (value.resourceFor === 'SUPPLIER') {
                  value.resourceFor = '供应商'
                }
                if (value.resourceFor === 'PLATFORM') {
                  value.resourceFor = '平台资源'
                }
                if (value.resourceType === 'BUTTON') {
                  value.resourceType = '按钮'
                }
                if (value.resourceType === 'ACTION') {
                  value.resourceType = 'Action'
                }
                this.tableDatas = res.data.data
                this.resourceTotal = res.data.total
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
      // 每页显示多少条
      resourceSizeChange (val) {
        this.resourcePageSize = val
        this.getListData(this.resourceCurrentPage, this.resourcePageSize)
        console.log(`每页 ${val} 条`)
      },
      // 点击第几页
      resourceCurrentChange (val) {
        this.resourceCurrentPage = val
        this.getListData(this.resourceCurrentPage, this.resourcePageSize)
        console.log(`当前页: ${val}`)
      },
      selectAll: function (val) {
        this.roleSelectAmount = val
        console.log(this.roleSelectAmount)
      },
      // 确认新增资源
      submitForm (NewBuiltForm) {
        this.$refs[NewBuiltForm].validate((valid) => {
          if (valid) {
            console.log(this.NewBuiltForm)
            this.NewBuiltForm.parentId = this.parentId
            this.$store.dispatch('ajaxPost', {url: '/resourceUrl/v1/resource/res/add',
              submitData: this.NewBuiltForm,
              success: res => {
                if (res.status === 'OK') {
                  this.$message({
                    message: '添加成功！',
                    type: 'success'
                  })
                  this.NewDialogVisible = false
                  this.getListData(this.resourceCurrentPage, this.resourcePageSize)
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
      // 确认修改资源
      modifySubmit (ModifyForm) {
        this.$confirm('确认修改?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$refs[ModifyForm].validate((valid) => {
            if (valid) {
              this.ModifyForm.resourceId = this.modifyResourceID
              this.ModifyForm.parentId = this.modifyParentId
              this.$store.dispatch('ajaxPatch', {url: '/resourceUrl/v1/resource/res/update',
                submitData: this.ModifyForm,
                success: res => {
                  console.log(res.status)
                  if (res.status === 'OK') {
                    this.$message({
                      message: '修改成功！',
                      type: 'success'
                    })
                    this.ModifyDialogVisible = false
                    this.getListData(this.resourceCurrentPage, this.resourcePageSize)
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
      // 选择父节点
      parentIdAdd () {
        if (this.resourceName.length === 1) {
          this.$message({
            message: '当前已添加一个父节点，不能再次添加！',
            type: 'error'
          })
        } else {
          this.parentIdDialog = true
          this.$store.dispatch('ajaxGet', {url: '/resourceUrl/v1/resource/res/mtree',
            success: res => {
              if (res.status === 'OK') {
                this.treeDatas = res.data.tree
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
      // 点击tree事件
      handleNodeClick (data) {
        this.parentId = data.resourceId
        this.parentNodeName = data.resourceName
        this.parentNodeResourceType = data.resourceType
        this.parentNodeResourceFor = data.resourceFor
      },
      // 确认选择父节点
      parentIdSubmit () {
        console.log(this.parentNodeName)
        if (this.parentNodeName !== '') {
          this.resourceName.push(this.parentNodeName)
          this.NewBuiltForm.resourceFor = this.parentNodeResourceFor
          this.NewBuiltForm.resourceType = this.parentNodeResourceType
          if (this.NewBuiltForm.resourceFor === this.parentNodeResourceFor) {
            this.resourceForDisabled = true
          }
        }
        console.log('this.parentId' + this.parentId)
        this.parentIdDialog = false
        // if (this.NewBuiltForm.resourceTypeValue === this.parentNodeResourceType) {
        //   this.resourceTypeDisabled = true
        // }
      },
      // 新增资源时---资源图片删除
      newRemove (file, fileList) {
        console.log(file, fileList)
      },
      // 图片预览
      newPictureCardPreview (file) {
        this.carouselImageUrl = file.url
        this.carouselVisible = true
      },
      // 判断图片是否大于2M
      beforeNewUpload (file) {
        // const isJPG = file.type === 'image/jpeg'
        const isLt2M = file.size / 1024 / 1024 < 2
        // if (!isJPG) {
        //   this.$message.error('上传头像图片只能是 JPG 格式!')
        // }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!')
        }
        return isLt2M
        // return isJPG && isLt2M
      },
      // 清空新建资源表单
      newDialogClose (NewBuiltForm) {
        this.$refs[NewBuiltForm].resetFields()
        this.resourceName = []
        this.parentNodeName = ''
        this.resourceTypeDisabled = false
        this.resourceForDisabled = false
      },
      // 删除父节点
      resourceTitleClose (tag) {
        this.resourceName.splice(this.resourceName.indexOf(tag), 1)
        this.resourceForDisabled = false
      },
      // 删除资源
      resourceDelete (index, row) {
        this.$confirm('确认删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params = {}
          let param = {}
          params.resourceId = row.resourceId
          param.params = params
          this.$store.dispatch('ajaxDelete', {url: '/resourceUrl/v1/resource/res/del',
            submitData: param,
            success: res => {
              if (res.status === 'OK') {
                this.$message({
                  message: '删除成功！',
                  type: 'success'
                })
                // 重新加载列表数据
                this.getListData(this.resourceCurrentPage, this.resourcePageSize)
              } else {
                this.$message.error(res.message)
              }
            }})
        }).catch(() => {
        })
      },
      // 修改资源
      resourceModify (index, row) {
        this.ModifyDialogVisible = true
        this.modifyResourceID = row.resourceId
        this.ModifyForm.resourceName = row.resourceName
        this.ModifyForm.resourceCode = row.resourceCode
        this.ModifyForm.resourceRouteName = row.resourceRouteName
        this.ModifyForm.resourceUrl = row.resourceUrl
        this.ModifyForm.resourceTitle = row.resourceTitle
        this.ModifyForm.resourceOrder = row.resourceOrder
        if (row.parentId === null) {
          this.modifyParentId = ''
        }
        if (row.resourceType === '菜单') {
          this.ModifyForm.resourceType = 'MEM'
        }
        if (row.resourceType === '按钮') {
          this.ModifyForm.resourceType = 'BUTTON'
        }
        if (row.resourceType === 'ACTION') {
          this.ModifyForm.resourceType = 'Action'
        }
        if (row.resourceFor === '供应商') {
          this.ModifyForm.resourceFor = 'SUPPLIER'
        }
        if (row.resourceFor === '平台资源') {
          this.ModifyForm.resourceFor = 'PLATFORM'
        }
        this.ModifyForm.remarkTxt = row.remarkTxt
        if (row.parentName !== null) {
          this.modifyResourceParentNode.push(row.parentName)
        }
      },
      // 修改资源时 选择父节点
      modifyParentIdAdd () {
        if (this.modifyResourceParentNode.length === 1) {
          this.$message({
            message: '当前已添加一个父节点，不能再次添加！',
            type: 'error'
          })
        } else {
          this.modifyParentIdDialog = true
          this.$store.dispatch('ajaxGet', {url: '/resourceUrl/v1/resource/res/mtree',
            success: res => {
              if (res.status === 'OK') {
                this.modifyTreeDatas = res.data.tree
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
      // 修改资源时 删除父节点
      modifyResourceTitleClose (tag) {
        this.modifyResourceParentNode.splice(this.modifyResourceParentNode.indexOf(tag), 1)
        this.resourceForDisabled = false
      },
      // 修改资源时 点击tree
      modifyNodeClick (data) {
        console.log(data)
        this.modifyParentId = data.resourceId
        this.modifyParentNodeTitle = data.resourceTitle
        this.modifyParentNodeResourceType = data.resourceType
        this.modifyParentNodeResourceFor = data.resourceFor
      },
      // 修改资源时 确认选择父节点
      modifyParentIdSubmit () {
        this.modifyResourceParentNode.push(this.modifyParentNodeTitle)
        this.modifyParentIdDialog = false
        this.ModifyForm.resourceType = this.modifyParentNodeResourceType
      },
      // 修改资源时 ---清空修改资源表达
      modifyDialogClose () {
        this.modifyResourceParentNode = []
      },
      // 修改资源时---资源图片删除
     modifyRemove (file, fileList) {
        console.log(file, fileList)
      },
      // 图片预览
      modifyPictureCardPreview (file) {
        this.carouselImageUrl = file.url
        this.carouselVisible = true
      },
      // 判断图片是否大于2M
      beforeModifyUpload (file) {
        // const isJPG = file.type === 'image/jpeg'
        const isLt2M = file.size / 1024 / 1024 < 2
        // if (!isJPG) {
        //   this.$message.error('上传头像图片只能是 JPG 格式!')
        // }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!')
        }
        return isLt2M
        // return isJPG && isLt2M
      },
      // 条件查询
      queryResource () {
        let params = {}
        let param = {}
        params.currentPage = this.resourceCurrentPage
        params.pageSize = this.resourcePageSize
        params.resourceCode = this.queryResourceCode
        params.resourceName = this.queryResourceName
        params.resourceTitle = this.queryResourceTitle
        params.resourceType = this.queryResourceTypeValue
        params.resourceFor = this.queryResourceForValue
        param.params = params
        this.$store.dispatch('ajaxGet', {url: '/resourceUrl/v1/resource/res/list',
          submitData: param,
          success: res => {
            if (res.status === 'OK') {
              for (let value of res.data.data) {
                if (value.resourceType === 'MEM') {
                  value.resourceType = '菜单'
                }
                if (value.resourceType === 'BUTTON') {
                  value.resourceType = '按钮'
                }
                if (value.resourceType === 'ACTION') {
                  value.resourceType = 'Action'
                }
                this.tableDatas = res.data.data
                this.resourceTotal = res.data.total
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
       this.getListData(this.resourceCurrentPage, this.resourcePageSize)
    }
  }
</script>

<style lang="scss">
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
  .dialog-bag {
    height: auto;
    background-color: #f0f0f0;
    padding: 10px 10px;
  }
  .update-div {
    background-color: white;
    padding: 10px;
    .el-upload--picture-card {
      width: 70px;
      height: 70px;
      line-height: 80px;
    }
    .el-upload-list--picture-card .el-upload-list__item {
      width: 70px;
      height: 70px;
    }
  }
  .el-tree {
    overflow-y: scroll;
    height: 350px;
    border-top: 1px solid #EBEEF5;
    border-left: 1px solid #EBEEF5;
    border-bottom: 1px solid #EBEEF5;
  }
</style>
