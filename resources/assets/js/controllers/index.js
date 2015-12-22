'use strict';

var app = require('angular').module('todoApp');

app.controller('MainCtrl', require('./MainCtrl'));
app.controller('TodoCtrl', require('./TodoCtrl'));
app.controller('RegisterCtrl', require('./RegisterCtrl'));
app.controller('LoginCtrl', require('./LoginCtrl'));