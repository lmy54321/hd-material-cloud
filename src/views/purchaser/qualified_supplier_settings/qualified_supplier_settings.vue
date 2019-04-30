<template>
<div>
  <el-form :inline="true" :model="formInline" class="demo-form-inline">
  <el-row type="flex" justify="center">
    <el-col sm:='11' :md='7' :lg="5">
      <el-form-item label="供应商">
        <el-input v-model="formInline.user" placeholder="按供应商名搜索"></el-input>
      </el-form-item>
    </el-col>
    <el-col sm:='11' :md='7' :lg="5">
      <el-form-item label="供货范围">
        <el-select v-model="formInline.region" placeholder="全国">
          <el-option label="四川省" value="shanghai"></el-option>
          <el-option label="山东省" value="beijing"></el-option>
        </el-select>
      </el-form-item>
    </el-col>
    <el-col sm:='11' :md='7' :lg="5">
      <el-form-item label="物资名">
        <el-input v-model="formInline.user" placeholder="按物资名搜索"></el-input>
      </el-form-item>
    </el-col>
    <el-col sm:='11' :md='7' :lg="5">
      <el-form-item label="星级">
        <el-select v-model="formInline.region" placeholder="一星级">
          <el-option label="一星级" value="shanghai"></el-option>
          <el-option label="二星级" value="beijing"></el-option>
          <el-option label="三星级" value="beijing"></el-option>
        </el-select>
      </el-form-item>
    </el-col>
    <el-col sm:='11' :md='2' :lg="1">
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-col>
  </el-row>
  </el-form>
</div>
</template>

<script>
export default {
  name: 'qualified_supplier_settings',
  data () {
    return {
      formInline: {
        user: '',
        region: ''
      }
    }
  },
  methods: {
    onSubmit () {
      console.log('submit!')
    }
  }
}
</script>

<style scoped>

</style>
