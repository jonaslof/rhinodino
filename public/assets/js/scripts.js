(function($) {

    $(document).ready(function() {

    	/*
    	* Form validation
    	*/
    	var forms = document.getElementsByTagName('form');
		for (var i = 0; i < forms.length; i++) {
		    forms[i].noValidate = true;

		    if(!forms[i].addEventListener) {
		    	forms[i].attachEvent('onsubmit', function(event) {
			        //Prevent submission if checkValidity on the form returns false.
			        if (!event.target.checkValidity()) {
			            event.preventDefault();
			            //Implement you own means of displaying error messages to the user here.
			            $this = $(this);
			            $this.find('.form-validation-message').remove();
			            $this.find('input.error').removeClass('error');
			            $.each($this.find('input[required]'), function(){
			            	if($(this).val() === '') {
			            		$this = $(this);
			            		$this.addClass('error');
			            		$this.after('<div class="form-validation-message error">Du måste fylla i det här fältet.</div>');
			            	}
			            });
			        }
			    });
		    }
		    else {
		    	forms[i].addEventListener('submit', function(event) {
			        //Prevent submission if checkValidity on the form returns false.
			        if (!event.target.checkValidity()) {
			            event.preventDefault();
			            //Implement you own means of displaying error messages to the user here.
			            $this = $(this);
			            $this.find('.form-validation-message').remove();
			            $this.find('input.error').removeClass('error');
			            $.each($this.find('input[required]'), function(){
			            	if($(this).val() === '') {
			            		$this = $(this);
			            		$this.addClass('error');
			            		$this.after('<div class="form-validation-message error">Du måste fylla i det här fältet.</div>');
			            	}
			            });
			        }
			    }, false);
		    }
		}



		if(!Modernizr.svg){
			$("img").each(function(){
				var src = this.src.split(".");
				this.src = src[0] + ".png";
			});
		}


		$('.toggle-menu').on('click', function(){
			if(!$(this).hasClass('menu-down')) {
				var $navItem = $('.header-nav ul li a');
				$('.header-nav').animate({'height' : ($navItem.height() * $navItem.length) + 'px'}, 500);
				$(this).toggleClass('menu-down');
			} else {
				$('.header-nav').animate({height : '1px'}, 500);
				$(this).toggleClass('menu-down');
			}
		});
    });

})(jQuery);