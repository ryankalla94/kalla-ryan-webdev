/**
 * Created by ryankalla on 5/31/17.
 */

require('./services/user.service.server');
require('./services/website.service.server');
require('./services/widget.service.server');
require('./services/page.service.server');



var mongoose = require('mongoose');

mongoose.Promise = require('q').promise;

//mongoose.createConnection('mongodb://localhost/mydb');;
