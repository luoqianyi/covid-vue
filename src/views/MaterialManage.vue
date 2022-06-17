<template>
<div>
    <el-input placeholder="请输入内容" v-model="stext" class="input-with-select" style="width:40%">
    <el-select v-model="cname" slot="prepend" placeholder="请选择" @change="getKey">
      <el-option label="物资名称" value="name"></el-option>
      <el-option label="负责人" value="charge"></el-option>
      <el-option label="更新时间" value="updateTime"></el-option>
    </el-select>
    <el-button slot="append" icon="el-icon-search" @click="search()"></el-button>
  </el-input>

  <el-table
    :data="tableData"
    v-loading="loading"
    border
    style="width: 100%">
    <el-table-column
      fixed
      prop="id"
      label="编号"
      width="150">
    </el-table-column>
    <el-table-column
      prop="name"
      label="物资名称"
      width="180">
    </el-table-column>
    <el-table-column
      prop="count"
      label="物资数量"
      width="120">
    </el-table-column>
    <el-table-column
      prop="type"
      label="计量单位"
      width="120">
    </el-table-column>
    <el-table-column
      prop="isImp"
      label="是否为重点物资"
      width="120">
    </el-table-column>
    <el-table-column
      prop="charge"
      label="负责人"
      width="120">
    </el-table-column>
    <el-table-column
      prop="cnum"
      label="负责人电话"
      width="120">
    </el-table-column>
    <el-table-column
      prop="updateTime"
      label="更新时间"
      width="180">
    </el-table-column>

   <el-table-column width="120" label="操作" fixed="right">
      <template slot-scope="scope">
        <el-button @click="dialogFormVisible = true,edit(scope.row)" type="text" size="small">修改</el-button>
        <el-button type="text" size="small" @click="deleteRecord(scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

  <div class="block">
    <el-pagination
      @current-change="handleCurrentChange"
      :page-size="6"
      layout="total, prev, pager, next"
      :total="total">
    </el-pagination>

<el-dialog title="更新物资详情" :visible.sync="dialogFormVisible" slot>
  <el-form :model="Mat" ref="Mat" :rules="rules">
    <el-form-item label="物资名称" :label-width="formLabelWidth" prop="name">
      <el-input v-model="Mat.name"  autocomplete="off" ></el-input>
    </el-form-item>
    <el-form-item label="物资数量" :label-width="formLabelWidth" prop="count">
      <el-input v-model="Mat.count" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="计量单位" :label-width="formLabelWidth" prop="type">
      <el-input v-model="Mat.type" autocomplete="off"></el-input>
    </el-form-item>
          <el-form-item label="是否为重要物资" :label-width="formLabelWidth" prop="isImp">
        <el-radio v-model="Mat.isImp" label="是" @change="test($event)">是</el-radio>
        <el-radio v-model="Mat.isImp" label="否" @change="test($event)">否</el-radio>
    </el-form-item>
     <el-form-item label="负责人" :label-width="formLabelWidth" prop="charge">
      <el-input v-model="Mat.charge" autocomplete="off"></el-input>
    </el-form-item>
     <el-form-item label="负责人电话" :label-width="formLabelWidth" prop="cnum">
      <el-input v-model="Mat.cnum" autocomplete="off"></el-input>
    </el-form-item>

  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="update('Mat')">确 定</el-button>
  </div>
</el-dialog>
  </div>

</div>

</template>

<script>
  export default {
    methods: {
      test(dd){
        this.Mat.isImp=dd;
      },
      search(){
      if(!this.stext){
      axios.get('/Material/findAll/1/6').then((resp)=>{
        this.tableData=resp.data.records
        this.total=resp.data.total
        this.cname=""
        this.searchKey = null
      }).catch(err=>{this.$message.error("查询失败~")})
      }else {
        if (this.searchKey == null) {
          this.$message.warning("请选择搜索条件，搜索条件不可为空！")
        } else {
          this.loading = true
          axios.get('/Material/search/' + this.searchKey + "/" + this.stext).then((resp) => {
            this.tableData = resp.data
            this.total = resp.data.total
            this.loading = false
          })
        }
      }
    },
    getKey(e){
      this.searchKey = e
    },
   deleteRecord(row){
        this.$confirm('是否确定要删除'+row.name+'的物资记录?','删除数据',{
          confirmButtonText:'确定',
          cancelButtonText:'取消',
          type:'warning'
        }).then(()=>{axios.delete('/Material/deleteById/'+row.id).then((resp)=>{
          this.$alert(row.name+'的物资记录删除成功！',"消息",{
                 type: 'success',
                 confirmButtonText:"确定",
                 callback:action=>{
                   window.location.reload()
                 }
               })
        }).catch(err=>{this.$message.error("删除失败~")})})
      },

      update(formName){
        this.$refs[formName].validate((valid)=>{
          if (valid) {
            axios.put('/Material/update', this.Mat).then((resp) => {
              console.log(resp)
              if (resp.data == 'success') {
                this.$alert(this.Mat.name + '的物资记录修改成功！', "消息", {
                  type: 'success',
                  confirmButtonText: "确定",
                  callback: action => {
                    window.location.reload()
                  }
                })
                this.dialogFormVisible = false
              }
            }).catch(err => {
              this.$message.error("更新失败~")
            })
          }
        })
        },
      edit(row) {
         axios.get('/Material/findById/'+row.id).then((resp)=>{
        this.Mat=resp.data;
      }).catch(err=>{this.$message.error("查询失败~")})
      },
      handleCurrentChange(currentPage){
        this.loading = true
        axios.get('/Material/findAll/'+currentPage+'/6').then((resp)=>{
        this.tableData=resp.data.records
        this.total=resp.data.total
          this.loading = false
      }).catch(err=>{this.$message.error("查询失败~")})
      },
      remoteMethod(query) {
        if (query !== '') {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            this.options = this.list.filter(item => {
              return item.label.toLowerCase()
                .indexOf(query.toLowerCase()) > -1;
            });
          }, 200);
        } else {
          this.options = [];
        }
      }
    },
    created(){
      this.loading = true
      axios.get('/Material/findAll/1/6').then((resp)=>{
        console.log(resp)
        this.tableData=resp.data.records
        this.total=resp.data.total
        this.loading = false
      }).catch(err=>{this.$message.error("查询失败~")})
    },

    data() {
      return {
        cname:'',
        stext:'',
        formLabelWidth: '120px',
        options: [],
        value: [],
        list: [],
        loading: false,
        tableData: null,
        total:null,
        dialogTableVisible: false,
        dialogFormVisible: false,
          Mat: {
            id:"",
            name:"",
            count:"",
            type:"",
            isImp:"",
            charge:"",
            cnum:"",
            updateTime:""
                },
        rules: {
          name: [
            { required: true, message: '请输入物资名称', trigger: 'blur' },
            { pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+$/, message: '不允许输入空格等特殊符号' },
          ],
          count: [
            { required: true, message: '请输入物资数量', trigger: 'blur' },
            { pattern: /^[0-9]*$/, message: '请输入正整数' },
          ],
          type: [
            { required: true, message: '请输入计量单位', trigger: 'blur' },
            { pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+$/, message: '不允许输入空格等特殊符号' },
          ],
          isImp: [
            { required: true, message: '请输入是否为重要物资', trigger: 'blur' },
          ],
          charge: [
            { required: true, message: '请输入负责人', trigger: 'blur' },
            { min: 2, max: 10 ,message: '长度在2-10个字符', trigger: 'blur'}
          ],
          cnum: [
            { required: true, message: '请输入负责人电话', trigger: 'blur' },
            { pattern: /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/, message: '电话号码格式不对' },
          ]

        }
      }
    }
  }
</script>
<style>
  .el-select .el-input {
    width: 130px;
  }.input-with-select{

    float: right;
  }

  .input-with-select .el-input-group__prepend {

    background-color: #fff;
  }
</style>
