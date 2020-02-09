const Scrum = require('../../models/Scrum');
const ScrumBoard = require('../../models/ScrumBoard');
const UserSession = require('../../models/UserSession');

module.exports = (app) => {

    app.get('/api/scrum/board', (req, res, next) => {
        const { query } = req; 
        const { date } = query;

        ScrumBoard.findOne({
            date: date
        }).exec()
        .then(scrumBoard => {
            if(!scrumBoard) {
                return res.send({
                    success: false,
                    scrumBoard: []
                });
            }

            return res.send({
                success: true,
                scrumBoard: scrumBoard,
            });

        })
        .then(undefined, (err) => {
            return res.send({
                success: false,
                message: '오류: 서버 오류가 발생했습니다.'
            });
        });
    });

    app.post('/api/scrum/board', (req, res, next) => {
        const { body } = req;
        const { date } = body;


        const scrumBoard = new ScrumBoard();
        scrumBoard.date = date;
        scrumBoard.save((err, doc) => {

            if(err) {
                return res.send({
                    success: false,
                    message: '오류: 서버 오류가 발생했습니다.'
                });
            }
            return res.send({
                success: true,
                scrumBoard: doc
            });
        });
    });


    app.get('/api/scrum/list', (req, res, next) => {
        const { query } = req; 
        const { scrumBoardId } = query;

        Scrum.find({
            scrumBoardId: scrumBoardId
        }).exec()
        .then(scrums => {
            return res.send({
                success: true,
                scrums: scrums
            });
        })
        .then(undefined, (err) => {
            return res.send({
                success: false,
                message: '오류: 서버 오류가 발생했습니다.'
            });
        });
    });

    app.post('/api/scrum', (req, res, next) => {
        const { headers } = req;
        const { authorization } = headers;
        const { body } = req; 
        
        const {
            scrumBoardId,
            content1,
            content2,
            content3
         } = body;

         const scrum = new Scrum();
         UserSession.findOne({
            _id: authorization,
            isDelete: false
        }).exec()
        .then(userSession => {

            scrum.userId = userSession.userId;
            scrum.scrumBoardId = scrumBoardId;
            scrum.content1 = content1;
            scrum.content2 = content2;
            scrum.content3 = content3;
            
            scrum.save((err, doc) => {
                if(err) {
                    return res.send({
                        success: false,
                        message: '오류: 서버 오류가 발생했습니다.'
                    });
                }
                return res.send({
                    success: true,
                    scrum: doc
                });
            });
        })
        .then(undefined, err => {
            return res.send({
                success: false,
                message: '오류: 서버 오류가 발생했습니다.'
            });
        });
    });

}