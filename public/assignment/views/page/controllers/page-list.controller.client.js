/**
 * Created by ryankalla on 5/24/17.
 */
(function () {
    angular
        .module('WAM')
        .controller('pageListController', pageListController);

    function pageListController($routeParams, pageService) {
        var model = this;

        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];


        function init(){
            model.pages = pageService.findPagesByWebsiteId(model.websiteId);
        }
        init();




    }
})();/**
 * Created by ryankalla on 5/28/17.
 */
