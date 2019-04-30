<template>
  <div class="apply_wrap">
    <div class="apply_content">
      <div class="title">
        <span>供应商申请</span>
      </div>
      <div class="apply_input">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm" :inline="true">
          <el-row type="flex" justify="center">
            <el-col :span="13">
              <div class="grid-content bg-purple">
                <el-form-item label="公司名称：" prop="supplier_name">
                  <el-input v-model="ruleForm.supplierName"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="10" type="flex" justify="center">
              <div class="grid-content bg-purple">
                <el-form-item label="所属省份：" prop="province">
                  <el-select
                    v-model="ruleForm.province"
                    @change="choseProvince"
                    placeholder="省级地区">
                    <el-option
                      v-for="item in provinces"
                      :key="item.id"
                      :label="item.value"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row type="flex" justify="center">
            <el-col :span="13">
              <div class="grid-content bg-purple">
                <el-form-item label="所属城市：" prop="city">
                  <el-select
                    v-model="ruleForm.city"
                    @change="choseCity"
                    placeholder="市级地区">
                    <el-option
                      v-for="item in city_datas"
                      :key="item.id"
                      :label="item.value"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="10">
              <div class="grid-content bg-purple-light">
                <el-form-item label="所属区县：" prop="block">
                  <el-select
                    v-model="ruleForm.block"
                    @change="choseBlock"
                    placeholder="区级地区">
                    <el-option
                      v-for="item in block_datas"
                      :key="item.id"
                      :label="item.value"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row type="flex" justify="center">
            <el-col :span="13"><div class="grid-content bg-purple">
              <el-form-item label="详细地址：" prop="detail_region">
                <el-input v-model="ruleForm.streetAddress"></el-input>
              </el-form-item>
            </div>
            </el-col>
            <el-col :span="10"><div class="grid-content bg-purple">
              <el-form-item label="公司联系电话：" prop="supplier_phone">
                <el-input v-model.number="ruleForm.supplier_phone"></el-input>
              </el-form-item>
            </div>
            </el-col>
          </el-row>
          <el-row type="flex" justify="center">
            <el-col :span="13"><div class="grid-content bg-purple">
              <el-form-item label="法人姓名：" prop="legal_person_name">
                <el-input v-model="ruleForm.legalPerson"></el-input>
              </el-form-item>
            </div>
            </el-col>
            <el-col :span="10"><div class="grid-content bg-purple">
              <el-form-item label="法人身份证：" prop="legal_person_id_card">
                <el-input v-model="ruleForm.legalPersonCardNo"></el-input>
              </el-form-item>
            </div>
            </el-col>
          </el-row>
          <el-row type="flex" justify="center">
            <el-col :span="13"><div class="grid-content bg-purple">
              <el-form-item label="联系人姓名：" prop="contacts_name">
                <el-input v-model="ruleForm.contactsName"></el-input>
              </el-form-item>
            </div>
            </el-col>
            <el-col :span="10"><div class="grid-content bg-purple">
              <el-form-item label="联系人性别：" prop="sex">
                <el-radio v-model="ruleForm.contactsSex" label="男">男</el-radio>
                <el-radio v-model="ruleForm.contactsSex" label="女">女</el-radio>
              </el-form-item>
            </div>
            </el-col>
          </el-row>
          <el-row type="flex" justify="center">
            <el-col :span="13"><div class="grid-content bg-purple">
              <el-form-item label="联系人邮箱：" prop="email">
                <el-input v-model="ruleForm.mailbox"></el-input>
              </el-form-item>
            </div>
            </el-col>
            <el-col :span="10"><div class="grid-content bg-purple">
              <el-form-item label="联系人电话：" prop="contacts_phone">
                <el-input v-model.number="ruleForm.contactsPhone"></el-input>
              </el-form-item>
            </div>
            </el-col>
          </el-row>
          <el-row type="flex" justify="center">
            <el-col :span="13"><div class="grid-content bg-purple">
              <el-form-item label="组织机构代码：" prop="organizational_code">
                <el-input v-model.number="ruleForm.creditCode"></el-input>
              </el-form-item>
            </div>
            </el-col>
            <el-col :span="10"><div class="grid-content bg-purple">
              <el-form-item label="行业类别：" prop="industry_category">
                <el-select v-model="ruleForm.industryName" placeholder="请选择">
                  <el-option
                    v-for="item in industry_category_options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
            </el-col>
          </el-row>
          <el-row type="flex" justify="left">
            <el-col :span="4">
              <div style="color: white;text-align: center">资质上传:</div>
            </el-col>
          </el-row>
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
                   :limit=10>
                  <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible" size="tiny">
                  <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
            </el-col>
          </el-row>
          </div>
          <div class="apply_btn">
          <el-row >
            <el-col :span="24">
              <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
              <el-button type="primary" @click="exit()">退出</el-button>
            </el-col>
          </el-row>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'

  export default {
    data () {
      // 自定义手机号验证
      let checkPhone = (rule, value, callback) => {
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
        ruleForm: {
          supplierName: '',
          streetAddress: '',
          legalPerson: '',
          legalPersonCardNo: '',
          supplier_phone: '',
          contactsName: '',
          contactsPhone: '',
          mailbox: '',
          contactsSex: '',
          creditCode: '',
          industryName: '',
          province: '',
          city: '',
          block: ''
        },
        industry_category_options: [{
          value: '选项1',
          label: '新能源'
        }, {
          value: '选项2',
          label: 'it行业'
        }],
        mapJson: '../static/json/map.json',
        value: '',
        provinces: '',
        city_datas: '',
        block_datas: '',
        dialogImageUrl: '',
        dialogVisible: false,

        rules: {
          supplier_name: [
            {required: true, message: '请输入供应商名称', trigger: 'change'},
            {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
          ],
          detail_region: [
            {required: true, message: '请选择活动区域', trigger: 'change'}
          ],
          province: [
            {required: true, message: '请选择省份', trigger: 'change'}
          ],
          city: [
            {required: true, message: '请选择城市', trigger: 'change'}
          ],
          block: [
            {required: true, message: '请选择区县', trigger: 'change'}
          ],
          legal_person_name: [
            {required: true, message: '请输入法人姓名', trigger: 'change'},
            {min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur'}
          ],
          legal_person_id_card: [
            {required: true, message: '请输入法人身份证号码', trigger: 'change'},
            {min: 18, max: 18, message: '长度为18个字符', trigger: 'blur'}
          ],
          supplier_phone: [
            {validator: checkPhone, trigger: 'change'}
          ],
          contacts_name: [
            {required: true, message: '请输入联系人姓名', trigger: 'change'},
            {min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur'}
          ],
          contacts_phone: [
            {required: true, message: '请输入联系人电话', trigger: 'change'},
            {validator: checkPhone, trigger: 'change'}
          ],
          email: [
            {required: true, message: '请输入联系邮箱', trigger: 'change'},
            {type: 'email', message: '请输入正确的邮箱', trigger: 'blur'}
          ],
          organizational_code: [
            {required: true, message: '请输入组织机构代码', trigger: 'change'},
            {type: 'number', message: '请输入正确的组织机构代码', trigger: 'change'}
          ],
          sex: [
            {required: true, message: '请选择性别', trigger: 'change'}
          ]
        }
      }
    },
    methods: {
      // 提交申请
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log('提交的申请信息：' + JSON.stringify(this.ruleForm))
          } else {
            console.log('error submit!!')
            return false
          }
        },
          this.$refs.upload.submit())
      },
      // 退出申请
      exit () {
        this.$router.back()
      },
      // 加载省市区数据
      getCityData: function () {
        let that = this
        axios.get(this.mapJson).then(function (response) {
          if (response.status === 200) {
            let data = response.data
            // 所有省份数据
            that.provinces = []
            // 所有城市数据
            that.citys = []
            // 所有区数据
            that.blocks = []
            // 省市区数据分类
            for (let item in data) {
              if (item.match(/0000$/)) { // 省
                that.provinces.push({id: item, value: data[item], children: []})
              } else if (item.match(/00$/)) { // 市
                that.citys.push({id: item, value: data[item], children: []})
              } else { // 区
                that.blocks.push({id: item, value: data[item]})
              }
            }
            // 分类市级
            for (let i in that.provinces) {
              for (let j in that.citys) {
                if (that.provinces[i].id.slice(0, 2) === that.citys[j].id.slice(0, 2)) {
                  that.provinces[i].children.push(that.citys[j])
                }
              }
            }
            // 分类区级
            for (let i in that.citys) {
              for (let j in that.blocks) {
                if (that.blocks[j].id.slice(0, 4) === that.citys[i].id.slice(0, 4)) {
                  that.citys[i].children.push(that.blocks[j])
                }
              }
            }
          } else {
            console.log(response.status)
          }
        }).catch(function (error) {
          console.log(error)
        })
      },
      // 选省
      choseProvince: function (e) {
        console.log(e + '省份代码')
        for (let i in this.provinces) {
          if (e === this.provinces[i].id) {
            this.city_datas = this.provinces[i].children
            console.log(JSON.stringify(this.city_datas) + '城市数据')
            this.city = this.provinces[i].children[0].value
            console.log(JSON.stringify(this.city) + '选省时城市')
            this.block_datas = this.provinces[i].children[0].children
            this.block = this.provinces[i].children[0].children[0].value
            console.log(JSON.stringify(this.block) + '选省时区')
            this.E = this.block_datas[0].id
          }
        }
      },
      // 选市
      choseCity: function (e) {
        console.log(e)
        for (let i in this.citys) {
          if (e === this.citys[i].id) {
            this.block_datas = this.citys[i].children
            this.block = this.citys[i].children[0].value
            console.log(this.block + '选市时区')
            this.E = this.block_datas[0].id
            console.log(this.E)
          }
        }
      },
      // 选区
      choseBlock: function (e) {
        this.E = e
        console.log(this.E + '区代码')
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
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
          return isLt2M
      // return isJPG && isLt2M
  }
    },
    created: function () {
      this.getCityData()
    }
  }
</script>
<style  lang="scss">
  .apply_wrap {
    width: 100%;
    height: 100%;
    background-image: url(../assets/images/bg.jpg);
    background-size: 100%;
    display: -webkit-flex;
    display: flex;
    justify-content: center;
    align-items: Center;
  }
  .apply_content {
    width: 800px;
    height: auto;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 5px;
    .title {
      width: 100%;
      line-height: 50px;
      text-align: center;
      font-size: 20px;
      color: #fff;
      border-bottom: 1px solid #ddd;
    }
    .apply_input {
      width: auto;
      height: auto;
      margin-top: 10px;
    }
  }
    .el-form-item__label,.el-radio{
      color: white;
    }
    .el-input--suffix .el-input__inner {
        padding-right: 15px;
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
  .apply_btn {
    padding: 15px 0px;
    text-align: center;
  }
</style>
