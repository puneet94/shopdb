var express = require('express');
var models = require('..//models/storeModel');
var Review = models.Review;
var User = models.User;
var Store = models.Store;
var Activity = models.Activity;
var mongoose = require('mongoose');
var activityRouter = express.Router();
var commons = require('./commonRouteFunctions');
var ObjectId = require('mongoose').Schema.ObjectId;
var commons = require('./commonRouteFunctions');
var app = express();
var moment = require('moment');

app.set('view engine', "jade");
activityRouter.use(function(req, res, next) {
    console.log(req.method, req.url);
    next();
});

function getActivity(res, usersList) {
    var queryObj = {};
    if (usersList) {
        queryObj.creator = { $in: usersList };
    }
    Activity
        .find(queryObj)
        .sort({ 'time': 'desc' })
        .populate({ path: 'creator', model: 'User', select: 'displayName picture' })
        .populate({ path: 'followed', model: 'User', select: 'displayName picture' })
        .populate({ path: 'store', select: 'name bannerImage', model: 'Store' })
        .populate({ path: 'product', select: 'name images', model: 'Product' })
        .populate({ path: 'review', model: 'Review', populate: { path: 'store', select: 'name bannerImage', model: 'Store' } })
        .populate({ path: 'review', model: 'Review', populate: { path: 'product', select: 'name images', model: 'Product' } })
        .populate({ path: 'review', model: 'Review', populate: { path: 'user', select: 'displayName', model: 'User' } })
        .exec(function(err, activities) {
            if (err) {
                res.send(err);
            } else {

                app.render('activity/userActivity', { activity: activities, moment: moment }, function(err, html) {

                    if (err) {
                        console.log(err);
                    }
                    res.send(html);

                })
            }
        })
}
activityRouter.route('/userFollowingActivity/:userId')
    .get(function(req, res) {

        var followingList = [];
        User
            .findById(req.params.userId)
            .select('following')
            .exec(function(err, result) {
                console.log(result);
                followingList = result.following;
                getActivity(res, followingList);
            });

        console.log(followingList);
    });
activityRouter.route('/singleUserActivity/:userId')
    .get(function(req, res) {
        var followingList = [];
        User
            .findById(req.params.userId)
            .select('_id')
            .exec(function(err, result) {
                followingList = [req.params.userId];

                getActivity(res, followingList);
            });

        console.log(followingList);
    });

activityRouter.route('/allActivity/')
    .get(function(req, res) {
        getActivity(res);
    });


module.exports = activityRouter;
