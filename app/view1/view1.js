'use strict';

angular.module('myApp.view1', ['ngRoute','firebase'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/home', {
            templateUrl: 'view1/view1.html',
            controller: 'View1Ctrl'
        });
    }])

    .controller('View1Ctrl', ['$firebaseObject','$scope','$firebaseArray', function($firebaseObject, $scope, $firebaseArray) {
        $scope.fetching_complete = false;
        var ref = new Firebase("https://blazing-inferno-5433.firebaseio.com/users");
        var list = $firebaseArray(ref);
        $scope.warning_type = ['Inappropriate Message', 'Rude or Abusive', 'Spam', 'Other'];
        $scope.updateBan = function(flag, index){

            list[index].banned = flag;
            list.$save(index).then(function(ref) {
                ref.key() === list[index].$id; // true
            });
        };

        ref.on("value", function(snapshot) {
            $scope.fetching_complete = true;
            var firebase_users  = snapshot.val();
            $scope.users_arr = Object.keys(firebase_users).map(function(k) { return firebase_users[k] });
        });
    }]);