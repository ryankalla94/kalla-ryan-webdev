/**
 * Created by ryankalla on 6/22/17.
 */

(function() {
    angular
        .module("MapApp")
        .controller('pinListController', pinListController);


    function pinListController(pinService, $routeParams, currentUser) {

        var model = this;

        model.userId = currentUser._id;

        function init(){

            pinService
                .findPinsForUser(model.userId)
                .then(function(pins){
                    model.pins = pins;
                });

        }
        init();
    }

})();