/**
 * Created by ryankalla on 5/24/17.
 */
(function () {
    angular
        .module('WAM')
        .controller('websiteEditController', websiteEditController);

    function websiteEditController($routeParams, $location, websiteService) {
        var model = this;

        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];
        model.deleteWebsite = deleteWebsite;
        model.updateWebsite = updateWebsite;


        function init(){

            websiteService
                .findAllWebsitesForUser(model.userId)
                .then(renderWebsites);

            websiteService
                .findWebsiteById(model.websiteId)
                .then(renderWebsite);

            function renderWebsites (websites){
                model.websites = websites;
            }

            function renderWebsite (website){
                model.website = website;
            }


        }
        init();

        function deleteWebsite(websiteId) {
            websiteService
                .deleteWebsite(websiteId)
                .then(function(){
                    $location.url('/user/' + model.userId + "/website");
                });

        }

        function updateWebsite(website){

            if(typeof website === 'undefined'
                || website.name === null
                || website.name === ''
                || typeof website.name === 'undefined'){
                model.error = 'name is required';
                return;
            }
            websiteService
                .updateWebsite(website._id, website)
                .then(function(){
                    $location.url('/user/' + model.userId + "/website");
                });
        }


    }
})();