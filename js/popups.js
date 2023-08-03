$(function(){
	 $('.popup-with-zoom').magnificPopup({
        mainClass: 'mfp-zoom-in',
		removalDelay: 300,
		type: 'inline',
		preloader: false,
		closeMarkup: '<a class="mfp-close-set"><span class="mfp-close close-icon"></span></a>',
		focus: '#name',
		callbacks: {
			beforeOpen: function() {
				if($(window).width() < 700) {
					this.st.focus = false;
				} else {
					this.st.focus = '#name';
				};
				$('body').addClass('mfp-map-active');
			},
			beforeClose: function() {
				$('body').removeClass('mfp-map-active');
			},
			open: function() {
				setTimeout(function() { $('.mfp-zoom-in').addClass('mfp-image-loaded'); }, 16);
			}
		}
    });
	
}); 
