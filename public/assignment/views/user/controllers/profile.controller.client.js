/**
 * Created by ryankalla on 5/23/17.
 */

(function () {
    angular
        .module('WAM')
        .controller('profileController', profileController);

    function profileController($location, $routeParams, userService) {

        var model = this;

        model.userId = $routeParams['userId'];

        model.user = userService.findUserById(model.userId);

    }
})();