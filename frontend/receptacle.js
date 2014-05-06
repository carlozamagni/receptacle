'use strict';

var app = angular.module('receptacle', []);


app.controller('postedDataController', function ($scope){

    var socket = io.connect('http://localhost:8090');
    //var socket = io.connect('http://secret-hamlet-1742.herokuapp.com');
    
    $scope.received = [];
    $scope.connected = false;

    socket.on('posted', function (data) {
        $scope.received.push({body:data['body'], query:data['query'], params:data['params']});
        $scope.$apply();
    });

    socket.on('connected', function (data) {
        $scope.connected = true;
        $scope.$apply();
    });
});