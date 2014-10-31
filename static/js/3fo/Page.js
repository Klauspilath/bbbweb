$(function() {

	if (typeof TFO === 'undefined') {
		TFO = {};
	}

	TFO.__PageInstance = function () {
		//this.initNavOverlay();
		this.setCaptions();
		this.setNavigationEvents();
	};

	TFO.__PageInstance.prototype.initNavOverlay = function () {

		$(".entire-menu").click(function(){
			var menuCB = document.getElementById("change-stack");
			$("#change-stack").trigger("change");
			menuCB.checked = menuCB.checked != true;
		});

        $("#change-stack").change(
            function(){
                var ol = $("#nav-overlay");
                //console.log($(ol).css("display") + " clicked");

				if(ol.css("opacity") == 0){
                    ol.css("z-index","12");
                    ol.fadeTo(200,1);
                } else {
                    ol.fadeTo(200,0,function(){
						ol.css("z-index","0");
					});
                }
            }
        );

		$(window).keydown(function(event){
			var menuCB = document.getElementById("change-stack");

			if(menuCB.checked == true)
				if(event.keyCode == 27)
					$(".entire-menu").trigger("click");
		});
	};

	TFO.__PageInstance.prototype.setNavigationEvents = function(){
		var $dropdowns = $('li.dropdown');

		$dropdowns.on('mouseenter', function() // Mouseenter (used with .hover()) does not trigger when user enters from outside document window
        {
			var sc = $('.screen');
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

	TFO.__PageInstance.prototype.setCaptions = function(){

		if(TFO.globals.constants.IS_MOBILE && TFO.globals.constants.IS_HOME){
			$('.carousel-caption').css("display","none");
		}
	};

	//create instance
	TFO.Page = new TFO.__PageInstance();
	//window.onload(TFO.Page.initCollapsibleContent());
});
