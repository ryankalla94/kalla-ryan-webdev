/**
 * Created by ryankalla on 5/22/17.
 */

(function(){
    angular
        .module('WAM')
        .factory('userService', userService);

    function userService($http) {


        var api = {
            findUserById: findUserById,
            findUserByCredentials: findUserByCredentials,
            findUserByUsername: findUserByUsername,
            createUser: createUser,
            updateUser: updateUser,
            deleteUser: deleteUser,
            login: login,
            register: register,
            logout: logout,
            loggedIn : loggedIn,
            checkAdmin: checkAdmin,
            findAllUsers: findAllUsers
        };
        return api;


        function findAllUsers(){
            var url = '/api/assignment/user';
            return $http.get(url)
                .then(function (response){
                    return response.data;
                });
        }

        function login(username, password){
            var url = '/api/assignment/login';
            var credentials = {
                username : username,
                password : password
            };
            return $http.post(url, credentials)
                .then(function (response){
                    return response.data;
                });
        }

        function register(userObj){
            var url = "/api/assignment/register";
            return $http.post(url, userObj)
                .then(function (response){
                    return response.data;
                });

        }

        function loggedIn(){
            var url = "/api/assignment/loggedin";
            return $http.get(url)
                .then(function (response){
                    return response.data;
                });
        }

        function checkAdmin(){
            var url = "/api/assignment/checkAdmin";
            return $http.get(url)
                .then(function (response){
                    return response.data;
                });
        }

        function logout(){
            var url = '/api/assignment/logout';
            return $http.post(url)
                .then(function (response){
                    return response.data;
                });
        }


        function createUser(user){
            var url = '/api/assignment/user';
            return $http.post(url, user)
                .then(function (response){
                    return response.data;
                });
        }


        function findUserByUsername(username){
            var url = '/api/assignment/user?username=' + username;
            return $http.get(url)
                .then(function (response){
                    return response.data;
                });
        }

        function findUserById(userId) {
            var url = '/api/assignment/user/' + userId;
            return $http.get(url)
                .then(function (response){
                    return response.data;
                });
        }

        function findUserByCredentials(username, password) {
            var url = '/api/assignment/user?username=' + username + "&password=" + password;
            return $http.get(url)
                .then(function (response){
                    return response.data;
                });
        }

        function updateUser(userId, user){
            var url = '/api/assignment/user/' + userId;
            return $http.put(url, user)
                .then(function (response){
                    return response.data;
                });
        }

        function deleteUser(userId){
            var url = '/api/assignment/user/' + userId;
            return $http.delete(url)
                .then(function (response){
                    return response.data;
                });
        }


    }
})();