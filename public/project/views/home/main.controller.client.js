/**
 * Created by ryankalla on 6/22/17.
 */
(function () {
    angular
        .module('MapApp')
        .controller('mainController', mainController);

    function mainController(currentUser, userService, $location) {
        var model = this;
        model.currentUser = currentUser;

        model.logout = logout;


        function logout(){
            userService
                .logout()
                .then(function (){
                    location.reload();
                })
        }

    }
})();