$(function() {

	if (typeof TFO === 'undefined') {
		TFO = {};
	}

	TFO.__PageInstance = function () {
		this.content = $('#threefo-content');
		this.header = $('#static-header');
		this.footer = $('#static-footer');
		this.heroText = $('#hero-text');
		this.logo = $("#logo");
		this.state = '';
		//this.footer.hide();
		this.initScroll();
		this.initResize();
		this.setContentNav();
        this.initNavOverlay();
		this.initCollapsibleContent();
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

	TFO.__PageInstance.prototype.getState = function(){
		return this.state;
	};

	TFO.__PageInstance.prototype.setState = function(state){
		this.state = state;
	};

	TFO.__PageInstance.prototype.initResize = function(){
		var sh = $("#static-header");
		var srh = $(".static-rotation-header");

		if(srh.length > 0)
			sh = srh;

		if(TFO.globals.constants.IS_HOME){
			$(sh).css("max-height", $(window).height()); //- $(window).height() * 0.15);
		} else {
			$(sh).css("max-height", $(window).height() - $(window).height() * 0.15);
		}

		$(window).resize(function(){

			if(TFO.globals.constants.IS_HOME){
			 	$(sh).css("max-height", $(window).height()); //- $(window).height() * 0.15);
			} else {
				$(sh).css("max-height", $(window).height() - $(window).height() * 0.15);
			}

			$(sh).css("background-position",  "30% 5%");
			$(sh).css("min-width", $(window).width());

			if(($(window).scrollTop() === 0)){
				TFO.Page.setContentNav();
			}
		});
	};

	TFO.__PageInstance.prototype.setContentNav = function(){
		var hBase = 185;

		if(TFO.globals.constants.IS_HOME) {
			hBase = 100;
		}
		console.log("hBase:" + hBase);

		$('.top-container').css('margin-top',$(window).height() - hBase + 'px' );
	};

	TFO.__PageInstance.prototype.initCollapsibleContent = function(){

		$('.view-toggle').on('click', function(e) {
			e.preventDefault();
			var cc = $('.collapsible');
			if(cc.hasClass('collapse')){
				$(e.currentTarget).find(".view-more-name").text('less');
			} else {
				$(e.currentTarget).find(".view-more-name").text('more');
			}

			cc.collapse('toggle');
		});
	};

	TFO.__PageInstance.prototype.initScroll = function(){
		$(window).scroll(function() {

			var p = TFO.Page;
			var opacity = 1 - ($(window).scrollTop() * 0.00169999999);
			var header_opacity = 1 - ($(window).scrollTop() * 0.0020999999);

			p.heroText.css('opacity', opacity);
			p.logo.css('opacity', header_opacity);
			//console.log(opacity);
			//console.log(p.content.offset().top - $(window).scrollTop());

			if ((p.content.offset().top - $(window).scrollTop()) < 0) {
				if(p.header.css('display') !== 'none')
					p.header.hide();
			} else if (p.header.css('display') === 'none') {
				p.header.show();
			}
		});
	};

	//create instance
	TFO.Page = new TFO.__PageInstance();
	//window.onload(TFO.Page.initCollapsibleContent());
});
