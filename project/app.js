/**
 * Created by ryankalla on 6/13/17.
 */
require('./services/user.service.server');


var mongoose = require('mongoose');

mongoose.Promise = require('q').Promise;

//mongoose.createConnection('mongodb://localhost/mydb');

var connectionString = 'mongodb://127.0.0.1:27017/mydb'; // for local
if(process.env.MLAB_USERNAME_WEBDEV) { // check if running remotely
    var username = process.env.MLAB_USERNAME_WEBDEV; // get from environment
    var password = process.env.MLAB_PASSWORD_WEBDEV;
    connectionString = 'mongodb://' + username + ':' + password;
    connectionString += '@ds137261.mlab.com:37261/heroku_fbpztk02'; // user yours
}

mongoose.createConnection(connectionString);