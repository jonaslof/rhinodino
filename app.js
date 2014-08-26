var express = require('express');
var app = express();

var hbs = require('hbs');
var postsEngine = require('./posts');

app.set('title', 'Rhino Dino');

app.set('view engine', 'html');
app.engine('html', hbs.__express);
app.use(express.static('public'));

app.get('/', function(req, res) {
    res.render('index', {title: 'Webbutvecklare och grafisk designer', portfolio: postsEngine.getPortfolio()});
});

app.get('/portfolio', function(req, res) {
    res.render('portfolio', {title: 'Portfolio', items: postsEngine.getPortfolio()});
});

app.get('/portfolio/:id', function(req, res) {
	var item = postsEngine.getPortfolioItem(req.params.id);
	console.log(item);
    res.render('single-portfolio', {title: 'Test', entry: item});
});

app.get('/om', function(req, res) {
    res.render('about', {title: 'Om mig'});
});

app.get('/kontakt', function(req, res) {
    res.render('contact', {title: 'Kontakt'});
});

app.use(function(req, res, next){
	console.log('%s %s', req.method, req.url);
	next();
});

app.use(function(req, res, next){
	res.send('Hello world!')
});

app.listen(3000);
console.log('server running');