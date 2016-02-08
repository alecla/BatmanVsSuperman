'use strict';

var angular = require('angular'); // jshint ignore:line
var angularAnimate = require('angular-animate');
var jQuery = require('jQuery'); // jshint ignore:line
var lity = require('lity'); // jshint ignore:line
var app = angular.module('BatmanVsSupermanApp', [angularAnimate]);

app.controller('homeCtrl', require('./controllers/homeCtrl'));
app.service('gridService', require('./services/gridservice'));