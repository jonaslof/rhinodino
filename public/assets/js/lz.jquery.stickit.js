(function($) {
	
	/**
	 * Small jQuery plugin that makes an element stick to the window top after scrolling past
	 * a given header element.
	 */

	$.fn.stickIt = function(options) {

		var config = $.extend({
			headerSelector: '#header',
			float : 'right',
			gridContainer: '#content',
			gridContainerPadding: 30
		}, options);

		var fixElement = function() {
			var stickyElement = $(this);
			var scrollTop = $(window).scrollTop();
			var headerHeight = $(config.headerSelector).outerHeight();
			var windowWidth = $(window).width();
			var gridContainerWidth = $(config.gridContainer).width();
			var elementPosition = ((windowWidth - gridContainerWidth + config.gridContainerPadding) / 2);
			
			if(scrollTop < headerHeight) {
				stickyElement.removeClass('is-sticky');
				stickyElement.css(config.float, config.gridContainerPadding);
				stickyElement.css('top', '100%');
			} else {
				stickyElement.addClass('is-sticky');
				stickyElement.css(config.float, elementPosition + 'px');

				if($('body').hasClass('admin-bar')) {
					stickyElement.css('top', '32px');
				}
				else {
					stickyElement.css('top', '0px');
				}
			}
		};

		return this.each(function() {
			$(window).on('scroll', $.proxy(fixElement, this));
			$(window).on('resize', $.proxy(fixElement, this));
	        $.proxy(fixElement, this)();
		});
	};

}(jQuery));