/**
 * Created by ryankalla on 5/24/17.
 */
(function () {
    angular
        .module('WAM')
        .controller('pageEditController', pageEditController);

    function pageEditController($routeParams, currentUser, $location, pageService) {
        var model = this;

        model.userId = currentUser._id;
        model.websiteId = $routeParams['websiteId'];
        model.pageId = $routeParams['pageId'];
        model.deletePage = deletePage;
        model.updatePage = updatePage;


        function init(){
            pageService
                .findPagesByWebsiteId(model.websiteId)
                .then(renderPages);

            pageService
                .findPageById(model.pageId)
                .then(renderPage);

            function renderPages(pages){
                model.pages = pages;
            }

            function renderPage(page){
                model.page = page;
            }

        }
        init();

        function deletePage(pageId){
            pageService
                .deletePage(pageId)
                .then(function (){
                    $location.url("/website/" + model.websiteId + '/page');
                });

        }

        function updatePage(page){
            if(typeof page === 'undefined'
                || page.name === null
                || page.name === ''
                || typeof page.name === 'undefined'){
                model.error = 'name is required';
                return;
            }
            pageService
                .updatePage(page._id, page)
                .then(function(){
                    $location.url("/website/" + model.websiteId + '/page');

                });
        }


    }
})();
