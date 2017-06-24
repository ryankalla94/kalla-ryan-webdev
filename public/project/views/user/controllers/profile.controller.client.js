/**
 * Created by ryankalla on 6/13/17.
 */


(function () {
    angular
        .module('MapApp')
        .controller('profileController', profileController);

    function profileController($location, $routeParams, userService, currentUser) {

        var model = this;

        model.userId = currentUser._id;
        model.requests = currentUser.requests;
        model.friends = currentUser.friends;

        model.message = null;

        //model.userId = currentUser._id;

        model.updateUser = updateUser;
        model.deleteUser = deleteUser;
        model.logout = logout;
        model.addFriend = addFriend;
        model.removeFriend = removeFriend;


        function init(){
            userService
                .findUserById(model.userId)
                .then(renderUser, userError);

            //renderUser(currentUser);
        }

        init();


        function renderUser(user){
            model.user = user;
        }

        function userError(error){
            model.error = "User not found";
        }

        function updateUser(user){
            userService
                .updateUser(user._id, user)
                .then(function (){
                    model.message = "User update was successful";
                });
        }

        function deleteUser(user){
            userService
                .deleteUser(user._id)
                .then(function (){
                    $location.url('/');
                }, function(){
                    model.error = "Unable to unregister";
                });
        }


        function logout(){
            userService
                .logout()
                .then(function (){
                    $location.url('/');
                })
        }

        function addFriend(request){
            userService
                .addFriend(request, currentUser)
                .then(function(){
                    model.message = "friend added";
                })
        }

        function removeFriend(friend){
            userService
                .removeFriend(friend, currentUser)
                .then(function(){
                    model.message = "friend removed";
                })
        }

    }
})();