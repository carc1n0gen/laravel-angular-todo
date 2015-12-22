'use strict';

var app = require('angular').module('todoApp');

app.factory('authFactory', require('./authFactory'));
app.factory('userFactory', require('./userFactory'));
app.factory('taskFactory', require('./taskFactory'));
app.factory('storageFactory', require('./storageFactory'));
app.factory('addTokenHeaderFactory', require('./addTokenHeaderFactory'));
app.factory('authFailedFactory', require('./authFailedFactory'));