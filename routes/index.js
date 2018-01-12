var express = require('express');
var router = express.Router();
var request = require("request");
var async = require("async");
var moment = require('moment');

//navigation page
router.get("/",function(req, res, next) {
		var url = "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty";
	var limit = 10
	request(url, function(err, data) {
		var arr = JSON.parse(data.body).splice(limit * req.params.skip - 1, limit)
		var newsArray = [];
		async.each(arr, function(item, cb) {
			var url = "https://hacker-news.firebaseio.com/v0/item/" + item + ".json?print=pretty";
			request(url, function(err, response) {
				if (!err) {
					newsArray.push(JSON.parse(response.body));
					cb();
				} else {
					cb();
				}
			})
		}, function() {
			res.render('index', {
				title: "Top Stories",
				news: newsArray,
				moment: moment // time stamp 
			});
		})
	})
    
});



// top news route
router.get('/top_page=:skip', function(req, res, next) {
	var url = "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty";
	var limit = 10
	request(url, function(err, data) {
		var arr = JSON.parse(data.body).splice(limit * req.params.skip - 1, limit)
		var newsArray = [];
		async.each(arr, function(item, cb) {
			var url = "https://hacker-news.firebaseio.com/v0/item/" + item + ".json?print=pretty";
			request(url, function(err, response) {
				if (!err) {
					newsArray.push(JSON.parse(response.body));
					cb();
				} else {
					cb();
				}
			})
		}, function() {
			res.render('index', {
				title: "Top News",
				news: newsArray,
				moment: moment // time stamp 
			});
		})
	})
});

router.get('/best_page=:skip',function(req,res,next){
	var url = "https://hacker-news.firebaseio.com/v0/beststories.json?print=pretty";
	var limit = 10;
	request(url,function(err,data){
			var arr = JSON.parse(data.body).splice(limit * req.params.skip - 1, limit);
				var newsArray = [];
					async.each(arr, function(item, cb) {
			var url = "https://hacker-news.firebaseio.com/v0/item/" + item + ".json?print=pretty";
			request(url, function(err, response) {
				if (!err) {
					newsArray.push(JSON.parse(response.body));
					cb();
				} else {
					cb();
				}
			})
		}, function() {
			res.render('bestIndex', {
				title: "Trending News",
				news: newsArray,
				moment: moment // time stamp 
			});
		})
			
	})
});


router.get('/new_page=:skip',function(req,res,next){
	var url = "https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty";
	var limit = 10;
	request(url,function(err,data){
			var arr = JSON.parse(data.body).splice(limit * req.params.skip - 1, limit);
				var newsArray = [];
					async.each(arr, function(item, cb) {
			var url = "https://hacker-news.firebaseio.com/v0/item/" + item + ".json?print=pretty";
			request(url, function(err, response) {
				if (!err) {
					newsArray.push(JSON.parse(response.body));
					cb();
				} else {
					cb();
				}
			})
		}, function() {
			res.render('newIndex', {
				title: "Latest News",
				news: newsArray,
				moment: moment // time stamp 
			});
		})
			
	})
});





module.exports = router;
