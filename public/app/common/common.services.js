(function(angular){
'use strict';
angular.module('app.common')
	.service('citiesService', ["$http","baseUrlService",CitiesService])
	.service('getCategoryService',[function(){}])
	.service('searchService', ["baseUrlService","$http",SearchService])
	.service('httpService', ["$http",HttpService])
	.service('sortService',[SortService])
	.service('changeBrowserURL', ["$location",ChangeBrowserURL])
	.service('arrayObjectMapper',[ArrayObjectMapper])
	.service('arrayUniqueCopy',[ArrayUniqueCopy])
	.service('userLocationService',[UserLocationService])
	.service('baseUrlService',['$location',AjaxURL])
	.service('getCityLocalitiesService',["$http","baseUrlService",GetCityLocalitiesService])
	.service('getCityCategoriesService',["$http","baseUrlService",GetCityCategoriesService])
	.service('getCityProductLocalitiesService',["$http","baseUrlService",GetCityProductLocalitiesService])
	.service('getCityProductCategoriesService',["$http","baseUrlService",GetCityProductCategoriesService])
	.service('getCityProductSubCategoriesService',["$http","baseUrlService",GetCityProductSubCategoriesService])
	.factory('cityStorage',["$window",'$rootScope',cityStorage]);
	function CitiesService($http,baseUrlService){
   		this.getCities = function() {
   			var gc = this;

      		gc.cityData = $http.get(baseUrlService.baseUrl+"store/cities");
			return  gc.cityData;
		};
	}
	function SearchService(baseUrlService,$http){
   		this.getSearches = function(userLocation) {
   			var gs = this;
   			gs.searchesData  = undefined;
   			var url = baseUrlService.baseUrl+"search/searches/"+userLocation;
      		gs.searchesData = $http.get(url);
			return  gs.searchesData;
		};
		this.getAjaxSearches = function(city,userSearchText) {
   			
   			var url = baseUrlService.baseUrl+"search/searches/"+city+'/'+userSearchText;
      		return $http.get(url);
			
		};
	}
	function HttpService($http){
		this.getService = function(url){
			return $http.get(url);
		};
	}
	function SortService(){
		this.sortByKey = function(array, key) {
		    return array.sort(function(a, b) {
		        var x = a[key]; var y = b[key];
		        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
		    	});
		};
	}

	function ChangeBrowserURL($location){
		this.changeBrowserURLMethod = function(path,paramValue){
			if(paramValue){
					$location.path(path).search({param: paramValue});
			}
			$location.path(path);
			//$location.url($location.path());
		};
	}
	function ArrayObjectMapper(){
		this.getArrayFunction = function(arrayObj,item){
			var arr1 = [];
			for (var i = arrayObj.length - 1; i >= 0; i--) {
						arr1.push(arrayObj[i][item]);
			}
			return arr1;
		};
	}
	function ArrayUniqueCopy(){
		this.getUniqueCopyFunction = function(sourceArray,destArray){
			angular.forEach(sourceArray, function(item){
				if(destArray.indexOf(item)==-1){
					destArray.push(item);
				}

			});
			return destArray;
		};
	}
	function UserLocationService(){

	}
	function cityStorage($window,$rootScope) {
		var storage = $window.localStorage;

		var obj1 =  {
			setCity: function (city) {
				
				
				if(city){
					storage.setItem('city',JSON.stringify(city));
					$rootScope.$broadcast('city-changed');
				}
			},
			getCity: function(){
				return JSON.parse(storage.getItem('city'));
			},
			isCityExists: function(){
				if(obj1.getCity()){
					return true;
				}
				return false;
			}
		};
		return obj1;
	}

	function AjaxURL($location){
		if($location.host() == 'localhost'){
			this.baseUrl = this.baseUrl = $location.protocol() + "://" + $location.host()+':3000/';	
		}
		else{
			this.baseUrl = this.baseUrl = $location.protocol() + "://" + $location.host()+'/';	
		}
		
		console.log("base");
		console.log(this.baseUrl);

		this.getStoresWithCatgeoryLocation = this.baseUrl + "store/storesCollection/category/";//:category/:location?";
		this.getStoresWithNameLocation = this.baseUrl + "store/storesCollection/storeName/";
		this.getSingleStoreWithId = this.baseUrl + "store/singleStore/";

		this.getProductsWithCatgeoryLocation = this.baseUrl + "product/productsCollection/category/";//:product/:location?";
		this.getProductsWithSubCatgeoryLocation = this.baseUrl + "product/productsCollection/subCategory/";//:product/:location?";
		this.getProductsWithNameLocation = this.baseUrl + "product/productsCollection/productName/";
		this.getProductsWithStoreId = this.baseUrl + "product/productsCollection/store/";
		this.getSingleProductWithId = this.baseUrl + "product/singleProduct/";

		this.getCategoriesWithLocation = this.baseUrl + "categories/location";

	}
	
	function GetCityLocalitiesService($http,baseUrlService){
		this.getCityLocalities = getCityLocalities;
		function getCityLocalities(city){
			return $http.get(baseUrlService.baseUrl+"store/localities/"+city);
		}
	}
	function GetCityCategoriesService($http,baseUrlService){
		this.getCityCategories = getCityCategories;

		function getCityCategories(city){
				return $http.get(baseUrlService.baseUrl+"store/categories/"+city);
		}

	}
	function GetCityProductLocalitiesService($http,baseUrlService){
		this.getCityLocalities = getCityLocalities;
		function getCityLocalities(city){
			return $http.get(baseUrlService.baseUrl+"product/localities/"+city);
		}
	}
	function GetCityProductCategoriesService($http,baseUrlService){
		this.getCityCategories = getCityCategories;

		function getCityCategories(city){
				return $http.get(baseUrlService.baseUrl+"product/categories/"+city);
		}

	}
	function GetCityProductSubCategoriesService($http,baseUrlService){
		this.getCitySubCategories = getCitySubCategories;

		function getCitySubCategories(city){
				return $http.get(baseUrlService.baseUrl+"product/subCategories/"+city);
		}

	}
})(window.angular);
