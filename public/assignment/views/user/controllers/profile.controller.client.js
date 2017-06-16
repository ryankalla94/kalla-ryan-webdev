/**
 * Created by ryankalla on 5/23/17.
 */

(function () {
    angular
        .module('WAM')
        .controller('profileController', profileController);

    function profileController($location, $routeParams, currentUser, userService) {

        var model = this;

         // model.userId = $routeParams['userId'];


        model.userId = currentUser._id;

        model.updateUser = updateUser;
        model.deleteUser = deleteUser;
        model.logout = logout;

        function init(){
            // userService
            //     .findUserById(model.userId)
            //     .then(renderUser, userError);

            renderUser(currentUser);
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

    }
})();