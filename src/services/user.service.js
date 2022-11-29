// user.service.js : test 파일
// 토큰을 헤더 포함 springboot 요청하는 샘플
// 토큰 헤더에 미포함 -> 401,403 에러 발생(인증관련 에러)
import http from "../http-common"
import authHeader from "./auth-header"

class UserService {
    // 인증없이 모두 접속가능한 url 요청
    getPublicContent(){
        return http.get('/test/all');
    }

    getUserBoard(){
        return http.get('/test/user',{headers : authHeader()}) //url과 토큰을 같이 보내는 것임
    }

    getAdminBoard(){
        return http.get('/test/admin',{headers : authHeader()}) //url과 토큰을 같이 보내는 것임
    }
}

export default new UserService();