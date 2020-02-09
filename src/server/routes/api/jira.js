// ES6 or Typescript
const JiraClient = require('jira-connector');
const User = require('../../models/User');
const UserSession = require('../../models/UserSession');

module.exports = (app) => {
    app.get('/api/jira/issue', (req, res, next) => {
        const { headers } = req;
        const { authorization } = headers;

        UserSession.findOne({
            _id: authorization,
            isDelete: false
        }).exec()
        .then(userSession => {
            return User.findOne({
                _id: userSession.userId,
                isDelete: false
            }).exec()
            .then(user => user)
        })
        .then(user => {
            const resIssues = [];
            const jira = new JiraClient({
                host: "sixshop.atlassian.net",
                basic_auth: {
                    email: user.email,
                    api_token: user.apiToken
                    }
            });
    
            jira.search.search({
                jql: 'project = SS2 AND status in ("In Progress", "To Do") AND resolution = Unresolved AND assignee in (currentUser()) ORDER BY priority DESC'
            })
            .then(response => {
                response.issues.forEach(issue => {
                    resIssues.push({
                        key: issue.key,
                        title: issue.fields.summary,
                        storyPoint: issue.fields.customfield_10105
                    });
                });
    
                return res.send({
                    success: true,
                    issues: resIssues
                })
            });
        })
        .then(undefined, (err) => {
            return res.send({
                success: false,
                message: '오류: 서버 오류가 발생했습니다.'
            });
        });
    });
}
