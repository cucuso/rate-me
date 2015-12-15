'use strict';

/**
 * @ngdoc function
 * @name maskSwapApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the maskSwapApp
 */
angular.module('horrorSwapApp')
  .controller('MainCtrl', function ($scope, AuthService) {

    $scope.credentials  = {email:'', password:''};

    $scope.submit= function(credentials){

      if(credentials){
        console.log('logging in user: ' + $scope.credentials );
        AuthService.login($scope.credentials);
        $scope.credentials  = {email:'', password:''};
      }
    }
  });
