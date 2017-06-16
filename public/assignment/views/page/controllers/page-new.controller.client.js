/**
 * Created by ryankalla on 5/24/17.
 */
(function () {
    angular
        .module('WAM')
        .controller('pageNewController', pageNewController);

    function pageNewController($routeParams, currentUser, $location, pageService) {
        var model = this;

        model.userId = currentUser._id;
        model.websiteId = $routeParams['websiteId'];
        model.createPage = createPage;


        function init(){
            pageService
                .findPagesByWebsiteId(model.websiteId)
                .then(renderPages);

            function renderPages(pages){
                model.pages = pages;
            }

        }
        init();

        function createPage(page){
            if(typeof page === 'undefined'
                || page.name === null
                || page.name === ''
                || typeof page.name === 'undefined'){
                model.error = 'name is required';
                return;
            }
            pageService
                .createPage(model.websiteId, page)
                .then(function(){
                    $location.url("/website/" + model.websiteId + '/page');
                });
        }

    }
})();
