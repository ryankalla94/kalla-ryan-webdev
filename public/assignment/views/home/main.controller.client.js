/**
 * Created by ryankalla on 6/16/17.
 */
(function () {
    angular
        .module('WAM')
        .controller('mainController', mainController);

    function mainController(currentUser) {
        var model = this;
        model.currentUser = currentUser;
    }
})();