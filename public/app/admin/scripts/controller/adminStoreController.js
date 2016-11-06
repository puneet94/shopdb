(function(angular){
  angular.module('app.admin')

    .controller('AdminStoreController',['$scope','$routeParams','getSingleStore',AdminStoreController]);
    function AdminStoreController($scope,$routeParams,getSingleStore){	
    	var asc = this;
    	getSingleStore.getStore($routeParams.storeId)
    .then(function(res){
      
        asc.storeData = res.data;
        
        //asc.showImagesCarousel = true;
        console.log(asc.storeImagesObj);
        asc.loading = false;
        
      });
    getSingleStore.getStoreRating($routeParams.storeId)
    .then(function(res){
      asc.storeData.storeRatingAvg = res.data;
    });
    }
})(window.angular);
