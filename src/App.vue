<template>
  <div id="app">
    <!-- 메뉴 달기 -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <router-link class="navbar-brand" to="/home">SimpleDMS</router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
          <ul class="navbar-nav">
            <!-- Home 드롭다운 메뉴 -->
            <li class="nav-item dropdown">
              <router-link
                class="nav-link dropdown-toggle"
                to="/home"
                id="navbarDropdownMenuLink"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Home
              </router-link>
              <ul
                class="dropdown-menu"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <li><router-link class="dropdown-item" to="/home">Home</router-link></li>
              </ul>
            </li>
            <li class="nav-item" v-if="showAdminBoard">
              <router-link class="nav-link" aria-current="page" to="/admin">Admin Board</router-link>
            </li>
            <!-- 메뉴 : User Board -->
            <li class="nav-item">
              <router-link class="nav-link" to="/user">User Board</router-link>
            </li>
          </ul>
        </div>

        <!-- 로그인 메뉴(로그인) -->
        <div v-if="!currentUser" class="navbar-nav ml-auto">
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link to="/register" class="nav-link">
                <font-awesome-icon icon="user-plus" />
                Sign Up
              </router-link>
            </li>

            <li class="nav-item">
              <router-link to="/login" class="nav-link">
                <font-awesome-icon icon="sign-in-alt" />
                Login
              </router-link>
            </li>
          </ul>
        </div>

        <!-- 로그인 메뉴(로그아웃) -->
        <div v-if="currentUser" class="navbar-nav ml-auto">
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link to="/profile" class="nav-link">
                <font-awesome-icon icon="user" />
                {{ currentUser.username }}
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to @click.prevent="logOut">
                <font-awesome-icon icon="sign-out-alt" />
                LogOut
              </router-link>
            </li>
          </ul>
        </div>
        
      </div>
    </nav>

    <router-view />
  </div>
</template>

<script>
export default {
  computed:{
    currentUser() {
      return this.$store.state.auth.user;
    },
    showAdminBoard(){
      if(this.currentUser&&this.currentUser.roles){
        return this.currentUser.roles.includes("ROLE_ADMIN");
      }
      return false;
    }
  },
  methods: {
    logOut(){
      this.$store.dispatch("auth/logout"); // 공통함수 logout 호출
      this.$router.push("/login")
    }
  },
}
</script>

<style lang="scss"></style>