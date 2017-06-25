/**
 * Created by ryankalla on 6/13/17.
 */

(function () {
    angular
        .module('MapApp')
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/home/home.html',
                controller: 'mainController',
                controllerAs: 'model',
                resolve : {
                    currentUser : checkCurrentUser
                }
            })
            .when('/login', {
                templateUrl: 'views/user/templates/login.view.client.html',
                controller: 'loginController',
                controllerAs: 'model'
            })
            .when('/register', {
                templateUrl: 'views/user/templates/register.view.client.html',
                controller: 'registerController',
                controllerAs: 'model'
            })
            .when('/profile', {
                templateUrl: 'views/user/templates/profile.view.client.html',
                controller: 'profileController',
                controllerAs: 'model',
                resolve : {
                    currentUser : checkLoggedIn
                }
            })
            .when('/pin', {
                templateUrl: 'views/pin/templates/pin-list.view.client.html',
                controller: 'pinListController',
                controllerAs: 'model',
                resolve : {
                    currentUser : checkLoggedIn
                }
            })
            .when('/pin/new', {
                templateUrl: 'views/pin/templates/pin-new.view.client.html',
                controller: 'pinNewController',
                controllerAs: 'model',
                resolve : {
                    currentUser : checkLoggedIn
                }
            })
            .when('/pin/:pinId', {
                templateUrl: 'views/pin/templates/pin.view.client.html',
                controller: 'pinController',
                controllerAs: 'model',
                resolve : {
                    currentUser : checkCurrentUser
                }
            })
            .when('/pin/:pinId/edit', {
                templateUrl: 'views/pin/templates/pin-edit.view.client.html',
                controller: 'pinEditController',
                controllerAs: 'model',
                resolve : {
                    currentUser : checkLoggedIn
                }
            })
            .when('/user/search', {
                templateUrl: 'views/user/templates/user-search.view.client.html',
                controller: 'userSearchController',
                controllerAs: 'model',
                resolve : {
                    currentUser : checkLoggedIn
                }
            })

    }

    function checkLoggedIn(userService, $q, $location){
        var deferred = $q.defer();

        userService
            .loggedIn()
            .then(function (user){
                if(user === '0'){
                    deferred.reject();
                    $location.url('/');
                } else{
                    deferred.resolve(user);
                }
            });

        return deferred.promise;
    }

    function checkCurrentUser(userService, $q, $location){
        var deferred = $q.defer();

        userService
            .loggedIn()
            .then(function (user){
                if(user === '0'){
                    deferred.resolve({});
                    //$location.url('/');
                } else{
                    deferred.resolve(user);
                }
            });

        return deferred.promise;
    }


})();