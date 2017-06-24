/**
 * Created by ryankalla on 6/13/17.
 */


(function () {
    angular
        .module('MapApp')
        .controller('userSearchController', userSearchController);

    function userSearchController($location, $routeParams, userService, currentUser) {

        var model = this;

        model.currentUser = currentUser;
        model.userId = currentUser._id;
        model.message = null;

        model.newSearch = newSearch;
        model.friendRequest = friendRequest;
        model.deleteUser = deleteUser;
        model.searchTerm = "";



        function init() {

            userService
                .findAllUsers()
                .then(function(users){
                    model.users = users;
                })

        }

        init();


        function friendRequest(user){
            userService
                .friendRequest(user._id, currentUser)
                .then(function(){
                    model.message = "Friend request sent!";
                })
        }


        function newSearch(term){
            userService
                .findAllUsers()
                .then(function(users){
                    model.users = users;
                    if(term.length === 0){
                        return;
                    }
                    var newUsers = [];
                    for(var u in model.users){
                        if(model.users[u].username.indexOf(term) > -1){
                            newUsers.push(model.users[u]);
                        }
                    }
                    model.users = newUsers;
                });
        }


        function deleteUser(user){
            userService
                .deleteUser(user._id)
                .then(function (){
                    newSearch(model.searchTerm);
                }, function(){
                    model.error = "Unable to unregister";
                });
        }


    }
})();