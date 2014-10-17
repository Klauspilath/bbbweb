$(function(){

	if (typeof TFO === 'undefined'){
		console.log('TFO does not exist');
		TFO = {};
	}

	if (typeof TFO !== 'undefined'){
		console.log('TFO does exist');
	}

	TFO.__TeamPageInstance = function (){
		this.FADE_RATE = 100;
	};

	TFO.__TeamPageInstance.prototype.init = function(){
		TFO.TeamPage.assignBehaviors();
	};

	TFO.__TeamPageInstance.prototype.assignBehaviors = function(){
		TFO.TeamPage.setMouseStates();
		//TFO.TeamPage.setMobileFormat();
	};

	TFO.__TeamPageInstance.prototype.setTouchStates = function(){

		var images = document.getElementsByClassName("trans-image");//$(".trans-project-image");
		var members = document.getElementById("team-section");//$("#projects-section");
		//var labels = document.getElementsByClassName("bio");
		members.addEventListener("touchend",function(){
			$(".trans-image").fadeTo(TFO.ProjectsPage.FADE_RATE,1);
			$(".bio").fadeTo(TFO.ProjectsPage.FADE_RATE,0);
		});

		$(images).on("touchstart",function(){
			var element = $(event.currentTarget);
			var otherImages = $(".trans-image").not($(event.currentTarget));
			var label = element.parent().parent().find(".bio");
			var otherLabels = otherImages.parent().parent().find(".bio");

			$(label).fadeTo(TFO.ProjectsPage.FADE_RATE,1);
			element.fadeTo(TFO.ProjectsPage.FADE_RATE,0.3);
			otherImages.fadeTo(TFO.ProjectsPage.FADE_RATE,1);
			otherLabels.fadeTo(TFO.ProjectsPage.FADE_RATE,0);
		});
	};

	TFO.__TeamPageInstance.prototype.setMouseStates = function() {

		var images = $(".trans-team-image");
		var members = $("#team-section");
		var bios = $(".bio");

		members.mouseleave(function(){
			$(".trans-team-image").fadeTo(TFO.TeamPage.FADE_RATE,1);
			$(".bio").fadeTo(TFO.TeamPage.FADE_RATE,0);
		});

		bios.mouseenter(function(event){
			TFO.TeamPage.mouseOutHandler($(event.currentTarget));
		});

		images.mouseenter(function(event){
			TFO.TeamPage.mouseOutHandler($(event.currentTarget));
		});
	};

	TFO.__TeamPageInstance.prototype.mouseOutHandler = function(element){
		//console.log("team member mouse enter");
			var image = $(element).parent().find(".trans-team-image");
			var otherImages = $(".trans-team-image").not($(image));
			var label = $(element).parent().find(".bio");
			var otherLabels = $(".bio").not(label);

			label.fadeTo(TFO.TeamPage.FADE_RATE,1);
			image.fadeTo(TFO.TeamPage.FADE_RATE,0.3);
			otherImages.fadeTo(TFO.TeamPage.FADE_RATE,1);
			otherLabels.fadeTo(TFO.TeamPage.FADE_RATE,0);
	};


	TFO.TeamPage = new TFO.__TeamPageInstance();
	TFO.TeamPage.init();

});
