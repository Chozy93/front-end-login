// auth.module.js 모듈 저장소
import AuthService from "@/services/auth.service";

// 로컬스토리지의 user 객체 가져오기
const user = JSON.parse(localStorage.getItem('user'));

// user 가 있으면 -> initialState = { status : { loggedIn: true }, user}
// user 가 없으면 ->
//     initialState = { status : { loggedIn: false }, user: null }
// loggedIn : 현재 로그인된 상태인지 확인하는 변수
const  initialState = user? { status : { loggedIn: true }, user}
                          : { status : { loggedIn: false }, user: null };
// 모듈 저장소(auth : 모듈명)
// 다른 js 에서 공유저장소의 모듈을 접근하는 방법
// this.$store.state.모듈명.state값
export const auth = {
    namespaced : true,
    // state 속성 : 공유변수에 값저장
    state: initialState,
    // mutations 속성 : 공유 setter 함수 ( setter : 공유변수에 값을 저장하는 함수 )
    mutations: {
        // 로그인 성공시 실행되는 setter 함수 
        loginSuccess(state, user) {
            state.status.loggedIn = true;
            state.user = user;
        },     
        // 로그인 실패시 실행되는 setter 함수 
        loginFailure(state) {
            state.status.loggedIn = false;
            state.user = null;
        },        
        // 로그아웃시 실행되는 setter 함수 
        logout(state) {
            state.status.loggedIn = false;
            state.user = null;
        },        
        // 회웝가입 성공시 실행되는 setter 함수 
        registerSuccess(state) {
            state.status.loggedIn = false;
        },        
        // 회웝가입 실패시 실행되는 setter 함수 
        registerFailure(state) {
            state.status.loggedIn = false;
        },
    },
    // 공통함수 작성 : 로그인/로그아웃/회원가입 공통함수 정의
    // 로그인 공통함수 : 1)axios(비동기 함수) 연결 2)공통 상태관리
    //action: sotre/비동기함수 정의를 위한 속성
    //js 비동기 다루는 객체 : promise, axios 리턴값 promise
    //최신버전은 async/await 키워드 이용하여 비동기 프로그래밍함
    actions:{
      login({commit},user){
        return AuthService.login(user)
        .then(user=>{
          // 공통 상태 저장
          commit('loginSuccess',user) //mutations==setter 의 loginSuccess 함수 호출
          return Promise.resolve(user); //js Promise 비동기 함수 : 성공했을때 사용
        })
        .catch(error=>{
          commit('loginFailure');
          return Promise.reject(error); //실패했을때는 reject
        })
      }
    },
    logout({commit}){
      AuthService.logout();
      commit('logout')
    },
    register({commit},user){
      return AuthService.register(user)
      .then(response=>{
        commit('registerSuccess')
        return Promise.resolve(response.data);
      })
      .catch(error=>{
        commit('registerFailure')
        return Promise.reject(error);
      })
    }
};