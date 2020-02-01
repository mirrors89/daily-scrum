const os = require('os');

module.exports = (app) => {
    app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username }));
}