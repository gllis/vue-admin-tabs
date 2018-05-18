<template>
  <el-row class="page-container">
    <el-col :span="11"><div class="el-404 text-yellow">403</div></el-col>
    <el-col :span="13">
        <h3><i class="fa fa-warning text-yellow"></i> 您的操作权限不足</h3>
        <p>很抱歉，您没有权限访问此页面，若有疑问请联系管理员</p>
        <el-button type="warning" size="mini" @click="goback"> 返回上一页</el-button>
    </el-col>
  </el-row>
</template>
<script>
  export default {
		data() {
			return {
      }
    },
    methods: {
      goback() {
        this.$store.commit('delete_tabs', '403');
        var activeIndex = this.$store.state.options[this.$store.state.options.length-1].route;
        this.$store.commit('set_active_index', activeIndex);
        this.$router.push({path: activeIndex});
      }
    }
  }
</script>
<style lang="scss" scoped>
  .page-container {
    padding-top: 60px;
  }
  .text-yellow {
    color: #f39c12
  }
  .el-404 {
    text-align: right;
    font-size: 100px;
    font-weight: 300;
    padding-right: 20px;
  }
</style>
