angular.module('myApp',
  ['ngRoute','ngCookies','ngMessages','ngSanitize','afkl.lazyImage','satellizer','ngFileUpload','ngMap','btford.socket-io',
  'authModApp',
  'app.common','app.home','app.store','app.chat','app.admin','ngMaterial','app.review','app.product','app.user']
  ).config(['$routeProvider','$mdThemingProvider',
  function($routeProvider,$mdThemingProvider) {
      $mdThemingProvider.theme('default')
    .primaryPalette('cyan')
    .accentPalette('yellow')
     .warnPalette('orange');
     //.backgroundPalette('blue-grey');
      $routeProvider.
      otherwise({
        redirectTo: '/home'
      });
  }]).run(function ($rootScope, $location,$route, $timeout) {

    $rootScope.config = {};
    $rootScope.config.app_url = $location.url();
    $rootScope.config.app_path = $location.path();
    $rootScope.layout = {};
    $rootScope.layout.loading = false;

    $rootScope.$on('$routeChangeStart', function () {
        
        //show loading gif
        $timeout(function(){
          $rootScope.layout.loading = true;          
        });
    });
    $rootScope.$on('$routeChangeSuccess', function () {
        
        //hide loading gif
        $timeout(function(){
          $rootScope.layout.loading = false;
        }, 1000);
    });
    $rootScope.$on('$routeChangeError', function () {

        //hide loading gif
        alert('wtff');
        $rootScope.layout.loading = false;

    });
});

// red, pink, purple, deep-purple, indigo, blue, light-blue, cyan, teal, green,,
//light-green, lime, yellow, amber, orange, deep-orange, brown, grey, blue-grey
// .config(function($mdThemingProvider) {
//   $mdThemingProvider.theme('default')
//     .primaryPalette('pink')
//     .accentPalette('orange');
// });//"angular-material": "master","ng-directive-lazy-image": "afkl-lazy-image#^0.3.1"
