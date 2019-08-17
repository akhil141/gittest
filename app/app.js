var app = angular.module('myApp', ['ngRoute', 'ngAnimate', 'toaster']);
//config
app.config(['$routeProvider',
  function ($routeProvider) {
        $routeProvider.
        when('/login', {
            title: 'Login',
            templateUrl: 'login.html',
            controller: 'authCtrl'
        })
            .when('/logout', {
                title: 'Logout',
                templateUrl: 'login.html',
                controller: 'logoutCtrl'
            })
            
            .when('/dashboard', {
                title: 'Dashboard',
                templateUrl: 'index.html',
                controller: 'authCtrl'
            })
            .when('/', {
                title: 'Login',
                templateUrl: 'login.html',
                controller: 'authCtrl',
                role: '0'
            })
            .otherwise({
                redirectTo: '/login'
            });
  }])
    .run(function ($rootScope, $location, Data) {
        $rootScope.$on("$routeChangeStart", function (event, next, current) {
            $rootScope.authenticated = false;
            Data.get('session').then(function (results) {
                
                if (results.id) {
                    $rootScope.authenticated = true;
                    $rootScope.id = results.id;
                    $rootScope.username = results.username;
                } else {
                    var nextUrl = next.$$route.originalPath;
                    if (nextUrl == '/login') {

                    } else {
                        $location.path("/login");
                    }
                }
            });
        });
    });