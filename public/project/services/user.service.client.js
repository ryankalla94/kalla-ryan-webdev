/**
 * Created by ryankalla on 6/13/17.
 */
(function () {

    angular
        .module('MapApp')
        .service('userService', userService);


    function userService($http) {
        this.findUserById = findUserById;
        this.findUserByCredentials = findUserByCredentials;
        this.findUserByUsername = findUserByUsername;
        this.createUser = createUser;
        this.updateUser = updateUser;
        this.deleteUser = deleteUser;
        this.login = login;
        this.register = register;
        this.logout = logout;
        this.loggedIn  = loggedIn;
        this.checkAdmin = checkAdmin;
        this.findAllUsers = findAllUsers;
        this.friendRequest = friendRequest;
        this.addFriend = addFriend;
        this.removeFriend = removeFriend;



        function findAllUsers(){
            var url = '/api/project/user';
            return $http.get(url)
                .then(function (response){
                    return response.data;
                });
        }

        function login(username, password){
            var url = '/api/project/login';
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
            var url = "/api/project/register";
            return $http.post(url, userObj)
                .then(function (response){
                    return response.data;
                });

        }

        function loggedIn(){
            var url = "/api/project/loggedin";
            return $http.get(url)
                .then(function (response){
                    return response.data;
                });
        }

        function checkAdmin(){
            var url = "/api/project/checkAdmin";
            return $http.get(url)
                .then(function (response){
                    return response.data;
                });
        }

        function logout(){
            var url = '/api/project/logout';
            return $http.post(url)
                .then(function (response){
                    return response.data;
                });
        }

        function createUser(user){
            var url = '/api/project/user';
            return $http.post(url, user)
                .then(function (response){
                    return response.data;
                });
        }


        function findUserByUsername(username){
            var url = '/api/project/user?username=' + username;
            return $http.get(url)
                .then(function (response){
                    return response.data;
                });
        }

        function findUserById(userId) {
            var url = '/api/project/user/' + userId;
            return $http.get(url)
                .then(function (response){
                    return response.data;
                });
        }

        function findUserByCredentials(username, password) {
            var url = '/api/project/user?username=' + username + "&password=" + password;
            return $http.get(url)
                .then(function (response){
                    return response.data;
                });
        }

        function updateUser(userId, user){
            var url = '/api/project/user/' + userId;
            return $http.put(url, user)
                .then(function (response){
                    return response.data;
                });
        }

        function deleteUser(userId){
            var url = '/api/project/user/' + userId;
            return $http.delete(url)
                .then(function (response){
                    return response.data;
                });
        }


        function friendRequest(userId, user){
            var url = '/api/project/friend/' + userId + '/request';
            return $http.post(url, user)
                .then(function (response){
                    return response.data;
                });
        }

        function addFriend(request, user){
            var url = '/api/project/friend/' + request._id + '/' + user._id;
            return $http.post(url, {})
                .then(function (response){
                    return response.data;
                });
        }

        function removeFriend(friend, user){
            var url = '/api/project/friend/' + friend._id + '/' + user._id;
            return $http.delete(url)
                .then(function (response){
                    return response.data;
                });
        }


    }

})();