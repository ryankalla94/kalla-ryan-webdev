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


    }

})();