angular.module('chatMod').controller('LoginCtrl',function ($rootScope,$scope,$http,$location) {
    $scope.login = function () {
        $http({
            url:'/user/login',
            method:'POST',
            data:{email:$scope.email}
        })
            .success(function (result) {
                if(result.err == 0){
                    $rootScope.user = result.data;
                    $location.path('/rooms')
                }else{
                    $rootScope.errorMsg = result.msg
                }
            })
    }
});