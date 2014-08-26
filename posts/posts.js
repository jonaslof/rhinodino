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
	{'id': 1, 'title': 'Alimenta', 'body': ''},
	{'id': 2, 'title': 'Nordby Shoppingcenter', 'body': ''},
	{'id': 3, 'title': 'YhC3L', 'body': ''},
	{'id': 4, 'title': 'C3L', 'body': ''},
	{'id': 5, 'title': 'Framtidsutveckling', 'body': ''},
	{'id': 6, 'title': 'John Look', 'body': ''}
];

exports.getPortfolio = function() {
	return portfolio;
}

exports.getPortfolioItem = function(id) {
	for(var i; i < portfolio.length; i++) {
		if(portfolio[i].id == id) 
			return portfolio[i];
	}
}