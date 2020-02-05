const User = require('../../models/User');

module.exports = (app) => {
    /**
     * getUsers
     */
    app.get('/api/user/list', (req, res, next) => {
        User.find({
            isDelete: false
        }, (err, users) => {
            if(err) {
                console.log(err);
                return res.send({
                    success: false,
                    message: '오류: 서버 오류가 발생했습니다.'
                });
            }

            return res.send({
                success: true,
                users: users,
                message: 'success'
            });
        });
    });
}