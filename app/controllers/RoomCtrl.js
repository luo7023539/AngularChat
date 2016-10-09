angular.module('chatMod').controller('RoomCtrl', function ($rootScope, $scope, $routeParams, $http) {
    console.log($routeParams);
    $http({
        url: '/room/' + $routeParams.id,
        method: 'GET'
    })
        .success(function (result) {
            if (result.err == 0) {
                $scope.room = result.data
            } else {
                $rootScope.errorMsg = result.msg
            }
        });
    $scope.socket = io.connect('ws://localhost:8080');
    $scope.socket.on('connect', function () {
        console.log('连接成功')
    });
    $scope.socket.on('message', function (msg) {
        $scope.room.messages.push(msg)
    });

    $scope.key = function (e) {
        if (e.ctrlKey && e.keyCode == 13) {
            console.log('ctrl and enter');
            $scope.socket.send({user:$rootScope.user,content:$scope.content});
        }
        /*
         if(!e.ctrlKey && e.keyCode == 13){
         $scope.content += '\n';
         }
         */
    }
});

/*
 *
 *
 * */