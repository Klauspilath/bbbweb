/**
 * Created by keithensign on 8/8/14.
 */
$(function() {

	if (typeof TFO === 'undefined') {
		console.log('TFO does not exist');
		TFO = {};
	}

	if (typeof TFO !== 'undefined') {
		console.log('TFO does exist');
	}

	TFO.__ClientsPageInstance = function(){
		this.indicator = $("#indicator");
		this.activeList = null;
	};

	TFO.__ClientsPageInstance.prototype.init = function(){
		var e = $(".filter-nav-active");
		var d = e.offset().left + e.width()/2;
		TFO.ClientsPage.indicator.animate({"left":d});

		//prepare mouseenter event
		$(".filter-nav").mouseenter(
			function(event){
				var e = event.currentTarget;
				TFO.ClientsPage.setActive(e);
			}
		);
	};

	TFO.__ClientsPageInstance.prototype.setActive = function(element){

		var d = $(element).offset().left + $(element).width()/2;
		TFO.ClientsPage.indicator.animate({"left":d});
		TFO.ClientsPage.activeList = $(element);
		TFO.ClientsPage.activeList.addClass("filter-nav-active");
		$(".filter-nav").not($(element)).removeClass("filter-nav-active");

		TFO.ClientsPage.updateList();
	};

	TFO.__ClientsPageInstance.prototype.updateList = function(){

		var p = TFO.ClientsPage;
		var newList = $("#" + p.activeList.attr("data-list"));
		var replaceList = $(".active-clients");

		replaceList.fadeOut("fast",function(){
			replaceList.removeClass("active-clients");
			replaceList.addClass("hide");
			newList.addClass("active-clients");
			newList.removeClass("hide");
			newList.fadeIn("fast");
		});
	};

	TFO.ClientsPage = new TFO.__ClientsPageInstance();
	TFO.ClientsPage.init();
});