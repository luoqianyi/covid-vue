<template>
<el-form style="width:60%" :model="Mat" :rules="rules" ref="Mat" label-width="100px" class="demo-Mat">
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
        <el-radio v-model="Mat.isImp" label="是">是</el-radio>
        <el-radio v-model="Mat.isImp" label="否">否</el-radio>
    </el-form-item>
     <el-form-item label="负责人" :label-width="formLabelWidth" prop="charge">
      <el-input v-model="Mat.charge" autocomplete="off"></el-input>
    </el-form-item>
     <el-form-item label="负责人电话" :label-width="formLabelWidth" prop="cnum">
      <el-input v-model="Mat.cnum" autocomplete="off"></el-input>
    </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('Mat')">立即创建</el-button>
    <el-button @click="resetForm('Mat')">重置</el-button>
  </el-form-item>
</el-form>
</template>
<script>
  export default {
    data() {
      return {
        formLabelWidth: '130px',
        Mat: {
            name:"",
            count:"",
            type:"",
            isImp:"",
            charge:"",
            cnum:"",
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
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            axios.post('/Material/save',this.Mat).then((resp)=>{
              if(resp.data=='success'){
               this.$alert('物资添加成功！',"消息",{
                 type: 'success',
                 confirmButtonText:"确定",
                 callback:action=>{
                   this.$router.push('/MaterialManage')
                 }
               })
              }
            }).catch(err=>{
              this.$message.error("添加失败~")
            })
          } else {
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>
