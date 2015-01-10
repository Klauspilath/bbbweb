$(function() {

	if (typeof TFO === 'undefined') {
		TFO = {};
	}

	TFO.__HomeInstance = function () {
		this.initResize();
        this.trackGestures(document.getElementById('home-gallery'));
	};

	TFO.__HomeInstance.prototype.initResize = function(){

		var g = $('#home-gallery');
		g.css('height', $(window).height() - $("header").height());

		$(window).resize(function(){

			if(TFO.globals.constants.IS_HOME) {

				var g = $('#home-gallery');
				g.css('height', $(window).height() - $("header").height());

				if (($(window).scrollTop() === 0)) {
					TFO.Home.setHeroImageHeight();
				}
			}
		});
	};

	TFO.__HomeInstance.prototype.setHeroImageHeight = function(){
		var hBase = 185;

		if(TFO.globals.constants.IS_HOME) {
			hBase = 100;
		}
		console.log("hBase:" + hBase);

		//$('.top-container').css('margin-top',$(window).height() - hBase + 'px' );
	};


    TFO.__HomeInstance.prototype.trackGestures = function(element){
		var tracker = new Hammer(element);

		tracker.on('swipe',function(event){
			var c = $('#home-gallery');

			if(event.direction == Hammer.DIRECTION_LEFT)
				c.carousel('next');

			if(event.direction == Hammer.DIRECTION_RIGHT)
				c.carousel('prev');

		});
	};

    TFO.__HomeInstance.prototype.setClickHandler = function(){
        var c = $('#home-gallery');

        c.on('click', function(event){
            $(event.currentTarget).carousel('pause');
        });

        $('.item').on('click touchstart', function(event){
            $(event.currentTarget).carousel('pause');
        });
    };

	//create instance
	TFO.Home = new TFO.__HomeInstance();
});
