/**
 * Created by ryankalla on 5/24/17.
 */
(function () {
    angular
        .module('WAM')
        .controller('websiteNewController', websiteNewController);

    function websiteNewController($routeParams, $location, websiteService) {
        var model = this;

        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];
        model.createWebsite = createWebsite;


        function init(){

            websiteService
                .findAllWebsitesForUser(model.userId)
                .then(renderWebsites);

            function renderWebsites (websites){
                model.websites = websites;
            }
        }
        init();

        function createWebsite(website){

            if(typeof website === 'undefined'
                || website.name === null
                || website.name === ''
                || typeof website.name === 'undefined'){
                model.error = 'name is required';
                return;
            }

            websiteService
                .createWebsite(model.userId, website)
                .then(function(website){
                    $location.url('/user/' + model.userId + "/website");
                });


        }


    }
})();