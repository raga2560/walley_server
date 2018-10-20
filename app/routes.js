var AuthenticationController = require('./controllers/authentication'),  
    TodoController = require('./controllers/todos'),  
    BookingController = require('./controllers/booking'),  
    PostController = require('./controllers/post'),  
    express = require('express'),
    passportService = require('../config/passport'),
    passport = require('passport');

var fAuthRoutes = require('./authroutes');
var funregisteredRoutes = require('./unregisteredroutes');
var requireAuth = passport.authenticate('jwt', {session: false}),
    requireLogin = passport.authenticate('local', {session: false});

module.exports = function(app){

    var apiRoutes = express.Router(),
        authRoutes = express.Router(),
        todoRoutes = express.Router();
        bookingRoutes = express.Router();
        postRoutes = express.Router();
        unregisteredRoutes = express.Router();

    // Auth Routes
    apiRoutes.use('/auth', authRoutes);

    fAuthRoutes.AuthRoutes(authRoutes, requireLogin, requireAuth);

    app.use('/api', apiRoutes);


    apiRoutes.use('/cryptowallet/unregistered', unregisteredRoutes);

    funregisteredRoutes.UnregisteredRoutes(unregisteredRoutes, requireLogin, requireAuth);

    app.use('/api', apiRoutes);


    // Todo Routes
    apiRoutes.use('/todos', todoRoutes);

    todoRoutes.get('/', requireAuth, AuthenticationController.roleAuthorization(['reader','creator','editor']), TodoController.getTodos);
    todoRoutes.post('/', requireAuth, AuthenticationController.roleAuthorization(['creator','editor']), TodoController.createTodo);
    todoRoutes.delete('/:todo_id', requireAuth, AuthenticationController.roleAuthorization(['editor']), TodoController.deleteTodo);


    apiRoutes.use('/booking', bookingRoutes);
    bookingRoutes.get('/getBookings',  BookingController.getBookings);
    bookingRoutes.post('/getRookBooking',  BookingController.getRoomBookings);
    bookingRoutes.post('/createBooking',  BookingController.createBooking);
    bookingRoutes.get('/delete/:booking_id', requireAuth, AuthenticationController.roleAuthorization(['editor']), BookingController.deleteBooking);

    bookingRoutes.get('/getBooking/:booking_id',  BookingController.getBooking);

    apiRoutes.use('/post', postRoutes);
    postRoutes.get('/getposts',  PostController.getPosts);
    postRoutes.get('/getComments/:post_id',  PostController.getComments);
    postRoutes.post('/createPost',  PostController.createPost);
    postRoutes.post('/createComment',  PostController.createComment);
    app.use('/api', apiRoutes);

}
