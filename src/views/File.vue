<template>
<div>
  <div style="margin: 10px 0">
    <el-upload
        action="http://localhost:9090/file/upload"
        style="display: inline-block;" :show-file-list="false"  :on-success="handleUploadSuccess">


    <el-button type="primary" class="ml-5"  >上传文件<i class="el-icon-top"></i></el-button>
    </el-upload>
    <el-popconfirm
        class="ml-5"
        confirm-button-text='确定'
        cancel-button-text='我再想想'
        icon="el-icon-info"
        icon-color="red"
        title="您确定要批量删除这些数据吗？"
        @confirm="delBatch"
    >
      <el-button type="danger" slot="reference">批量删除<i class="el-icon-remove-outline"></i></el-button>
    </el-popconfirm>
    </div>
  <el-table :data="tableData" border stripe header-cell-class-name="headerBg"
            @selection-change="handleSelectionChange">
    <el-table-column
        type="selection"
        width="26">
    </el-table-column>
    <el-table-column prop="id" label="ID" width="80">
    </el-table-column>
    <el-table-column prop="name" label="文件名" width="140">
    </el-table-column>
    <el-table-column prop="type" label="文件类型" width="120">
    </el-table-column>
    <el-table-column prop="size" label="文件大小(KB)">
    </el-table-column>
    <el-table-column  label="下载">
      <template slot-scope="scope">
          <el-button type="primary" @click="download(scope.row.url)">下载</el-button>
      </template>
    </el-table-column>
    <el-table-column  label="启用">
      <template slot-scope="scope">
        <el-switch v-model="scope.row.enable" active-color="#13ce66" inactive-color="#ccc" @change="changeEnable(scope.row)"></el-switch>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-popconfirm
            class="ml-5"
            confirm-button-text='确定'
            cancel-button-text='我再想想'
            icon="el-icon-info"
            icon-color="red"
            title="您确定删除吗？"
            @confirm="del(scope.row.id)"
        >
          <el-button type="danger" slot="reference">删除<i class="el-icon-remove-outline"></i> </el-button>
        </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>
  <div style="padding: 10px 0">
    <el-pagination
        :current-page="pageNum"
        :page-sizes="[2,5,10,20]"
        :page-size="pageSize"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
    </el-pagination>
  </div>
</div>
</template>
<script>
export  default {
  name:'File',
  data(){
      return {
        tableData:[],
        total:0,
        pageNum:1,
        pageSize:2,
      }
  },
  methods:{
    handleSizeChange(pageSize){
      this.pageSize = pageSize
      this.load()
    },
    handleCurrentChange(pageNum){
      this.pageNum = pageNum
      this.load()
    },

    load(){
      this.request.get("/file/page",{
        params:{
          pageNum:this.pageNum,
          pageSize:this.pageSize,
          name:this.name,
          multipleSelection:[]
        }
      }).then(res => {
        this.tableData = res.data.records
        this.total = res.data.total
      })
    },
    reset(){
      this.name=''
      this.load()
    },
    del(id){
      this.request.delete("/file/"+id).then( res => {
        if (res.code==='200') {
          this.$message.success("删除成功")
          this.load()
        } else {
          this.$message.error("删除失败")
        }
      })
    },
    delBatch(){
      let ids  = this.multipleSelection.map(v => v.id)
      this.request.post("/file/del/batch",ids).then( res => {
        if (res.code==='200') {
          this.$message.success("批量删除成功")
          this.load()
        } else {
          this.$message.error("批量删除失败")
        }
      })

    },
    handleSelectionChange(val){
      // console.log(val)
      this.multipleSelection = val
    },
    handleUploadSuccess(){
         this.load()
    },
    download(url){
      window.open(url)
    },
    changeEnable(row){
       this.request.post("/file/update",row).then( res=> {
            if(res.code === '200' ){
               this.$message.success("操作成功")
              this.load()
            } else {
              this.$message.error("操作失败")
            }
       })
    }
  },
  created() {
    this.load()
  },
}

</script>
<style>

</style>