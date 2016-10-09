angular.module('chatMod').controller('RoomsCtrl', function ($rootScope, $scope, $http,$location) {
    $http({
        url: '/rooms',
        method: 'GET'
    })
        .success(function (result) {
            if (result.err == 0) {
                $scope.rooms = result.data
            } else {
                $rootScope.errorMsg = result.msg
            }
        });
    $scope.create = function () {
        $http({
            url: '/rooms/add',
            method: 'POST',
            data: {name: $scope.name}
        })
            .success(function (result) {
                $scope.name = '';
                $scope.rooms.push(result.data)
            })
    };
    $scope.toRoom =function (_id) {
        console.log(_id);
        $location.path('/rooms/'+_id)

    };

});

/*
* 实现过滤
* 在当前作用域上另加一个属性保存原数组
* 使用input内的值进行过滤 将返回值赋值给用来遍历的属性
* */

/*
* 实现将过滤和新建两个功能关联在一起
* */

/*
* 点击房间名的时候要进入某房间的聊天界面
* 1、给名字所在的DOM严肃增加ng-click事件
* 2、在时间函数里面跳转到聊天页面 rooms/:roomId
* */