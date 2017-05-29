/**
 * Created by ryankalla on 5/24/17.
 */
(function () {
    angular
        .module('WAM')
        .controller('pageNewController', pageNewController);

    function pageNewController($routeParams, $location, pageService) {
        var model = this;

        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];
        model.createPage = createPage;


        function init(){
            model.pages = pageService.findPagesByWebsiteId(model.websiteId);
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
            pageService.createPage(model.websiteId, page);
            $location.url('/user/' + model.userId + "/website/" + model.websiteId + '/page');
        }



    }
})();/**
 * Created by ryankalla on 5/28/17.
 */
