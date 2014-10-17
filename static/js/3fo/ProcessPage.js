/**
 * Created by keithensign on 10/2/14.
 */

$(function() {

	if (typeof TFO === "undefined") {
		TFO = {};
	}

	TFO.__ProcessPageInstance = function(){
		this.indicator = $("#indicator");
		this.currentProcess = $("#discover");
		this.detailDisplay = $("#process-detail-display");
		this.enableTouch();
	};

	TFO.__ProcessPageInstance.prototype.init = function(){

		var as = TFO.ProcessPage.currentProcess;
		var d = as.offset().left + as.width()/2;
		as.addClass(as.attr("id") + "-on");
		TFO.ProcessPage.indicator.animate({"left":d});
		TFO.ProcessPage.currentProcess.children("p").addClass("dark-text");
		TFO.ProcessPage.updateDetail();

		$(".icon").mouseenter(function() {
				TFO.ProcessPage.moveSlider(event);
			}
		);
	};

	TFO.__ProcessPageInstance.prototype.moveSlider = function(event){

		var d = $(event.currentTarget).offset().left + $(event.currentTarget).width()/2;

		TFO.ProcessPage.indicator.animate({"left":d});
		TFO.ProcessPage.currentProcess = $(event.currentTarget);
		TFO.ProcessPage.currentProcess.addClass(TFO.ProcessPage.currentProcess.attr("id") + "-on");
		TFO.ProcessPage.currentProcess.children("p").addClass("dark-text");

		$(".icon").not($(event.currentTarget)).removeClass(function(){
			return $(this).attr("id") + "-on";
		}).children("p").removeClass("dark-text");

		TFO.ProcessPage.updateDetail();
	};

	TFO.__ProcessPageInstance.prototype.enableTouch = function(){
		var el = $(".touch");

		el.on("touchstart", function(event){
			event.preventDefault();
			TFO.ProcessPage.moveSlider(event);
		});
	};

	TFO.__ProcessPageInstance.prototype.updateDetail = function(){

		var p = TFO.ProcessPage;
		var display = p.detailDisplay;
		var newDetail = $("#" + p.currentProcess.attr("id") + "-detail");
		display.fadeOut("fast",function(){
			display.html(newDetail.html());
			display.fadeIn("fast");
		});

	};

	TFO.ProcessPage = new TFO.__ProcessPageInstance();
	TFO.ProcessPage.init();
});
