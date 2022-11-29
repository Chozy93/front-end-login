<template>
  <div class="col-md-12">
    <div class="card card-container">
      <img
        id="profile-img"
        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
        class="profile-img-card"
      />
      <form name="form" @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="username">Username</label>
          <!-- v-validate: vee-validate 라이브러리에서 제공(vue 전용 유효성 체크 라이브러리) -->
          <!-- v-validate="유효성속성1 | 유효성속성2 | ...." -->
          <input
            v-model="user.username"
            v-validate="'required'"
            type="text"
            class="form-control"
            name="username"
          />
          <!-- v-validate가 name이 username인 태그의 에러를 체크하면 아래 div를 활성화함 -->
          <div
            v-if="errors.has('username')"
            class="alert alert-danger"
            role="alert"
          >
            Username is required!
          </div>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            v-model="user.password"
            v-validate="'required'"
            type="password"
            class="form-control"
            name="password"
          />
          <div
            v-if="errors.has('password')"
            class="alert alert-danger"
            role="alert"
          >
            Password is required!
          </div>
        </div>
        <div class="form-group mt-3">
          <button class="btn btn-primary btn-block" :disabled="loading">
            <span
              v-show="loading"
              class="spinner-border spinner-border-sm"
            ></span>
            <span>Login</span>
          </button>
        </div>
        <div class="form-group">
          <div v-if="message" class="alert alert-danger" role="alert">
            {{ message }}
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import User from "../model/user"
export default {
  data() {
    return {
      user: new User("",""),
      message: "",
      loading: false,
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  methods: {
    handleLogin() {
      this.loading = true;
      this.$validator.validateAll().then((isVaild) => {
        //  v-validate 의 모든 유효성 검사 통과시 vaildateAll()의 함수의 isVaild의 값은 true
        if (!isVaild) {
          this.loading = false;
          return;
        }
        // 로그인 실행 부분
        if (this.user.username && this.user.password) {
          // 모듈 공통함수 호출 this.$store.dispatch("모듈명/함수명",매개변수)
          this.$store
            .dispatch("auth/login", this.user)
            .then(() => {
              this.$router.push("/profile");
            })
            // 참고) if/else 문 대신에 ->or(||) and(&&) 연산자를 사용할때도 있음
            .catch((error) => {
              this.loading = false;
              this.message =
                (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
                error.message ||
                error.toString();
            });
        }
      });
    },
  },
  // created() Vue 생성되자 마자 실행되는이벤트(화면은 생성되지 않은 상태)
  created() {
    if (this.loggedIn) {
      this.$router.push("/profile"); //강제 이동
    }
  },
};
</script>

<style scoped>
label {
  display: block;
  margin-top: 10px;
}

.card-container.card {
  max-width: 350px !important;
  padding: 40px 40px;
}

.card {
  background-color: #f7f7f7;
  padding: 20px 25px 30px;
  margin: 0 auto 25px;
  margin-top: 50px;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}

.profile-img-card {
  width: 96px;
  height: 96px;
  margin: 0 auto 10px;
  display: block;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
}
</style>