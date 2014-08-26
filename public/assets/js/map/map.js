(function($)
{
	/* ---------------------------------------------
	 *
	 *	Controller
	 *
	 * ------------------------------------------- */
	
	var AlimentaMap = function(element, options)
	{
		var self        = this;
		self.$element   = $(element);
		settings    	= $.extend({}, $.fn.alimentaMap.defaults, options);
		markers 		= new Array();
		infowindows		= new Array();
		
		mapOptions = {
			center : new google.maps.LatLng(settings.mapCenterLat, settings.mapCenterLng),
			zoom : settings.mapZoom,
			mapTypeID : settings.mapType,
			disableDefaultUI : settings.mapDisableDefaultUI
		};

		var map = new google.maps.Map(document.getElementById(settings.mapCanvasID), mapOptions);

		if(settings.markerDataUrl != null)
			self.addMarkers(settings.markerDataUrl, map);

		//Add item
		self.$element.on('click', '.' + settings.add_item_class , function(e) {
			e.preventDefault();
			self.addItem($(this).attr('rel'));
		});
	}
	
	
	
	/* ---------------------------------------------
	 *
	 *	Model
	 *
	 * ------------------------------------------- */
	
	AlimentaMap.prototype = {
		
		addMarkers : function(url, map) {
			$.getJSON(url, function(data) {
				
				i = 0;
				if(data['status'] == 'ok') {
					$.each(data['stores'], function() {

						markers[i] = new google.maps.Marker({
							position: new google.maps.LatLng(this['lat'], this['lng']),
							map: map,
							id: this['id'],
							title: this['title'],
							phone: this['phone'],
							address: this['address'],
							category: this['category'],
							icon: settings.markerIconDir+'marker_'+this['iconColor']+'.png'
						});

						markers[i].setVisible(true);

						markers[i].infoWindow = new google.maps.InfoWindow({
							content : '<div class="map-canvas-infowindow"><div class="map-canvas-infowindow-header"><h4>' + markers[i].title + '</h4></div><div class="map-canvas-infowindow-content"><p>' + markers[i].address + '</p><p>' + markers[i].phone + '</p></div></div>',
							maxWidth : 180
						});

						google.maps.event.addListener(markers[i], 'click', function(marker) {
							this.infoWindow.open(map, this);
						});

						i++;
					});
				}
			});
		}
	};
	
	
	
	/* ---------------------------------------------
	 *
	 *	Plugin
	 *
	 * ------------------------------------------- */
  
	$.fn.alimentaMap = function(options)
	{
		// Each element
		return this.each(function(i) {
			$(this).data('alimentaMap', new AlimentaMap(this, options));
		});
		
		
	}
	
	
	/* ---------------------------------------------
	 *
	 *	Defaults
	 *
	 * ------------------------------------------- */
		
	$.fn.alimentaMap.defaults = {
		markerDataUrl		: 		null,
		add_item_class		: 		'add-item',
		mapCanvasID 		: 		'map-canvas',
		mapCenterLat 		: 		'59.32893000000001', //Latitude for Stockholm
		mapCenterLng 		: 		'18.06491', //Longitude for Stockholm
		mapZoom 			: 		12,
		mapType 			: 		google.maps.MapTypeId.ROADMAP,
		mapDisableDefaultUI : 		false,
		markerIconDir		: 		''
	};
	
})(jQuery);