'use strict'
var express = require('express');
var router = express.Router();
var request=require('request');
var cheerio=require('cheerio');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Lyrics' });
});

router.post("/search",(req,res)=>{
	request(`http://api.chartlyrics.com/apiv1.asmx/SearchLyric?artist=${req.body.artist}&song=${req.body.song}`,(error,response,body)=>{
		const $ = cheerio.load(body);
		var songurls=[];
		$('SongUrl').each((i,ele)=>{
			songurls.push(ele.children[0].data);
		});
		request(`${songurls[0]}`,(err,res,html)=>{
			const $=cheerio.load(html);
			var song=$('p').text();
			console.log(song);	
		});
	});
});
module.exports = router;
