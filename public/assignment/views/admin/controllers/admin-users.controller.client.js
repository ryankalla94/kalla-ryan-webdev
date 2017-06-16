/**
 * Created by ryankalla on 6/14/17.
 */
(function () {
    angular
        .module('WAM')
        .controller('adminUsersController', adminUsersController);

    function adminUsersController($location, userService) {

        var model = this;
        model.deleteUser = deleteUser;


        function init(){
            userService
                .findAllUsers()
                .then(function(users){
                    model.users = users;
                })
        }
        init();

        function deleteUser(user){
            userService
                .deleteUser(user._id)
                .then(function (){
                    $location.url('/admin/user');
                }, function(){
                    console.log("unable to unregister");
                });
        }
    }
})();