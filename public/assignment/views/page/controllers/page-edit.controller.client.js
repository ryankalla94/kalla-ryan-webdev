/**
 * Created by ryankalla on 5/24/17.
 */
(function () {
    angular
        .module('WAM')
        .controller('pageEditController', pageEditController);

    function pageEditController($routeParams, $location, pageService) {
        var model = this;

        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];
        model.pageId = $routeParams['pageId'];
        model.deletePage = deletePage;
        model.updatePage = updatePage;


        function init(){
            model.pages = pageService.findPagesByWebsiteId(model.websiteId);
            model.page = pageService.findPageById(model.pageId);
        }
        init();

        function deletePage(pageId){
            pageService.deletePage(pageId);
            $location.url('/user/' + model.userId + "/website/" + model.websiteId + '/page');
        }

        function updatePage(page){
            if(typeof page === 'undefined'
                || page.name === null
                || page.name === ''
                || typeof page.name === 'undefined'){
                model.error = 'name is required';
                return;
            }
            pageService.updatePage(page._id, page);
            $location.url('/user/' + model.userId + "/website/" + model.websiteId + '/page');
        }



    }
})();/**
 * Created by ryankalla on 5/28/17.
 */
