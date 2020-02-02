const User = require('../../models/User');
const UserSession = require('../../models/UserSession');

module.exports = (app) => {

    /**
     * Sign Up
     */
    app.post('/api/account/signup', (req, res, next) => {
        const { body } = req;
        const { 
            password,
            username,
            apiToken
        } = body;

        let { email } = body;
        
        if(!email) {
            return res.send({
                success: false,
                message: '오류: 이메일을 입력해 주세요.'
            });
        }
        if(!password) {
            return res.send({
                success: false,
                message: '오류: 비밀번호를 입력해 주세요.'
            });
        }
        if(!username) {
            return res.send({
                success: false,
                message: '오류: 이름을 입력해 주세요.'
            });
        }
        if(!apiToken) {
            return res.send({
                success: false,
                message: '오류: API TOKEN을 입력해 주세요.'
            });
        }

        email = email.toLowerCase();

        User.find({
            email: email
        }, (err, previousUsers) => {
            if(err) {
                return res.send({
                    success: false,
                    message: '오류: 서버 오류가 발생했습니다.'
                });
            }
            
            if(previousUsers.length > 0) {
                return res.send({
                    success: false,
                    message: '오류: 이미 가입된 이메일 입니다.'
                });
            }

            const newUser = new User();
            newUser.email = email;
            newUser.password = newUser.generateHash(password);
            newUser.username = username;
            newUser.apiToken = apiToken;
            newUser.save((err, user) => {
                if(err) {
                    return res.send({
                        success: false,
                        message: '오류: 서버 오류가 발생했습니다.'
                    });
                }
                return res.send({
                    success: true,
                    message: '회원가입이 완료 되었습니다.'
                });
            });
        })
    });

    /**
     * Sign In
     */
    app.post('/api/account/signin', (req, res, next) => {
        const { body } = req;
        const { password } = body;
        let { email } = body;

        if(!email) {
            return res.send({
                success: false,
                message: '오류: 이메일을 입력해 주세요.'
            });
        }
        if(!password) {
            return res.send({
                success: false,
                message: '오류: 비밀번호를 입력해 주세요.'
            });
        }

        email = email.toLowerCase();

        User.find({
            email: email
        }, (err, users) => {
            if(err) {
                return res.send({
                    success: false,
                    message: '오류: 서버 오류가 발생했습니다.'
                });
            }
            
            if(users.length != 1) {
                return res.send({
                    success: false,
                    message: '오류: 이메일이나 비밀번호를 확인해주세요.'
                });
            }
            
            const user = users[0];
            if(!user.validPassword(password)) {
                return res.send({
                    success: false,
                    message: '오류: 이메일이나 비밀번호를 확인해주세요.'
                });
            }

            const userSession = new UserSession();
            userSession.userId = user._id;
            userSession.save((err, doc) => {
                
                if(err) {
                    return res.send({
                        success: false,
                        message: '오류: 서버 오류가 발생했습니다.'
                    });
                }
                return res.send({
                    success: true,
                    message: '로그인 되었습니다.',
                    token: doc._id
                });
            });
        });


    });

    /**
     * verify
     */

    app.get('/api/account/verify', (req, res, next) => {
        // Get the token
        const { query } = req; 
        const { token } = query;

        UserSession.find({
            _id: token,
            isDelete: false
        }, (err, session) => {
            if(err) {
                console.log(err);
                return res.send({
                    success: false,
                    message: '오류: 서버 오류가 발생했습니다.'
                });
            }

            if(session.length != 1) {
                return res.send({
                    success: false,
                    message: '오류: 권한이 없습니다.'
                });
            }

            return res.send({
                success: true,
                message: 'success'
            });
        });
    });

    /**
     * logout
     */
    app.get('/api/account/logout', (req, res, next) => {
        // Get the token
        const { query } = req; 
        const { token } = query;

        UserSession.findOneAndUpdate({
            _id: token,
            isDelete: false
        }, {
            $set: {isDelete: true}
        }, null, (err, session) => {
            if(err) {
                console.log(err);
                return res.send({
                    success: false,
                    message: '오류: 서버 오류가 발생했습니다.'
                });
            }

            return res.send({
                success: true,
                message: 'success'
            });
        });
    });
}