<!--author:李茂源-->
<!--time：2019-5-05-->
<!--description：合格供应商界面-->
<template>
<div style="width:95%;height: auto;margin: 0 auto">
  <div >
  <el-form :inline="false" :model="formInline" label-width="80px">
  <el-row >
    <el-col :xs="24" :sm="11" :md="7" :lg="5">
      <el-form-item label="供应商">
        <el-input v-model="formInline.user" placeholder="按供应商名搜索"></el-input>
      </el-form-item>
    </el-col>
    <el-col :xs="24" :sm="11" :md="7" :lg="5">
      <el-form-item label="供货范围">
        <el-select v-model="formInline.region" placeholder="全国">
          <el-option label="四川省" value="shanghai"></el-option>
          <el-option label="山东省" value="beijing"></el-option>
        </el-select>
      </el-form-item>
    </el-col>
    <el-col :xs="24" :sm="11" :md="7" :lg="5">
      <el-form-item label="物资">
        <el-input v-model="formInline.user" placeholder="按物资名搜索"></el-input>
      </el-form-item>
    </el-col>
    <el-col :xs="24" :sm="11" :md="7" :lg="5">
      <el-form-item label="星级">
        <el-select v-model="formInline.region" placeholder="一星级">
          <el-option label="一星级" value="shanghai"></el-option>
          <el-option label="二星级" value="beijing"></el-option>
          <el-option label="三星级" value="beijing"></el-option>
        </el-select>
      </el-form-item>
    </el-col>
    <el-col :xs="24" :sm="11" :md="2" :lg="2">
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-col>
  </el-row>
  </el-form>
  </div>
  <div class="supplier_list_info" >
    <el-table
      :data="tableData"
      border
      stripe
      max-height="650">
      <el-table-column
        fixed="left"
        type="index"
        width="50"
        align="center">
      </el-table-column>
      <el-table-column
        prop="supplier"
        label="供应商"
        width="300"
        align="center">
      </el-table-column>
      <el-table-column
        prop="industry"
        label="行业"
        min-width="200"
        align="center">
      </el-table-column>
      <el-table-column
        label="星级"
        min-width="200"
        align="center">
        <template slot-scope="scope">
        <el-rate
          v-model="scope.row.star"
          disabled
          show-score
          text-color="#ff9900"
          score-template="{value}">
        </el-rate>
        </template>
      </el-table-column>
      <el-table-column
        prop="transaction"
        label="总交易次数"
        min-width="200"
        align="center">
      </el-table-column>
      <el-table-column
        prop="region"
        label="供货范围"
        width="200"
        align="center">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        min-width="150"
        align="center">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="showDetail(scope.$index, scope.row)"
            type="text"
            size="small">
            查看详情
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <div class="paging">
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="40">
    </el-pagination>
  </div>
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
      },
      tableData: [{
        supplier: '四川菲迪克网络科技有限公司',
        industry: '电气行业',
        star: 3.5,
        transaction: '456',
        region: '上海市普陀区金沙江路 1518 弄'
      },
        {
          supplier: '华东电气',
          industry: '电气行业',
          star: 4.8,
          transaction: '普陀区',
          region: '上海市普陀区金沙江路 1518 弄'
        }]
    }
  },
  methods: {
    onSubmit () {
      console.log('submit!')
    },
    showDetail (index, row) {
      console.log(index, row)
    }
  }
}
</script>

<style scoped lang="scss">
  .paging {
    height: auto;
    width: 80%;
    margin-top: 10px;
  }
</style>
