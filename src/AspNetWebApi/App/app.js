"use strict";

/**
 * @ngdoc overview
 * @name webApiSample
 * @description
 * # webApiSample
 *
 * Main module of the application.
 */
angular
  .module("webApiSample", [
    "ngAnimate",
    //'ngAria',
    //'ngCookies',
    //'ngMessages',
    //'ngResource',
    "ngRoute",
    "ngFileUpload"
    //'ngSanitize',
    //'ngTouch'
  ])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when("/", {
        templateUrl: "app/home/home.html",
        controller: "HomeCtrl",
        controllerAs: "home"
      })
      .otherwise({
        redirectTo: "/"
      });
    $locationProvider.html5Mode(true);
  }).run(function($rootScope) {

    $rootScope.spinner = {
      active: true,
      on: function() {
        this.active = true;
      },
      off: function() {
        this.active = false;
      }
    };

  })
  .constant("apiUrl", "api/files/");