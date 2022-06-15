<template>
  <div class="index">
    <el-container class="home_container" style="height: 100%; border: 1px solid #eee">
      <el-header>
        <div>
          <strong><span><a style="color: black;text-decoration: none" href="/index">乡村大数据疫情防控管理系统</a></span></strong>
        </div>
        <el-dropdown @command="handleCommand">
  <span class="el-dropdown-link" style="height: 10px;line-height: 10px;cursor: pointer">
    {{username}}<i class="el-icon-arrow-down el-icon--right"></i>
  </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-container>
        <el-aside :width="isCollapse ? '64px':'200px'" style="background-color: #fff">
          <el-menu router :default-active='$route.path'
                   :collapse-transition="false"
                   :collapse="isCollapse"
                   :unique-opened="false"
                   :default-openeds="['0','1','2','3']"
          >
            <el-submenu v-for="(item,index) in router" :index="index+''" :key="index">
              <template slot="title"><i class="el-icon-menu"></i><span>{{ item.name }}</span></template>
              <el-menu-item v-for="(item2,index2) in item.children" :index="item2.path" :key="index2"
              >{{ item2.name }}
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main v-if="$router.currentRoute.fullPath==='/index'">
          <div class="gva-card-box">
            <div class="gva-card gva-top-card">
              <div class="gva-top-card-left">
                <div class="gva-top-card-left-title">管理员，请开始一天的工作吧~</div>
                <div class="gva-top-card-left-dot">疫情期间，注意防控。</div>
              </div>
            </div>
          </div>
        </el-main>
        <el-main v-else>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>

export default {
  data() {
    return {
      currentMenu: '',
      router: "",
      isCollapse: false,
      username: '未登录'
    }
  },
  created() {
    if(localStorage.getItem("username")==null){
      this.$alert('请登录后再操作！',"消息",{
        type: 'warning',
        confirmButtonText:"确定",
        callback:action=>{
          this.$router.push('/')
        }
      })
    }else{
      this.username = localStorage.getItem("username")
    }
    this.router = this.$router.options.routes.filter(i => {
      return i.meta
    })
  },
  methods: {
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
    },
    handleCommand(command){
      if (command === 'logout'){
        window.location = '/'
        localStorage.removeItem("username")
      }
    }
  },
  name: 'index',
}
</script>
<style>
.home_container {
  height: 100%;
}

.el-header {
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  background-color: white;
  font-size: 20px;
}

.el-header > div {
  display: flex;
  align-items: center;
}


.el-menu {
  border-right: none;
}


.footer {
  text-align: center;
}
.dasboard-icon {
  font-size: 20px;
  color: rgb(85, 160, 248);
  width: 30px;
  height: 30px;
  margin-right: 10px;
}
.gva-card-box{
  padding: 12px 16px;
}
.gva-card {
  box-sizing: border-box;
  background-color: #fff;
  border-radius: 2px;
  height: auto;
  padding: 26px 30px;
  overflow: hidden;
  box-shadow: 0 0 7px 1px rgba(0, 0, 0, 0.03);
}
.v-modal {
  background-color: white;
  opacity: .9 !important;
  backdrop-filter: blur(80px);
}
</style>
