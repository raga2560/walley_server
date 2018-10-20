var AuthenticationController = require('./controllers/authentication');

exports.UnregisteredRoutes = function(authRoutes, requireLogin, requireAuth){


    // Auth Routes

//    authRoutes.post('/register', AuthenticationController.register);
//    authRoutes.post('/unregistered/user/authenticate', requireLogin, AuthenticationController.login);

// authentication form is sent
    authRoutes.post('/unregistered/user/authenticate', requireLogin, AuthenticationController.authenticate);
// userform is sent
    authRoutes.post('/unregistered/user/subscribe', AuthenticationController.subscribe);

    authRoutes.get('/protected', requireAuth, function(req, res){
        res.send({ content: 'Success'});
    });


}
