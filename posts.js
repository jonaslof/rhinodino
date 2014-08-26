var pages = [
	{'id': 1, 'title': 'Portfolio', 'body': '', 'slug': 'portfolio'},
	{'id': 2, 'title': 'Om mig', 'body': '', 'slug': 'om'},
	{'id': 3, 'title': 'Kontakt', 'body': '', 'slug': 'kontakt'}
];

exports.getPages = function() {
	return pages;
}

exports.getPage = function(id) {
	for(var i; i < pages.length; i++) {
		if(pages[i].id == id) 
			return pages[i];
	}
}


var portfolio = [
	{
		'id': 1, 'title': 'Alimenta', 'body': '', 'logo': '', 'images': [
			{'id': 1, 'filename': 'alimenta_01.jpg'}
		]
	},
	{
		'id': 2, 'title': 'Nordby Shoppingcenter', 'body': '', 'images': [
			{'id': 1, 'filename': 'nordby_01.jpg'}
		]
	},
	{
		'id': 3, 'title': 'YhC3L', 'body': '', 'images': []
	},
	{
		'id': 4, 'title': 'C3L', 'body': '', 'images': []
	},
	{
		'id': 5, 'title': 'Framtidsutveckling', 'body': '', 'images': []
	},
	{
		'id': 6, 'title': 'John Look', 'body': '', 'images': []
	}
];

exports.getPortfolio = function() {
	return portfolio;
}

exports.getPortfolioItem = function(id) {
	for(var i=0; i < portfolio.length; i++) {
		if(portfolio[i].id == id) 
		{
			return portfolio[i];
		}
	}
}