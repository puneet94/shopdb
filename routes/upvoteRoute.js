var express = require('express');
var models = require('..//models/storeModel');
var Review = models.Review;
var User = models.User;
var Store = models.Store;
var Product = models.Product;
var Upvote = models.Upvote;
var mongoose = require('mongoose');
var upvoteRouter = express.Router();
var commons = require('./commonRouteFunctions');
var ObjectId = require('mongoose').Schema.ObjectId;
var commons = require('./commonRouteFunctions');
upvoteRouter.use(function(req,res,next){
	console.log("upvote");
	console.log(req.method,req.url);
	next();
});




upvoteRouter.route('/upvotes')
	.get(function(req,res){
		Upvote.find(function(err,upvotes){
			if(err){
				res.send(err);
			}
			res.json(upvotes);
			
		})
	})
	.delete(commons.ensureAuthenticated,function(req,res){
	Upvote.find({ id: req.params.upvoteId}).remove(function (err) {
					if(err){
						return res.send(err);
					}
        			res.send('removed viit');
    				});
})

upvoteRouter.route('/upvotes/store/:storeId?')
.get(function(req,res){
	Upvote.find({'store':req.params.storeId})
				.populate({
					path: 'user',
					model: 'User'
				})
				.exec(function(err, result) {
						if(err){
						res.send(err);
					}
					else{

						res.json(result);
					}
				});


	
})
.post(commons.ensureAuthenticated,function(req,res){
  var upvote = new Upvote();
  var recData = req.body;
	upvote.user=recData.userId;
 	upvote.store = mongoose.Types.ObjectId(recData.storeId);
	upvote.review = recData.reviewId;

	if(commons.validateId(upvote.user,"user") && commons.validateId(upvote.store,"store") && commons.validateId(upvote.review,"review")){
		upvote.save(function(err){
    if(err){
      if(err.code == 11000){
        return res.json({success:false,'message':'Review already exists'});
      }
      else{
        console.log(err);
        return res.send(err);

      }
    }


    res.json({message:"Upvote created"});
  });
	}

  
})

upvoteRouter.route('/upvotes/review')
.post(commons.ensureAuthenticated,function(req,res){
  var upvote = new Upvote();
  var recData = req.body;
  console.log(recData);
	upvote.user=recData.userId;
	if(recData.storeId){
		console.log("hit the of");
		upvote.entityId = recData.storeId;	
		upvote.store = recData.storeId;	
		var entity = Store;
	}
	else if(recData.productId){
		upvote.entityId = recData.productId;
		upvote.product = recData.productId;
		var entity = Product;
	}
	else{
		upvote.entityId = recData.userId;
		var entity = User;
	}
	upvote.review = recData.reviewId;
	console.log(upvote);
	console.log("dingdingidng");
	commons.validateId(upvote.review,Review).then(function(doc){
		commons.validateId(upvote.user,User).then(function(doc){
			commons.validateId(upvote.entityId,entity).then(function(doc){

				upvote.save(function(err,upvote){
			    	if(err){
			      		if(err.code == 11000){
			        		return res.json({success:false,'message':'Review already exists'});
			      		}
			      		else{
					        console.log(err);
					        return res.send(err);
			      		}
			    	}
				    console.log(" upvote saved");
				    res.json({"message":"Upvote created","id":upvote._id});
		  		});
			})
		})
	});
  
})
.delete(commons.ensureAuthenticated,function(req,res){
	var params  = req.query;
	console.log(params);
	var queryObj = {"review":params.reviewId,"user":params.userId};
	if(params.storeId){
		queryObj.store=params.storeId;
	}
	else if(params.productId){
		queryObj.product=params.productId;
	}
	Upvote.findOne(queryObj)
				.exec(function(err, upvote) {
						if(err){
						res.send(err);
					}
					else{
						console.log(upvote);
						upvote.remove(function (err) {
        			res.json({"message":"Upvote delted","id":upvote._id});
    				});
					}
				});
})


module.exports = upvoteRouter;
