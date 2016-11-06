(function(angular){
  'use strict';
angular.module('app.store')

  .controller('SingleStoreController',["$scope","$auth",'$location','scrollToIdService',"$routeParams","storeData","getSingleStore",SingleStoreController]);
  function SingleStoreController($scope,$auth,$location,scrollToIdService,$routeParams,storeData,getSingleStore){
    var ssc = this;
    ssc.storeData = {};
    ssc.loading = true;
    ssc.authCheck = $auth.isAuthenticated();
    ssc.getAddressString = getAddressString;
    
    ssc.storeImagesObj = [];
    function getAddressString(){
      return Object.keys(ssc.storeData.address).map(function(key){return ssc.storeData.address[key];}).join(' ');
    }

    getSingleStore.getStore($routeParams.storeId)
    .then(function(res){
      storeData.setStore(res.data);
        ssc.storeData = res.data;
        for (var i = 0; i < ssc.storeData.storeImages.length; i++) {
          var obj = {};
          obj.src=ssc.storeData.storeImages[i];
          ssc.storeImagesObj.push(obj);
        }
        //ssc.showImagesCarousel = true;
        console.log(ssc.storeImagesObj);
        ssc.loading = false;
        if($location.search().param){
            scrollToIdService.scrollToId($location.search().param);
        }
      });
    getSingleStore.getStoreRating($routeParams.storeId)
    .then(function(res){
      ssc.storeData.storeRatingAvg = res.data;
    });

    }

})(window.angular);
