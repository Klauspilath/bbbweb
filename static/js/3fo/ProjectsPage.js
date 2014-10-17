$(function() {

	if (typeof TFO === 'undefined') {
		TFO = {};
	}

	TFO.__ProjectsPageInstance = function(){
		this.indicator = $("#indicator");
		this.activeList = null;
		this.FADE_RATE = 100;
	};

	TFO.__ProjectsPageInstance.prototype.init = function(){
		//var e = $(".filter-nav-active");
		//var d = e.offset().left + e.width()/2 + 20;
		//TFO.ProjectsPage.indicator.animate({"left":d});
		TFO.ProjectsPage.assignBehaviors();
	};

	TFO.__ProjectsPageInstance.prototype.setActive = function(element){

		var d = $(element).offset().left + $(element).width()/2;
		TFO.ProjectsPage.indicator.animate({"left":d});
		TFO.ProjectsPage.activeList = $(element);
		TFO.ProjectsPage.activeList.addClass("filter-nav-active");
		$(".filter-nav").not($(element)).removeClass("filter-nav-active");

		TFO.ProjectsPage.updateList();
	};

	TFO.__ProjectsPageInstance.prototype.updateList = function(){

		var p = TFO.ProjectsPage;
		var newList = $("#" + p.activeList.attr("data-list"));
		var replaceList = $(".active-projects");

		replaceList.fadeOut("fast",function(){
			replaceList.removeClass("active-projects");
			replaceList.addClass("hide");
			newList.addClass("active-projects");
			newList.removeClass("hide");
			newList.fadeIn("fast");
		});
	};

	TFO.__ProjectsPageInstance.prototype.assignBehaviors = function(){

		if(TFO.globals.constants.IS_DESKTOP)
			TFO.ProjectsPage.setMouseStates();

		if(TFO.globals.constants.IS_MOBILE)
			TFO.ProjectsPage.setMobileFormat();
	};

	TFO.__ProjectsPageInstance.prototype.setMobileFormat = function(){
		$(".mobile-overlay-display").removeClass("hide");
		$(".project-label").addClass("mobile-project-label");
	};

	TFO.__ProjectsPageInstance.prototype.setMouseStates = function() {

		var image = $(".trans-project-image");
		var projects = $("#projects-section");

		projects.mouseleave(function(){
			$(".trans-project-image").fadeTo(TFO.ProjectsPage.FADE_RATE,1);
			$(".project-label").fadeTo(TFO.ProjectsPage.FADE_RATE,0);
		});

		image.mouseenter(function(event){
			var element = $(event.currentTarget);
			var images = $(".trans-project-image").not($(event.currentTarget));
			var label = element.parent().parent().find(".project-label");
			var otherLabels = images.parent().parent().find(".project-label");

			$(label).fadeTo(TFO.ProjectsPage.FADE_RATE,1);
			element.fadeTo(TFO.ProjectsPage.FADE_RATE,0.3);
			images.fadeTo(TFO.ProjectsPage.FADE_RATE,1);
			otherLabels.fadeTo(TFO.ProjectsPage.FADE_RATE,0);
		});

//		$(".filter-nav").mouseenter(
//			function(event){
//				var e = event.currentTarget;
//				TFO.ProjectsPage.setActive(e);
//			}
//		);
	};

	TFO.ProjectsPage = new TFO.__ProjectsPageInstance();
	TFO.ProjectsPage.init();
});
