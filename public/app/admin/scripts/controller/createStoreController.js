(function(angular){
  angular.module('app.admin')
    .controller('CreateStoreController',['$auth','adminStoreService','Upload','$routeParams','$timeout','baseUrlService',CreateStoreController]);
    function CreateStoreController($auth,adminStoreService,Upload,$routeParams,$timeout,baseUrlService){
    	var csc = this;
    	csc.storeForm = {};
      csc.storeForm.storeImages = [];
    	activate();
    	csc.createStore = createStore;
        /*csc.uploadSingleImage = function(file, errFiles) {
          csc.f = file;
          csc.errFile = errFiles && errFiles[0];
          if (file) {
              file.upload = Upload.upload({
                  url: baseUrlService.baseUrl+'upload/singleUpload',
                  data: {file: file}
              });
              csc.spinnerLoading = true;
              file.upload.then(function (response) {
                  file.result = response.data;
                  csc.storeForm.bannerImage = response.data;
                  //$('.userProfileImage').find('img').attr('src',response.data);
                  csc.spinnerLoading = false;
              });
          }
      };*/
    csc.uploadMultipleImages = function (files) {
        csc.files = files;
        angular.forEach(files, function(file) {
            file.upload = Upload.upload({
                url: baseUrlService.baseUrl+'upload/singleUpload',
                data: {file: file}
            });

            file.upload.then(function (response) {
                $timeout(function () {
                    file.result = response.data;
                    console.log(response.data);
                    csc.storeForm.storeImages.push(response.data);
                });
            }, function (response) {
                if (response.status > 0)
                    csc.errorMsg = response.status + ': ' + response.data;
            }, function (evt) {
                file.progress = Math.min(100, parseInt(100.0 * 
                                         evt.loaded / evt.total));
            });
        });
        
    };
    	function createStore(){
        csc.storeForm.bannerImage = csc.storeForm.storeImages[0];
    		adminStoreService.createStore(csc.storeForm)
	    		.then(function(response){
	    			console.log(response);
	    			alert("store created");
	    		},function(response){
	    			console.log(response);
	    		});	
    	}
    	
    	
    	function activate(){
    		
    	}
    	
    }
})(window.angular);
