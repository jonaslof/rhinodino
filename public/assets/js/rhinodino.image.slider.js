(function($)
{
	/* ---------------------------------------------
	 *
	 *	Controller
	 *
	 * ------------------------------------------- */
	
	var RhinoDinoImageSlider = function(element, options)
	{
		var self = this;
		$slider = $(element);
		settings = $.extend({}, $.fn.rhinodinoImageSlider.defaults, options);
		timer = new Timer();
		slides = new Array();
		currentSlideIndex = 0;

		$slider.prepend('<div class="slider-image-container"><div class="slider-image-overlay image_overlay-large"></div>');
		$sliderImageContainer = $('.slider-image-container');

		$slider.append('<div class="slider-caption"><div class="slider-caption-inner"><div id="slider-caption-content" class="slider-caption-content"></div><ul id="slider-nav" class="slider-nav"></ul></div></div>');
		$sliderCaption = $('#slider-caption-content');
		$sliderNav = $('#slider-nav');

		if(settings.dataUrl != null) {
			var promise = self.getSliderData(settings.dataUrl);
			self.addSlides(promise);
		}

		$sliderNav.on('click', '.slider-nav-item', function(){
			self.changeSlide($(this).data('index'));
			$sliderNav.find('.slider-nav-item').removeClass('current');
			$(this).addClass('current');
		});
	}

	var Timer = function(action, interval)
	{
		this.set = function(action, interval) {
			this.action = action;
			this.interval = interval;
			return this;
		};

		this.start = function() {
			this.isActive = true;
			this.timeoutObject = setTimeout(this.action, this.interval);
			return this;
		};
		this.stop = function() {
			clearTimeout(this.timeoutObject);
			this.isActive = false;
			return this;
		};
		this.reset = function() {
			if(!this.isActive) {
				this.start();
			}
			else {
				clearTimeout(this.timeoutObject);
				this.start();
			}
			return this;
		};
	}
	
	/* ---------------------------------------------
	 *
	 *	Model
	 *
	 * ------------------------------------------- */
	
	RhinoDinoImageSlider.prototype = {
		
		getSliderData : function(url) {
			return $.getJSON(url);
		},

		addSlides : function(promise) {
			var self = this;
		   	promise.success(function(data) {
				if(data['status'] == 'ok') {
					var slidesCount = data.slides.length;
					var i = 0;
					$.each(data['slides'], function() {
						slides[i] = {
							'index': i,
							'content': this['content'],
							'image': this['image'],
							'link': this['link']
						};

						if(i == 0) {
							self.initSlide();
							
							if(slidesCount > 1) {
								timer.set(self.changeSlide, 10000);
								timer.start();

								$sliderNav.append('<li id="slider-nav-item-'+i+'" class="slider-nav-item current" data-index="'+i+'"></li>');
							}
							
						}else {
							$sliderNav.append('<li id="slider-nav-item-'+i+'" class="slider-nav-item" data-index="'+i+'"></li>');
						}

						i++;
					});
				}
		    });
		},

		initSlide : function() {
			$sliderImageContainer.prepend('<div class="slide-image" id="slide-' + currentSlideIndex + '"><img src="' + slides[currentSlideIndex].image + '"></div>');
			$sliderCaption.prepend('<div class="slider-caption-content-inner" id="slide-content-' + currentSlideIndex + '"><a href="' + slides[currentSlideIndex].link + '""><div class="slider-caption-content-text">' + slides[currentSlideIndex].content + '</div><div class="slide-arrow arrow_right-large"></div></a></div>');
			currentSlideIndex++;
		},

		changeSlide : function(index) {
			var self = this;
			var $currentSlide = $('.slide-image');
			var $currentSlideContent = $('.slider-caption-content-inner');
			if(index) {
				currentSlideIndex = index;
			}
			if(slides.length == currentSlideIndex) {
				currentSlideIndex = 0;
			}

			$sliderImageContainer.prepend('<div class="slide-image" id="slide-' + currentSlideIndex + '" style="display: none"><img src="' + slides[currentSlideIndex].image + '"></div>');
			$sliderCaption.append('<div class="slider-caption-content-inner" id="slide-content-' + currentSlideIndex + '" style="display: none;"><a href="' + slides[currentSlideIndex].link + '""><div class="slider-caption-content-text">' + slides[currentSlideIndex].content + '</div><div class="slide-arrow arrow_right-large"></div></a></div>');

			//
			if(settings.transition === 'fade') {
				$('#slide-' + currentSlideIndex).fadeIn(settings.transitionSpeed);
				$currentSlide.fadeOut(settings.transitionSpeed, function(){
					$(this).remove();
				});
				$currentSlideContent.fadeOut(settings.transitionSpeed/2, function(){
					$(this).next().fadeIn(settings.transitionSpeed/2);
					$(this).remove();
				});
				//$('#slide-content-' + currentSlideIndex).fadeIn(settings.transitionSpeed/2);
			}
			/*else if(settings.transition === 'slideLeft') {
				var nextSlide = $('#slide-' + currentSlideIndex);
				//self.slideLeft($currentSlide, nextSlide);
			}
			else if(settings.transition === 'slideRight') {
				$('#slide-' + currentSlideIndex).css({'left' : '-100%'}).show();
				$('#slide-' + currentSlideIndex).animate({'left' : '0%'}, settings.transitionSpeed);
				$currentSlide.animate({'left' : '100%'}, settings.transitionSpeed, function() {
					$(this).remove();
				});
			}*/

			if(timer.isActive) {
				timer.reset();
			}
			else {
				timer.start();
			}

			$('.slider-nav-item').removeClass('current');
			$('#slider-nav-item-' + currentSlideIndex).addClass('current');

			currentSlideIndex++;
		},

		/*slideLeft : function(currentSlide, nextSlide) {
			nextSlide.css({'left' : '100%'}).show();
			nextSlide.animate({'left' : '0%'}, settings.transitionSpeed);
			currentSlide.animate({'left' : '-100%'}, settings.transitionSpeed, function() {
				$(this).remove();
			});
		}*/
	};
	
	
	
	/* ---------------------------------------------
	 *
	 *	Plugin
	 *
	 * ------------------------------------------- */
  
	$.fn.rhinodinoImageSlider = function(options)
	{
		// Each element
		return this.each(function(i) {
			$(this).data('rhinodinoImageSlider', new RhinoDinoImageSlider(this, options));
		});
		
	}
	
	
	/* ---------------------------------------------
	 *
	 *	Defaults
	 *
	 * ------------------------------------------- */
		
	$.fn.rhinodinoImageSlider.defaults = {
		dataUrl		: 		null,
		transition  : 		'fade',
		transitionSpeed : 	400
	};
	
})(jQuery);