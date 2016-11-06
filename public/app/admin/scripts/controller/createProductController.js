(function(angular){
  angular.module('app.admin')

    .controller('CreateProductController',['$routeParams','adminProductService',CreateProductController]);
    function CreateProductController($routeParams,adminProductService){
    	var csc = this;
    	csc.productForm = {};
        csc.productForm.price = {};
    	activate();
    	csc.createProduct = createProduct;
        
    	function createProduct(){
    		adminProductService.createProduct(csc.productForm,$routeParams.storeId)
	    		.then(function(response){
	    			console.log(response);
	    			alert("product created");
	    		},function(response){
	    			console.log(response);
	    		});	
    	}
    	
    	
    	function activate(){
    		
    	}
    }
})(window.angular);
