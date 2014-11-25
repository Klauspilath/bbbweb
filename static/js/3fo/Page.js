$(function() {

	if (typeof TFO === 'undefined') {
		TFO = {};
	}

	TFO.__PageInstance = function () {
		this.initializeResizeListener();
		this.setNavigationEvents();
		this.init = true;

	};

	TFO.__PageInstance.prototype.initializeResizeListener = function () {
		$(window).resize(function(){
			TFO.Page.setHeroImageHeight()
		});
	};

	TFO.__PageInstance.prototype.setHeroImageHeight = function () {
		var hi = $("#hero-image"),
			pt = $("section > div:nth-child(1) > h1"),
			nv = $("nav"),
			hd = $("header");

		var titleHeight = pt.height();
			if(!TFO.Page.init){
				titleHeight = 106;
				TFO.Page.init = false;
			}

		hi.css("height", $(window).height()
			- (titleHeight
			+ nv.height()
			+ hd.height())
		);
	};


	TFO.__PageInstance.prototype.setNavigationEvents = function(){
		var $dropdowns = $('li.dropdown');

		// Mouseenter (used with .hover()) does not trigger when user enters from outside document window

		$dropdowns.on('mouseenter', function(){
			var sc = $('#screen');
			var bg = $(this).children(".nav-background");
			if(sc.offset().left == bg.offset().left) return;
        	var bgl = sc.offset().left -  bg.offset().left;
			bg.css("left", bgl + "px");
        })
	};

	TFO.__PageInstance.prototype.getState = function(){
		return this.state;
	};

	TFO.__PageInstance.prototype.setState = function(state){
		this.state = state;
	};

	//create instance
	if(!TFO.globals.constants.IS_HOME){
		TFO.Page = new TFO.__PageInstance();
		$(window).trigger('resize');
	}
});
