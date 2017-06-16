/**
 * Created by ryankalla on 5/24/17.
 */
(function () {
    angular
        .module('WAM')
        .controller('pageListController', pageListController);

    function pageListController($routeParams, currentUser, pageService) {
        var model = this;

        model.userId = currentUser._id;
        model.websiteId = $routeParams['websiteId'];


        function init(){
            pageService
                .findPagesByWebsiteId(model.websiteId)
                .then(renderPages);

            function renderPages(pages){
                model.pages = pages;
            }
        }
        init();




    }
})();
