
'use strict';

/**
 * @ngdoc function
 * @name maskSwapApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the maskSwapApp
 */
angular.module('horrorSwapApp')
  .controller('ApplicationCtrl', function ($scope, AuthService) {

     $scope.user = AuthService.user;

    $scope.$watch(
      function(){ return AuthService.user },

      function(newVal) {
        $scope.user = newVal;
      }
    )

  });


