var hn = require('hackernews-api');

var stories = [];
var itemsByScore = [];
var top = 250;

itemsByScore = hn.getByScore(150);

console.log(itemsByScore);


