angular.module('chatMod', ['ngRoute'])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/',{
                templateUrl:'/pages/login.html',
                controller:'LoginCtrl'
            })
            .when('/rooms',{
                templateUrl:'/pages/rooms.html',
                controller:'RoomsCtrl'
            })
            .when('/rooms/:id',{
                templateUrl:'/pages/room.html',
                controller:'RoomCtrl'
            })
            .otherwise({
                redirectTo:'/'
            })
    })
    .run(function ($rootScope) {
        window.onload = function () {
            $rootScope.socket = io.connect('ws://localhost:8080');
            socket.on('connect',function () {
                console.log('连接成功')
            })
        }

    })
;


