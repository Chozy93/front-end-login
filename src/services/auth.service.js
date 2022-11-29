import http from"../http-common"

class AuthService{
    //1.front: DB에 사용자가 있는지 확인 요청(id/pwd)
    //2.back: DB에 사용자가 있는지 확인
    //      ->(if) 있으면 토큰을 발행하여 front로 던짐(user+토큰)
    login(user){
        // user 매개변수를 임시 객체에 저장
        let userData={
            username: user.username,
            password: user.password
        }

        // axios 통신 db에 사용자가 있는지 조회 요청
        // get으로 요청하면 url에 정보가 노출됨 그러므로 post로 요청함
        //(but 해킹자체를 막지 못하지만 일반인에게는 쉽게 노츨되는것을 막음)
    return http
                .post('/auth/signin',userData)
                .then(response=>{
                    if(response.data.accessToken){
                        localStorage.setItem('user',JSON.stringify(response.data));
                    }
                    return response.data;
                })
        
    }

    logout(){
        localStorage.removeItem('user');
    }

    register(user) {
        // user 매개변수를 임시 객체에 저장
        let userData = {
          username: user.username,
          email: user.email,
          password: user.password,
        };
    
        return http.post('/auth/signup', userData);
      }
    
}

export default new AuthService();