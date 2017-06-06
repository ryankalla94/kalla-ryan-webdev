/**
 * Created by ryankalla on 5/24/17.
 */
(function () {
    angular
        .module('WAM')
        .service('pageService', pageService);

    function pageService($http) {
        this.createPage = createPage;
        this.findPagesByWebsiteId = findPagesByWebsiteId;
        this.findPageById = findPageById;
        this.updatePage = updatePage;
        this.deletePage = deletePage;


        function createPage(websiteId, page){
            var url = '/api/assignemnt/website/' + websiteId + '/page';
            return $http.post(url, page)
                .then(function (response){
                    return response.data;
                });
        }

        function findPagesByWebsiteId(websiteId){
            var url = '/api/assignemnt/website/' + websiteId + '/page';
            return $http.get(url)
                .then(function (response){
                    return response.data;
                });
        }

        function findPageById(pageId){
            var url = '/api/assignemnt/page/' + pageId;
            return $http.get(url)
                .then(function (response){
                    return response.data;
                });
        }

        function deletePage(pageId) {
            var url = '/api/assignemnt/page/' + pageId;
            return $http.delete(url)
                .then(function (response){
                    return response.data;
                });
        }

        function updatePage(pageId, page) {
            var url = '/api/assignemnt/page/' + pageId;
            return $http.put(url, page)
                .then(function (response){
                    return response.data;
                });
        }



    }

})();
