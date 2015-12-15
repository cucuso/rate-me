'use strict';

/**
 * @ngdoc overview
 * @name maskSwapApp
 * @description
 * # maskSwapApp
 *
 * Main module of the application.
 */
angular
  .module('horrorSwapApp', [
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .service( 'AuthService', function($http) {

    var self = this;
    this.user = window.user;


    this.logout = function(){
      $http.post('/logout');
    };


    this.login = function(credentials){
      $http.post('/login', credentials).then(function(res){
        self.user = res;
      });
    };
  });
