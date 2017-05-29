/**
 * Created by ryankalla on 5/24/17.
 */
(function () {
    angular
        .module('WAM')
        .service('pageService', pageService);

    function pageService() {
        this.createPage = createPage;
        this.findPagesByWebsiteId = findPagesByWebsiteId;
        this.findPageById = findPageById;
        this.updatePage = updatePage;
        this.deletePage = deletePage;

        var pages = [
            { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
            { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
            { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
        ];

        function createPage(websiteId, page){
            page.websiteId = websiteId;
            page._id = (new Date()).getTime() + "";
            pages.push(page);
        }

        function findPagesByWebsiteId(websiteId){
            var results = [];

            for(var p in pages){
                if(pages[p].websiteId === websiteId){
                    pages[p].created = new Date();
                    pages[p].accessed = new Date();
                    results.push(pages[p]);
                }
            }

            return results;
        }

        function findPageById(pageId){
            return pages.find(function (page) {
                return page._id === pageId;
            });
        }

        function deletePage(pageId) {
            var page = findPageById(pageId);
            var index = pages.indexOf(page);
            pages.splice(index,1);
        }

        function updatePage(pageId, page) {
            var old = findPageById(pageId);
            var index = pages.indexOf(old);
            pages[index] = page;
        }



    }

})();/**
 * Created by ryankalla on 5/28/17.
 */
