/**
 * Created by ryankalla on 6/13/17.
 */
(function () {
    angular
        .module('MapApp')
        .controller('loginController', loginController);

    function loginController($location, userService) {

        var model = this;

        model.login = login;

        function login(username, password) {
            //var found = userService.findUserByCredentials(username, password);

            userService
                .login(username, password)
                .then(function (found){
                    if(found !== null) {
                        $location.url('/');
                    } else {
                        model.message = "sorry, " + username + " not found. please try again!";
                    }
                }, function(){
                    model.message = "sorry, invalid username or password. please try again!";

                })


        }
    }
})();