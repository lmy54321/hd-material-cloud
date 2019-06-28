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
                <el-form-item label="公司名称：" prop="supplierName">
                  <el-input v-model="ruleForm.supplierName"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="10" type="flex" justify="center">
              <div class="grid-content bg-purple">
                <el-form-item label="所属省份：" prop="provinceCode">
                  <el-select
                    v-model="ruleForm.provinceCode"
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
                <el-form-item label="所属城市：" prop="cityCode">
                  <el-select
                    v-model="ruleForm.cityCode"
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
                    v-model="ruleForm.countyCode"
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
              <el-form-item label="详细地址：" prop="streetAddress">
                <el-input v-model="ruleForm.streetAddress"></el-input>
              </el-form-item>
            </div>
            </el-col>
            <el-col :span="10"><div class="grid-content bg-purple">
              <el-form-item label="公司联系电话：" prop="supplierPhone">
                <el-input v-model.number="ruleForm.supplierPhone"></el-input>
              </el-form-item>
            </div>
            </el-col>
          </el-row>
          <el-row type="flex" justify="center">
            <el-col :span="13"><div class="grid-content bg-purple">
              <el-form-item label="法人姓名：" prop="legalPerson">
                <el-input v-model="ruleForm.legalPerson"></el-input>
              </el-form-item>
            </div>
            </el-col>
            <el-col :span="10"><div class="grid-content bg-purple">
              <el-form-item label="法人身份证：" prop="legalPersonCardNo">
                <el-input v-model="ruleForm.legalPersonCardNo"></el-input>
              </el-form-item>
            </div>
            </el-col>
          </el-row>
          <el-row type="flex" justify="center">
            <el-col :span="13"><div class="grid-content bg-purple">
              <el-form-item label="联系人姓名：" prop="contactsName">
                <el-input v-model="ruleForm.contactsName"></el-input>
              </el-form-item>
            </div>
            </el-col>
            <el-col :span="10"><div class="grid-content bg-purple">
              <el-form-item label="联系人性别：" prop="contactsSex">
                <el-radio v-model="ruleForm.contactsSex" label="man">男</el-radio>
                <el-radio v-model="ruleForm.contactsSex" label="woman">女</el-radio>
              </el-form-item>
            </div>
            </el-col>
          </el-row>
          <el-row type="flex" justify="center">
            <el-col :span="13"><div class="grid-content bg-purple">
              <el-form-item label="联系人邮箱：" prop="mailbox">
                <el-input v-model="ruleForm.mailbox"></el-input>
              </el-form-item>
            </div>
            </el-col>
            <el-col :span="10"><div class="grid-content bg-purple">
              <el-form-item label="联系人电话：" prop="contactsPhone">
                <el-input v-model.number="ruleForm.contactsPhone" autocomplete="off"></el-input>
              </el-form-item>
            </div>
            </el-col>
          </el-row>
          <el-row type="flex" justify="center">
            <el-col :span="13"><div class="grid-content bg-purple">
              <el-form-item label="组织机构代码：" prop="creditCode">
                <el-input v-model.number="ruleForm.creditCode"></el-input>
              </el-form-item>
            </div>
            </el-col>
            <el-col :span="10"><div class="grid-content bg-purple">
              <el-form-item label="行业类别：" prop="industryCode">
                <el-select v-model="ruleForm.industryCode"  @change="choseIndustry" placeholder="请选择">
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
  import ObVue from '../components/common/ob_vue'
  export default {
    data () {
      // 供应商手机号验证
      let checkSupplierPhone = (rule, value, callback) => {
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
      // 联系人手机号验证
      let checkContactsPhone = (rule, value, callback) => {
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
        ruleForm: {
          supplierName: '',
          streetAddress: '',
          legalPerson: '',
          legalPersonCardNo: '',
          supplierPhone: '',
          contactsName: '',
          contactsPhone: '',
          mailbox: '',
          contactsSex: '',
          creditCode: '',
          industryCode: '',
          provinceCode: '',
          cityCode: '',
          countyCode: ''
        },
        industry_category_options: [{
          value: '001',
          label: '新能源'
        }, {
          value: '002',
          label: 'it行业'
        }],
        mapJson: '../static/json/map.json',
        value: '',
        provinces: '',
        city_datas: '',
        block_datas: '',
        dialogImageUrl: '',
        dialogVisible: false,
        // 校验规则
        rules: {
          supplierName: [
            {required: true, message: '请输入供应商名称', trigger: 'change'},
            {min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur'}
          ],
          streetAddress: [
            {required: true, message: '请填写详细地址', trigger: 'change'},
            {min: 2, max: 50, message: '长度在 2 到 50 个字符', trigger: 'blur'}
          ],
          provinceCode: [
            {required: true, message: '请选择省份', trigger: 'change'}
          ],
          cityCode: [
            {required: true, message: '请选择城市', trigger: 'change'}
          ],
          countyCode: [
            {required: true, message: '请选择区县', trigger: 'change'}
          ],
          legalPerson: [
            {required: true, message: '请输入法人姓名', trigger: 'change'},
            {min: 2, max: 7, message: '长度在 2 到 7 个字符', trigger: 'blur'}
          ],
          legalPersonCardNo: [
            {required: true, message: '请输入法人身份证号码', trigger: 'change'},
            {min: 18, max: 18, message: '长度为18个字符', trigger: 'blur'}
          ],
          supplierPhone: [
            {validator: checkSupplierPhone, trigger: 'blur'}
          ],
          contactsName: [
            {required: true, message: '请输入联系人姓名', trigger: 'change'},
            {min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur'}
          ],
          contactsPhone: [
            {validator: checkContactsPhone, trigger: 'blur'}
          ],
          mailbox: [
            {required: true, message: '请输入联系邮箱', trigger: 'change'},
            {type: 'email', message: '请输入正确的邮箱', trigger: 'blur'}
          ],
          creditCode: [
            {required: true, message: '请输入组织机构代码', trigger: 'change'},
            {type: 'number', message: '请输入正确的组织机构代码', trigger: 'blur'}
          ],
          industryCode: [
            {required: true, message: '请选择行业种类', trigger: 'change'},
            {min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur'}
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
            this.ruleForm.provinceName = sessionStorage.getItem('provinceName')
            this.ruleForm.cityName = sessionStorage.getItem('cityName')
            this.ruleForm.countyName = sessionStorage.getItem('countyName')
            this.ruleForm.industryName = sessionStorage.getItem('industryName')
            this.ruleForm.industryId = '003'
            this.$store.dispatch('ajaxPost', {url: '/supplierUrl/v1/supplier/req',
              submitData: this.ruleForm,
              success: function (res) {
                if (res.status === 'OK') {
                  this.$message({
                    message: '申请成功！',
                    type: 'success'
                  })
                } else {
                  ObVue.$message.error('申请失败')
                }
              }})
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
        // 获取省名
        let obj = {}
        obj = this.provinces.find((item) => {
          return item.id === e
        })
        sessionStorage.setItem('provinceName', obj.value)
      },
      // 选城市
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
        // 获取市名
        let obj = {}
        obj = this.city_datas.find((item) => {
          return item.id === e
        })
        sessionStorage.setItem('cityName', obj.value)
      },
      // 选区
      choseBlock: function (e) {
        this.E = e
        console.log(this.E + '区代码')
        // 获取区县名
        let obj = {}
        obj = this.block_datas.find((item) => {
          return item.id === e
        })
        sessionStorage.setItem('countyName', obj.value)
      },
      // 选行业
      choseIndustry: function (e) {
        // 获行业名
        let obj = {}
        obj = this.industry_category_options.find((item) => {
          return item.value === e
        })
        sessionStorage.setItem('industryName', obj.value)
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
  // function jsonToForm (data) {
  //     var res = new FormData()
  //     for (var i in data) {
  //       res.append(i, data[i])
  //       console.log(i)
  //       console.log(data[i])
  //     }
  //   console.log(res)
  //     return res
  // }
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
