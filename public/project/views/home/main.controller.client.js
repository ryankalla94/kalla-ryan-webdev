/**
 * Created by ryankalla on 6/22/17.
 */
(function () {
    angular
        .module('MapApp')
        .controller('mainController', mainController);

    function mainController(currentUser, userService, $location, pinService) {
        var model = this;
        model.currentUser = currentUser;
        model.pinCategory = 'All';
        model.filterPins = filterPins;

        model.logout = logout;

        function init(){

            pinService
                .findAllPins()
                .then(function(pins){
                    model.allPins = pins;
                });

            pinService
                .findPublicPins()
                .then(function (pins){
                    model.publicPins = pins;
                    var publicPins = [];
                    if(currentUser._id){
                        pinService
                            .findFriendPins(currentUser._id)
                            .then(function (pins){
                                model.friendPins = pins;
                                var friendPins = [];
                                if(model.pinCategory === "Food"){
                                    if(currentUser._id){
                                        for(var p in model.friendPins){
                                            if(model.friendPins[p].categories.indexOf('FOOD') > -1){
                                                friendPins.push(model.friendPins[p]);
                                            }
                                        }
                                    }
                                    model.friendPins = friendPins;
                                } else if(model.pinCategory === "Drink"){
                                    if(currentUser._id){
                                        for(var p in model.friendPins){
                                            if(model.friendPins[p].categories.indexOf('DRINK') > -1){
                                                friendPins.push(model.friendPins[p]);
                                            }
                                        }
                                    }
                                    model.friendPins = friendPins;
                                } else if(model.pinCategory === "Leisure"){
                                    if(currentUser._id){
                                        for(var p in model.friendPins){
                                            if(model.friendPins[p].categories.indexOf('LEISURE') > -1){
                                                friendPins.push(model.friendPins[p]);
                                            }
                                        }
                                    }
                                    model.friendPins = friendPins;
                                } else if(model.pinCategory === "Music"){
                                    if(currentUser._id){
                                        for(var p in model.friendPins){
                                            if(model.friendPins[p].categories.indexOf('MUSIC') > -1){
                                                friendPins.push(model.friendPins[p]);
                                            }
                                        }
                                    }
                                    model.friendPins = friendPins;
                                }
                            })
                    }
                    if(model.pinCategory === "Food"){
                        for(var p in model.publicPins){
                            if(model.publicPins[p].categories.indexOf('FOOD') > -1){
                                publicPins.push(model.publicPins[p]);
                            }
                        }
                        model.publicPins = publicPins;
                    } else if(model.pinCategory === "Drink"){
                        for(var p in model.publicPins){
                            if(model.publicPins[p].categories.indexOf('DRINK') > -1){
                                publicPins.push(model.publicPins[p]);
                            }
                        }
                        model.publicPins = publicPins;
                    } else if(model.pinCategory === "Leisure"){
                        for(var p in model.publicPins){
                            if(model.publicPins[p].categories.indexOf('LEISURE') > -1){
                                publicPins.push(model.publicPins[p]);
                            }
                        }
                        model.publicPins = publicPins;
                    } else if(model.pinCategory === "Music") {
                        for (var p in model.publicPins) {
                            if (model.publicPins[p].categories.indexOf('MUSIC') > -1) {
                                publicPins.push(model.publicPins[p]);
                            }
                        }
                        model.publicPins = publicPins;
                    }
                })


        }

        init();


        function filterPins(category){
            init();
        }

        function logout(){
            userService
                .logout()
                .then(function (){
                    location.reload();
                });
        }

    }
})();