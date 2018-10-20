var AuthenticationController = require('./controllers/authentication');

exports.AuthRoutes = function(authRoutes, requireLogin, requireAuth){


    // Auth Routes

    authRoutes.post('/register', AuthenticationController.register);
    authRoutes.post('/login', requireLogin, AuthenticationController.login);

    authRoutes.get('/protected', requireAuth, function(req, res){
        res.send({ content: 'Success'});
    });


}
