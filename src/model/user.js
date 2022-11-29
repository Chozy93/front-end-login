// user.js 공통 파일: 로그인 유저정보 저장
// 유저객체 생성 : let user = new User(매개변수...);
export default class User {
    // js 생성자 : constructor(매개변수...) {}
    constructor(username, password, email) {
        this.username = username;
        this.password = password;
        this.email = email;
    }
}