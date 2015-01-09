$(function() {

	if (typeof TFO === 'undefined') {
		TFO = {};
	}

	TFO.__HomeInstance = function () {
		this.initResize();
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

	//create instance
	TFO.Home = new TFO.__HomeInstance();
});
